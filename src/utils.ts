import bcModSDKRef, { GetDotedPathType, PatchHook } from "bondage-club-mod-sdk";
import { getModule } from "modules";
import { CoreModule } from "Modules/core";
import { ModuleCategory } from "Settings/settingDefinitions";

interface IPatchedFunctionData {
    name: string;
    hooks: {
        hook: PatchHook;
        priority: number;
        module: /*ModuleCategorie | */ null;
        removeCallback: () => void;
    }[];
}

const patchedFunctions: Map<string, IPatchedFunctionData> = new Map();

export const bcModSDK = bcModSDKRef.registerMod({
    name: "LLS",
    fullName: "Lillys Little Scripts",
    version: LLS_VERSION.startsWith("v") ? LLS_VERSION.slice(1) : LLS_VERSION,
});

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function sendMessage(msg: string, target: null | number = null) {
    if (!msg) return;
    ServerSend("ChatRoomChat", {
        Type: "Chat",
        Content: msg,
        Target: target,
    });
}

//OLD (I think)
export function sendActivityMessage(msg: string, target: null | number = null) {
    if (!msg) return;
    ServerSend("ChatRoomChat", {
        Type: "Action",
        Content: "Beep",
        Target: target,
        Dictionary: [{ Tag: "Beep", Text: msg }],
    });

    //ServerSend("ChatRoomChat", { Content: "Beep", Type: "Action", Dictionary: [{Tag: "Beep", Text: `${CharacterNickname(Player)} was dragged to the ground by a chain` }]})
}

export function sendAction(action: string, sender: Character | null = null) {
    let msg = replace_template(action, sender);
    ServerSend("ChatRoomChat", {
        Content: "Beep",
        Type: "Action",
        Dictionary: [
            // EN
            { Tag: "Beep", Text: "msg" },
            // CN
            { Tag: "发送私聊", Text: "msg" },
            // DE
            { Tag: "Biep", Text: "msg" },
            // FR
            { Tag: "Sonner", Text: "msg" },
            // Message itself
            { Tag: "msg", Text: msg },
        ],
    });
}

export function sendLLSMessage(msg: LLSMessageModel) {
    const packet = <IChatRoomMessage>{
        Type: "Hidden",
        Content: "LLSMsg",
        Sender: Player.MemberNumber,
        Dictionary: [
            <LLSMessageDictionaryEntry>{
                message: msg,
            },
        ],
    };

    ServerSend("ChatRoomChat", packet);
}

export function sendHiddenMessage(msg: LLSMessageModel) {
    const packet = <IChatRoomMessage>{
        Type: "Hidden",
        Content: "LLSMsg",
        Sender: Player.MemberNumber,
        Dictionary: [
            <LLSMessageDictionaryEntry>{
                message: msg,
            },
        ],
    };

    ServerSend("ChatRoomChat", packet);
}

export function sendLocal(msg: string, time?: number) {
    let bgColor = Player.ChatSettings!.ColorTheme!.indexOf("Light") > -1 ? "#f2feff" : "#1c2829";
    let text = `<div style='background-color:${bgColor};'>${msg}</div>`;
    ChatRoomSendLocal(text);
}

export function getCharacterNumber(name: string) {
    /*let memberNumber: number = -1;
	let error: boolean = false;
	for( let c of ChatRoomCharacter){
		if(c.Name === name){
			if(memberNumber === -1) memberNumber = c.MemberNumber;
			else error = true;
		}else if(c.Nickname === name){
			if(memberNumber === -1) memberNumber = c.MemberNumber;
			else error = true;
		}
	}
	return error ? -1 : memberNumber;*/
    return ChatRoomCharacter.find((c) => c.Name.toLowerCase() == name.toLowerCase())?.MemberNumber ?? null;
}

