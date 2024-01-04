import { BaseModule } from "base";
import { getModule, modules } from "modules";
import { BaseSettingsModel, GlobalSettingsModel } from "Settings/Models/base";
import { IPublicSettingsModel, PublicSettingsModel, ISettingsModel } from "Settings/Models/settings";
import { ModuleCategory } from "Settings/settingDefinitions";
import {
	removeAllHooksByModule,
	hookFunction,
	sendLLSMessage,
	getChatroomCharacter,
	settingsSave,
	LLS_SendLocal,
} from "../utils";

// Core Module that can handle basic functionality like server handshakes etc.
// Maybe can consolidate things like hypnosis/suffocation basic state handling too..
export class CoreModule extends BaseModule {
	get publicSettings(): IPublicSettingsModel {
		var settings = new PublicSettingsModel();
		for (const m of modules()) {
			var moduleSettings = m.settings ?? <BaseSettingsModel>{ enabled: false };
			var moduleSettingStorage = m.settingsStorage ?? "";
			if (Object.hasOwn(settings, moduleSettingStorage)) {
				var publicModuleSetting = (<any>settings)[moduleSettingStorage];
				for (const k of Object.keys(moduleSettings)) {
					if (Object.hasOwn(publicModuleSetting, k)) publicModuleSetting[k] = (<any>moduleSettings)[k];
				}
			}
		}
		return settings;
	}

	get settingsStorage(): string | null {
		return "GlobalModule";
	}

	get settings(): GlobalSettingsModel {
		return super.settings as GlobalSettingsModel;
	}

	get defaultSettings(): GlobalSettingsModel | null {
		return <GlobalSettingsModel>{
			enabled: false,
		};
	}

	SendPublicPacket(replyRequested: boolean, type: LLSMessageModelType = "init") {
		sendLLSMessage(<LLSMessageModel>{
			version: LLS_VERSION,
			type: type,
			settings: this.publicSettings,
			target: null,
			reply: replyRequested,
		});
	}

	load(): void {
		hookFunction(
			"ChatRoomSync",
			1,
			(args, next) => {
				this.SendPublicPacket(true);
				return next(args);
			},
			ModuleCategory.Core
		);

		hookFunction(
			"ChatRoomMessage",
			1,
			(args, next) => {
				this.CheckForPublicPacket(args[0]);
				return next(args);
			},
			ModuleCategory.Core
		);

		hookFunction("DialogClick", 1, (args, next) => {
			next(args);
			let C = CharacterGetCurrent();
			if (!C) return;
			/*if (MouseIn(this.toggleSharedButton.x, this.toggleSharedButton.y, this.toggleSharedButton.width, this.toggleSharedButton.height) &&
                DialogModeShowsInventory() && (DialogMenuMode === "permissions" || (Player.CanInteract() && !InventoryGroupIsBlocked(C, undefined, true)))) {
                this.settings.seeSharedCrafts = !this.settings.seeSharedCrafts;
                settingsSave();
                DialogInventoryBuild(C, true, false);
            }*/
		});
	}

	/*_drawShareToggleButton(X: number, Y: number, Width: number, Height: number) {
        DrawButton(X, Y, Width, Height, "", this.settings.seeSharedCrafts ? "White" : "Red", "", "Toggle Shared Crafts", false);
        DrawImageResize("Icons/Online.png", X + 2, Y + 2, Width - 4, Height - 4);
        DrawLineCorner(X + 2, Y + 2, X + Width - 2, Y + Height - 2, X + 2, Y + 2, 2, "Black");
    }*/

	run(): void {
		if (ServerPlayerIsInChatRoom()) {
		}
	}

	unload(): void {
		removeAllHooksByModule(ModuleCategory.Core);
	}

	CheckForPublicPacket(data: IChatRoomMessage) {
		if (
			data.Sender != Player.MemberNumber &&
			data.Type == "Hidden" &&
			data.Content == "LLSMsg" &&
			!!data.Dictionary &&
			!!data.Dictionary[0]
		) {
			var C = getChatroomCharacter(data.Sender) as OtherCharacter;
			var msg = (<LLSMessageDictionaryEntry>data.Dictionary[0]).message;
			switch (msg.type) {
				case "init":
					this.Init(C, msg);
					break;
				case "sync":
					this.Sync(C, msg);
					break;
				case "command":
					this.Command(C, msg);
					break;
			}
		}
	}

	Init(Sender: OtherCharacter | null, msg: LLSMessageModel) {
		this.Sync(Sender, msg);
	}

	Sync(Sender: OtherCharacter | null, msg: LLSMessageModel) {
		if (!Sender) return;
		Sender.LLS = Object.assign(Sender.LLS ?? {}, msg.settings ?? {});
		if (msg.reply) {
			this.SendPublicPacket(false, msg.type);
		}
	}

	Command(Sender: OtherCharacter | null, msg: LLSMessageModel) {
		if (!msg.command || msg.target != Player.MemberNumber) return;
		switch (msg.command!.name) {
			case "grab":
				//getModule<ActivityModule>("ActivityModule")?.IncomingGrab(Sender!, msg.command.args.find(a => a.name == "type")?.value as GrabType);
				break;
			case "remote":
				Object.assign(Player.LLS.ArtifactModule, msg.settings?.ArtifactModule);
				settingsSave(true);
				LLS_SendLocal(`${!Sender ? "Someone" : CharacterNickname(Sender)} has accessed your remote settings!`);
				break;
		}
	}
}