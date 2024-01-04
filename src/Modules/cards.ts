import { BaseModule } from "base";
import { SendMessage, shuffleArray, getCharacterName, SendActivityMessage, getCharacterNumber, LLS_SendLocal, removeAllHooksByModule } from "../utils";
import { ModuleCategory } from "Settings/settingDefinitions";

let cardDeck: string[] = [];
let dealersLog: Map<number, string> = new Map;

export class CardsModule extends BaseModule {
	shuffleDeck() {
		cardDeck = [];
		dealersLog.clear();
		const cardSuits = ["♥", "♦", "♠", "♣"];
		const cardRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

		cardSuits.forEach((suit) => {
			cardRanks.forEach((rank) => {
				cardDeck.push(rank + suit);
			});
		});
		shuffleArray(cardDeck);
		SendActivityMessage(
			`The dealer took the remaining ${cardDeck.length} cards from the deck and shuffled all cards for a new deck.`
		);
	}

	dealCard(target: number | null) {
		console.log(target);
		if (cardDeck.length === 0) {
			this.shuffleDeck();
		}
		const card = cardDeck.pop();
		if(!card) return;
		if (target) {
			SendActivityMessage(`The dealer dealt you this card face down: ${card}`, target);
			if(dealersLog.has(target)){
				dealersLog.set(target, dealersLog.get(target) + ", " +card);
			}else{
				dealersLog.set(target, card);
			}
		} else {
			SendActivityMessage(`The dealer openly drew this card face up: ${card}`, target);
		}
	}

	dealCards(numberOfCards: number, targets?: number[]){
		for (const target of targets ?? [null]){
			for (let i = 0; i < numberOfCards; i++){
				this.dealCard(target);
			}
		}
	}

	printLog(priv: boolean){
		let message: string = "";
		for(let [key, value] of dealersLog){
			message = message.concat("\n", getCharacterName(key,"unknown"), ": ",value);
		}
		if(priv){
			LLS_SendLocal(message);
		}else{
			SendMessage(message);
		}
	}

	unload(): void {
        removeAllHooksByModule(ModuleCategory.Commands);
    }
}