export function getChatroomCharacter(memberNumber: number) {
    return ChatRoomCharacter.find((c) => c.MemberNumber == memberNumber) ?? null;
}
export function getCharacterName(memberNumber: number, defaultText: string): string;
export function getCharacterName(memberNumber: number, defaultText: string | null): string | null;
export function getCharacterName(memberNumber: number, defaultText: string | null = null): string | null {
    const c = getChatroomCharacter(memberNumber);
    if (c) {
        return c.Name;
    }
    if (Player.MemberNumber === memberNumber) {
        return Player.Name;
    }
    for (const char of ChatRoomCharacter) {
        if (char.MemberNumber === memberNumber) return char.Name;
        if (char.Ownership?.MemberNumber === memberNumber) return char.Ownership.Name;
        if (Array.isArray(char.Lovership)) {
            for (const lover of char.Lovership) {
                if (lover.MemberNumber === memberNumber) return lover.Name;
            }
        }
    }
    const friendName = Player.FriendNames?.get(memberNumber);
    if (friendName) return friendName;
    return defaultText;
}

export function lockItem(C: Character, Item: Item | AssetGroupName | null, lock: string, MemberNumber: null | number | string = null) {
    if (!Item) return;
    let Asset = AssetGet("Female3DCG", "ItemMisc", lock);
    if (!Asset) return;
    let Lock = { Asset: Asset };
    if (!Lock) return;
    InventoryLock(C, Item, Lock, MemberNumber === null ? -1 : MemberNumber);
    if (typeof Item == "string") return;
    if (Item.Property && Item.Property.Password) {
        Item.Property.Password = "LLS" + makePassword(5);
        Item.Property.LockSet = true;
        ChatRoomCharacterUpdate(C);
    }
}

