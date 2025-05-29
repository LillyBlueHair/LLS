import { BaseSettingsModel, CraftModel } from "./base";

export interface SavingSettingsModel extends SavingPublicSettingsModel { 
    csv: boolean;
    sortBeepsByMemberNumber: boolean;
    delimitor: string;
}

export interface SavingPublicSettingsModel extends BaseSettingsModel {
}