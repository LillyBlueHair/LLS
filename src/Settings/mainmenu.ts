import { getModule } from "modules";
import { GuiSubscreen } from "./settingBase";
import { GUI } from "./settingUtils";
import { GuiReset } from "./reset";
import { CoreModule } from "Modules/core";

export class MainMenu extends GuiSubscreen {
	subscreens: GuiSubscreen[] = [];

	get name(): string {
		return "MainMenu";
	}

	get enabled(): boolean {
		return false;
	}

	get hidden(): boolean {
		return true;
	}

	constructor(module: GUI) {
		super(module);

		this.subscreens = module.subscreens;
	}

	onChange(source: number) {
		if (source === this.character.MemberNumber) {
			this.Load();
		}
	}

	Load(): void {
		// As that Load call was made automatically by BC (though PreferenceSubscreenList) we're not setup fully yet.
		// Set and bail out, as we're gonna get called again.
		if (!GUI.instance?.currentSubscreen) {
			this.setSubscreen(this);
			return;
		}

		super.Load();
	}

	Run() {
		var prev = MainCanvas.textAlign;
		MainCanvas.textAlign = "left";
		DrawText(`- Lillys Little Scripts ${LLS_VERSION} -`, GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
		DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
		
		
		MainCanvas.textAlign = "center";
		let i = 0;
		//console.log(this.subscreens);
		for (const screen of this.subscreens) {
			const PX = Math.floor(i / 6);
			const PY = i % 6;

			const isDisabled = !screen.enabled;

			// Skip disabled screens for the time being
			if (screen.name == "MainMenu" || screen.hidden) continue;

			DrawButton(150 + 430 * PX, 190 + 120 * PY, 450, 90, "", isDisabled ? "#ddd" : "White", "", isDisabled ? "Setting is deactivated" : "", isDisabled);
			//DrawImageResize(screen.icon, 150 + 430 * PX + 10, 190 + 120 * PY + 10, 70, 70);
			MainCanvas.textAlign = "left";
			DrawTextFit(screen.name, 250 + 430 * PX, 235 + 120 * PY, 340, "Black");
			MainCanvas.textAlign = "center";

			i++;
		}
		

		MainCanvas.textAlign = "left";
		DrawButton(1500, 620, 400, 80, "", "#ffc9c9", "", "Emergency reset of LLS");		
		DrawImageResize("Icons/ServiceBell.png", 1510, 630, 60, 60);
        DrawTextFit("Reset", 1580, 660, 320, "Black");

		MainCanvas.textAlign = prev;
	
		

		MainCanvas.textAlign = "left";
		DrawButton(1500, 620, 400, 80, "", "#ffc9c9", "", "Emergency reset of LLS");		
		DrawImageResize("Icons/ServiceBell.png", 1510, 630, 60, 60);
        DrawTextFit("Reset", 1580, 660, 320, "Black");

		MainCanvas.textAlign = prev;
	}

	Click() {
		if (MouseIn(1815, 75, 90, 90)) return this.Exit();

		let i = 0
		for (const screen of this.subscreens) {
			const PX = Math.floor(i / 6);
			const PY = i % 6;

			if (screen.name == "MainMenu" || screen.hidden) continue;

			if (MouseIn(150 + 430 * PX, 190 + 120 * PY, 450, 90) && screen.enabled) {
				this.setSubscreen(screen);
				return;
			}

			i++;		
		}

		if (MouseIn(1500, 620, 400, 80))
            this.setSubscreen(new GuiReset(getModule<CoreModule>("CoreModule")));
	}

	Exit(): void {
		this.setSubscreen(null);
	}
}