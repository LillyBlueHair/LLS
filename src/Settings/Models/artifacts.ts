import { BaseSettingsModel, CraftModel } from "./base";

export interface ArtifactSettingsModel extends ArtifactPublicSettingsModel { 
    cosplayEarEnabled: boolean;
    cosplayEars: CraftModel;
    cosplayTailColor: string;
    catSpeechEnabled: boolean;

    gagCollarEnabled: boolean;
    gagCollar: CraftModel;
    gagCollarTrigger: string;

    leashCollarEnabled: boolean;
    leashCollar: CraftModel;
    leashCollarTrigger: string;
}

export interface ArtifactPublicSettingsModel extends BaseSettingsModel {
    petsuitCollarSetting: PetsuitCollarSettingsModel;
}

export interface PetsuitCollarSettingsModel {
    enabled: boolean;
    remoteAccess: boolean;
    lockable: boolean;
    buckleColor: string;
    strapColor: string;
    trigger: string;
    allowedMembers: string;
    allowSelfTrigger: boolean;
    lockOwner: boolean;
    locked: boolean;

    petsuitCollar: CraftModel;
}