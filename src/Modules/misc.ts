import { MiscSettingsModel } from "Settings/Models/base";
import { GuiMisc } from "Settings/misc";
import { Subscreen } from "Settings/settingDefinitions";
import { BaseModule } from "base";
import { hookFunction, patchFunction, sendHiddenMessage, sendLocal, sendMessage } from "utils";

export class MiscModule extends BaseModule {
    get settings(): MiscSettingsModel {
        return super.settings as MiscSettingsModel;
    }

    get defaultSettings(): MiscSettingsModel | null {
        return <MiscSettingsModel>{
            orgasmSkip: false,
            casinoButtons: false,
        };
    }

    get settingsScreen(): Subscreen | null {
        return GuiMisc;
    }

    Safeword(): void {}

    Load(): void {
        // To draw the button for orgasm resist
        hookFunction("ChatRoomRun", 1, (args, next) => {
            next(args);
            if (!this.Enabled) return;
            if (this.settings.orgasmSkip) {
                if (
                    Player.ArousalSettings != null &&
                    Player.ArousalSettings.Active != null &&
                    Player.ArousalSettings.Active != "Inactive" &&
                    Player.ArousalSettings.Active != "NoMeter"
                ) {
                    if (
                        Player.ArousalSettings.OrgasmTimer != null &&
                        typeof Player.ArousalSettings.OrgasmTimer === "number" &&
                        !isNaN(Player.ArousalSettings.OrgasmTimer) &&
                        Player.ArousalSettings.OrgasmTimer > 0
                    ) {
                        if (Player.ArousalSettings.OrgasmStage == 1) DrawButton(10, 10, 250, 64, "Autoresist", "White");
                    }
                }
            }
        });

        //To click the button for orgasm resist
        hookFunction("ChatRoomClick", 1, (args, next) => {
            next(args);
            if (!this.Enabled) return;
            if (this.settings.orgasmSkip) {
                if (
                    Player.ArousalSettings != null &&
                    Player.ArousalSettings.OrgasmTimer != null &&
                    typeof Player.ArousalSettings.OrgasmTimer === "number" &&
                    !isNaN(Player.ArousalSettings.OrgasmTimer) &&
                    Player.ArousalSettings.OrgasmTimer > 0
                ) {
                    if (MouseX >= 10 && MouseX <= 260 && MouseY >= 10 && MouseY <= 74 && Player.ArousalSettings.OrgasmStage == 1) {
                        ActivityOrgasmGameGenerate(ActivityOrgasmGameDifficulty + 1);
                    }
                }
            }
        });

        // Screenshot Cross Origin
        patchFunction("DrawRoomBackground", {
            'const img = URL !== "" ? DrawGetImage(URL) : undefined;':
                'const img = URL !== "" ? DrawGetImage(URL) : undefined;\n\t\tif(img) img.crossOrigin = "anonymous";',
        });

        hookFunction("ChatRoomClick", 4, (args, next) => {
            if (!this.Enabled) return;
            if (this.settings.casinoButtons) {
                if (MouseX >= 955 && MouseX <= 1005 && MouseY >= 370 && MouseY <= 420) {
                    let bet = parseInt(ElementValue("bet"));
                    if (isNaN(bet) || bet <= 0) {
                        sendLocal("Invalid bet amount.");
                        return;
                    }
                    sendHiddenMessage("ChatRoomBot bet " + bet);
                    return;
                }
                if (MouseX >= 955 && MouseX <= 1005 && MouseY >= 480 && MouseY <= 530) {
                    sendHiddenMessage("ChatRoomBot hit");
                    return;
                }
                if (MouseX >= 955 && MouseX <= 1005 && MouseY >= 535 && MouseY <= 585) {
                    sendHiddenMessage("ChatRoomBot stand");
                    return;
                }
                if (MouseX >= 955 && MouseX <= 1005 && MouseY >= 590 && MouseY <= 640) {
                    sendHiddenMessage("ChatRoomBot double");
                    return;
                }
                if (MouseX >= 955 && MouseX <= 1005 && MouseY >= 645 && MouseY <= 695) {
                    sendHiddenMessage("ChatRoomBot split");
                    return;
                }
                if (MouseX >= 955 && MouseX <= 1005 && MouseY >= 710 && MouseY <= 760) {
                    sendHiddenMessage("ChatRoomBot chips");
                    return;
                }
            }
            next(args);
        });

        hookFunction("ChatRoomMenuDraw", 4, (args, next) => {
            if (!this.Enabled) return;
            if (this.settings.casinoButtons && ChatRoomData?.Name === "Cotton Candy Casino" && CurrentScreen === "ChatRoom") {
                DrawButton(955, 370, 50, 50, "Bet", "White");
                if (CurrentModule === "Online") {
                    ElementCreateInput("bet", "number", "1");
                    ElementPosition("bet", 955, 450, 100, 50);
                } else {
                    ElementRemove("bet");
                }
                DrawButton(955, 480, 50, 50, "Hit", "White");
                DrawButton(955, 535, 50, 50, "Stand", "White");
                DrawButton(955, 590, 50, 50, "Double", "White");
                DrawButton(955, 645, 50, 50, "Split", "White");
                DrawButton(955, 710, 50, 50, "Chips", "White");
            } else {
                ElementRemove("bet");
            }
            next(args);
        });
    }

    characterToggleVisibility(mode: String, C: OtherCharacter | PlayerCharacter) {
        let script = InventoryWear(C, "Script", "ItemScript");

        if (!script) return;
        script.Property = script.Property || {};
        if (mode === "bodyOnly") {
            script.Property.Hide = AssetGroup.filter(
                (g) => g.Category === "Appearance" && !g.Clothing && !["Height", "Emoticon", "Pronouns"].includes(g.Name)
            ).map((g) => g.Name);
        } else if (mode === "all") {
            script.Property.Hide = AssetGroup.map((g) => g.Name).filter((gn) => gn !== "ItemScript");
        } else {
            InventoryRemove(C, "ItemScript", true);
        }

        CharacterScriptRefresh(C);
    }

    Unload(): void {}
}
