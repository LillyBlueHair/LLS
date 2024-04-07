import { getModule } from "modules";
import { RemoteUiModule } from "Modules/remoteUi";
import { RemoteGuiSubscreen } from "./remoteBase";
import { GuiSubscreen } from "Settings/settingBase";
import { RemotePetsuitCollar } from "./petsuitCollar";
import { ArtifactModule } from "Modules/artifacts";

export class RemoteMainMenu extends RemoteGuiSubscreen {
	subscreens: RemoteGuiSubscreen[] = [];

	get name(): string {
		return "MainMenu";
	}

	get enabled(): boolean {
		return false;
	}

	get hidden(): boolean {
		return true;
	}

	constructor(module: RemoteUiModule, C: OtherCharacter) {
		super(module, C);
	}

	onChange(source: number) {
		if (source === this.character.MemberNumber) {
			this.Load();
		}
	}

	Load(): void {
		this.subscreens = [
            new RemotePetsuitCollar(getModule<ArtifactModule>("ArtifactModule"), this.Character)
		];
	}

	get character(): Character {
		// Because we're initialized by that instance, it must already exist
		return this.Character as Character;
	}

	Run() {
		let prev = MainCanvas.textAlign;
		MainCanvas.textAlign = "left";
		DrawText(`- Lillys Little Scripts ${(this.Character as OtherCharacter).LLS?.Version ?? "?.?.?"} -`, GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
		DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
		
		MainCanvas.textAlign = "center";
		let i = 0;
		for (const screen of this.subscreens) {
			const PX = Math.floor(i / 6);
			const PY = i % 6;

			const isDisabled = !screen.enabled;
			const reason = screen.disabledReason;

			// Skip disabled screens for the time being
			if (screen.name == "MainMenu" || screen.hidden) continue;

			DrawButton(150 + 430 * PX, 190 + 120 * PY, 450, 90, "", isDisabled ? "#ddd" : "White", "",
				isDisabled ? reason : "", isDisabled);
			//DrawImageResize(screen.icon, 150 + 430 * PX + 10, 190 + 120 * PY + 10, 70, 70);
			MainCanvas.textAlign = "left";
			DrawTextFit(screen.name, 250 + 430 * PX, 235 + 120 * PY, 340, "Black");
			MainCanvas.textAlign = "center";

			i++;
		}
		
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
	}

	Exit(): void {
		(this.module as RemoteUiModule).currentSubscreen = null;
	}
}