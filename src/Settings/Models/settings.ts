import {
	ArtifactSettingsModel,
	ArtifactPublicSettingsModel,
	PetsuitCollarSettingsModel,
} from "./artifacts";
import { BaseSettingsModel, CraftModel, GlobalSettingsModel, MiscSettingsModel } from "./base";

export interface ISettingsModel {
	Version: string;
	RethrowExceptions: boolean;
	GlobalModule: GlobalSettingsModel;
	MiscModule: MiscSettingsModel;
	ArtifactModule: ArtifactSettingsModel;
}

export interface IPublicSettingsModel extends BaseSettingsModel {
	Version: string;
	ArtifactModule: ArtifactPublicSettingsModel;
}

export class SettingsModel implements ISettingsModel {
	Version: string = LLS_VERSION;
	RethrowExceptions: boolean = false;
	GlobalModule: GlobalSettingsModel = <GlobalSettingsModel>{};
	MiscModule: MiscSettingsModel = <MiscSettingsModel>{};
	ArtifactModule: ArtifactSettingsModel = <ArtifactSettingsModel>{
		petsuitCollarSetting: <PetsuitCollarSettingsModel>{
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
			strapColor: "",
			petsuitCollar: <CraftModel>{ name: "", creator: 0 },
		},
		
		cosplayEarEnabled: false,
		cosplayEars: <CraftModel>{ name: "", creator: 0 },
		cosplayTailColor: "",
		catSpeechEnabled: false,

		gagCollarEnabled: false,
		gagCollar: <CraftModel>{ name: "", creator: 0 },
		gagCollarTrigger: "",
		gagCollarColor: "",
	
		leashCollarEnabled: false,
		leashCollar: <CraftModel>{ name: "", creator: 0 },
		leashCollarTrigger: "",
		leashCollarColor: "",
	
		chastityPiercingsEnabled: false,
		clitChastityPiercing: <CraftModel>{ name: "", creator: 0 },
		//nippleChastityPiercing: <CraftModel>{ name: "", creator: 0 },
		chastityPiercingTrigger: "",
	};
}

export class PublicSettingsModel implements IPublicSettingsModel {
	enabled: boolean = true;
	Version: string = LLS_VERSION;
	ArtifactModule: ArtifactPublicSettingsModel = <ArtifactPublicSettingsModel>{
		catSpeechEnabled: false,
		petsuitCollarSetting: <PetsuitCollarSettingsModel>{
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
			strapColor: "",
			petsuitCollar: <CraftModel>{ name: "", creator: 0 }
		},
		cosplayEarEnabled: false,
	};
}
