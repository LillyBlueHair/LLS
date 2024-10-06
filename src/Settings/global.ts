
import { GlobalSettingsModel, MiscSettingsModel } from "./Models/base";
import { GuiSubscreen, Setting } from "./settingBase";

export class GuiGlobal extends GuiSubscreen {

	get name(): string {
		return "General";
	}

	get settings(): MiscSettingsModel {
        return super.settings as MiscSettingsModel;
    }

	get structure(): Setting[] {
		return [
			<Setting>{
				type: "checkbox",
				label: "LLS enabled:",
				description: "Enables Lilly's Little Scripts.",
				setting: () => Player.LLS.GlobalModule.enabled ?? false,
				setSetting: (val) => Player.LLS.GlobalModule.enabled = val
			},
			<Setting>{
				type: "checkbox",
				label: "Automatically resist orgasms:",
				description: "Enables the button to immediately resist orgasms.",
				setting: () => this.settings.orgasmSkip ?? false,
				setSetting: (val) => this.settings.orgasmSkip = val
			}
		]
	}

	Load(): void {
		// Load up module settings to ensure defaults..
		super.Load();
	}
}