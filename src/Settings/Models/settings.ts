import {
	ArtifactSettingsModel,
	PetsuitCollarModel,
	PetsuitCollarSettingModel,
	RopeOfTighteningModel,
} from "./artifacts";
import { BaseSettingsModel, GlobalPublicSettingsModel, GlobalSettingsModel, MiscSettingsModel } from "./base";

export interface ISettingsModel {
	Version: string;
	RethrowExceptions: boolean;
	GlobalModule: GlobalSettingsModel;
	MiscModule: MiscSettingsModel;
	ArtifactModule: ArtifactSettingsModel;
}

export interface IPublicSettingsModel extends BaseSettingsModel {
	Version: string;
	GlobalModule: GlobalSettingsModel;
	MiscModule: BaseSettingsModel;
	ArtifactModule: ArtifactSettingsModel;
}

/*export class SettingsModel implements ISettingsModel {
	Version: string = LLS_VERSION;
	RethrowExceptions: boolean = false;
	GlobalModule: GlobalSettingsModel = <GlobalSettingsModel>{};
	MiscModule: MiscSettingsModel = <MiscSettingsModel>{};
	ArtifactModule: ArtifactSettingsModel = <ArtifactSettingsModel>{
		ropeOfTighteningEnabled: false,
		publicRopeOfTighteningEnabled: false,
		ropeOfTightening: <RopeOfTighteningModel>{},
		petsuitCollarSetting: <PetsuitCollarSettingModel>{
			enabled: false,
			petsuitCollarEnabled: false,
			petsuitCollarRemoteAccess: false,
			petsuitCollarLockable: false,
			petsuitCollarSpeechEnabled: false,
			petsuitCollarTrigger: "",
			petsuitCollarAllowedMembers: "",
			petsuitCollarAllowSelfTrigger: false,
			petsuitCollarLockOwner: false,
			petsuitCollarLocked: false,
			petsuitCollarBuckleColor: "",
			petsuitCollar: <PetsuitCollarModel>{ name: "", creator: 0 },
			ropeOfTighteningEnabled: false,
			publicRopeOfTighteningEnabled: false,
			ropeOfTightening: <RopeOfTighteningModel>{ name: "", creator: 0 },
		},
	};
}*/

export class PublicSettingsModel implements IPublicSettingsModel {
	Version: string = LLS_VERSION;
	GlobalModule: GlobalPublicSettingsModel = <GlobalPublicSettingsModel>{};
	MiscModule: BaseSettingsModel = <BaseSettingsModel>{ enabled: false };
	ArtifactModule: ArtifactSettingsModel = <ArtifactSettingsModel>{
		ropeOfTighteningEnabled: false,
		publicRopeOfTighteningEnabled: false,
		ropeOfTightening: <RopeOfTighteningModel>{},
		petsuitCollarSetting: <PetsuitCollarSettingModel>{
			enabled: false,
			remoteAccess: false,
			lockable: false,
			speechEnabled: false,
			trigger: "",
			allowedMembers: "",
			allowSelfTrigger: false,
			lockOwner: false,
			locked: false,
			buckleColor: "",
			petsuitCollar: <PetsuitCollarModel>{ name: "", creator: 0 },
			ropeOfTighteningEnabled: false,
			publicRopeOfTighteningEnabled: false,
			ropeOfTightening: <RopeOfTighteningModel>{ name: "", creator: 0 },
		},
	};
}
