import { RemoteGuiSubscreen } from "./remoteBase";
import { Setting } from "Settings/settingBase";
import { getDelimitedList } from "utils";
import { ArtifactPublicSettingsModel } from "Settings/Models/artifacts";
import { CraftModel } from "Settings/Models/base";

export class RemotePetsuitCollar extends RemoteGuiSubscreen {
	subscreens: RemoteGuiSubscreen[] = [];

	get name(): string {
		return "Petsuit Collar";
	}

	get allowedMemberIds(): number[] {
		let idList =
			getDelimitedList(this.settings.petsuitCollarSetting.allowedMembers)
				.map((id) => +id)
				.filter((id) => id > 0) ?? [];
		if (this.settings.petsuitCollarSetting.petsuitCollar && this.settings.petsuitCollarSetting.petsuitCollar.creator > 0)
			idList.push(this.settings.petsuitCollarSetting.petsuitCollar.creator);
		let collar = InventoryGet(this.Character, "ItemNeck");
		if(this.settings.petsuitCollarSetting.lockOwner && collar && collar.Property && collar.Property.LockMemberNumber)
			idList.push(collar.Property.LockMemberNumber as number);
		if(idList.includes(this.Character.MemberNumber as number))
			idList.splice(idList.indexOf(this.Character.MemberNumber as number), 1);
		return idList;
	}

	get disabledReason(): string {
		var memberIdIsAllowed = ServerChatRoomGetAllowItem(Player, this.Character);
		if (this.allowedMemberIds.length > 0)
			memberIdIsAllowed = this.allowedMemberIds.indexOf(Player.MemberNumber!) > -1;

		if (!memberIdIsAllowed) return "You do not have access to their artifacts...";
		else if (!this.settings.petsuitCollarSetting.remoteAccess) return "Remote Access is Disabled";
		else if (!this.settings.petsuitCollarSetting.enabled) return "Section is Disabled";
		else return "Section is Unavailable";
	}

	get enabled(): boolean {
		var memberIdIsAllowed: boolean = ServerChatRoomGetAllowItem(Player, this.Character);
		if (this.allowedMemberIds.length > 0)
			memberIdIsAllowed = this.allowedMemberIds.indexOf(Player.MemberNumber!) > -1;
		
		return this.settings.petsuitCollarSetting.remoteAccess && this.settings.petsuitCollarSetting.enabled && memberIdIsAllowed;
	}

	get icon(): string {
		return "";
	}

	get settings(): ArtifactPublicSettingsModel {
		return super.settings as ArtifactPublicSettingsModel;
	}

	get multipageStructure(): Setting[][] {
		return [
			[
				<Setting>{
					type: "colorpicker",
					id: "petsuitCollar_buckleColor",
					label: "Petsuit Buckle Color:",
					description: "Sets the color of the buckles on the petsuit.",
					setting: () => this.settings.petsuitCollarSetting.buckleColor ?? "#5AC5EE",
					setSetting: (val) => (this.settings.petsuitCollarSetting.buckleColor = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "colorpicker",
					id: "petsuitCollar_strapColor",
					label: "Petsuit Strap Color:",
					description: "Sets the color of the straps on the petsuit.",
					setting: () => this.settings.petsuitCollarSetting.strapColor ?? "#2C2C2C",
					setSetting: (val) => (this.settings.petsuitCollarSetting.strapColor = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "checkbox",
					label: "Lock Owner:",
					description: "Only allows the person that locked the collar to trigger it.",
					setting: () => this.settings.petsuitCollarSetting.lockOwner ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.lockOwner = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "text",
					id: "petsuitCollar_allowedMembers",
					label: "Allowed Member IDs:",
					description: "A list of member IDs seperated by a comma, who are allowed to use the collar.",
					setting: () => this.settings.petsuitCollarSetting.allowedMembers ?? "",
					setSetting: (val) => (this.settings.petsuitCollarSetting.allowedMembers = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "text",
					id: "petsuitCollar_trigger",
					label: "Trigger:",
					description: "Sets the trigger word/sentence for the petsuit collar.",
					setting: () => this.settings.petsuitCollarSetting.trigger ?? "",
					setSetting: (val) => (this.settings.petsuitCollarSetting.trigger = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "checkbox",
					label: "Allow Self-Speechtrigger:",
					description: "Allows the wearer of the collar to trigger the speech commands.",
					setting: () => this.settings.petsuitCollarSetting.allowSelfTrigger ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.allowSelfTrigger = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "checkbox",
					label: "Locked:",
					description: "Disallows the wearer of the collar from modifying any settings regarding the petsuit collar.",
					setting: () => this.settings.petsuitCollarSetting.locked ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.locked = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || !this.settings.petsuitCollarSetting.lockable,
				},
                <Setting>{
                    type: "craftselect",
                    id: "petsuitCollar",
                    label: "Petsuit Collar",
                    slot: "ItemNeck",
                    description: "The current collar equipped.",
                    setting: () => this.settings.petsuitCollarSetting.petsuitCollar,
                    setSetting: (val) => (this.settings.petsuitCollarSetting.petsuitCollar = val),
                    disabled: !this.settings.petsuitCollarSetting.enabled,
                },
			],/*[
				<Setting>{
					type: "checkbox",
					label: "Catspeech mask enabled:",
					description: "Enables the catspeech mask.",
					setting: () => this.settings.catSpeechEnabled ?? false,
					setSetting: (val) => (this.settings.catSpeechEnabled = val)
				},
			]*/
		];
	}

	blinkLastTime = 0;
	blinkColor = "Red";
	Run(): void {
		super.Run();
	}

	Click() {
		super.Click();
	}
}
