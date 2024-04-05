import { BaseSettingsModel, CraftModel } from "./base";

export interface ArtifactSettingsModel extends ArtifactPublicSettingsModel { 
    cosplayEarEnabled: boolean;
    cosplayEars: CosplayEarModel;
    cosplayTailColor: string;
    catSpeechEnabled: boolean;
    gagCollarEnabled: boolean;
    gagCollar: GagCollarModel;
    gagCollarTrigger: string;
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

    petsuitCollar: PetsuitCollarModel;
}

export interface PetsuitCollarModel extends CraftModel {
    name: string;
    creator: number;
}

export interface GagCollarModel extends CraftModel {
    name: string;
    creator: number;
}

export interface CosplayEarModel extends CraftModel {
    name: string;
    creator: number;
}