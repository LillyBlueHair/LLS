import { BaseSettingsModel } from "./base";

export interface ArtifactSettingsModel extends ArtifactPublicSettingsModel { 

    ropeOfTighteningEnabled: boolean;
    publicRopeOfTighteningEnabled: boolean;

    ropeOfTightening: RopeOfTighteningModel;
}

export interface ArtifactPublicSettingsModel extends BaseSettingsModel {
    petsuitCollarSetting: PetsuitCollarSettingModel;
}

export interface PetsuitCollarSettingModel {
    enabled: boolean;
    remoteAccess: boolean;
    lockable: boolean;
    buckleColor: string;
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