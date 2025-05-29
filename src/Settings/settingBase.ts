import { ICONS, settingsSave } from "utils";
import { BaseSettingsModel, CraftModel } from "./Models/base";
import { SETTING_FUNC_NAMES, SETTING_FUNC_PREFIX, SETTING_NAME_PREFIX, setSubscreen } from "./settingDefinitions";
import { BaseModule } from "base";
import { DrawTooltip, GUI } from "./settingUtils";

export interface Setting {
    type: "checkbox" | "text" | "number" | "label" | "colorpicker" | "craftselect" | "null" | "dropdown" | "button"; // "null" is a placeholder for a blank line
    id: string;
    disabled: boolean;
    label: string;
    description: string;
    options: string[];
    setting(): any;
    setSetting(val: any): void;
    slot: string;
    buttonText: string;
}

export abstract class GuiSubscreen {
    static START_X: number = 180;
    static START_Y: number = 205;
    static X_MOD: number = 950;
    static Y_MOD: number = 75;
    readonly module: BaseModule;
    private preferenceColorPick: string = "";
    private preferenceColorPickLeft: boolean = true;

    public get PreferenceColorPick(): string {
        return this.preferenceColorPick;
    }
    public set PreferenceColorPick(value: string) {
        this.preferenceColorPick = value;
    }
    public get PreferenceColorPickLeft(): boolean {
        return this.preferenceColorPickLeft;
    }
    public set PreferenceColorPickLeft(value: boolean) {
        this.preferenceColorPickLeft = value;
    }

    constructor(module: BaseModule) {
        this.module = module;
    }

    get name(): string {
        return "UNKNOWN";
    }

    get icon(): string {
		return ICONS.BLUEBERRY;
	}

    get label(): string {
        return "UNDEFINED SETTING SCREEN";
    }

    get hidden(): boolean {
        return false;
    }

    get disabledReason(): string {
        return "Setting is unavailable.";
    }

    get enabled(): boolean {
        return true;
    }

    get message(): string {
        return PreferenceMessage;
    }

    set message(s: string) {
        PreferenceMessage = s;
    }

    get SubscreenName(): string {
        return SETTING_NAME_PREFIX + this.constructor.name;
    }

    setSubscreen(screen: GuiSubscreen | string | null) {
        return setSubscreen(screen);
    }

    get settings(): BaseSettingsModel {
        return this.module.settings as BaseSettingsModel;
    }

    get multipageStructure(): Setting[][] {
        return [[]];
    }

    get structure(): Setting[] {
        return this.multipageStructure[Math.min(PreferencePageCurrent - 1, this.multipageStructure.length - 1)];
    }

    get character(): Character {
        // Because we're initialized by that instance, it must already exist
        return GUI.instance?.currentCharacter as Character;
    }

    getYPos(ix: number) {
        return GuiSubscreen.START_Y + GuiSubscreen.Y_MOD * (ix % 9);
    }

    getXPos(ix: number) {
        return GuiSubscreen.START_X + GuiSubscreen.X_MOD * Math.floor(ix / 9);
    }

    HideElements() {
        this.multipageStructure.forEach((s, ix, arr) => {
            if (ix != PreferencePageCurrent - 1) {
                s.forEach((setting) => {
                    if (setting.type == "text" || setting.type == "number" || setting.type == "colorpicker" || setting.type == "dropdown")
                        this.ElementHide(setting.id);
                });
            }
        });
    }

    Load() {
        this.multipageStructure.forEach((s) =>
            s.forEach((item) => {
                switch (item.type) {
                    case "text":
                        ElementCreateInput(item.id, "text", item.setting(), "255");
                        break;
                    case "number":
                        ElementCreateInput(item.id, "number", item.setting(), "255");
                        break;
                    case "colorpicker":
                        ElementCreateInput(item.id, "text", item.setting(), "7");
                        break;
                    case "dropdown":
                        ElementCreateDropdown(item.id, item.options, () => item.setSetting(ElementValue(item.id)));
                        this.ElementSetValue(item.id, item.setting());
                        break;
                }
            })
        );
    }

