import { BaseModule } from "base";
import { GuiArtifact } from "Settings/artifacts";
import { ArtifactSettingsModel, PetsuitCollarModel, RopeOfTighteningModel } from "Settings/Models/artifacts";
import { ModuleCategory, Subscreen } from "Settings/settingDefinitions";
import {
	GetDelimitedList,
	isPhraseInString,
	lockItem,
	OnActivity,
	OnChat,
	OnWhisper,
	removeAllHooksByModule,
	SendAction,
} from "utils";

let petsuitActivated = false;
let clothesSafe: Item[] = [];
let disallowedItemsPetsuit: string[] = [
	"Bib",
	"LargeBelt",
	"Camera1",
	"FrillyApron",
	"FurBolero",
	"LeatherStraps",
	"Scarf",
	"StudentOutfit3Bow1",
	"StudentOutfit3Bow2",
	"StudentOutfit3Bow3",
	"StudentOutfit3Scarf",
];

export class ArtifactModule extends BaseModule {
	get settingsStorage(): string | null {
		return "ArtifactModule";
	}

	get settings(): ArtifactSettingsModel {
		return super.settings as ArtifactSettingsModel;
	}

	get defaultSettings(): ArtifactSettingsModel | null {
		return <ArtifactSettingsModel>{
			ropeOfTighteningEnabled: false,
			publicRopeOfTighteningEnabled: false,
			ropeOfTightening: <RopeOfTighteningModel>{},
			petsuitCollarSetting: {
				enabled: false,
				remoteAccess: false,
				lockable: false,
				speechEnabled: false,
				trigger: "",
				allowedMembers: "",
				allowSelfTrigger: false,
				lockOwner: false,
				locked: false,
				buckleColor: "#5AC5EE",
				petsuitCollar: <PetsuitCollarModel>{ name: "", creator: 0 },
			},
		};
	}

	get settingsScreen(): Subscreen | null {
		return GuiArtifact;
	}

	load(): void {
		OnChat(1, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
			let collarSettings = Player.LLS?.ArtifactModule;
			if (
				!collarSettings ||
				!collarSettings.petsuitCollarSetting.enabled ||
				!collarSettings.petsuitCollarSetting.speechEnabled
			)
				return;

			if (
				isPhraseInString(
					msg.toLowerCase(),
					collarSettings.petsuitCollarSetting.trigger.toLowerCase()
				) &&
				this.WearingPetsuitCollar(Player)
			) {
				if (sender?.IsPlayer() && !collarSettings.petsuitCollarSetting.allowSelfTrigger) return;
				else if (sender?.IsPlayer()) this.petsuitCollarToggle(Player);
				else if (this.AllowedPetsuitCollarMember(sender)) {
					this.petsuitCollarToggle(Player);
				}
			}
		});

