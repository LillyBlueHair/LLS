import { BaseModule } from "base";
import { ModuleCategory } from "Settings/settingDefinitions";
import { hookFunction, removeAllHooksByModule } from "utils";


export class CraftsModule extends BaseModule {
    private: boolean = false;
    load(): void {
        hookFunction("CraftingRun", 1, (args, next) => {
            next(args)
            const C = Player;
            if(!!C && C.IsPlayer() && !!C.Crafting && CraftingMode == "Slot"){
                let craft: CraftingItem | null = null;
                for(let i = CraftingOffset; i < CraftingOffset + 20; i++){
                    craft = C.Crafting[i];
                    if(craft){
                        break;
                    }
                }
                if(craft && craft?.Private){
                    this.private = true;
                    DrawButton(15, 15, 64, 64, "", "White", "Icons/Checked.png", "Whole page is private");
                }else{
                    this.private = false;
                    DrawButton(15, 15, 64, 64, "", "White", "", "Whole page is private");
                }
            }
        }, ModuleCategory.Crafts);

        hookFunction("CraftingClick", 1, (args, next) => {
            next(args)
            const C = Player;
            if(!!C && C.IsPlayer() && !!C.Crafting && CraftingMode == "Slot"){
                if(MouseIn(15, 15, 64, 64)){
                    this.private = !this.private;
                for(let i = CraftingOffset; i < CraftingOffset + 20; i++){
                    const craft = C.Crafting[i];
                    if(craft){
                        craft.Private = this.private;
                    }
                }
            }
                
            }
        }, ModuleCategory.Crafts);
    }

	unload(): void {
        removeAllHooksByModule(ModuleCategory.Commands);
    }
}
