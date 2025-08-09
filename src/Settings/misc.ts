import { GlobalSettingsModel, MiscSettingsModel } from "./Models/base";
import { GuiSubscreen, Setting } from "./settingBase";

export class GuiMisc extends GuiSubscreen {
    get name(): string {
        return "Miscellaneous";
    }

    get settings(): MiscSettingsModel {
        return super.settings as MiscSettingsModel;
    }

    get structure(): Setting[] {
        return [
			<Setting>{
				type: "checkbox",
				label: "Automatically resist orgasms:",
				description: "Enables the button to immediately resist orgasms.",
				setting: () => this.settings.orgasmSkip ?? false,
				setSetting: (val) => this.settings.orgasmSkip = val
			},
			<Setting>{
				type: "checkbox",
				label: "Casino buttons:",
				description: "Enables the casino buttons.",
				setting: () => this.settings.casinoButtons ?? false,
				setSetting: (val) => this.settings.casinoButtons = val
			}
        ];
    }

    Load(): void {
        // Load up module settings to ensure defaults..
        super.Load();
    }
}
