import { ArtifactSettingsModel, CosplayEarModel, GagCollarModel, PetsuitCollarModel } from "./Models/artifacts";
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
                    label: "Allow Self-Speechtrigger:",
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
                    setSetting: (val) => (this.settings.petsuitCollarSetting.petsuitCollar = <PetsuitCollarModel>{ name: val.name, creator: val.creator }),
                    disabled: !this.settings.petsuitCollarSetting.enabled,
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
                    setSetting: (val) => (this.settings.cosplayEars = <CosplayEarModel>{ name: val.name, creator: val.creator }),
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
                    label: "Trigger:",
                    description: "Sets the trigger word/sentence for the gag collar.",
                    setting: () => this.settings.gagCollarTrigger ?? "",
                    setSetting: (val) => (this.settings.gagCollarTrigger = val),
                    disabled: !this.settings.gagCollarEnabled,
                },
                <Setting>{
                    type: "craftselect",
                    id: "gagCollar",
                    label: "Gag Collar",
                    slot: "ItemNeck",
                    description: "The current collar equipped.",
                    setting: () => this.settings.gagCollar,
                    setSetting: (val) => (this.settings.gagCollar = <GagCollarModel>{ name: val.name, creator: val.creator }),
                    disabled: !this.settings.gagCollarEnabled,
                },
                <Setting>{
                    type: "null"
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