export function makePassword(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function replace_template(text: string, source: Character | null = null) {
    let result = text;
    let pronounItem = InventoryGet(Player, "Pronouns");
    let posessive = "Her";
    let intensive = "Her";
    let pronoun = "She";
    if (pronounItem?.Asset.Name == "HeHim") {
        posessive = "His";
        intensive = "Him";
        pronoun = "He";
    }

    let oppName = !!source ? CharacterNickname(source) : "";

    result = result.replaceAll("%POSSESSIVE%", posessive.toLocaleLowerCase());
    result = result.replaceAll("%CAP_POSSESSIVE%", posessive);
    result = result.replaceAll("%PRONOUN%", pronoun.toLocaleLowerCase());
    result = result.replaceAll("%CAP_PRONOUN%", pronoun);
    result = result.replaceAll("%INTENSIVE%", intensive.toLocaleLowerCase());
    result = result.replaceAll("%CAP_INTENSIVE%", intensive);
    result = result.replaceAll("%NAME%", CharacterNickname(Player)); //Does this works to print "Lilly"? -- it should, yes
    result = result.replaceAll("%OPP_NAME%", oppName); // finally we can use the source name to make the substitution

    return result;
}

export function removeAllHooksByModule(module: ModuleCategory): boolean {
    for (const data of patchedFunctions.values()) {
        for (let i = data.hooks.length - 1; i >= 0; i--) {
            if (data.hooks[i].module === module) {
                data.hooks[i].removeCallback();
                data.hooks.splice(i, 1);
            }
        }
    }

    return true;
}

function initPatchableFunction(target: string): IPatchedFunctionData {
    let result = patchedFunctions.get(target);
    if (!result) {
        result = {
            name: target,
            hooks: [],
        };
        patchedFunctions.set(target, result);
    }
    return result;
}

export function callOriginal<TFunctionName extends string>(
    target: TFunctionName,
    args: [...Parameters<GetDotedPathType<typeof globalThis, TFunctionName>>],
    context?: any
): ReturnType<GetDotedPathType<typeof globalThis, TFunctionName>> {
    return bcModSDK.callOriginal(target, args);
}

export function onWhisper(
    priority: number,
    module: ModuleCategory,
    callback: (data: any, sender: Character | null, msg: string, metadata: any) => string | void
) {
    hookFunction(
        "ChatRoomMessage",
        priority,
        (args, next) => {
            let data = args[0];
            let sender = getChatroomCharacter(data.Sender);
            if (data.Type == "Whisper")
                if (callback(data, sender, data.Content, data.Dictionary) == "skipBCX") {
                    //EWW, but it works
                    return;
                }
            next(args);
        },
        module
    );
}

export function onChat(
    priority: any,
    module: ModuleCategory,
    allowGarble: boolean = false,
    afterOtherFunctions: boolean = false,
    callback: (data: any, sender: Character | null, msg: string, metadata: any) => void
) {
    if (allowGarble) {
        hookFunction(
            "ChatRoomMessage",
            priority,
            (args, next) => {
                if (afterOtherFunctions) next(args);

                let data = args[0];
                let sender = getChatroomCharacter(data.Sender);
                if (data.Type == "Chat" || data.Type == "Whisper") callback(data, sender, data.Content, data.Dictionary);
                if (!afterOtherFunctions) next(args);
            },
            module
        );
    } else {
        hookFunction(
            "ChatRoomMessage",
            priority,
            (args, next) => {
                if (afterOtherFunctions) next(args);
                let data = args[0];
                let sender = getChatroomCharacter(data.Sender) as Character;
                let ungarbled = data.Content;
                if (sender && sender.Appearance) {
                    data.Content = callOriginal("SpeechGarble", [sender, ungarbled]);
                }
                if (data.Type == "Chat" || data.Type == "Whisper") callback(data, sender, data.Content, data.Dictionary);
                data.Content = ungarbled;
                if (!afterOtherFunctions) next(args);
            },
            module
        );
    }
}

export function onAction(priority: any, module: ModuleCategory, callback: (data: any, sender: Character | null, msg: string, metadata: any) => void) {
    hookFunction(
        "ChatRoomMessage",
        priority,
        (args, next) => {
            let data = args[0];
            let sender = getChatroomCharacter(data.Sender);
            if (data.Type == "Action" || data.Type == "Emote") {
                callback(data, sender, data.Content, data.Dictionary);
            }
            next(args);
        },
        module
    );
}

export function onActivity(priority: any, module: ModuleCategory, callback: (data: any, sender: Character | null, msg: string, metadata: any) => void) {
    hookFunction(
        "ChatRoomMessage",
        priority,
        (args, next) => {
            let data = args[0];
            let sender = getChatroomCharacter(data.Sender);
            if (data.Type == "Activity") {
                callback(data, sender, data.Content, data.Dictionary);
            }
            next(args);
        },
        module
    );
}

export function onSentMessage(priority: any, module: ModuleCategory, callback: (data: any, sender: Character | null, msg: string, metadata: any) => void) {
    hookFunction(
        "ServerSend",
        priority,
        (args, next) => {
            let data = args[1];
            let sender = getChatroomCharacter(data.Sender);
            if (args[0] === "ChatRoomChat") {
                if (!data.Content.startsWith("(")) callback(data, sender, data.Content, data.Dictionary);
            }
            next(args);
        },
        module
    );
}

export function hookFunction(target: string, priority: number, hook: PatchHook, module: ModuleCategory | null = null): () => void {
    const data = initPatchableFunction(target);

    if (data.hooks.some((h) => h.hook === hook)) {
        console.error(`LLS: Duplicate hook for "${target}"`, hook);
        return () => null;
    }

    // let wrappedHook: PatchHook = (args, next) => {
    // 	try {
    // 		return hook(args, next);
    // 	} catch (error: any) {
    // 		let msg = `LLS Error -- ${error.message}`;
    // 		console.error(`${msg} \n${error.stack}`);
    // 		if (target != "ChatRoomMessage" && target != "ChatRoomSendLocal") {
    // 			try {
    // 				LLS_SendLocal(msg);
    // 			} catch (inner) {}
    // 		}
    // 		if (!!Player.LLS.RethrowExceptions)
    // 			throw error;
    // 		return next(args);
    // 	}
    // }

    const removeCallback = bcModSDK.hookFunction(target, priority, hook);
    module = null; //TODO
    data.hooks.push({
        hook,
        priority,
        module,
        removeCallback,
    });
    data.hooks.sort((a, b) => b.priority - a.priority);
    return removeCallback;
}

export function patchFunction(target: string, patches: Record<string, string | null>): void {
    //TODO
    bcModSDK.patchFunction(target, patches);
    //TODO
}

export function settingsSave(publish: boolean = false) {
    if (!Player.OnlineSettings) Player.OnlineSettings = <PlayerOnlineSettings>{};
    Player.OnlineSettings.LLS = Player.LLS;
    window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
    if (publish) getModule<CoreModule>("CoreModule")?.sendPublicPacket(false, "sync");
}

/** Checks if the `obj` is an object (not null, not array) */
export function isObject(obj: unknown): obj is Record<string, any> {
    return !!obj && typeof obj === "object" && !Array.isArray(obj);
}

export function removeHooksByModule(target: string, module: ModuleCategory): boolean {
    const data = initPatchableFunction(target);

    for (let i = data.hooks.length - 1; i >= 0; i--) {
        if (data.hooks[i].module === module) {
            data.hooks[i].removeCallback();
            data.hooks.splice(i, 1);
        }
    }

    return true;
}

export function hookBCXCurse(
    trigger: "curseTrigger",
    listener: (v: { action: "remove" | "add" | "swap" | "update" | "color" | "autoremove"; group: string }) => void
) {
    window.bcx?.getModApi("LLS").on?.(trigger, listener);
}

export function itemToItemBundle(item: Item): ItemBundle {
    return <ItemBundle>{
        Group: item.Asset.Group.Name,
        Name: item.Asset.Name,
        Color: item.Color,
        Craft: item.Craft,
        Difficulty: item.Difficulty,
        Property: item.Property,
    };
}

//thank you BCX :>

export function smartGetAssetGroup(item: Item | Asset | AssetGroup): AssetGroup {
    const group = AssetGroup.includes(item as AssetGroup)
        ? (item as AssetGroup)
        : Asset.includes(item as Asset)
        ? (item as Asset).Group
        : (item as Item).Asset.Group;
    if (!AssetGroup.includes(group)) {
        throw new Error("Failed to convert item to group");
    }
    return group;
}

export function isCloth(item: Item | Asset | AssetGroup, allowCosplay: boolean = false): boolean {
    if (!item || item == undefined) return false;
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && group.AllowNone && group.Clothing && (allowCosplay || !group.BodyCosplay);
}

export function isCosplay(item: Item | Asset | AssetGroup): boolean {
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && group.AllowNone && group.Clothing && group.BodyCosplay;
}

export function itemsToItemBundles(items: Item[]): ItemBundle[] {
    return items.filter((i) => !!i).map((i) => itemToItemBundle(i));
}

export function getDelimitedList(source: string, delimiter: string = ","): string[] {
    return (
        source
            ?.split(delimiter)
            ?.filter((entry) => !!entry)
            .map((entry) => entry.toLocaleLowerCase()) ?? []
    );
}

export function isPhraseInString(string: string, phrase: string, ignoreOOC: boolean = false) {
    if (!string || string === "") return false;
    let praseMatch = new RegExp("\\b" + escapeRegExp(phrase) + "\\b", "i");
    let oocParsed = ignoreOOC ? string : excludeParentheticalContent(string);
    return praseMatch.test(oocParsed);
}

export function excludeParentheticalContent(msg: string): string {
    let result = "";
    let Par = false;
    if (msg == null) msg = "";
    for (let i = 0; i < msg.length; i++) {
        let char = msg.charAt(i);
        if (char == "(" || char == "）") Par = true;
        if (!Par) result += char;
        if (char == ")" || char == "）") Par = false;
    }
    return result;
}

export function escapeRegExp(string: string) {
    return string?.toLocaleLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") ?? ""; // $& means the whole matched string
}

/*export function hookLSCGMagic(trigger: "curseTrigger", listener: (v: { action: "remove" | "add" | "swap" | "update" | "color" | "autoremove"; group: string; }) => void){
	window.LSCG?.getModApi("LLS").on?.(trigger, listener);
}*/

export const ICONS = Object.freeze({
    BLUEBERRY:
        "data:image/png;base64,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",
});
