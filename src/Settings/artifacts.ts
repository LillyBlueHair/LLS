import { ArtifactSettingsModel } from "./Models/artifacts";
import { GuiSubscreen, Setting } from "./settingBase";
import { getModule } from "modules";
import { MiscModule } from "Modules/misc";

export class GuiArtifact extends GuiSubscreen {
    get name(): string {
        return "Artifacts";
    }

    get icon(): string {
        return "";
    }

    get settings(): ArtifactSettingsModel {
        return super.settings as ArtifactSettingsModel;
    }

    get multipageStructure(): Setting[][] {
        return [
            [
                <Setting>{
                    type: "checkbox",
                    label: "Enable Petsuit Collar:",
                    description: "Enables petsuit collar features.",
                    setting: () => this.settings.petsuitCollarSetting.enabled ?? false,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.enabled = val),
                    disabled: this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "colorpicker",
                    id: "petsuitCollar_buckleColor",
                    label: "Petsuit Buckle Color:",
                    description: "Sets the color of the buckles on the petsuit.",
                    setting: () => this.settings.petsuitCollarSetting.buckleColor ?? "#5AC5EE",
                    setSetting: (val) => (this.settings.petsuitCollarSetting.buckleColor = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "colorpicker",
                    id: "petsuitCollar_strapColor",
                    label: "Petsuit Strap Color:",
                    description: "Sets the color of the straps on the petsuit.",
                    setting: () => this.settings.petsuitCollarSetting.strapColor ?? "#2C2C2C",
                    setSetting: (val) => (this.settings.petsuitCollarSetting.strapColor = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "checkbox",
                    label: "Lock Owner:",
                    description: "Only allows the person that locked the collar to trigger it.",
                    setting: () => this.settings.petsuitCollarSetting.lockOwner ?? false,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.lockOwner = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "text",
                    id: "petsuitCollar_allowedMembers",
                    label: "Allowed Member IDs:",
                    description: "A list of member IDs seperated by a comma, who are allowed to use the collar.",
                    setting: () => this.settings.petsuitCollarSetting.allowedMembers ?? "",
                    setSetting: (val) => (this.settings.petsuitCollarSetting.allowedMembers = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "text",
                    id: "petsuitCollar_trigger",
                    label: "Trigger:",
                    description: "Sets the trigger word/sentence for the petsuit collar.",
                    setting: () => this.settings.petsuitCollarSetting.trigger ?? "",
                    setSetting: (val) => (this.settings.petsuitCollarSetting.trigger = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "checkbox",
                    label: "Allow Self-Trigger:",
                    description: "Allows the wearer of the collar to trigger the speech commands.",
                    setting: () => this.settings.petsuitCollarSetting.allowSelfTrigger ?? false,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.allowSelfTrigger = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "checkbox",
                    label: "Remote Access:",
                    description: "Allows other users to change the settings.",
                    setting: () => this.settings.petsuitCollarSetting.remoteAccess ?? false,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.remoteAccess = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "checkbox",
                    label: "Lockable:",
                    description: "Allows other users to lock you out of all the settings.",
                    setting: () => this.settings.petsuitCollarSetting.lockable ?? false,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.lockable = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "craftselect",
                    id: "petsuitCollar",
                    label: "Petsuit Collar",
                    slot: "ItemNeck",
                    description: "The current collar equipped.",
                    setting: () => this.settings.petsuitCollarSetting.petsuitCollar,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.petsuitCollar = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
                },
                <Setting>{
                    type: "null"
                },
            ],
            [
                <Setting>{
                    type: "checkbox",
                    label: "Catmask speech:",
                    description: "Forces the wearer to speek like a cat when wearing a cat mask.",
                    setting: () => this.settings.catSpeechEnabled ?? false,
                    setSetting: (val) => (this.settings.catSpeechEnabled = val),
                },
                <Setting>{
                    type: "checkbox",
                    label: "Cosplay Ears:",
                    description: "Enables cosplay ears features.",
                    setting: () => this.settings.cosplayEarEnabled ?? false,
                    setSetting: (val) => (this.settings.cosplayEarEnabled = val),
                },
                <Setting>{
                    type: "colorpicker",
                    id: "cosplayTailColor",
                    label: "Cosplay Tail Color:",
                    description: "Sets the color of the tail on the cosplay outfit.",
                    setting: () => this.settings.cosplayTailColor ?? "#060606",
                    setSetting: (val) => (this.settings.cosplayTailColor = val),
                    disabled: !this.settings.cosplayEarEnabled,
                },
                <Setting>{
                    type: "craftselect",
                    id: "cosplayEars",
                    label: "Cat Cosplay Mask",
                    slot: "ItemHood",
                    description: "The current mask equipped.",
                    setting: () => this.settings.cosplayEars,
                    setSetting: (val) => (this.settings.cosplayEars = val),
                    disabled: !this.settings.cosplayEarEnabled,
                },
                <Setting>{
                    type: "null"
                },
                <Setting>{
                    type: "checkbox",
                    label: "Gag Collar:",
                    description: "Enables gag collar features.",
                    setting: () => this.settings.gagCollarEnabled ?? false,
                    setSetting: (val) => (this.settings.gagCollarEnabled = val),
                },
                <Setting>{
                    type: "text",
                    id: "gagCollar_trigger",
                    label: "Gag Collar Trigger:",
                    description: "Sets the trigger word/sentence for the gag collar.",
                    setting: () => this.settings.gagCollarTrigger ?? "",
                    setSetting: (val) => (this.settings.gagCollarTrigger = val),
                    disabled: !this.settings.gagCollarEnabled,
                },
                <Setting>{
                    type: "colorpicker",
                    id: "gagCollar_color",
                    label: "Gag Collar Color:",
                    description: "Sets the color of the gag on the gag collar.",
                    setting: () => this.settings.gagCollarColor ?? "#4FD5F7",
                    setSetting: (val) => (this.settings.gagCollarColor = val),
                    disabled: !this.settings.gagCollarEnabled,
                },
                <Setting>{
                    type: "null"
                },
                <Setting>{
                    type: "craftselect",
                    id: "gagCollar",
                    label: "Gag Collar",
                    slot: "ItemNeck",
                    description: "The current collar equipped.",
                    setting: () => this.settings.gagCollar,
                    setSetting: (val) => (this.settings.gagCollar = val),
                    disabled: !this.settings.gagCollarEnabled,
                },
                <Setting>{
                    type: "null"
                },
                <Setting>{
                    type: "checkbox",
                    label: "Leash Collar:",
                    description: "Enables leash collar features.",
                    setting: () => this.settings.leashCollarEnabled ?? false,
                    setSetting: (val) => (this.settings.leashCollarEnabled = val),
                },
                <Setting>{
                    type: "text",
                    id: "leashCollar_trigger",
                    label: "Leash Collar Trigger:",
                    description: "Sets the trigger word/sentence for the leash collar.",
                    setting: () => this.settings.leashCollarTrigger ?? "",
                    setSetting: (val) => (this.settings.leashCollarTrigger = val),
                    disabled: !this.settings.leashCollarEnabled,
                },
                <Setting>{
                    type: "colorpicker",
                    id: "leashCollar_color",
                    label: "Leash Collar Color:",
                    description: "Sets the color of the leash on the leash collar.",
                    setting: () => this.settings.leashCollarColor ?? "#333333",
                    setSetting: (val) => (this.settings.leashCollarColor = val),
                    disabled: !this.settings.leashCollarEnabled,   
                },
                <Setting>{
                    type: "craftselect",
                    id: "leashCollar",
                    label: "Leash Collar",
                    slot: "ItemNeck",
                    description: "The current collar equipped.",
                    setting: () => this.settings.leashCollar,
                    setSetting: (val) => (this.settings.leashCollar = val),
                    disabled: !this.settings.leashCollarEnabled,
                },
                <Setting>{
                    type: "null"
                },
            ],[
                <Setting>{
                    type: "checkbox",
                    label: "Chastity Piercings:",
                    description: "Enables chastity piercings features.",
                    setting: () => this.settings.chastityPiercingsEnabled ?? false,
                    setSetting: (val) => (this.settings.chastityPiercingsEnabled = val),
                },
                <Setting>{
                    type: "text",
                    id: "chastityPiercing_trigger",
                    label: "Chastity Piercing Trigger:",
                    description: "Sets the trigger word/sentence for the chastity piercings.",
                    setting: () => this.settings.chastityPiercingTrigger ?? "",
                    setSetting: (val) => (this.settings.chastityPiercingTrigger = val),
                    disabled: !this.settings.chastityPiercingsEnabled,
                },
                <Setting>{
                    type: "craftselect",
                    id: "clitChastityPiercing",
                    label: "Clit Chastity Piercing",
                    slot: "ItemVulvaPiercings",
                    description: "",
                    setting: () => this.settings.clitChastityPiercing,
                    setSetting: (val) => (this.settings.clitChastityPiercing = val),
                    disabled: !this.settings.chastityPiercingsEnabled,
                },
                <Setting>{
                    type: "null"
                },
                /*<Setting>{
                    type: "craftselect",
                    id: "nippleChastityPiercing",
                    label: "Nipple Chastity Piercing",
                    slot: "ItemNipplesPiercings",
                    description: "",
                    setting: () => this.settings.nippleChastityPiercing,
                    setSetting: (val) => (this.settings.nippleChastityPiercing = val),
                    disabled: !this.settings.chastityPiercingsEnabled,                    
                },
                <Setting>{
                    type: "null"
                }*/
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