    Run() {
        let prev = MainCanvas.textAlign;
        MainCanvas.textAlign = "left";

        DrawText("- LLS " + this.name + " -", GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "LLS main menu");
        if (this.multipageStructure.length > 1) {
            MainCanvas.textAlign = "center";
            PreferencePageChangeDraw(1595, 75, this.multipageStructure.length);
            MainCanvas.textAlign = "left";
        }

        this.HideElements();

        this.structure.forEach((item, ix, arr) => {
            if (
                this.PreferenceColorPick != "" &&
                ((this.getXPos(ix) < 1000 && this.PreferenceColorPickLeft) || (this.getXPos(ix) > 1000 && !this.PreferenceColorPickLeft))
            ) {
                this.ElementHide(item.id);
                return;
            }
            switch (item.type) {
                case "checkbox":
                    this.DrawCheckbox(item.label, item.description, item.setting(), ix, item.disabled);
                    break;
                case "text": //runs "dropdown"
                case "number":
                case "dropdown":
                    this.ElementPosition(item.id, item.label, item.description, ix, item.disabled, item.type);
                    break;
                case "label":
                    this.DrawLabel(item.label, item.description, ix);
                    break;
                case "colorpicker":
                    //Position is moved more to the left in DrawColorPicker
                    this.ElementPosition(item.id, "", "", ix, item.disabled);
                    this.DrawColorPicker(item.id, item.label, item.description, item.setting(), ix, item.disabled);
                    break;
                case "craftselect":
                    this.DrawCraftSelect(item.id, item.label, item.description, item.setting(), ix, item.disabled);
                    break;
                case "button":
                    let isHovering = MouseIn(this.getXPos(ix), this.getYPos(ix) - 32, 664, 64);
                    DrawTextFit(item.label, this.getXPos(ix), this.getYPos(ix), 600, isHovering ? "Red" : "Black", "Gray");

                    let prev = MainCanvas.textAlign;
                    MainCanvas.textAlign = "center";
                    DrawButton(
                        this.getXPos(ix) + 464,
                        this.getYPos(ix) - 32,
                        200,
                        64,
                        item.buttonText,
                        item.disabled ? "#CCCCCC" : "White",
                        "",
                        "",
                        item.disabled
                    );
                    MainCanvas.textAlign = prev;
                    if (isHovering) this.Tooltip(item.description);

                    break;
            }
        });

        MainCanvas.textAlign = prev;
    }

