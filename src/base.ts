import { BaseSettingsModel } from "Settings/Models/base";
import { ISettingsModel } from "Settings/Models/settings";
import { Subscreen } from "Settings/settingDefinitions";

export abstract class BaseModule {
	get settingsScreen() : Subscreen | null {
		return null;
	};

	/** Allows changing the subkey for that module settings storage */
	get settingsStorage(): string | null {
		return this.constructor.name;
	}

	get settings(): BaseSettingsModel {
		if (!this.settingsStorage) return {} as BaseSettingsModel;
		if (!Player.LLS) {
			Player.LLS = <ISettingsModel>{};
			this.registerDefaultSettings();
		}
		else if (!(<any>Player.LLS)[this.settingsStorage])
			this.registerDefaultSettings();
		return (<any>Player.LLS)[this.settingsStorage];
	}

	get Enabled(): boolean {
		if (!Player.LLS || !Player.LLS.GlobalModule)
			return false;
		return (ServerPlayerIsInChatRoom() || 
			(CurrentModule == "Room" && CurrentScreen == "Crafting"));
	}

	init() {
		this.registerDefaultSettings();
	}

	registerDefaultSettings(): void {
		const storage = this.settingsStorage;
		const defaults = this.defaultSettings;
		if (!storage || !defaults) return;

		(<any>Player.LLS)[storage] = Object.assign(defaults, (<any>Player.LLS)[storage] ?? {});
	}

	get defaultSettings(): BaseSettingsModel | null {
		return null;
	}

	load() {
		// Empty
	}

	run() {
		// Empty
	}

	unload() {
		// Empty
	}

	reload() {
		// Empty
	}

	safeword() {
		// Empty
	}
}