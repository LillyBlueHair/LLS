export interface BaseSettingsModel {
}

export interface ModuleStats {

}

export interface GlobalSettingsModel extends GlobalPublicSettingsModel {
    enabled: boolean;    
}

export interface GlobalPublicSettingsModel extends BaseSettingsModel {
}

export interface MiscSettingsModel extends BaseSettingsModel {
    orgasmSkip: boolean;
    casinoButtons: boolean;
}

export interface CraftModel {
    name: string;
    creator: number;
}