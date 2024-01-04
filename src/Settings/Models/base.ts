export interface BaseSettingsModel {
}

export interface ModuleStats {

}

export interface GlobalSettingsModel extends GlobalPublicSettingsModel {
}

export interface GlobalPublicSettingsModel extends BaseSettingsModel {
}

export interface MiscSettingsModel extends BaseSettingsModel {
    orgasmSkip: boolean;
}