		OnWhisper(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
			let collarSettings = Player.LLS?.ArtifactModule;
			if (!collarSettings || !collarSettings.petsuitCollarSetting.enabled) return;
			else if (sender?.IsPlayer() && petsuitActivated) return;
			else if (
				msg.toLowerCase().startsWith("!petsuitcollar") &&
				(this.AllowedPetsuitCollarMember(sender) || sender?.IsPlayer) &&
				this.WearingPetsuitCollar(Player)
			) {
				this.petsuitCollarToggle(Player);
				return "skipBCX";
			}
			return;
		});

		OnActivity(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
			if (msg == "ChatSelf-ItemArms-StruggleArms" && sender) {
				this.ropeOfTighteningAction(sender.IsPlayer() ? Player : (sender as OtherCharacter));
			}
		});
	}

	WearingPetsuitCollar(C: OtherCharacter | PlayerCharacter) {
		var collar = InventoryGet(C, "ItemNeck");
		let collarSettings = C.LLS?.ArtifactModule;
		if (!collar || !collarSettings || !collarSettings.petsuitCollarSetting.enabled) return false;

		if (!collarSettings || !collarSettings.petsuitCollarSetting.petsuitCollar.name) return true;

		// If configured collar is not crafted, let any inherited collar work.
		if (!collarSettings.petsuitCollarSetting.petsuitCollar.creator) {
			return collar?.Asset.Name == collarSettings.petsuitCollarSetting.petsuitCollar.name;
		} else {
			var collarName = collar?.Craft?.Name ?? collar?.Asset.Name ?? "";
			var collarCreator = collar?.Craft?.MemberNumber ?? -1;
			return (
				collarName == collarSettings.petsuitCollarSetting.petsuitCollar.name &&
				collarCreator == collarSettings.petsuitCollarSetting.petsuitCollar.creator
			);
		}
	}

	ropeOfTighteningAction(C: OtherCharacter | PlayerCharacter): void {
		var rope = InventoryGet(C, "ItemArms");
		let ropeSettings = C.LLS?.ArtifactModule;
		return;

		if (!ropeSettings || !ropeSettings.ropeOfTightening.name) return;

		// If configured rope is not crafted, let any inherited rope work.
		if (!ropeSettings.ropeOfTightening.creator) {
			SendAction("The rope around %NAME%'s arms tightens by itself, holding %POSSESSIVE% arms in place.");
			return;
		} else {
			var ropeName = rope?.Craft?.Name ?? rope?.Asset.Name ?? "";
			var ropeCreator = rope?.Craft?.MemberNumber ?? -1;
			if (
				ropeName == ropeSettings.ropeOfTightening.name &&
				ropeCreator == ropeSettings.ropeOfTightening.creator
			) {
				SendAction("The rope around %NAME%'s arms tightens by itself, holding %POSSESSIVE% arms in place.");
				return;
			}
		}
	}

	petsuitCollarToggle(C: OtherCharacter | PlayerCharacter): void {
		if (petsuitActivated) {
			this.petsuitCollarDeactivate(C);
		} else {
			this.petsuitCollarActivate(C);
		}
	}

	petsuitCollarActivate(C: OtherCharacter | PlayerCharacter): void {
		let collarSettings = C.LLS?.ArtifactModule;
		let buckleColor = collarSettings?.petsuitCollarSetting.buckleColor ?? "#5AC5EE";
		if (!buckleColor.startsWith("#")) buckleColor = "#" + buckleColor;
		InventoryWear(
			C,
			"ShinyPetSuit",
			"ItemArms",
			["#3A3A3A", "Default", "#2C2C2C", buckleColor, "Default"],
			1000,
			C.MemberNumber,
			{
				Item: "ShinyPetSuit",
				ItemProperty: {},
				Property: "Comfy",
				Lock: "",
				Name: "Pet Collar Petsuit",
				Description: `A Petsuit which has extended from the collar to cover the entire body. Whisper \"!petsuitcollar\" to ${
					C.Nickname == "" ? C.Name : C.Nickname
				} to deactivate.`,
				Color: "#3A3A3A,Default,#2C2C2C,#5AC5EE,Default",
				Private: true,
				Type: "Closed",
				OverridePriority: 532328,
				MemberNumber: C.MemberNumber,
				MemberName: C.Name,
				TypeRecord: {
					typed: 1,
				},
			}
		);
		var suit = InventoryGet(Player, "ItemArms");
		if (suit && suit.Property && suit.Property.TypeRecord) suit.Property.TypeRecord.typed = 1;
		//if(suit && suit.Property) suit.Property.Hide = ["Bra", "Panties", "ItemNipples","ItemNipplesPiercings", "ItemBreasts", "Socks", "Suit", "SuitLower", "SocksLeft", "SocksRight"];

		clothesSafe.splice(0);

		let socksLeft = InventoryGet(Player, "SocksLeft");
		let socksRight = InventoryGet(Player, "SocksRight");
		let accessory = InventoryGet(Player, "ClothAccessory");
		if (accessory && disallowedItemsPetsuit.indexOf(accessory.Asset.Name) != -1) {
			clothesSafe.push(accessory);
			InventoryRemove(C, "ClothAccessory");
		}

		if (socksLeft) {
			clothesSafe.push(socksLeft);
			InventoryRemove(C, "SocksLeft");
		}
		if (socksRight) {
			clothesSafe.push(socksRight);
			InventoryRemove(C, "SocksRight");
		}

		lockItem(Player, InventoryGet(Player, "ItemArms"), "PasswordPadlock");
		ChatRoomCharacterUpdate(C);

		SendAction(
			"The collar on %NAME%'s neck releases a strange black fluid, which runs over %POSSESSIVE% body, covering it in a shiny black material that forms a petsuit."
		);
		petsuitActivated = true;
	}

	petsuitCollarDeactivate(C: OtherCharacter | PlayerCharacter): void {
		InventoryRemove(C, "ItemArms");
		for (let i = 0; i < clothesSafe.length; i++) {
			if (clothesSafe[i]) {
				InventoryWear(C, clothesSafe[i].Asset.Name, clothesSafe[i].Asset.Group.Name, clothesSafe[i].Color);
			}
		}
		ChatRoomCharacterUpdate(C);
		SendAction("The petsuit on %NAME% turns back into a black fluid and returns into %POSSESSIVE% collar.");
		petsuitActivated = false;
	}

	get allowedPetsuitCollarMembers(): number[] {
		let stringList = GetDelimitedList(this.settings.petsuitCollarSetting.allowedMembers, ",");
		let memberList = stringList
			.filter((str) => !!str && +str === +str)
			.map((str) => parseInt(str))
			.filter((id) => id != Player.MemberNumber);
		return memberList;
	}

	AllowedPetsuitCollarMember(member: Character | null): boolean {
		if (!member) return false;

		if (this.settings.petsuitCollarSetting.lockOwner == true) {
			var collar = InventoryGet(Player, "ItemNeck");
			if (collar && collar.Property && collar.Property.LockMemberNumber) {
				if (collar.Property.LockMemberNumber == member.MemberNumber) return true;
				else return false;
			}
		}

		if (this.allowedPetsuitCollarMembers.length > 0)
			return this.allowedPetsuitCollarMembers.indexOf(member.MemberNumber ?? 0) >= 0;
		return false;
	}

	unload(): void {
		removeAllHooksByModule(ModuleCategory.Commands);
	}

	safeword(): void {
		if (petsuitActivated) {
			this.petsuitCollarDeactivate(Player);
		}
	}
}
