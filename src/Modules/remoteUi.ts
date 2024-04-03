import { BaseModule } from "base";
import { RemoteMainMenu } from "Settings/Remote/mainmenu";
import { RemoteGuiSubscreen } from "Settings/Remote/remoteBase";
import { ModuleCategory } from "Settings/settingDefinitions";
import { getChatroomCharacter, hookFunction, removeAllHooksByModule } from "../utils";

// Remote UI Module to handle configuration on other characters
// Can be used to "program" another character's hypnosis, collar, etc.
// Framework inspired from BCX
export class RemoteUiModule extends BaseModule {   

    private _currentSubscreen: RemoteGuiSubscreen | null = null;

	get currentSubscreen(): RemoteGuiSubscreen | null {
		return this._currentSubscreen;
	}

	set currentSubscreen(subscreen: RemoteGuiSubscreen | null) {
		if (this._currentSubscreen) {
			this._currentSubscreen.Unload();
		}
		this._currentSubscreen = subscreen;
		if (this._currentSubscreen) {
			this._currentSubscreen.Load();
		}
	}

    getInformationSheetCharacter(): OtherCharacter | PlayerCharacter | null {
		const C = InformationSheetSelection;
		if (!C || typeof C.MemberNumber !== "number") return null;
		if (C.IsPlayer())
			return Player as PlayerCharacter;
		return getChatroomCharacter(C.MemberNumber) as OtherCharacter;
	}

    hasAccessToPlayer(C: OtherCharacter): boolean {
		return ServerChatRoomGetAllowItem(C, Player);
	}

	playerHasAccessToCharacter(C: OtherCharacter): boolean {
		return !!C && !C.IsPlayer() && ServerChatRoomGetAllowItem(Player, C);
	}

	get playerIsRestrained(): boolean {
		return Player.IsRestrained();
	}

    characterHasMod(C: OtherCharacter): boolean {
        return !!C.LLS;
    }

    Load(): void {
        hookFunction("InformationSheetRun", 11, (args, next) => {
			if ((<any>window).bcx?.inBcxSubscreen())
				return next(args);

			if (this._currentSubscreen) {
				(<any>window).LLS_REMOTE_WINDOW_OPEN = true;
				MainCanvas.textAlign = "left";
				this._currentSubscreen.Run();
				MainCanvas.textAlign = "center";

				return;
			}

			(<any>window).LLS_REMOTE_WINDOW_OPEN = false;
			next(args);
			const C = this.getInformationSheetCharacter();
            if (!!C && this.characterHasMod(C as OtherCharacter) && !C.IsPlayer()) {
                const playerHasAccessToCharacter = this.playerHasAccessToCharacter(C as OtherCharacter);
                DrawButton(450, 60, 60, 60, "", (playerHasAccessToCharacter && !this.playerIsRestrained) ? "White" : "#ddd", "", playerHasAccessToCharacter ? (this.playerIsRestrained ? "Cannot access while restrained" : "LLS Remote Settings") : "Needs BC item permission", !playerHasAccessToCharacter || this.playerIsRestrained);
                //DrawImageResize(ICONS.REMOTE, 95, 65, 50, 50);
            }
		}, ModuleCategory.RemoteUi);

		hookFunction("InformationSheetClick", 10, (args, next) => {
			if (this._currentSubscreen) {
				return this._currentSubscreen.Click();
			}

			const C = this.getInformationSheetCharacter();
            const playerHasAccessToCharacter = this.playerHasAccessToCharacter(C as OtherCharacter);
			if (MouseIn(450, 60, 60, 60) && playerHasAccessToCharacter && !this.playerIsRestrained) {
                this.currentSubscreen = new RemoteMainMenu(this, C as OtherCharacter);
			} else {
				return next(args);
			}
		}, ModuleCategory.RemoteUi);

		hookFunction("InformationSheetExit", 10, (args, next) => {
			if (this._currentSubscreen) {
				return this._currentSubscreen.Exit();
			}

			return next(args);
		}, ModuleCategory.RemoteUi);
    }

    Unload(): void {
        removeAllHooksByModule(ModuleCategory.RemoteUi);
    }
}