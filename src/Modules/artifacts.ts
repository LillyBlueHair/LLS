import { BaseModule } from "base";
import { GuiArtifact } from "Settings/artifacts";
import { ArtifactSettingsModel, PetsuitCollarModel, RopeOfTighteningModel } from "Settings/Models/artifacts";
import { ModuleCategory, Subscreen } from "Settings/settingDefinitions";
import { itemsToItemBundles, getDelimitedList, isPhraseInString, lockItem, onActivity, onChat,  onSentMessage, onWhisper, removeAllHooksByModule, sendAction } from "utils";

let petsuitActivated = false;
let clothesSafe: string = "";
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
            catSpeechEnabled: false,
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
                strapColor: "#2C2C2C",
                petsuitCollar: <PetsuitCollarModel>{ name: "", creator: 0 },
            },
        };
    }

    get settingsScreen(): Subscreen | null {
        return GuiArtifact;
    }

    Load(): void {
        onChat(1, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
            let collarSettings = Player.LLS?.ArtifactModule;
            if (!collarSettings || !collarSettings.petsuitCollarSetting.enabled || !collarSettings.petsuitCollarSetting.speechEnabled) return;

            if (isPhraseInString(msg.toLowerCase(), collarSettings.petsuitCollarSetting.trigger.toLowerCase()) && this.wearingPetsuitCollar(Player)) {
                if (sender?.IsPlayer() && !collarSettings.petsuitCollarSetting.allowSelfTrigger) return;
                else if (sender?.IsPlayer()) this.petsuitCollarToggle(Player);
                else if (this.isAllowedPetsuitCollarMember(sender)) {
                    this.petsuitCollarToggle(Player);
                }
            }
            return;
        });

        onWhisper(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
            let collarSettings = Player.LLS?.ArtifactModule;
            if (!collarSettings || !collarSettings.petsuitCollarSetting.enabled) return;
            else if (sender?.IsPlayer() && petsuitActivated) return;
            else if (
                msg.toLowerCase().startsWith("!petsuitcollar") &&
                (this.isAllowedPetsuitCollarMember(sender) || sender?.IsPlayer) &&
                this.wearingPetsuitCollar(Player)
            ) {
                this.petsuitCollarToggle(Player);
                return "skipBCX";
            }
            return;
        });

        onActivity(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
            if (msg == "ChatSelf-ItemArms-StruggleArms" && sender) {
                this.ropeOfTighteningAction(sender.IsPlayer() ? Player : (sender as OtherCharacter));
            }
            return;
        });

        onSentMessage(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {        
            if(data.Type === "Chat"){
                sender = sender ? sender : Player;
                this.catSpeech(data);
            }
            return;
        });
    }

    catSpeech(data: any): void {
        let catSpeech = Player.LLS?.ArtifactModule?.catSpeechEnabled;
        if(!catSpeech) return;
        if(!this.wearingCatSpeechMask(Player)) return;
        
        data.Content = data.Content.replace(/\b\S+\b/g, (str: string | any[]) => {
            if(str.length <= 3) return "mew";
            else{
                let length = str.length - 3;
                return "m" + "e".repeat(length) + "ow";
            }
        });
        return;
    }

    wearingCatSpeechMask(C: OtherCharacter | PlayerCharacter): boolean {
        var gag1 = InventoryGet(C, "ItemMouth");
        var gag2 = InventoryGet(C, "ItemMouth2");
        var gag3 = InventoryGet(C, "ItemMouth3");
        if(gag1 && (gag1.Asset.Name == "KittyHarnessPanelGag" || gag1.Asset.Name == "KittyGag" || gag1.Asset.Name == "KittyMuzzleGag")) return true;
        else if(gag2 && (gag2.Asset.Name == "KittyHarnessPanelGag" || gag2.Asset.Name == "KittyGag" || gag2.Asset.Name == "KittyMuzzleGag")) return true;
        else if(gag3 && (gag3.Asset.Name == "KittyHarnessPanelGag" || gag3.Asset.Name == "KittyGag" || gag3.Asset.Name == "KittyMuzzleGag")) return true;
        return false;
    }

    wearingPetsuitCollar(C: OtherCharacter | PlayerCharacter): boolean {
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
            sendAction("The rope around %NAME%'s arms tightens by itself, holding %POSSESSIVE% arms in place.");
            return;
        } else {
            var ropeName = rope?.Craft?.Name ?? rope?.Asset.Name ?? "";
            var ropeCreator = rope?.Craft?.MemberNumber ?? -1;
            if (ropeName == ropeSettings.ropeOfTightening.name && ropeCreator == ropeSettings.ropeOfTightening.creator) {
                sendAction("The rope around %NAME%'s arms tightens by itself, holding %POSSESSIVE% arms in place.");
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
        let strapColor = collarSettings?.petsuitCollarSetting.strapColor ?? "#2C2C2C";

        if (!buckleColor.startsWith("#")) buckleColor = "#" + buckleColor;
        if (!strapColor.startsWith("#")) strapColor = "#" + strapColor;
        InventoryWear(C, "ShinyPetSuit", "ItemArms", ["#3A3A3A", "Default", strapColor, buckleColor, "Default"], 1000, C.MemberNumber, {
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
        });
        var suit = InventoryGet(C, "ItemArms");
        if (suit && suit.Property && suit.Property.TypeRecord) suit.Property.TypeRecord.typed = 1;
        //if(suit && suit.Property) suit.Property.Hide = ["Bra", "Panties", "ItemNipples","ItemNipplesPiercings", "ItemBreasts", "Socks", "Suit", "SuitLower", "SocksLeft", "SocksRight"];
		
        clothesSafe = LZString.compressToBase64(JSON.stringify(itemsToItemBundles(C.Appearance)));

		let accessory = InventoryGet(C, "ClothAccessory");
		let socksLeft = InventoryGet(C, "SocksLeft");
		let socksRight = InventoryGet(C, "SocksRight");
		
		if (accessory && disallowedItemsPetsuit.indexOf(accessory.Asset.Name) != -1) {
			InventoryRemove(C, "ClothAccessory");
		}
		if (socksLeft) {
			InventoryRemove(C, "SocksLeft");
		}
		if (socksRight) {
			InventoryRemove(C, "SocksRight");
		}

        lockItem(C, InventoryGet(C, "ItemArms"), "PasswordPadlock");
        ChatRoomCharacterUpdate(C);

        sendAction(
            "The collar on %NAME%'s neck releases a strange black fluid, which runs over %POSSESSIVE% body, covering it in a shiny black material that forms a petsuit."
        );
        petsuitActivated = true;
    }

    petsuitCollarDeactivate(C: OtherCharacter | PlayerCharacter): void {
        InventoryRemove(C, "ItemArms");
		let items: ItemBundle[] = JSON.parse(LZString.decompressFromBase64(clothesSafe));
		console.log(items);
        items.forEach(item => {
            let asset = AssetGet(C.AssetFamily, item.Group, item.Name);
            if (!!asset) {
                let isRoomDisallowed = !InventoryChatRoomAllow(asset?.Category ?? []);
                if (isRoomDisallowed) {
                    let newItem = InventoryWear(C, item.Name, item.Group, item.Color, item.Difficulty, -1, item.Craft, false);
                    if (!!newItem) {
                        if (!!item.Property)
                            newItem.Property = item.Property;
                    }
                }
            }
        });
        ChatRoomCharacterUpdate(C);
        sendAction("The petsuit on %NAME% turns back into the black fluid and returns into %POSSESSIVE% collar.");
        petsuitActivated = false;
    }

    get allowedPetsuitCollarMembers(): number[] {
        let stringList = getDelimitedList(this.settings.petsuitCollarSetting.allowedMembers, ",");
        let memberList = stringList
            .filter((str) => !!str && +str === +str)
            .map((str) => parseInt(str))
            .filter((id) => id != Player.MemberNumber);
        return memberList;
    }

    isAllowedPetsuitCollarMember(member: Character | null): boolean {
        if (!member) return false;

        if (this.settings.petsuitCollarSetting.lockOwner == true) {
            var collar = InventoryGet(Player, "ItemNeck");
            if (collar && collar.Property && collar.Property.LockMemberNumber) {
                if (collar.Property.LockMemberNumber == member.MemberNumber) return true;
                else return false;
            }
        }

        if (this.allowedPetsuitCollarMembers.length > 0) return this.allowedPetsuitCollarMembers.indexOf(member.MemberNumber ?? 0) >= 0;
        return true;
    }

    Unload(): void {
        removeAllHooksByModule(ModuleCategory.Commands);
    }

    Safeword(): void {
        if (petsuitActivated) {
            this.petsuitCollarDeactivate(Player);
        }
    }
    validationVerifyCraftData(
        Craft: unknown,
        Asset: Asset | null
    ): {
        result: CraftingItem | undefined;
        messages: string[];
    } {
        if (Craft === undefined) {
            return {
                result: undefined,
                messages: [],
            };
        }
        const saved = console.warn;
        try {
            const messages: string[] = [];
            console.warn = (m: unknown) => {
                if (typeof m === "string") {
                    messages.push(m);
                }
            };
            const result = CraftingValidate(Craft as CraftingItem, Asset, true);
            return {
                result: result > CraftingStatusType.CRITICAL_ERROR ? (Craft as CraftingItem) : undefined,
                messages,
            };
        } catch (error) {
            saved("BCX: Failed crafted data validation because of crash:", error);
            return {
                result: undefined,
                messages: [`Validation failed: ${error}`],
            };
        } finally {
            console.warn = saved;
        }
    }
}
