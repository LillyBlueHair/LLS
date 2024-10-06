import { BaseModule } from "base";
import { getModule, modules } from "modules";
import { ModuleCategory } from "Settings/settingDefinitions";
import { getCharacterNumber, getChatroomCharacter, sendLocal, removeAllHooksByModule, settingsSave } from "../utils";
import { CardsModule } from "./cards";
import { MiscModule } from "./misc";

// Remote UI Module to handle configuration on other characters
// Can be used to "program" another character's hypnosis, collar, etc.
// Framework inspired from BCX
export class CommandModule extends BaseModule {
    get cards(): CardsModule {
        return getModule<CardsModule>("CardsModule");
    }
    get misc(): MiscModule {
        return getModule<MiscModule>("MiscModule");
    }

    llsCommands: ICommand[] = [
        {
            Tag: "help",
            Description: ": Opens the help for LLS commands",
            Action: (args, msg, parsed) => {
                let helpLines: string[] = [];
                this.orderedCommands.forEach((c) => {
                    helpLines.push(`<br><b>/lls ${c.Tag}</b> ${c.Description}`);
                });
                let helpText = `<b>- Lillys Little Scrips -</b><br>${helpLines.join()}<br>`;
                sendLocal(helpText);
            },
        },
        {
            Tag: "cards",
            Description: ": Card deck commands",
            Action: (args, msg, parsed) => {
                let printHelp = false;
                if (parsed.length != 0) {
					let number = 1;
					let target;
                    console.log(parsed);
                    switch (parsed[0].toLowerCase()) {
                        case "shuffle":
                            this.cards.shuffleDeck();
                            break;
                        case "log":
                            this.cards.printLog(false);
                            break;
                        case "deal":
                            if (parsed.length != 3) {
                                printHelp = true;
                                break;
                            }
                            if (/^[0-9]+$/.test(parsed[1])) {
                                target = Number.parseInt(parsed[1], 10);
                            } else {
                                target = getCharacterNumber(parsed[1]);
                            }
							if(parsed[2] && /^[0-9]+$/.test(parsed[2])) {
								number = Number.parseInt(parsed[2], 10);
							}
                            this.cards.dealCards(target, number, false);
                            break;
                        case "dealopen":
                            if (parsed.length != 3) {
                                printHelp = true;
                                break;
                            }
                            if (/^[0-9]+$/.test(parsed[1])) {
                                target = Number.parseInt(parsed[1], 10);
                            } else {
                                target = getCharacterNumber(parsed[1]);
                            }
							if(parsed[2] && /^[0-9]+$/.test(parsed[2])) {
								number = Number.parseInt(parsed[2], 10);
							}
                            this.cards.dealCards(target, number, true);
                            break;
                        case "log":
                            if (parsed[1] == "public") this.cards.printLog(false);
                            else if (parsed[1] == "private") this.cards.printLog(true);
                            else printHelp = true;
                            break;
                    }
                } 
                if (printHelp){
                    let text: string =
                        "<br><b>/lls cards shuffle</b>: Shuffles the deck" +
                        "<br><b>/lls cards deal (player) [number]</b>: Deals [number] cards to the player face down. No number means 1" +
                        "<br><b>/lls cards dealopen (player) [number]</b>: Deals [number] cards to the player face up. No number means 1" +
                        "<br><b>/lls cards log (private/public) </b>: Prints the log" +
                        "<br><b>/lls cards show </b>: Deals an open card";
                    sendLocal(`<b>- Lillys Little Scrips -</b><br>Cards: ${text}<br>`);
                }
            },
        },
        {
            Tag: "visibility",
            Description: ": Change the visibility of your character",
            Action: (args, msg, parsed) => {
                let printHelp = false;
                if (parsed.length != 0) {
                    switch (parsed[0].toLowerCase()) {
                        case "hide":
                            this.misc.characterToggleVisibility("all", Player);
                            break;
                        case "clothes":
                            this.misc.characterToggleVisibility("bodyOnly", Player);
                            break;
                        case "show":
                            this.misc.characterToggleVisibility("visible", Player);
                            break;
                        default:
                            printHelp = true;

                    }
                } 
                if (printHelp) {
                    let text: string =
                        "For these commands to work you need to enable 'hide' for 'self' in your Script-Settings" +
                        "<br><b>/lls visibility hide</b>: Hides your character" +
                        "<br><b>/lls visibility show</b>: Shows your character" +
                        "<br><b>/lls visibility clothes</b>: Only shows your clothes";
                    sendLocal(`<b>- Lillys Little Scrips -</b><br>Visibility: ${text}<br>`);
                }
            },
        },
    ];

    get orderedCommands(): ICommand[] {
        let helpCommand = this.getSubcommand("help")!;
        let sorted = this.llsCommands.filter((c) => c.Tag != "help").sort((a, b) => a.Tag.localeCompare(b.Tag));
        return [helpCommand, ...sorted];
    }

    get subCommands(): string[] {
        return this.orderedCommands.map((c) => c.Tag);
    }

    getSubcommand(name: string): ICommand | undefined {
        return this.llsCommands.find((c) => c.Tag.toLocaleLowerCase() == name.toLocaleLowerCase());
    }

    getCharacterByNicknameOrMemberNumber(target: string): Character | undefined {
        target = target.toLocaleLowerCase();
        let targetC: Character | undefined | null;
        if (CommonIsNumeric(target)) targetC = getChatroomCharacter(target);
        if (!targetC) {
            targetC = ChatRoomCharacter.find((c) => CharacterNickname(c).toLocaleLowerCase() == target);
        }
        return targetC;
    }

    Load(): void {
        CommandCombine([
            {
                Tag: "lls",
                Description: "or <b>/lls help</b> : Opens the help for LLS commands",
                AutoComplete(parsed, low, msg) {},
                Action: (args, msg, parsed) => {
                    if (parsed.length <= 0) {
                        this.getSubcommand("help")!.Action!("", msg, []);
                    } else {
                        let command = this.getSubcommand(parsed[0]);
                        let subArgs = parsed.slice(1);
                        command?.Action!(subArgs.join(" "), msg, subArgs);
                    }
                },
            },
        ]);
    }

    Unload(): void {
        removeAllHooksByModule(ModuleCategory.Commands);
    }

    emergencyRelease() {
        // Run Safeword action on all modules
        for (const m of modules()) {
            m.Safeword();
            if (!!m.settingsStorage) (<any>Player.LLS)[m.settingsStorage] = m.defaultSettings;
        }
        settingsSave(true);
    }
}
