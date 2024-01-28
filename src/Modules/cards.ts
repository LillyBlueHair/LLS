import { BaseModule } from "base";
import { SendMessage, shuffleArray, getCharacterName, SendActivityMessage, getCharacterNumber, LLS_SendLocal, removeAllHooksByModule } from "../utils";
import { ModuleCategory } from "Settings/settingDefinitions";

let cardDeck: [string, string][] = ([] = []);
let dealersLog: Map<number, [string, string][]> = new Map();

export class CardsModule extends BaseModule {
    shuffleDeck() {
        cardDeck = [];
        dealersLog.clear();
        const cardSuits = ["♥", "♦", "♠", "♣"];
        const cardRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        cardSuits.forEach((suit) => {
            cardRanks.forEach((rank) => {
                cardDeck.push([rank, suit]);
            });
        });
        shuffleArray(cardDeck);
        SendActivityMessage(
            `${Player.Nickname ? Player.Nickname : Player.Name} took the remaining ${
                cardDeck.length
            } cards from the deck and shuffled all cards for a new deck.`
        );
    }

    dealCard(target: number | null = null, open: boolean = false) {
        if (cardDeck.length === 0) {
            this.shuffleDeck();
        }
        const card = cardDeck.pop();
        if (!card) return;
        if (target) {
            if (open) {
                SendActivityMessage(
                    `${Player.Nickname ? Player.Nickname : Player.Name} dealt this card openly to ${getCharacterName(target, "unknown")}: ${card.join("")}`
                );
                if (dealersLog.has(target)) {
                    dealersLog.get(target)?.push(card);
                } else {
                    dealersLog.set(target, new Array(card));
                }
            } else {
                SendActivityMessage(`${Player.Nickname ? Player.Nickname : Player.Name} dealt you this card face down: ${card.join("")}`, target);
                if (dealersLog.has(target)) {
                    dealersLog.get(target)?.push(card);
                } else {
                    dealersLog.set(target, new Array(card));
                }
            }
        } else {
            SendActivityMessage(`${Player.Nickname ? Player.Nickname : Player.Name} openly drew this card face up: ${card.join("")}`, target);
        }
    }

    dealCards(targets: number|number[]|null, numberOfCards: number, open: boolean = false) {
		if(!targets) {
			
		}
        if (typeof targets === "number") {
            const target = targets;
            for (let i = 0; i < numberOfCards; i++) {
                this.dealCard(target, open);
            }
        }
        if (Array.isArray(targets)) {
            for (const target of targets ?? [null]) {
                for (let i = 0; i < numberOfCards; i++) {
                    this.dealCard(target, open);
                }
            }
        }
    }

    printLog(priv: boolean) {
        let message: string = "";
        for (let [key, value] of dealersLog) {
            message = message.concat("\n", getCharacterName(key, "unknown"), ": ");
            value
                .sort((a, b) => {
                    if (a[1] < b[1]) return -1;
                    if (a[1] > b[1]) return 1;

                    if (Number(a[0])) {
                        if (Number(b[0])) {
                            return Number(a[0]) - Number(b[0]);
                        }
                        return -1;
                    } else if (Number(b[0])) {
                        return 1;
                    }
                    if (a[0] == "A") {
                        return 1;
                    } else if (b[0] == "A") {
                        return -1;
                    }
                    if (a[0] == "K") {
                        return 1;
                    } else if (b[0] == "K") {
                        return -1;
                    }
                    if (a[0] == "Q") {
                        return 1;
                    } else if (b[0] == "Q") {
                        return -1;
                    }
                    if (a[0] == "J") {
                        return 1;
                    } else if (b[0] == "J") {
                        return -1;
                    }
                    return 0;
                })
                .forEach((e) => (message += e.join("") + ", "));
            message = message.slice(0, -2);
        }
        if (priv) {
            LLS_SendLocal(message);
        } else {
            SendMessage(message);
        }
    }

    unload(): void {
        removeAllHooksByModule(ModuleCategory.Commands);
    }
}
