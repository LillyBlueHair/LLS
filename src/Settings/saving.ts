import { SavingModule } from "Modules/saving";
import { SavingSettingsModel } from "./Models/saving";
import { GuiSubscreen, Setting } from "./settingBase";
import { getModule } from "modules";
import { MiscModule } from "Modules/misc";

export class GuiSavings extends GuiSubscreen {
    get name(): string {
        return "Saves";
    }

    get icon(): string {
        return "";
    }

    get save(): SavingModule {
        return getModule<SavingModule>("SavingModule");
    }

    get settings(): SavingSettingsModel {
        return super.settings as SavingSettingsModel;
    }

    get multipageStructure(): Setting[][] {
        return [
            [
                <Setting>{
                    type: "checkbox",
                    id: "saveasCSV",
                    label: "Save as CSV",
                    description: "If enabled, nay logs will be saved as a CSV file instead of a text file.",
                    setting: () => this.settings.csv,
                    setSetting: (val) => {
                        this.settings.csv = val;
                    }
                },
                <Setting>{
                    type: "dropdown",
                    options: this.save.getAllRoomNames(),
                    id: "roomSelect",
                    label: "Selected Room",
                    description: "Enable saving of chat messages. If set to 'Only in rooms', saving will only occur in rooms where the user is present.",
                    setting: () => "Off",
                    setSetting: (val) => {
                        this.save.selectedRoom = this.save.getAllRoomNames().indexOf(val);
                    },                    
                },
                <Setting>{
                    type: "button",
                    id: "savechat",
                    label: "Save chat",
                    description: "Save the chat log of the selceted room.",
                    setSetting: (val) => {
                        this.save.settingChatRoomSave();
                    },
                    buttonText: "Save"
                },
                <Setting>{
                    type: "checkbox",
                    id: "sortBeepsByMemberNumber",
                    label: "Sort beeps by members",
                    description: "If enabled, beeps will be sorted by membernumbers.",
                    setting: () => this.settings.sortBeepsByMemberNumber,
                    setSetting: (val) => {
                        this.settings.sortBeepsByMemberNumber = val;
                    }
                },
                <Setting>{
                    type: "button",
                    id: "savebeeps",
                    label: "Save beeps",
                    description: "Save all beeps of the current session to a file.",
                    setSetting: (val) => {
                        this.save.saveBeepsToFile();
                    },
                    buttonText: "Save"
                },
                <Setting>{
                    type: "text",
                    id: "delimitor",
                    label: "Delimitor",
                    description: "The delimitor used to separate values in the CSV file.",
                    setting: () => this.settings.delimitor,
                    setSetting: (val) => {
                        this.settings.delimitor = val;
                    },
                },
            ],
        ];
    }

    Run(): void {
        super.Run();
    }

    Click(): void {
        super.Click();
    }

    Exit(): void {
        super.Exit();
    }

    Load(): void {
        // Load up module settings to ensure defaults..
        getModule<MiscModule>("MiscModule")?.settings;
        super.Load();
    }
}
