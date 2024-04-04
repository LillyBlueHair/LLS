import { ArtifactSettingsModel, PetsuitCollarModel } from "./Models/artifacts";
import { GuiSubscreen, Setting } from "./settingBase";
import { getModule } from "modules";
import { MiscModule } from "Modules/misc";

export class GuiArtifact extends GuiSubscreen {
	get name(): string {
		return "Artifacts";
	}

	get icon(): string {
		return "";
	}

	get settings(): ArtifactSettingsModel {
		return super.settings as ArtifactSettingsModel;
	}

	get multipageStructure(): Setting[][] {
		return [
			[
				<Setting>{
					type: "checkbox",
					label: "Enable Petsuit Collar:",
					description: "Enables petsuit collar features.",
					setting: () => this.settings.petsuitCollarSetting.enabled ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.enabled = val),
					disabled: this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "colorpicker",
					id: "petsuitCollar_buckleColor",
					label: "Petsuit Buckle Color:",
					description: "Sets the color of the buckles on the petsuit.",
					setting: () => this.settings.petsuitCollarSetting.buckleColor ?? "#5AC5EE",
					setSetting: (val) => (this.settings.petsuitCollarSetting.buckleColor = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "colorpicker",
					id: "petsuitCollar_strapColor",
					label: "Petsuit Strap Color:",
					description: "Sets the color of the straps on the petsuit.",
					setting: () => this.settings.petsuitCollarSetting.strapColor ?? "#2C2C2C",
					setSetting: (val) => (this.settings.petsuitCollarSetting.strapColor = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "checkbox",
					label: "Lock Owner:",
					description: "Only allows the person that locked the collar to trigger it.",
					setting: () => this.settings.petsuitCollarSetting.lockOwner ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.lockOwner = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "text",
					id: "petsuitCollar_allowedMembers",
					label: "Allowed Member IDs:",
					description:
						"A list of member IDs seperated by a comma, who are allowed to use the collar.",
					setting: () => this.settings.petsuitCollarSetting.allowedMembers ?? "",
					setSetting: (val) => (this.settings.petsuitCollarSetting.allowedMembers = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "text",
					id: "petsuitCollar_trigger",
					label: "Trigger:",
					description: "Sets the trigger word/sentence for the petsuit collar.",
					setting: () => this.settings.petsuitCollarSetting.trigger ?? "",
					setSetting: (val) => (this.settings.petsuitCollarSetting.trigger = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "checkbox",
					label: "Allow Self-Speechtrigger:",
					description: "Allows the wearer of the collar to trigger the speech commands.",
					setting: () => this.settings.petsuitCollarSetting.allowSelfTrigger ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.allowSelfTrigger = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "checkbox",
					label: "Remote Access:",
					description: "Allows other users to change the settings.",
					setting: () => this.settings.petsuitCollarSetting.remoteAccess ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.remoteAccess = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
				<Setting>{
					type: "checkbox",
					label: "Lockable:",
					description: "Allows other users to lock you out of all the settings.",
					setting: () => this.settings.petsuitCollarSetting.lockable ?? false,
					setSetting: (val) => (this.settings.petsuitCollarSetting.lockable = val),
					disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
				},
			],
			[
				<Setting>{
					type: "checkbox",
					label: "Catmask speech:",
					description: "Forces the wearer to speek like a cat when wearing a cat mask.",
					setting: () => this.settings.catSpeechEnabled ?? false,
					setSetting: (val) => (this.settings.catSpeechEnabled = val),
				},	
				<Setting>{
					type: "checkbox",
					label: "Cosplay Ears:",
					description: "Enables cosplay ears features.",
					setting: () => this.settings.cosplayEarEnabled ?? false,
					setSetting: (val) => (this.settings.cosplayEarEnabled = val),
				},			
			]
		];
	}

	Run(): void {
		super.Run();
		let buttonPos = this.structure.length;
		if(super.PreferenceColorPick != "" && ((super.PreferenceColorPickLeft && this.getXPos(buttonPos) < 1000) || (!super.PreferenceColorPickLeft && this.getXPos(buttonPos) > 1000)))
			return;
		else if (PreferencePageCurrent == 1) {
			let prev = MainCanvas.textAlign;

			MainCanvas.textAlign = "left";
			let updateDisabled = !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked;
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
			MainCanvas.textAlign = prev;
		} else if (PreferencePageCurrent == 2) {
			let prev = MainCanvas.textAlign;

			MainCanvas.textAlign = "left";
			let updateDisabled = !this.settings.cosplayEarEnabled;
			DrawText(
				"Update Cosplay Mask:",
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
			if (!!this.settings.cosplayEars) {
				DrawText(
					"Current Name: " + this.settings.cosplayEars.name,
					this.getXPos(buttonPos),
					this.getYPos(buttonPos) + 60,
					"Gray",
					"Gray"
				);
				if (!!this.settings.cosplayEars.creator && this.settings.cosplayEars.creator > 0)
					DrawText(
						"Current Crafter: " + this.settings.cosplayEars.creator,
						this.getXPos(buttonPos),
						this.getYPos(buttonPos) + 110,
						"Gray",
						"Gray"
					);
			}
			MainCanvas.textAlign = prev;
		}
	}

	Click(): void {
		super.Click();

		if (PreferencePageCurrent == 1) {
			if (this.settings.petsuitCollarSetting.enabled && !this.settings.petsuitCollarSetting.locked) {
				// Update Collar Button
				let buttonPos = this.structure.length;
				if (MouseIn(this.getXPos(buttonPos) + 464, this.getYPos(buttonPos) - 32, 200, 64)) {
					var collar = InventoryGet(Player, "ItemNeck");
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
		} else if (PreferencePageCurrent == 2) {
			if (this.settings.cosplayEarEnabled) {
				// Update Collar Button
				let buttonPos = this.structure.length;
				if (MouseIn(this.getXPos(buttonPos) + 464, this.getYPos(buttonPos) - 32, 200, 64)) {
					var collar = InventoryGet(Player, "ItemHood");
					if (!collar || collar.Asset.Name != "CosplayEars") {
						this.message = "No Mask Equipped";
					} else {
						this.message = "Mask updated";
						this.settings.cosplayEars = <PetsuitCollarModel>{
							name: collar.Craft?.Name ?? collar.Asset.Name,
							creator: collar.Craft?.MemberNumber ?? 0,
						};
					}
				}
			}
		}
	}

	Exit(): void {
		super.Exit();
	}

	Load(): void {
		// Load up module settings to ensure defaults..
		getModule<MiscModule>("MiscModule")?.settings;
		super.Load();
	}
}
