import { sendLLSMessage } from "utils";
import { BaseSettingsModel } from "../Models/base";
import { SETTING_NAME_PREFIX } from "../settingDefinitions";
import { BaseModule } from "base";
import { GuiSubscreen } from "Settings/settingBase";
import { getModule } from "modules";
import { RemoteUiModule } from "Modules/remoteUi";
import { RemoteMainMenu } from "./mainmenu";

export abstract class RemoteGuiSubscreen extends GuiSubscreen {
	dirty: boolean = false;
	readonly Character: OtherCharacter;

	constructor(module: BaseModule, C: OtherCharacter) {
		super(module);
		this.Character = C;
	}

	get SubscreenName(): string {
		return SETTING_NAME_PREFIX + this.constructor.name;
	}

	setSubscreen(screen: RemoteGuiSubscreen): RemoteGuiSubscreen {
		let rootModule = getModule<RemoteUiModule>("RemoteUiModule");
		if (!!rootModule && !!screen) rootModule.currentSubscreen = screen;
		return screen;
	}

	get settings(): BaseSettingsModel {
		if (!this.module.settingsStorage) return {} as BaseSettingsModel;
		if (!this.Character?.LLS || !(<any>this.Character.LLS)[this.module.settingsStorage]) {
			return {} as BaseSettingsModel; // Somehow a non-mod user made it this far?
		}
		return (<any>this.Character.LLS)[this.module.settingsStorage];
	}

	settingsSave() {
		if (!this.Character || !this.dirty) return;
		sendLLSMessage(<LLSMessageModel>{
			type: "command",
			reply: false,
			target: this.Character?.MemberNumber!,
			version: LLS_VERSION,
			settings: this.Character.LLS,
			command: {
				name: "remote",
			},
		});
	}

	Load(): void {
		super.Load();
		this.dirty = false;
	}

	Click() {
		super.Click();
		this.dirty = true;
	}

	Exit() {
		this.structure.forEach((item) => {
			switch (item.type) {
				case "number":
					if (!CommonIsNumeric(ElementValue(item.id))) {
						ElementRemove(item.id);
						break;
					}
				case "text":
					let val = ElementValue(item.id);
					if (val != item.setting()) this.dirty = true;
					item.setSetting(ElementValue(item.id));
					ElementRemove(item.id);
					break;
				case "colorpicker":
					if (CommonIsColor(ElementValue(item.id))) {
						item.setSetting(ElementValue(item.id));
					}
					ElementRemove(item.id);
					break;
			}
		});

		this.settingsSave();
		let rootModule = getModule<RemoteUiModule>("RemoteUiModule");
		if (!!rootModule) rootModule.currentSubscreen = new RemoteMainMenu(rootModule, this.Character);
	}
}
