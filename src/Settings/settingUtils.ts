import { BaseModule } from "../base";
import { GuiSubscreen } from "./settingBase";
import { GuiGlobal } from "./global";
import { MainMenu } from "./mainmenu";
import { SETTING_NAME_PREFIX, Subscreen, setSubscreen } from "./settingDefinitions";
import { modules } from "modules";
import { GlobalSettingsModel } from "./Models/base";

export class GUI extends BaseModule {
    static instance: GUI | null = null;

    private _subscreens: GuiSubscreen[];
    private _mainMenu: MainMenu;
    private _currentSubscreen: GuiSubscreen | null = null;

    get subscreens(): GuiSubscreen[] {
        return this._subscreens;
    }

    get mainMenu(): MainMenu {
        return this._mainMenu;
    }

    get currentSubscreen(): GuiSubscreen | null {
        return this._currentSubscreen;
    }

    set currentSubscreen(subscreen: GuiSubscreen | string | null) {
        if (this._currentSubscreen) {
            this._currentSubscreen.Unload();
        }
        if (typeof subscreen === "string") {
            const scr = this._subscreens?.find((s) => s.name === subscreen);
            if (!scr) throw `Failed to find screen name ${subscreen}`;
            this._currentSubscreen = scr;
        } else {
            this._currentSubscreen = subscreen;
        }

        // Reset that first, in case it gets set in the screen's Load callback
        PreferenceMessage = "";
        PreferencePageCurrent = 1;

        if (this._currentSubscreen) {
            this._currentSubscreen.Load();
        }
    }

    get currentCharacter(): Character {
        return Player;
    }

    get settingsScreen(): Subscreen | null {
        return GuiGlobal;
    }

    get settings(): GlobalSettingsModel {
        return super.settings as GlobalSettingsModel;
    }

    get settingsStorage(): string | null {
        return "GlobalModule";
    }

    constructor() {
        super();
        if (GUI.instance) {
            throw new Error("Duplicate initialization");
        }

        this._mainMenu = new MainMenu(this);
        this._subscreens = [this._mainMenu];

        GUI.instance = this;
    }

    get defaultSettings(): GlobalSettingsModel {
        return {
            enabled: true,
        };
    }

    Load(): void {
        // At that point all other modules have been initialized, build the list of their screens
        for (const module of modules()) {
            if (!module.settingsScreen) continue;

            this._subscreens.push(new module.settingsScreen(module));
        }

        this._mainMenu.subscreens = this._subscreens;

        PreferenceRegisterExtensionSetting({
            Identifier: "LLS",
            ButtonText: "LLS Settings",
            load: () => {
                setSubscreen(new MainMenu(this));
            },
            run: () => {
                if (this._currentSubscreen) {
                    MainCanvas.textAlign = "left";
                    this._currentSubscreen.Run();
                    MainCanvas.textAlign = "center";
                }
            },
            click: () => {
                if (this._currentSubscreen) {
                    this._currentSubscreen.Click();
                }
            },
            exit: () => {
                if (this._currentSubscreen) {
                    this._currentSubscreen.Exit();
                }
            },
            unload: () => {
                if (this._currentSubscreen) {
                    this._currentSubscreen.Unload();
                }
            },
        });
    }
}

export function DrawTooltip(x: number, y: number, width: number, text: string, align: "left" | "center" | "right") {
    const canvas = MainCanvas;
    const bak = canvas.textAlign;
    canvas.textAlign = align;
    canvas.beginPath();
    canvas.rect(x, y, width, 65);
    canvas.fillStyle = "#FFFF88";
    canvas.fillRect(x, y, width, 65);
    canvas.fill();
    canvas.lineWidth = 2;
    canvas.strokeStyle = "black";
    canvas.stroke();
    canvas.closePath();
    DrawTextFit(text, align === "left" ? x + 3 : x + width / 2, y + 33, width - 6, "black");
    canvas.textAlign = bak;
}
