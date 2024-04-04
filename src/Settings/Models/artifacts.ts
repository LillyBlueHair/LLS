import { BaseSettingsModel } from "./base";

export interface ArtifactSettingsModel extends ArtifactPublicSettingsModel { 
    cosplayEarEnabled: boolean;
    catSpeechEnabled: boolean;
    cosplayEars: CosplayEarSettingsModel;
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

export interface PetsuitCollarModel  {
    name: string;
    creator: number;
}

export interface CosplayEarSettingsModel {
    name: string;
    creator: number;
}
 
/*export interface CosplayEarSettingsModel {
}*/