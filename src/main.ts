import { hookFunction, isObject, settingsSave } from "./utils";
import { ISettingsModel } from "Settings/Models/settings";
import { modules, registerModule } from "modules";
import { CoreModule } from "Modules/core";
import { CommandModule } from "Modules/commands";
import { GUI } from "Settings/settingUtils";
import { CardsModule } from "Modules/cards";
import { CraftsModule } from "Modules/crafts";
import { MiscModule } from "Modules/misc";
import { ArtifactModule } from "Modules/artifacts";
import { RemoteUiModule } from "Modules/remoteUi";

function initWait() {
	console.debug("LLS: Init wait");
	if (CurrentScreen == null || CurrentScreen === "Login") {
		hookFunction("LoginResponse", 0, (args, next) => {
			console.debug("LLS: Init LoginResponse caught", args);
			next(args);
			const response = args[0];
			if (isObject(response) && typeof response.Name === "string" && typeof response.AccountName === "string") {
				loginInit(args[0]);
			}
		});
		console.log(`LLS Ready!`);
	} else {
		console.debug("LLS: Already logged in, init");
		init();
	}
}

export function initSettingsScreen() {
	PreferenceSubscreenList.push("LLSMainMenu");
	console.log("LLS: init Settings");
	hookFunction("TextGet", 2, (args: string[], next: (arg0: any) => any) => {
		if (args[0] == "HomepageLLSMainMenu") return "LLS Settings";
		return next(args);
	});
	hookFunction("DrawButton", 2, (args: string[], next: (arg0: any) => any) => {
		//if (args[6] == "Icons/LLSMainMenu.png") args[6] = ICONS.BOUND_GIRL;// "Icons/Asylum.png";
		return next(args);
	});
}

export function loginInit(C: any) {
	if (window.LLS_Loaded) return;
	init();
}

export function init() {
	if (window.LLS_Loaded) return;

	// clear any old settings.
	//if (!!(<any>Player.OnlineSettings)?.LillysScripts)
	//	delete (<any>Player.OnlineSettings).LillysScripts;
	//if (!!(<any>Player.OnlineSettings)?.ClubGames)
	//	delete (<any>Player.OnlineSettings).ClubGames;

	/*const before = Player.OnlineSettings?.LLS || <ISettingsModel>{};
	console.warn("LLS: Loading settings");
	let reduced = new SettingsModel();
	lo.assign(reduced , lo.pick(before, lo.keys(reduced)));
	Player.LLS = reduced
	console.warn("LLS: Done Loading settings");*/

	Player.LLS = Player.OnlineSettings?.LLS || <ISettingsModel>{};

	initSettingsScreen();


	if (!initModules()) {
		unload();
		return;
	}

	settingsSave();

	const currentAccount = Player.MemberNumber;
	if (currentAccount == null) {
		throw new Error("No player MemberNumber");
	}

	hookFunction("LoginResponse", 0, (args, next) => {
		const response = args[0];
		if (
			isObject(response) &&
			typeof response.Name === "string" &&
			typeof response.AccountName === "string" &&
			response.MemberNumber !== currentAccount
		) {
			alert(
				`Attempting to load LLS with different account than already loaded (${response.MemberNumber} vs ${currentAccount}). This is not supported, please refresh the page.`
			);
			throw new Error("Attempting to load LLS with different account");
		}
		return next(args);
	});

	window.LLS_Loaded = true;
	console.log(`LLS loaded! Version: ${LLS_VERSION}`);
}

function initModules(): boolean {
	registerModule(new CoreModule());
	registerModule(new CommandModule());
	registerModule(new CardsModule());
	registerModule(new CraftsModule());
	registerModule(new GUI());
	registerModule(new MiscModule());
	registerModule(new ArtifactModule());
	registerModule(new RemoteUiModule());

	for (const m of modules()) {
		m.init();
	}

	for (const m of modules()) {
		m.Load();
	}

	for (const m of modules()) {
		m.Run();
	}

	hookFunction("ChatRoomSafewordRevert", 1, (args, next) => {
		for (const m of modules()) {
			m.Safeword();
		}
		return next(args);
	});

	hookFunction("ChatRoomSafewordRelease", 1, (args, next) => {
		var ret = next(args);
		for (const m of modules()) {
			m.Safeword();
		}
		return ret;
	});

	console.info("LLS Modules Loaded.");
	return true;
}

export function unload(): true {
	unloadModules();

	delete window.LLS_Loaded;
	console.log("LLS: Unloaded.");
	return true;
}

function unloadModules() {
	for (const m of modules()) {
		m.Unload();
	}
}

initWait();
