
import { GlobalSettingsModel } from "./Models/base";
import { GuiSubscreen, Setting } from "./settingBase";

export class GuiGlobal extends GuiSubscreen {

	get name(): string {
		return "General";
	}

	get settings(): GlobalSettingsModel {
        return super.settings as GlobalSettingsModel;
    }

	get structure(): Setting[] {
		return [
			<Setting>{
				type: "checkbox",
				label: "Automatically resist orgasms:",
				description: "Enables the button to immediately resist orgasms.",
				setting: () => Player.LLS.MiscModule.orgasmSkip ?? false,
				setSetting: (val) => Player.LLS.MiscModule.orgasmSkip = val
			}
		]
	}

	Load(): void {
		// Load up module settings to ensure defaults..
		super.Load();
	}
}