    Click() {
        if (MouseIn(1815, 75, 90, 90)) return this.Exit();

        if (MouseIn(1595, 75, 200, 90)) this.preferenceColorPick = "";
        if (this.multipageStructure.length > 1) PreferencePageChangeClick(1595, 75, this.multipageStructure.length);

        this.structure.forEach((item, ix, arr) => {
            switch (item.type) {
                case "checkbox":
                    if (MouseIn(this.getXPos(ix) + 600, this.getYPos(ix) - 32, 64, 64) && !item.disabled) {
                        item.setSetting(!item.setting());
                    }
                    break;
                case "colorpicker":
                    if (MouseIn(this.getXPos(ix) + 600, this.getYPos(ix) - 32, 64, 64) && !item.disabled) {
                        this.PreferenceColorPick = this.PreferenceColorPick != "" ? "" : item.id;
                        if (this.getXPos(ix) < 1000) {
                            this.PreferenceColorPickLeft = false;
                        } else {
                            this.PreferenceColorPickLeft = true;
                        }
                    }
                    break;
                case "craftselect":
                    if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) - 32, 200, 64) && !item.disabled) {
                        let craft = InventoryGet(Player, item.slot);
                        if (!craft || !craft.Craft) break;
                        let name = craft.Craft.Name;
                        let creator = craft.Craft.MemberNumber;
                        item.setSetting(<CraftModel>{ name: name, creator: creator });
                    } else if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) + 40, 200, 64) && !item.disabled) {
                        item.setSetting(<CraftModel>{ name: "", creator: 0 });
                    }
                    break;
                case "button":
                    if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) - 32, 200, 64) && !item.disabled) {
                        item.setSetting(null);
                    }
                    break;
            }
        });
    }

    Exit() {
        this.multipageStructure.forEach((s) =>
            s.forEach((item) => {
                switch (item.type) {
                    case "number":
                        if (CommonIsNumeric(ElementValue(item.id))) {
                            item.setSetting(ElementValue(item.id));
                            break;
                        }
                        ElementRemove(item.id);
                    case "text":
                    case "dropdown":
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
            })
        );

        this.PreferenceColorPick = "";

        setSubscreen("MainMenu");
        settingsSave(true);
    }

    Unload() {
        // Empty
    }

    onChange(source: number) {
        // Empty
    }

    Tooltip(text: string) {
        DrawTooltip(300, 850, 1400, text, "left");
    }

    DrawCheckbox(label: string, description: string, value: boolean, order: number, disabled: boolean = false) {
        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
        DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        DrawCheckbox(this.getXPos(order) + 600, this.getYPos(order) - 32, 64, 64, "", value ?? false, disabled);
        if (isHovering) this.Tooltip(description);
    }

    DrawColorPicker(id: string, name: string, description: string, setting: string, order: number, disabled: boolean = false) {
        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
        //Label
        DrawTextFit(name, this.getXPos(order), this.getYPos(order), 300, isHovering ? "Red" : "Black", "Gray");

        //Color Textfield
        ElementPosition(id, this.getXPos(order) + 500, this.getYPos(order), 200);
        let color = "";
        if (CommonIsColor(ElementValue(id))) color = ElementValue(id);
        else color = setting;
        let element = document.getElementById(id);
        if (!element) return;
        element.style.color = color;
        let TextColorHSV = ColorPickerCSSToHSV(color);
        if (TextColorHSV.V > 0.4) {
            element.style.backgroundColor = "#111111";
        } else {
            element.style.backgroundColor = "#FFFFFF";
        }

        if (this.PreferenceColorPick == id) {
            if (this.getXPos(order) < 1000) {
                ColorPickerDraw(1250, 185, 675, 800, /** @type {HTMLInputElement} */ document.getElementById(id) as HTMLInputElement);
            } else {
                ColorPickerDraw(250, 185, 675, 800, /** @type {HTMLInputElement} */ document.getElementById(id) as HTMLInputElement);
            }
        } else if (this.PreferenceColorPick == "") ColorPickerHide();

        //Color Picker Button
        DrawButton(this.getXPos(order) + 600, this.getYPos(order) - 32, 64, 64, "", disabled ? "#ebebe4" : "White", "Icons/Color.png", "", disabled);
        if (isHovering) this.Tooltip(description);
    }

    DrawCraftSelect(id: string, name: string, description: string, setting: CraftModel, order: number, disabled: boolean = false) {
        let prev = MainCanvas.textAlign;

        MainCanvas.textAlign = "left";
        DrawText("Update " + name + ":", this.getXPos(order), this.getYPos(order), disabled ? "Gray" : "Black", "Gray");
        MainCanvas.textAlign = "center";
        DrawButton(this.getXPos(order) + 464, this.getYPos(order) - 32, 200, 64, "Update", disabled ? "#CCCCCC" : "White", undefined, "", disabled);
        if (MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64)) this.Tooltip("Sets the " + name + " to the one currently worn");
        DrawButton(this.getXPos(order) + 464, this.getYPos(order) + 40, 200, 64, "Clear", disabled ? "#CCCCCC" : "White", undefined, "", disabled);
        if (MouseIn(this.getXPos(order), this.getYPos(order) + 40, 600, 64)) this.Tooltip("Set " + name + " to default");

        MainCanvas.textAlign = "left";
        if (!!setting) {
            DrawText("Current Name: " + setting.name, this.getXPos(order), this.getYPos(order) + 50, "Gray", "Gray");
            if (!!setting.creator && setting.creator > 0)
                DrawText("Current Crafter: " + setting.creator, this.getXPos(order), this.getYPos(order) + 100, "Gray", "Gray");
        }
        MainCanvas.textAlign = prev;
    }

    ElementHide(elementId: string) {
        ElementPosition(elementId, -999, -999, 1, 1);
    }

    ElementPosition(elementId: string, label: string, description: string, order: number, disabled: boolean = false, type: string = "") {
        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
        DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        if ((type = "text")) ElementPosition(elementId, this.getXPos(order) + 540, this.getYPos(order), 300);
        else ElementPosition(elementId, this.getXPos(order) + 740, this.getYPos(order), 300);
        if (disabled) ElementSetAttribute(elementId, "disabled", "true");
        else {
            document.getElementById(elementId)?.removeAttribute("disabled");
        }
        if (isHovering) this.Tooltip(description);
    }

    ElementSetValue(elementId: string, value: any) {
        let element = document.getElementById(elementId) as HTMLInputElement;
        if (!!element && value != null) element.value = value;
        if (element.localName == "div") {
            // Top of dropdown
            let displayDiv = (element as Element).childNodes[1];
            if (!!displayDiv) displayDiv.textContent = value;
        }
    }

    DrawLabel(name: string, description: string, order: number) {
        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
        DrawTextFit(name, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        if (isHovering) this.Tooltip(description);
    }
}
