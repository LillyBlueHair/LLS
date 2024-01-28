import { RemoteGuiSubscreen } from "./remoteBase";
import { Setting } from "Settings/settingBase";
import { GetDelimitedList } from "utils";
import { PetsuitCollarModel, ArtifactPublicSettingsModel, PetsuitCollarSettingsModel } from "Settings/Models/artifacts";

export class RemotePetsuitCollar extends RemoteGuiSubscreen {
	subscreens: RemoteGuiSubscreen[] = [];

	get name(): string {
		return "Petsuit Collar";
	}

	get allowedMemberIds(): number[] {
		let idList =
			GetDelimitedList(this.settings.petsuitCollarSetting.allowedMembers)
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
					type: "checkbox",
					label: "Enable Voice Commands:",
					description: "Enables voice commands for the petsuit collar.",
					setting: () => this.settings.petsuitCollarSetting.speechEnabled ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.speechEnabled = val),
					disabled: !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "text",
					id: "petsuitCollar_trigger",
					label: "Trigger:",
					description: "Sets the trigger word/sentence for the petsuit collar.",
					setting: () => this.settings.petsuitCollarSetting.trigger ?? "",
					setSetting: (val) => (this.settings.petsuitCollarSetting.trigger = val),
					disabled: !this.settings.petsuitCollarSetting.speechEnabled || !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "checkbox",
					label: "Allow Self-Speechtrigger:",
					description: "Allows the wearer of the collar to trigger the speech commands.",
					setting: () => this.settings.petsuitCollarSetting.allowSelfTrigger ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.allowSelfTrigger = val),
					disabled: !this.settings.petsuitCollarSetting.speechEnabled || !this.settings.petsuitCollarSetting.enabled,
				},
				<Setting>{
					type: "checkbox",
					label: "Locked:",
					description: "Disallows the wearer of the collar from modifying any settings regarding the petsuit collar.",
					setting: () => this.settings.petsuitCollarSetting.locked ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.locked = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || !this.settings.petsuitCollarSetting.lockable,
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

		var prev = MainCanvas.textAlign;
		let buttonPos = this.structure.length;
		if (
			super.PreferenceColorPick != "" &&
			((super.PreferenceColorPickLeft && this.getXPos(buttonPos) < 1000) ||
				(!super.PreferenceColorPickLeft && this.getXPos(buttonPos) > 1000))
		)
			return;
		else if (this.settings.petsuitCollarSetting.enabled && PreferencePageCurrent == 1) {
			MainCanvas.textAlign = "left";
			// Set/Update Collar	 	[Custom??]
			let updateDisabled = !this.settings.petsuitCollarSetting.enabled;
			DrawText(
				"Update Collar:",
				this.getXPos(buttonPos),
				this.getYPos(buttonPos),
				updateDisabled ? "Gray" : "Black",
				"Gray"
			);
			MainCanvas.textAlign = "center";
			DrawButton(
				this.getXPos(buttonPos) + 464,
				this.getYPos(buttonPos) - 32,
				200,
				64,
				"Update",
				updateDisabled ? "#CCCCCC" : "White",
				undefined,
				updateDisabled ? "" : "Update Collar to Current",
				updateDisabled
			);

			MainCanvas.textAlign = "left";
			if (!!this.settings.petsuitCollarSetting.petsuitCollar) {
				DrawText(
					"Current Name: " + this.settings.petsuitCollarSetting.petsuitCollar.name,
					this.getXPos(buttonPos),
					this.getYPos(buttonPos) + 60,
					"Gray",
					"Gray"
				);
				if (!!this.settings.petsuitCollarSetting.petsuitCollar.creator && this.settings.petsuitCollarSetting.petsuitCollar.creator > 0)
					DrawText(
						"Current Crafter: " + this.settings.petsuitCollarSetting.petsuitCollar.creator,
						this.getXPos(buttonPos),
						this.getYPos(buttonPos) + 110,
						"Gray",
						"Gray"
					);
			}
		}
		MainCanvas.textAlign = prev;
	}

	Click() {
		super.Click();
		let buttonPos = this.structure.length;

		if (
			super.PreferenceColorPick != "" &&
			((super.PreferenceColorPickLeft && this.getXPos(buttonPos) < 1000) ||
				(!super.PreferenceColorPickLeft && this.getXPos(buttonPos) > 1000))
		)
			return;
		else if (this.settings.petsuitCollarSetting.enabled && PreferencePageCurrent == 1) {
			if (this.settings.petsuitCollarSetting.enabled) {
				// Update Collar Button
				let buttonPos = this.structure.length;
				if (MouseIn(this.getXPos(buttonPos) + 464, this.getYPos(buttonPos) - 32, 200, 64)) {
					var collar = InventoryGet(this.Character, "ItemNeck");
					if (!collar) {
						this.message = "No Collar Equipped";
					} else {
						this.message = "Collar updated";
						this.settings.petsuitCollarSetting.petsuitCollar = <PetsuitCollarModel>{
							name: collar.Craft?.Name ?? collar.Asset.Name,
							creator: collar.Craft?.MemberNumber ?? 0,
						};
					}
				}
			}
		}
	}
}
