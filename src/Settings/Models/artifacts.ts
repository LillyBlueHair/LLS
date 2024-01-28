import { BaseSettingsModel } from "./base";

export interface ArtifactSettingsModel extends ArtifactPublicSettingsModel { 
    ropeOfTightening: RopeOfTighteningModel;
}

export interface ArtifactPublicSettingsModel extends BaseSettingsModel {
    petsuitCollarSetting: PetsuitCollarSettingsModel;
    catSpeechEnabled: boolean;
}

export interface PetsuitCollarSettingsModel {
    enabled: boolean;
    remoteAccess: boolean;
    lockable: boolean;
    buckleColor: string;
    strapColor: string;
    speechEnabled: boolean;
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
    

export interface RopeOfTighteningModel {
    name: string;
    creator: number;
}