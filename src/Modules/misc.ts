import { MiscSettingsModel } from "Settings/Models/base";
import { BaseModule } from "base";
import { hookFunction } from "utils";

export class MiscModule extends BaseModule {
	get settings(): MiscSettingsModel {
		return super.settings as MiscSettingsModel;
	}

	get defaultSettings(): MiscSettingsModel | null {
		return <MiscSettingsModel>{
			orgasmSkip: false,
		};
	}

	Safeword(): void {}

	Load(): void {
		// To draw the button for orgasm resist
		hookFunction("ChatRoomRun", 1, (args, next) => {
			next(args);
			if (this.settings.orgasmSkip) {
				if (
					Player.ArousalSettings != null &&
					Player.ArousalSettings.Active != null &&
					Player.ArousalSettings.Active != "Inactive" &&
					Player.ArousalSettings.Active != "NoMeter"
				) {
					if (
						Player.ArousalSettings.OrgasmTimer != null &&
						typeof Player.ArousalSettings.OrgasmTimer === "number" &&
						!isNaN(Player.ArousalSettings.OrgasmTimer) &&
						Player.ArousalSettings.OrgasmTimer > 0
					) {
						if (Player.ArousalSettings.OrgasmStage == 1) DrawButton(10, 10, 250, 64, "Autoresist", "White");
					}
				}
			}
		});

		//To click the button for orgasm resist
		hookFunction("ChatRoomClick", 1, (args, next) => {
			next(args);
			if (this.settings.orgasmSkip) {
				if (
					Player.ArousalSettings != null &&
					Player.ArousalSettings.OrgasmTimer != null &&
					typeof Player.ArousalSettings.OrgasmTimer === "number" &&
					!isNaN(Player.ArousalSettings.OrgasmTimer) &&
					Player.ArousalSettings.OrgasmTimer > 0
				) {
					if (MouseX >= 10 && MouseX <= 260 && MouseY >= 10 && MouseY <= 74 && Player.ArousalSettings.OrgasmStage == 1) {
						ActivityOrgasmGameGenerate(ActivityOrgasmGameDifficulty + 1);
					}
				}
			}
		});
	}

	characterToggleVisibility(mode: String, C: OtherCharacter | PlayerCharacter) {
		let script = InventoryWear(C, "Script", "ItemScript");
		
		if(!script) return;
		script.Property = script.Property || {};
		if (mode === "bodyOnly") {
			script.Property.Hide = AssetGroup
				.filter(g => g.Category === "Appearance" && !g.Clothing && !["Height", "Emoticon", "Pronouns"]
				.includes(g.Name)).map(g => g.Name);
		} else if (mode === "all") { 
			script.Property.Hide = AssetGroup.map(g => g.Name).filter(gn => gn !== "ItemScript")
		} else {
			InventoryRemove(C, "ItemScript", true);
		}
	
		CharacterScriptRefresh(C);
   }

	Unload(): void {}
}
