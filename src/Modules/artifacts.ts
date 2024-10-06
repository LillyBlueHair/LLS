import { BaseModule } from "base";
import { GuiArtifact } from "Settings/artifacts";
import { ArtifactSettingsModel } from "Settings/Models/artifacts";
import { CraftModel } from "Settings/Models/base";
import { ModuleCategory, Subscreen } from "Settings/settingDefinitions";
import {
    itemsToItemBundles,
    getDelimitedList,
    isPhraseInString,
    lockItem,
    onActivity,
    onChat,
    onSentMessage,
    removeAllHooksByModule,
    sendAction,
    onAction,
} from "utils";

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
                petsuitCollar: <CraftModel>{ name: "", creator: 0 },
            },
            cosplayEarEnabled: false,
            cosplayEars: <CraftModel>{ name: "", creator: 0 },
            cosplayTailColor: "#060606",
            gagCollarEnabled: false,
            gagCollar: <CraftModel>{ name: "", creator: 0 },
            gagCollarTrigger: "",
            gagCollarColor: "#4FD5F7",

            leashCollarEnabled: false,
            leashCollar: <CraftModel>{ name: "", creator: 0 },
            leashCollarTrigger: "",
            leashCollarColor: "#333333",

            chastityPiercingsEnabled: false,
            clitChastityPiercing: <CraftModel>{ name: "", creator: 0 },
            nippleChastityPiercing: <CraftModel>{ name: "", creator: 0 },
            chastityPiercingTrigger: "",
        };
    }

    get settingsScreen(): Subscreen | null {
        return GuiArtifact;
    }

    get Enabled(): boolean {
        return super.Enabled;
    }

    Load(): void {
        onChat(100, ModuleCategory.Artifacts, false, true, (data, sender, msg, metadata) => {
            if(!this.Enabled) return;
            let artifactSettings = this.settings;
            if (artifactSettings && artifactSettings.petsuitCollarSetting.enabled) {
                if (
                    artifactSettings.petsuitCollarSetting.trigger.trim() != "" &&
                    isPhraseInString(msg.toLowerCase(), artifactSettings.petsuitCollarSetting.trigger.toLowerCase(), false) &&
                    this.wearingPetsuitCollar(Player)
                ) {
                    if (sender?.IsPlayer() && !artifactSettings.petsuitCollarSetting.allowSelfTrigger) {}
                    else if (sender?.IsPlayer()) this.petsuitCollarToggle(Player);
                    else if (this.isAllowedPetsuitCollarMember(sender)) {
                        this.petsuitCollarToggle(Player);
                    }
                }
            }
            if (artifactSettings.gagCollarEnabled && this.wearingGagCollar(Player)) {
                if (artifactSettings.gagCollarTrigger.trim() != "" && isPhraseInString(msg.toLowerCase(), artifactSettings.gagCollarTrigger.toLowerCase(), false)) {
                    this.toggleGagCollar(Player);
                }
            }
            if (artifactSettings.leashCollarEnabled && this.wearingLeashCollar(Player)) {
                if (artifactSettings.leashCollarTrigger.trim() != "" && isPhraseInString(msg.toLowerCase(), artifactSettings.leashCollarTrigger.toLowerCase(), false)) {
                    this.toggleLeashCollar(Player);
                }
            }
            if (artifactSettings.chastityPiercingsEnabled && artifactSettings.chastityPiercingTrigger.trim() != "" && isPhraseInString(msg.toLowerCase(), artifactSettings.chastityPiercingTrigger.toLowerCase(), false)) {
                if (this.wearingClitChastityPiercing(Player)) {
                    this.toggleClitChastityPiercing(Player);
                }
                /*if (this.wearingNippleChastityPiercing(Player)) {
                    this.toggleNippleChastityPiercing(Player);
                }*/
            }
            return;
        });

        onActivity(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {});

        onAction(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
            if(!this.Enabled) return;

            if (msg == "ItemHoodHarnessCatMaskSetEars") {
                this.activateCosplayTail(Player);
            } else if (msg == "ItemHoodHarnessCatMaskSetNoEars") {
                this.deactivateCosplayTail(Player);
            }
            return;
        });

        onSentMessage(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
            if(!this.Enabled) return;
            if (data.Type === "Chat") {
                sender = sender ? sender : Player;
                this.catSpeech(data);
            }
            return;
        });
    }

    // Chastity Piercings
    wearingClitChastityPiercing(C: OtherCharacter | PlayerCharacter): boolean {
        let piercing = InventoryGet(C, "ItemVulvaPiercings");
        if (!piercing) return false;
        let piercingName = piercing?.Craft?.Name ?? "";
        let piercingCreator = piercing?.Craft?.MemberNumber ?? -1;
        return piercingName == this.settings.clitChastityPiercing.name && piercingCreator == this.settings.clitChastityPiercing.creator;

    }

    toggleClitChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
        let bra = InventoryGet(C, "ItemPelvis");
        if (bra) {
            this.deactivateClitChastityPiercing(C);
        } else {
            this.activateClitChastityPiercing(C);
        }
    }

    activateClitChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
        InventoryWear(C, "PolishedChastityBelt", "ItemPelvis", "Default");
        lockItem(C, InventoryGet(C, "ItemPelvis"), "PasswordPadlock");
        sendAction("Chastity belt activate - TODO")
        ChatRoomCharacterUpdate(C);
    }

    deactivateClitChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
        InventoryRemove(C, "ItemPelvis");
        sendAction("Chastity belt deactivate - TODO");
        ChatRoomCharacterUpdate(C);
    }

    /*wearingNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): boolean {
        let piercing = InventoryGet(C, "ItemNipplesPiercings");
        if (!piercing) return false;
        let piercingName = piercing?.Craft?.Name ?? "";
        let piercingCreator = piercing?.Craft?.MemberNumber ?? -1;
        return piercingName == this.settings.nippleChastityPiercing.name && piercingCreator == this.settings.nippleChastityPiercing.creator;
    }

    toggleNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
        let belt = InventoryGet(C, "ItemBreast");
        if (belt){
            this.deactivateNippleChastityPiercing(C);
        }else{
            this.activateNippleChastityPiercing(C);
        }
    }

    activateNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
        InventoryWear(C, "PolishedChastityBra", "ItemBreast", "Default");
        lockItem(C, InventoryGet(C, "ItemBreast"), "PasswordPadlock");
        sendAction("Chastity bra activate - TODO")
        ChatRoomCharacterUpdate(C);
    }

    deactivateNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
        InventoryRemove(C, "ItemBreast");
        sendAction("Chastity bra deactivate - TODO");
        ChatRoomCharacterUpdate(C);
    }*/

    // Leash Collar
    wearingLeashCollar(C: OtherCharacter | PlayerCharacter): boolean {
        let collar = InventoryGet(C, "ItemNeck");
        if (!collar) return false;
        let collarName = collar?.Craft?.Name ?? "";
        let collarCreator = collar?.Craft?.MemberNumber ?? -1;
        return collarName == this.settings.leashCollar.name && collarCreator == this.settings.leashCollar.creator;
    }

    toggleLeashCollar(C: OtherCharacter | PlayerCharacter): void {
        let leash = InventoryGet(C, "ItemNeckRestraints");
        if (leash) {
            this.deactivateLeashCollar(C);
        } else {
            this.activateLeashCollar(C);
        }
    }

    activateLeashCollar(C: OtherCharacter | PlayerCharacter): void {
        let color = this.settings.leashCollarColor;
        if (!color.startsWith("#")) color = "#" + color;
        InventoryWear(C, "CollarLeash", "ItemNeckRestraints", color);
        lockItem(C, InventoryGet(C, "ItemNeckRestraints"), "PasswordPadlock");
        sendAction("A leash extends from %NAME%'s collar, ready to be used.");
        ChatRoomCharacterUpdate(C);
    }

    deactivateLeashCollar(C: OtherCharacter | PlayerCharacter): void {
        InventoryRemove(C, "ItemNeckRestraints");
        sendAction("The leash retracts back into %NAME%'s collar.");
        ChatRoomCharacterUpdate(C);
    }

    // Gag collar

    wearingGagCollar(C: OtherCharacter | PlayerCharacter): boolean {
        let collar = InventoryGet(C, "ItemNeck");
        if (!collar) return false;
        let collarName = collar?.Craft?.Name ?? "";
        let collarCreator = collar?.Craft?.MemberNumber ?? -1;
        return collarName == this.settings.gagCollar.name && collarCreator == this.settings.gagCollar.creator;
    }

    toggleGagCollar(C: OtherCharacter | PlayerCharacter): void {
        if (InventoryGet(C, "ItemMouth2")) {
            this.deactivateGagCollar(C);
        } else {
            this.activateGagCollar(C);
        }
    }

    activateGagCollar(C: OtherCharacter | PlayerCharacter): void {
        let color = this.settings.gagCollarColor;
        if (!color.startsWith("#")) color = "#" + color;
        InventoryWear(C, "BallGag", "ItemMouth2", color);
        let gag = InventoryGet(C, "ItemMouth2");
        if (gag && gag.Property && gag.Property.TypeRecord) gag.Property.TypeRecord.typed = 2;
        lockItem(C, InventoryGet(C, "ItemMouth2"), "PasswordPadlock");
        sendAction("A gag extends from %NAME%'s collar, spreading %POSSESSIVE% lips and muffling %POSSESSIVE% words.");
        ChatRoomCharacterUpdate(C);
    }

    deactivateGagCollar(C: OtherCharacter | PlayerCharacter): void {
        InventoryRemove(C, "ItemMouth2");
        sendAction("The gag retracts back into %NAME%'s collar.");
        ChatRoomCharacterUpdate(C);
    }

    //Cosplay Ears + Tail

    wearingCosplayEars(C: OtherCharacter | PlayerCharacter): boolean {
        let ears = InventoryGet(C, "ItemHood");
        let earSetting = this.settings.cosplayEars;
        let enabled = this.settings.cosplayEarEnabled;
        if (!ears || !enabled || !earSetting) return false;
        if (!earSetting.creator) {
            return ears.Asset.Name != "HarnessCatMask";
        } else {
            let collarName = ears.Craft?.Name ?? ears?.Asset.Name ?? "";
            let collarCreator = ears?.Craft?.MemberNumber ?? -1;
            return collarName == earSetting.name && collarCreator == earSetting.creator;
        }
    }

    activateCosplayTail(C: OtherCharacter | PlayerCharacter) {
        if (!this.wearingCosplayEars(C)) return;
        let color = this.settings.cosplayTailColor;
        if (!color.startsWith("#")) color = "#" + color;
        InventoryWear(C, "KittenTailStrap1", "TailStraps", color);
        ChatRoomCharacterUpdate(C);
    }

    deactivateCosplayTail(C: OtherCharacter | PlayerCharacter) {
        if (!this.wearingCosplayEars(C)) return;
        InventoryRemove(C, "TailStraps");
        ChatRoomCharacterUpdate(C);
    }

    // Cat Speech Mask

    catSpeech(data: any): void {
        let catSpeech = this.settings.catSpeechEnabled;
        if (!catSpeech) return;
        if (!this.wearingCatSpeechMask(Player)) return;

        data.Content = data.Content.replace(/\b\S+\b/g, (str: string | any[]) => {
            if (str.length <= 3) return "mew";
            else {
                let length = str.length - 3;
                return "m" + "e".repeat(length) + "ow";
            }
        });
        return;
    }

    wearingCatSpeechMask(C: OtherCharacter | PlayerCharacter): boolean {
        let gag1 = InventoryGet(C, "ItemMouth");
        let gag2 = InventoryGet(C, "ItemMouth2");
        let gag3 = InventoryGet(C, "ItemMouth3");
        if (gag1 && (gag1.Asset.Name == "KittyHarnessPanelGag" || gag1.Asset.Name == "KittyGag" || gag1.Asset.Name == "KittyMuzzleGag")) return true;
        else if (gag2 && (gag2.Asset.Name == "KittyHarnessPanelGag" || gag2.Asset.Name == "KittyGag" || gag2.Asset.Name == "KittyMuzzleGag")) return true;
        else if (gag3 && (gag3.Asset.Name == "KittyHarnessPanelGag" || gag3.Asset.Name == "KittyGag" || gag3.Asset.Name == "KittyMuzzleGag")) return true;
        return false;
    }

    // Petsuit Collar

    wearingPetsuitCollar(C: OtherCharacter | PlayerCharacter): boolean {
        let collar = InventoryGet(C, "ItemNeck");
        let collarSettings = this.settings.petsuitCollarSetting;
        if (!collar || !collarSettings || !collarSettings.enabled) return false;

        if (!collarSettings.petsuitCollar.name) return true;

        // If configured collar is not crafted, let any inherited collar work.
        if (!collarSettings.petsuitCollar.creator) {
            return collar?.Asset.Name == collarSettings.petsuitCollar.name;
        } else {
            let collarName = collar?.Craft?.Name ?? collar?.Asset.Name ?? "";
            let collarCreator = collar?.Craft?.MemberNumber ?? -1;
            return collarName == collarSettings.petsuitCollar.name && collarCreator == collarSettings.petsuitCollar.creator;
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
        let collarSettings = this.settings.petsuitCollarSetting;
        let buckleColor = collarSettings?.buckleColor ?? "#5AC5EE";
        let strapColor = collarSettings?.strapColor ?? "#2C2C2C";

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
        let suit = InventoryGet(C, "ItemArms");
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
        items.forEach((item) => {
            let asset = AssetGet(C.AssetFamily, item.Group, item.Name);
            if (!!asset) {
                let isRoomDisallowed = !InventoryChatRoomAllow(asset?.Category ?? []);
                if (isRoomDisallowed) {
                    let newItem = InventoryWear(C, item.Name, item.Group, item.Color, item.Difficulty, -1, item.Craft, false);
                    if (!!newItem) {
                        if (!!item.Property) newItem.Property = item.Property;
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
            let collar = InventoryGet(Player, "ItemNeck");
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
