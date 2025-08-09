
import { GlobalSettingsModel, MiscSettingsModel } from "./Models/base";
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
				label: "LLS enabled:",
				description: "Enables Lilly's Little Scripts.",
				setting: () => this.settings.enabled ?? false,
				setSetting: (val) => this.settings.enabled = val
			}
		]
	}

	Load(): void {
		// Load up module settings to ensure defaults..
		super.Load();
	}
}