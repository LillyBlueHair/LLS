// LLS: Lillys Little Scripts
if (typeof window.ImportBondageCollege !== "function") {
  alert("Club not detected! Please only use this while you have Club open!");
  throw "Dependency not met";
}
if (window.LLS_Loaded !== undefined) {
  alert("LLS is already detected in current window. To reload, please refresh the window.");
  throw "Already loaded";
}
window.LLS_Loaded = false;
console.debug("LLS: Parse start...");

var LLS = (function (exports) {
	'use strict';

	const LLS_VERSION="v0.1.0";

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getDefaultExportFromNamespaceIfPresent (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
	}

	function getDefaultExportFromNamespaceIfNotNamed (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var bcmodsdk = {};

	(function (exports) {
		// Bondage Club Mod Development Kit (1.2.0)
		// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
		/** @type {ModSDKGlobalAPI} */
		var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return !!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o));}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name);}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c};}return {hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else {let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o;}return ((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router;}return r}function d(){for(const o of i.values())o.precomputed=s(o);}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d();}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d());}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d();})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d();})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return "undefined"!='object'&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}(); 
	} (bcmodsdk));

	var bcModSDKRef = /*@__PURE__*/getDefaultExportFromCjs(bcmodsdk);

	const modulesMap = new Map();
	function modules() {
	    return [...modulesMap.values()];
	}
	function registerModule(module) {
	    modulesMap.set(module.constructor.name, module);
	    return module;
	}
	function getModule(moduleType) {
	    return modulesMap.get(moduleType);
	}

	const patchedFunctions = new Map();
	const bcModSDK = bcModSDKRef.registerMod({
	    name: "LLS",
	    fullName: "Lillys Little Scripts",
	    version: LLS_VERSION.startsWith("v") ? LLS_VERSION.slice(1) : LLS_VERSION,
	});
	function shuffleArray(array) {
	    for (let i = array.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [array[i], array[j]] = [array[j], array[i]];
	    }
	}
	function sendMessage(msg, target = null) {
	    if (!msg)
	        return;
	    ServerSend("ChatRoomChat", {
	        Type: "Chat",
	        Content: msg,
	        Target: target,
	    });
	}
	//OLD (I think)
	function sendActivityMessage(msg, target = null) {
	    if (!msg)
	        return;
	    ServerSend("ChatRoomChat", {
	        Type: "Action",
	        Content: "Beep",
	        Target: target,
	        Dictionary: [{ Tag: "Beep", Text: msg }],
	    });
	    //ServerSend("ChatRoomChat", { Content: "Beep", Type: "Action", Dictionary: [{Tag: "Beep", Text: `${CharacterNickname(Player)} was dragged to the ground by a chain` }]})
	}
	function sendAction(action, sender = null) {
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
	function sendLLSMessage(msg) {
	    const packet = {
	        Type: "Hidden",
	        Content: "LLSMsg",
	        Sender: Player.MemberNumber,
	        Dictionary: [
	            {
	                message: msg,
	            },
	        ],
	    };
	    ServerSend("ChatRoomChat", packet);
	}
	function sendHiddenMessage(msg) {
	    const packet = {
	        Type: "Hidden",
	        Content: "LLSMsg",
	        Sender: Player.MemberNumber,
	        Dictionary: [
	            {
	                message: msg,
	            },
	        ],
	    };
	    ServerSend("ChatRoomChat", packet);
	}
	function sendLocal(msg, time) {
	    let bgColor = Player.ChatSettings.ColorTheme.indexOf("Light") > -1 ? "#f2feff" : "#1c2829";
	    let text = `<div style='background-color:${bgColor};'>${msg}</div>`;
	    ChatRoomSendLocal(text);
	}
	function getCharacterNumber(name) {
	    var _a, _b;
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
	    return (_b = (_a = ChatRoomCharacter.find((c) => c.Name.toLowerCase() == name.toLowerCase())) === null || _a === void 0 ? void 0 : _a.MemberNumber) !== null && _b !== void 0 ? _b : null;
	}
	function getChatroomCharacter(memberNumber) {
	    var _a;
	    return (_a = ChatRoomCharacter.find((c) => c.MemberNumber == memberNumber)) !== null && _a !== void 0 ? _a : null;
	}
	function getCharacterName(memberNumber, defaultText = null) {
	    var _a, _b;
	    const c = getChatroomCharacter(memberNumber);
	    if (c) {
	        return c.Name;
	    }
	    if (Player.MemberNumber === memberNumber) {
	        return Player.Name;
	    }
	    for (const char of ChatRoomCharacter) {
	        if (char.MemberNumber === memberNumber)
	            return char.Name;
	        if (((_a = char.Ownership) === null || _a === void 0 ? void 0 : _a.MemberNumber) === memberNumber)
	            return char.Ownership.Name;
	        if (Array.isArray(char.Lovership)) {
	            for (const lover of char.Lovership) {
	                if (lover.MemberNumber === memberNumber)
	                    return lover.Name;
	            }
	        }
	    }
	    const friendName = (_b = Player.FriendNames) === null || _b === void 0 ? void 0 : _b.get(memberNumber);
	    if (friendName)
	        return friendName;
	    return defaultText;
	}
	function lockItem(C, Item, lock, MemberNumber = null) {
	    if (!Item)
	        return;
	    let Asset = AssetGet("Female3DCG", "ItemMisc", lock);
	    if (!Asset)
	        return;
	    let Lock = { Asset: Asset };
	    if (!Lock)
	        return;
	    InventoryLock(C, Item, Lock, MemberNumber === null ? -1 : MemberNumber);
	    if (typeof Item == "string")
	        return;
	    if (Item.Property && Item.Property.Password) {
	        Item.Property.Password = "LLS" + makePassword(5);
	        Item.Property.LockSet = true;
	        ChatRoomCharacterUpdate(C);
	    }
	}
	function makePassword(length) {
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
	function replace_template(text, source = null) {
	    let result = text;
	    let pronounItem = InventoryGet(Player, "Pronouns");
	    let posessive = "Her";
	    let intensive = "Her";
	    let pronoun = "She";
	    if ((pronounItem === null || pronounItem === void 0 ? void 0 : pronounItem.Asset.Name) == "HeHim") {
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
	function removeAllHooksByModule(module) {
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
	function initPatchableFunction(target) {
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
	function callOriginal(target, args, context) {
	    return bcModSDK.callOriginal(target, args);
	}
	function onWhisper(priority, module, callback) {
	    hookFunction("ChatRoomMessage", priority, (args, next) => {
	        let data = args[0];
	        let sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Whisper")
	            if (callback(data, sender, data.Content, data.Dictionary) == "skipBCX") {
	                //EWW, but it works
	                return;
	            }
	        next(args);
	    }, module);
	}
	function onChat(priority, module, allowGarble = false, afterOtherFunctions = false, callback) {
	    if (allowGarble) {
	        hookFunction("ChatRoomMessage", priority, (args, next) => {
	            if (afterOtherFunctions)
	                next(args);
	            let data = args[0];
	            let sender = getChatroomCharacter(data.Sender);
	            if (data.Type == "Chat" || data.Type == "Whisper")
	                callback(data, sender, data.Content, data.Dictionary);
	            if (!afterOtherFunctions)
	                next(args);
	        }, module);
	    }
	    else {
	        hookFunction("ChatRoomMessage", priority, (args, next) => {
	            if (afterOtherFunctions)
	                next(args);
	            let data = args[0];
	            let sender = getChatroomCharacter(data.Sender);
	            let ungarbled = data.Content;
	            if (sender && sender.Appearance) {
	                data.Content = callOriginal("SpeechGarble", [sender, ungarbled]);
	            }
	            if (data.Type == "Chat" || data.Type == "Whisper")
	                callback(data, sender, data.Content, data.Dictionary);
	            data.Content = ungarbled;
	            if (!afterOtherFunctions)
	                next(args);
	        }, module);
	    }
	}
	function onAction(priority, module, callback) {
	    hookFunction("ChatRoomMessage", priority, (args, next) => {
	        let data = args[0];
	        let sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Action" || data.Type == "Emote") {
	            callback(data, sender, data.Content, data.Dictionary);
	        }
	        next(args);
	    }, module);
	}
	function onActivity(priority, module, callback) {
	    hookFunction("ChatRoomMessage", priority, (args, next) => {
	        let data = args[0];
	        let sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Activity") {
	            callback(data, sender, data.Content, data.Dictionary);
	        }
	        next(args);
	    }, module);
	}
	function onSentMessage(priority, module, callback) {
	    hookFunction("ServerSend", priority, (args, next) => {
	        let data = args[1];
	        let sender = getChatroomCharacter(data.Sender);
	        if (args[0] === "ChatRoomChat") {
	            if (!data.Content.startsWith("("))
	                callback(data, sender, data.Content, data.Dictionary);
	        }
	        next(args);
	    }, module);
	}
	function hookFunction(target, priority, hook, module = null) {
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
	function patchFunction(target, patches) {
	    //TODO
	    bcModSDK.patchFunction(target, patches);
	    //TODO
	}
	function settingsSave(publish = false) {
	    var _a;
	    if (!Player.OnlineSettings)
	        Player.OnlineSettings = {};
	    Player.OnlineSettings.LLS = Player.LLS;
	    window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
	    if (publish)
	        (_a = getModule("CoreModule")) === null || _a === void 0 ? void 0 : _a.sendPublicPacket(false, "sync");
	}
	/** Checks if the `obj` is an object (not null, not array) */
	function isObject(obj) {
	    return !!obj && typeof obj === "object" && !Array.isArray(obj);
	}
	function removeHooksByModule(target, module) {
	    const data = initPatchableFunction(target);
	    for (let i = data.hooks.length - 1; i >= 0; i--) {
	        if (data.hooks[i].module === module) {
	            data.hooks[i].removeCallback();
	            data.hooks.splice(i, 1);
	        }
	    }
	    return true;
	}
	function hookBCXCurse(trigger, listener) {
	    var _a, _b, _c;
	    (_c = (_a = window.bcx) === null || _a === void 0 ? void 0 : (_b = _a.getModApi("LLS")).on) === null || _c === void 0 ? void 0 : _c.call(_b, trigger, listener);
	}
	function itemToItemBundle(item) {
	    return {
	        Group: item.Asset.Group.Name,
	        Name: item.Asset.Name,
	        Color: item.Color,
	        Craft: item.Craft,
	        Difficulty: item.Difficulty,
	        Property: item.Property,
	    };
	}
	//thank you BCX :>
	function smartGetAssetGroup(item) {
	    const group = AssetGroup.includes(item)
	        ? item
	        : Asset.includes(item)
	            ? item.Group
	            : item.Asset.Group;
	    if (!AssetGroup.includes(group)) {
	        throw new Error("Failed to convert item to group");
	    }
	    return group;
	}
	function isCloth(item, allowCosplay = false) {
	    if (!item || item == undefined)
	        return false;
	    const group = smartGetAssetGroup(item);
	    return group.Category === "Appearance" && group.AllowNone && group.Clothing && (allowCosplay || !group.BodyCosplay);
	}
	function isCosplay(item) {
	    const group = smartGetAssetGroup(item);
	    return group.Category === "Appearance" && group.AllowNone && group.Clothing && group.BodyCosplay;
	}
	function itemsToItemBundles(items) {
	    return items.filter((i) => !!i).map((i) => itemToItemBundle(i));
	}
	function getDelimitedList(source, delimiter = ",") {
	    var _a, _b;
	    return ((_b = (_a = source === null || source === void 0 ? void 0 : source.split(delimiter)) === null || _a === void 0 ? void 0 : _a.filter((entry) => !!entry).map((entry) => entry.toLocaleLowerCase())) !== null && _b !== void 0 ? _b : []);
	}
	function isPhraseInString(string, phrase, ignoreOOC = false) {
	    if (!string || string === "")
	        return false;
	    let praseMatch = new RegExp("\\b" + escapeRegExp(phrase) + "\\b", "i");
	    let oocParsed = ignoreOOC ? string : excludeParentheticalContent(string);
	    return praseMatch.test(oocParsed);
	}
	function excludeParentheticalContent(msg) {
	    let result = "";
	    let Par = false;
	    if (msg == null)
	        msg = "";
	    for (let i = 0; i < msg.length; i++) {
	        let char = msg.charAt(i);
	        if (char == "(" || char == "）")
	            Par = true;
	        if (!Par)
	            result += char;
	        if (char == ")" || char == "）")
	            Par = false;
	    }
	    return result;
	}
	function escapeRegExp(string) {
	    var _a;
	    return (_a = string === null || string === void 0 ? void 0 : string.toLocaleLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) !== null && _a !== void 0 ? _a : ""; // $& means the whole matched string
	}
	/*export function hookLSCGMagic(trigger: "curseTrigger", listener: (v: { action: "remove" | "add" | "swap" | "update" | "color" | "autoremove"; group: string; }) => void){
	    window.LSCG?.getModApi("LLS").on?.(trigger, listener);
	}*/
	const ICONS = Object.freeze({
	    BLUEBERRY: "data:image/png;base64,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",
	    REMOTE: "data:image/png;base64,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",
	});

	class BaseModule {
	    get settingsScreen() {
	        return null;
	    }
	    ;
	    /** Allows changing the subkey for that module settings storage */
	    get settingsStorage() {
	        return this.constructor.name;
	    }
	    get settings() {
	        if (!this.settingsStorage)
	            return {};
	        if (!Player.LLS) {
	            Player.LLS = {};
	            this.registerDefaultSettings();
	        }
	        else if (!Player.LLS[this.settingsStorage])
	            this.registerDefaultSettings();
	        return Player.LLS[this.settingsStorage];
	    }
	    get Enabled() {
	        if (!Player.LLS || !Player.LLS.GlobalModule || !Player.LLS.GlobalModule.enabled)
	            return false;
	        return (ServerPlayerIsInChatRoom() ||
	            (CurrentModule == "Room" && CurrentScreen == "Crafting"));
	    }
	    init() {
	        this.registerDefaultSettings();
	    }
	    registerDefaultSettings() {
	        var _a;
	        const storage = this.settingsStorage;
	        const defaults = this.defaultSettings;
	        if (!storage || !defaults)
	            return;
	        Player.LLS[storage] = Object.assign(defaults, (_a = Player.LLS[storage]) !== null && _a !== void 0 ? _a : {});
	    }
	    get defaultSettings() {
	        return null;
	    }
	    Load() {
	        // Empty
	    }
	    Run() {
	        // Empty
	    }
	    Unload() {
	        // Empty
	    }
	    Reload() {
	        // Empty
	    }
	    Safeword() {
	        // Empty
	    }
	}

	class SettingsModel {
	    constructor() {
	        this.Version = LLS_VERSION;
	        this.RethrowExceptions = false;
	        this.GlobalModule = {};
	        this.MiscModule = {};
	        this.ArtifactModule = {
	            petsuitCollarSetting: {
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
	                petsuitCollar: { name: "", creator: 0 },
	            },
	            cosplayEarEnabled: false,
	            cosplayEars: { name: "", creator: 0 },
	            cosplayTailColor: "",
	            catSpeechEnabled: false,
	            gagCollarEnabled: false,
	            gagCollar: { name: "", creator: 0 },
	            gagCollarTrigger: "",
	            gagCollarColor: "",
	            leashCollarEnabled: false,
	            leashCollar: { name: "", creator: 0 },
	            leashCollarTrigger: "",
	            leashCollarColor: "",
	            chastityPiercingsEnabled: false,
	            clitChastityPiercing: { name: "", creator: 0 },
	            //nippleChastityPiercing: <CraftModel>{ name: "", creator: 0 },
	            chastityPiercingTrigger: "",
	        };
	    }
	}
	class PublicSettingsModel {
	    constructor() {
	        this.enabled = true;
	        this.Version = LLS_VERSION;
	        this.ArtifactModule = {
	            catSpeechEnabled: false,
	            petsuitCollarSetting: {
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
	                petsuitCollar: { name: "", creator: 0 }
	            },
	            cosplayEarEnabled: false,
	        };
	    }
	}

	class GuiSubscreen {
	    get PreferenceColorPick() {
	        return this.preferenceColorPick;
	    }
	    set PreferenceColorPick(value) {
	        this.preferenceColorPick = value;
	    }
	    get PreferenceColorPickLeft() {
	        return this.preferenceColorPickLeft;
	    }
	    set PreferenceColorPickLeft(value) {
	        this.preferenceColorPickLeft = value;
	    }
	    constructor(module) {
	        this.preferenceColorPick = "";
	        this.preferenceColorPickLeft = true;
	        this.module = module;
	    }
	    get name() {
	        return "UNKNOWN";
	    }
	    get icon() {
	        return ICONS.BLUEBERRY;
	    }
	    get label() {
	        return "UNDEFINED SETTING SCREEN";
	    }
	    get hidden() {
	        return false;
	    }
	    get disabledReason() {
	        return "Setting is unavailable.";
	    }
	    get enabled() {
	        return true;
	    }
	    get message() {
	        return PreferenceMessage;
	    }
	    set message(s) {
	        PreferenceMessage = s;
	    }
	    get SubscreenName() {
	        return SETTING_NAME_PREFIX + this.constructor.name;
	    }
	    setSubscreen(screen) {
	        return setSubscreen(screen);
	    }
	    get settings() {
	        return this.module.settings;
	    }
	    get multipageStructure() {
	        return [[]];
	    }
	    get structure() {
	        return this.multipageStructure[Math.min(PreferencePageCurrent - 1, this.multipageStructure.length - 1)];
	    }
	    get character() {
	        var _a;
	        // Because we're initialized by that instance, it must already exist
	        return (_a = GUI.instance) === null || _a === void 0 ? void 0 : _a.currentCharacter;
	    }
	    getYPos(ix) {
	        return GuiSubscreen.START_Y + GuiSubscreen.Y_MOD * (ix % 9);
	    }
	    getXPos(ix) {
	        return GuiSubscreen.START_X + GuiSubscreen.X_MOD * Math.floor(ix / 9);
	    }
	    HideElements() {
	        this.multipageStructure.forEach((s, ix, arr) => {
	            if (ix != PreferencePageCurrent - 1) {
	                s.forEach((setting) => {
	                    if (setting.type == "text" || setting.type == "number" || setting.type == "colorpicker" || setting.type == "dropdown")
	                        this.ElementHide(setting.id);
	                });
	            }
	        });
	    }
	    Load() {
	        this.multipageStructure.forEach((s) => s.forEach((item) => {
	            switch (item.type) {
	                case "text":
	                    ElementCreateInput(item.id, "text", item.setting(), "255");
	                    break;
	                case "number":
	                    ElementCreateInput(item.id, "number", item.setting(), "255");
	                    break;
	                case "colorpicker":
	                    ElementCreateInput(item.id, "text", item.setting(), "7");
	                    break;
	                case "dropdown":
	                    ElementCreateDropdown(item.id, item.options, () => item.setSetting(ElementValue(item.id)));
	                    this.ElementSetValue(item.id, item.setting());
	                    break;
	            }
	        }));
	    }
	    Run() {
	        let prev = MainCanvas.textAlign;
	        MainCanvas.textAlign = "left";
	        DrawText("- LLS " + this.name + " -", GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
	        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "LLS main menu");
	        if (this.multipageStructure.length > 1) {
	            MainCanvas.textAlign = "center";
	            PreferencePageChangeDraw(1595, 75, this.multipageStructure.length);
	            MainCanvas.textAlign = "left";
	        }
	        this.HideElements();
	        this.structure.forEach((item, ix, arr) => {
	            if (this.PreferenceColorPick != "" &&
	                ((this.getXPos(ix) < 1000 && this.PreferenceColorPickLeft) || (this.getXPos(ix) > 1000 && !this.PreferenceColorPickLeft))) {
	                this.ElementHide(item.id);
	                return;
	            }
	            switch (item.type) {
	                case "checkbox":
	                    this.DrawCheckbox(item.label, item.description, item.setting(), ix, item.disabled);
	                    break;
	                case "text": //runs "dropdown"
	                case "number":
	                case "dropdown":
	                    this.ElementPosition(item.id, item.label, item.description, ix, item.disabled, item.type);
	                    break;
	                case "label":
	                    this.DrawLabel(item.label, item.description, ix);
	                    break;
	                case "colorpicker":
	                    //Position is moved more to the left in DrawColorPicker
	                    this.ElementPosition(item.id, "", "", ix, item.disabled);
	                    this.DrawColorPicker(item.id, item.label, item.description, item.setting(), ix, item.disabled);
	                    break;
	                case "craftselect":
	                    this.DrawCraftSelect(item.id, item.label, item.description, item.setting(), ix, item.disabled);
	                    break;
	                case "button":
	                    let isHovering = MouseIn(this.getXPos(ix), this.getYPos(ix) - 32, 664, 64);
	                    DrawTextFit(item.label, this.getXPos(ix), this.getYPos(ix), 600, isHovering ? "Red" : "Black", "Gray");
	                    let prev = MainCanvas.textAlign;
	                    MainCanvas.textAlign = "center";
	                    DrawButton(this.getXPos(ix) + 464, this.getYPos(ix) - 32, 200, 64, item.buttonText, item.disabled ? "#CCCCCC" : "White", "", "", item.disabled);
	                    MainCanvas.textAlign = prev;
	                    if (isHovering)
	                        this.Tooltip(item.description);
	                    break;
	            }
	        });
	        MainCanvas.textAlign = prev;
	    }
	    Click() {
	        if (MouseIn(1815, 75, 90, 90))
	            return this.Exit();
	        if (MouseIn(1595, 75, 200, 90))
	            this.preferenceColorPick = "";
	        if (this.multipageStructure.length > 1)
	            PreferencePageChangeClick(1595, 75, this.multipageStructure.length);
	        this.structure.forEach((item, ix, arr) => {
	            switch (item.type) {
	                case "checkbox":
	                    if (MouseIn(this.getXPos(ix) + 600, this.getYPos(ix) - 32, 64, 64) && !item.disabled) {
	                        item.setSetting(!item.setting());
	                    }
	                    break;
	                case "colorpicker":
	                    if (MouseIn(this.getXPos(ix) + 600, this.getYPos(ix) - 32, 64, 64) && !item.disabled) {
	                        this.PreferenceColorPick = this.PreferenceColorPick != "" ? "" : item.id;
	                        if (this.getXPos(ix) < 1000) {
	                            this.PreferenceColorPickLeft = false;
	                        }
	                        else {
	                            this.PreferenceColorPickLeft = true;
	                        }
	                    }
	                    break;
	                case "craftselect":
	                    if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) - 32, 200, 64) && !item.disabled) {
	                        let craft = InventoryGet(Player, item.slot);
	                        if (!craft || !craft.Craft)
	                            break;
	                        let name = craft.Craft.Name;
	                        let creator = craft.Craft.MemberNumber;
	                        item.setSetting({ name: name, creator: creator });
	                    }
	                    else if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) + 40, 200, 64) && !item.disabled) {
	                        item.setSetting({ name: "", creator: 0 });
	                    }
	                    break;
	                case "button":
	                    if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) - 32, 200, 64) && !item.disabled) {
	                        item.setSetting(null);
	                    }
	                    break;
	            }
	        });
	    }
	    Exit() {
	        this.multipageStructure.forEach((s) => s.forEach((item) => {
	            switch (item.type) {
	                case "number":
	                    if (CommonIsNumeric(ElementValue(item.id))) {
	                        item.setSetting(ElementValue(item.id));
	                        break;
	                    }
	                    ElementRemove(item.id);
	                case "text":
	                case "dropdown":
	                    item.setSetting(ElementValue(item.id));
	                    ElementRemove(item.id);
	                    break;
	                case "colorpicker":
	                    if (CommonIsColor(ElementValue(item.id))) {
	                        item.setSetting(ElementValue(item.id));
	                    }
	                    ElementRemove(item.id);
	                    break;
	            }
	        }));
	        this.PreferenceColorPick = "";
	        setSubscreen("MainMenu");
	        settingsSave(true);
	    }
	    Unload() {
	        // Empty
	    }
	    onChange(source) {
	        // Empty
	    }
	    Tooltip(text) {
	        DrawTooltip(300, 850, 1400, text, "left");
	    }
	    DrawCheckbox(label, description, value, order, disabled = false) {
	        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
	        DrawCheckbox(this.getXPos(order) + 600, this.getYPos(order) - 32, 64, 64, "", value !== null && value !== void 0 ? value : false, disabled);
	        if (isHovering)
	            this.Tooltip(description);
	    }
	    DrawColorPicker(id, name, description, setting, order, disabled = false) {
	        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        //Label
	        DrawTextFit(name, this.getXPos(order), this.getYPos(order), 300, isHovering ? "Red" : "Black", "Gray");
	        //Color Textfield
	        ElementPosition(id, this.getXPos(order) + 500, this.getYPos(order), 200);
	        let color = "";
	        if (CommonIsColor(ElementValue(id)))
	            color = ElementValue(id);
	        else
	            color = setting;
	        let element = document.getElementById(id);
	        if (!element)
	            return;
	        element.style.color = color;
	        let TextColorHSV = ColorPickerCSSToHSV(color);
	        if (TextColorHSV.V > 0.4) {
	            element.style.backgroundColor = "#111111";
	        }
	        else {
	            element.style.backgroundColor = "#FFFFFF";
	        }
	        if (this.PreferenceColorPick == id) {
	            if (this.getXPos(order) < 1000) {
	                ColorPickerDraw(1250, 185, 675, 800, /** @type {HTMLInputElement} */ document.getElementById(id));
	            }
	            else {
	                ColorPickerDraw(250, 185, 675, 800, /** @type {HTMLInputElement} */ document.getElementById(id));
	            }
	        }
	        else if (this.PreferenceColorPick == "")
	            ColorPickerHide();
	        //Color Picker Button
	        DrawButton(this.getXPos(order) + 600, this.getYPos(order) - 32, 64, 64, "", disabled ? "#ebebe4" : "White", "Icons/Color.png", "", disabled);
	        if (isHovering)
	            this.Tooltip(description);
	    }
	    DrawCraftSelect(id, name, description, setting, order, disabled = false) {
	        let prev = MainCanvas.textAlign;
	        MainCanvas.textAlign = "left";
	        DrawText("Update " + name + ":", this.getXPos(order), this.getYPos(order), disabled ? "Gray" : "Black", "Gray");
	        MainCanvas.textAlign = "center";
	        DrawButton(this.getXPos(order) + 464, this.getYPos(order) - 32, 200, 64, "Update", disabled ? "#CCCCCC" : "White", undefined, "", disabled);
	        if (MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64))
	            this.Tooltip("Sets the " + name + " to the one currently worn");
	        DrawButton(this.getXPos(order) + 464, this.getYPos(order) + 40, 200, 64, "Clear", disabled ? "#CCCCCC" : "White", undefined, "", disabled);
	        if (MouseIn(this.getXPos(order), this.getYPos(order) + 40, 600, 64))
	            this.Tooltip("Set " + name + " to default");
	        MainCanvas.textAlign = "left";
	        if (!!setting) {
	            DrawText("Current Name: " + setting.name, this.getXPos(order), this.getYPos(order) + 50, "Gray", "Gray");
	            if (!!setting.creator && setting.creator > 0)
	                DrawText("Current Crafter: " + setting.creator, this.getXPos(order), this.getYPos(order) + 100, "Gray", "Gray");
	        }
	        MainCanvas.textAlign = prev;
	    }
	    ElementHide(elementId) {
	        ElementPosition(elementId, -999, -999, 1, 1);
	    }
	    ElementPosition(elementId, label, description, order, disabled = false, type = "") {
	        var _a;
	        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
	        if ((type = "text"))
	            ElementPosition(elementId, this.getXPos(order) + 540, this.getYPos(order), 300);
	        else
	            ElementPosition(elementId, this.getXPos(order) + 740, this.getYPos(order), 300);
	        if (disabled)
	            ElementSetAttribute(elementId, "disabled", "true");
	        else {
	            (_a = document.getElementById(elementId)) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
	        }
	        if (isHovering)
	            this.Tooltip(description);
	    }
	    ElementSetValue(elementId, value) {
	        let element = document.getElementById(elementId);
	        if (!!element && value != null)
	            element.value = value;
	        if (element.localName == "div") {
	            // Top of dropdown
	            let displayDiv = element.childNodes[1];
	            if (!!displayDiv)
	                displayDiv.textContent = value;
	        }
	    }
	    DrawLabel(name, description, order) {
	        let isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        DrawTextFit(name, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
	        if (isHovering)
	            this.Tooltip(description);
	    }
	}
	GuiSubscreen.START_X = 180;
	GuiSubscreen.START_Y = 205;
	GuiSubscreen.X_MOD = 950;
	GuiSubscreen.Y_MOD = 75;

	class GuiGlobal extends GuiSubscreen {
	    get name() {
	        return "General";
	    }
	    get settings() {
	        return super.settings;
	    }
	    get structure() {
	        return [
	            {
	                type: "checkbox",
	                label: "LLS enabled:",
	                description: "Enables Lilly's Little Scripts.",
	                setting: () => { var _a; return (_a = Player.LLS.GlobalModule.enabled) !== null && _a !== void 0 ? _a : false; },
	                setSetting: (val) => Player.LLS.GlobalModule.enabled = val
	            },
	            {
	                type: "checkbox",
	                label: "Automatically resist orgasms:",
	                description: "Enables the button to immediately resist orgasms.",
	                setting: () => { var _a; return (_a = this.settings.orgasmSkip) !== null && _a !== void 0 ? _a : false; },
	                setSetting: (val) => this.settings.orgasmSkip = val
	            }
	        ];
	    }
	    Load() {
	        // Load up module settings to ensure defaults..
	        super.Load();
	    }
	}

	class GuiReset extends GuiSubscreen {
	    constructor() {
	        super(...arguments);
	        this.allowedConfirmTime = 0;
	    }
	    get name() {
	        return "Reset all LLS Data";
	    }
	    Load() {
	        this.allowedConfirmTime = Date.now() + 5000;
	        super.Load();
	    }
	    Run() {
	        MainCanvas.textAlign = "center";
	        DrawText(`- Permanent reset of ALL LLS data -`, 1000, 125, "Black");
	        DrawText("- Warning -", 1000, 225, "Black", "Black");
	        DrawText("If you confirm, all LLS data (including settings, overrides, and current states) will be permanently reset!", 1000, 325, "Black");
	        //DrawText("As part of the deletion process, the window will reload, logging you out of your account.", 1000, 500, "Gray");
	        DrawText("You will be able to continue using LLS, but all of your configuration will be reset to default!", 1000, 550, "Gray");
	        DrawText("This action cannot be undone!", 1000, 625, "Red", "Black");
	        if (this.allowedConfirmTime === null) {
	            DrawText("Resetting...", 1000, 720, "Black");
	            return;
	        }
	        const now = Date.now();
	        if (now < this.allowedConfirmTime) {
	            DrawButton(300, 720, 200, 80, `Confirm (${Math.floor((this.allowedConfirmTime - now) / 1000)})`, "#ddd", undefined, undefined, true);
	        }
	        else {
	            DrawButton(300, 720, 200, 80, "Confirm", "White");
	        }
	        DrawButton(1520, 720, 200, 80, "Cancel", "White");
	    }
	    Click() {
	        if (this.allowedConfirmTime === null)
	            return;
	        if (MouseIn(1520, 720, 200, 80))
	            return this.Exit();
	        if (MouseIn(300, 720, 200, 80) && Date.now() >= this.allowedConfirmTime)
	            return this.Confirm();
	    }
	    Confirm() {
	        var _a;
	        this.allowedConfirmTime = null;
	        (_a = getModule("CommandModule")) === null || _a === void 0 ? void 0 : _a.emergencyRelease();
	        this.Exit();
	    }
	}

	class MainMenu extends GuiSubscreen {
	    get name() {
	        return "MainMenu";
	    }
	    get enabled() {
	        return false;
	    }
	    get hidden() {
	        return true;
	    }
	    constructor(module) {
	        super(module);
	        this.subscreens = [];
	        this.subscreens = module.subscreens;
	    }
	    onChange(source) {
	        if (source === this.character.MemberNumber) {
	            this.Load();
	        }
	    }
	    Load() {
	        var _a;
	        // As that Load call was made automatically by BC (though PreferenceSubscreenList) we're not setup fully yet.
	        // Set and bail out, as we're gonna get called again.
	        if (!((_a = GUI.instance) === null || _a === void 0 ? void 0 : _a.currentSubscreen)) {
	            this.setSubscreen(this);
	            return;
	        }
	        super.Load();
	    }
	    Run() {
	        let prev = MainCanvas.textAlign;
	        MainCanvas.textAlign = "left";
	        DrawText(`- Lillys Little Scripts ${LLS_VERSION} -`, GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
	        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	        MainCanvas.textAlign = "center";
	        let i = 0;
	        for (const screen of this.subscreens) {
	            const PX = Math.floor(i / 6);
	            const PY = i % 6;
	            const isDisabled = !screen.enabled;
	            // Skip disabled screens for the time being
	            if (screen.name == "MainMenu" || screen.hidden)
	                continue;
	            DrawButton(150 + 430 * PX, 190 + 120 * PY, 450, 90, "", isDisabled ? "#ddd" : "White", "", isDisabled ? "Setting is deactivated" : "", isDisabled);
	            //DrawImageResize(screen.icon, 150 + 430 * PX + 10, 190 + 120 * PY + 10, 70, 70);
	            MainCanvas.textAlign = "left";
	            DrawTextFit(screen.name, 250 + 430 * PX, 235 + 120 * PY, 340, "Black");
	            MainCanvas.textAlign = "center";
	            i++;
	        }
	        MainCanvas.textAlign = "left";
	        DrawButton(1500, 620, 400, 80, "", "#ffc9c9", "", "Emergency reset of LLS");
	        DrawImageResize("Icons/ServiceBell.png", 1510, 630, 60, 60);
	        DrawTextFit("Reset", 1580, 660, 320, "Black");
	        MainCanvas.textAlign = prev;
	        MainCanvas.textAlign = "left";
	        DrawButton(1500, 620, 400, 80, "", "#ffc9c9", "", "Emergency reset of LLS");
	        DrawImageResize("Icons/ServiceBell.png", 1510, 630, 60, 60);
	        DrawTextFit("Reset", 1580, 660, 320, "Black");
	        MainCanvas.textAlign = prev;
	    }
	    Click() {
	        if (MouseIn(1815, 75, 90, 90))
	            return this.Exit();
	        let i = 0;
	        for (const screen of this.subscreens) {
	            const PX = Math.floor(i / 6);
	            const PY = i % 6;
	            if (screen.name == "MainMenu" || screen.hidden)
	                continue;
	            if (MouseIn(150 + 430 * PX, 190 + 120 * PY, 450, 90) && screen.enabled) {
	                this.setSubscreen(screen);
	                return;
	            }
	            i++;
	        }
	        if (MouseIn(1500, 620, 400, 80))
	            this.setSubscreen(new GuiReset(getModule("CoreModule")));
	    }
	    Exit() {
	        this.setSubscreen(null);
	        PreferenceSubscreenExtensionsClear();
	    }
	}

	class GUI extends BaseModule {
	    get subscreens() {
	        return this._subscreens;
	    }
	    get mainMenu() {
	        return this._mainMenu;
	    }
	    get currentSubscreen() {
	        return this._currentSubscreen;
	    }
	    set currentSubscreen(subscreen) {
	        var _a;
	        if (this._currentSubscreen) {
	            this._currentSubscreen.Unload();
	        }
	        if (typeof subscreen === "string") {
	            const scr = (_a = this._subscreens) === null || _a === void 0 ? void 0 : _a.find((s) => s.name === subscreen);
	            if (!scr)
	                throw `Failed to find screen name ${subscreen}`;
	            this._currentSubscreen = scr;
	        }
	        else {
	            this._currentSubscreen = subscreen;
	        }
	        // Reset that first, in case it gets set in the screen's Load callback
	        PreferenceMessage = "";
	        PreferencePageCurrent = 1;
	        if (this._currentSubscreen) {
	            this._currentSubscreen.Load();
	        }
	    }
	    get currentCharacter() {
	        return Player;
	    }
	    get settingsScreen() {
	        return GuiGlobal;
	    }
	    get settings() {
	        return super.settings;
	    }
	    get settingsStorage() {
	        return "GlobalModule";
	    }
	    constructor() {
	        super();
	        this._currentSubscreen = null;
	        if (GUI.instance) {
	            throw new Error("Duplicate initialization");
	        }
	        this._mainMenu = new MainMenu(this);
	        this._subscreens = [this._mainMenu];
	        GUI.instance = this;
	    }
	    get defaultSettings() {
	        return {
	            enabled: true,
	        };
	    }
	    Load() {
	        // At that point all other modules have been initialized, build the list of their screens
	        for (const module of modules()) {
	            if (!module.settingsScreen)
	                continue;
	            this._subscreens.push(new module.settingsScreen(module));
	        }
	        this._mainMenu.subscreens = this._subscreens;
	        PreferenceRegisterExtensionSetting({
	            Identifier: "LLS",
	            ButtonText: "LLS Settings",
	            Image: ICONS.BLUEBERRY,
	            load: () => {
	                setSubscreen(new MainMenu(this));
	            },
	            run: () => {
	                if (this._currentSubscreen) {
	                    MainCanvas.textAlign = "left";
	                    this._currentSubscreen.Run();
	                    MainCanvas.textAlign = "center";
	                }
	            },
	            click: () => {
	                if (this._currentSubscreen) {
	                    this._currentSubscreen.Click();
	                }
	            },
	            exit: () => {
	                if (this._currentSubscreen) {
	                    this._currentSubscreen.Exit();
	                }
	            },
	            unload: () => {
	                if (this._currentSubscreen) {
	                    this._currentSubscreen.Unload();
	                }
	            },
	        });
	    }
	}
	GUI.instance = null;
	function DrawTooltip(x, y, width, text, align) {
	    const canvas = MainCanvas;
	    const bak = canvas.textAlign;
	    canvas.textAlign = align;
	    canvas.beginPath();
	    canvas.rect(x, y, width, 65);
	    canvas.fillStyle = "#FFFF88";
	    canvas.fillRect(x, y, width, 65);
	    canvas.fill();
	    canvas.lineWidth = 2;
	    canvas.strokeStyle = "black";
	    canvas.stroke();
	    canvas.closePath();
	    DrawTextFit(text, align === "left" ? x + 3 : x + width / 2, y + 33, width - 6, "black");
	    canvas.textAlign = bak;
	}

	const SETTING_FUNC_PREFIX = "PreferenceSubscreen";
	const SETTING_NAME_PREFIX = "LLS";
	const SETTING_FUNC_NAMES = [
	    "Load",
	    "Unload",
	    "Run",
	    "Click",
	    "Exit"
	];
	var ModuleCategory;
	(function (ModuleCategory) {
	    ModuleCategory[ModuleCategory["Core"] = -1] = "Core";
	    ModuleCategory[ModuleCategory["Global"] = 0] = "Global";
	    ModuleCategory[ModuleCategory["Cards"] = 1] = "Cards";
	    ModuleCategory[ModuleCategory["Crafts"] = 2] = "Crafts";
	    ModuleCategory[ModuleCategory["Artifacts"] = 3] = "Artifacts";
	    ModuleCategory[ModuleCategory["RemoteUi"] = 90] = "RemoteUi";
	    ModuleCategory[ModuleCategory["Misc"] = 99] = "Misc";
	    ModuleCategory[ModuleCategory["Commands"] = 100] = "Commands";
	})(ModuleCategory || (ModuleCategory = {}));
	function getCurrentSubscreen() {
	    return GUI.instance && GUI.instance.currentSubscreen;
	}
	function setSubscreen(subscreen) {
	    if (!GUI.instance) {
	        throw new Error("Attempt to set subscreen before init");
	    }
	    GUI.instance.currentSubscreen = subscreen;
	    return GUI.instance.currentSubscreen;
	}

	// Core Module that can handle basic functionality like server handshakes etc.
	// Maybe can consolidate things like hypnosis/suffocation basic state handling too..
	class CoreModule extends BaseModule {
	    get publicSettings() {
	        var _a, _b;
	        let settings = new PublicSettingsModel();
	        for (const m of modules()) {
	            let moduleSettings = (_a = m.settings) !== null && _a !== void 0 ? _a : { enabled: false };
	            let moduleSettingStorage = (_b = m.settingsStorage) !== null && _b !== void 0 ? _b : "";
	            if (Object.hasOwn(settings, moduleSettingStorage)) {
	                let publicModuleSetting = settings[moduleSettingStorage];
	                for (const k of Object.keys(moduleSettings)) {
	                    if (Object.hasOwn(publicModuleSetting, k))
	                        publicModuleSetting[k] = moduleSettings[k];
	                }
	            }
	        }
	        return settings;
	    }
	    get settingsStorage() {
	        return "GlobalModule";
	    }
	    get settings() {
	        return super.settings;
	    }
	    get defaultSettings() {
	        return {
	            enabled: false,
	        };
	    }
	    sendPublicPacket(replyRequested, type = "init") {
	        sendLLSMessage({
	            version: LLS_VERSION,
	            type: type,
	            settings: this.publicSettings,
	            target: null,
	            reply: replyRequested,
	        });
	    }
	    Load() {
	        hookFunction("ChatRoomSync", 1, (args, next) => {
	            this.sendPublicPacket(true);
	            return next(args);
	        }, ModuleCategory.Core);
	        hookFunction("ChatRoomMessage", 1, (args, next) => {
	            this.checkForPublicPacket(args[0]);
	            return next(args);
	        }, ModuleCategory.Core);
	        hookFunction("DialogClick", 1, (args, next) => {
	            next(args);
	            let C = CharacterGetCurrent();
	            if (!C)
	                return;
	            /*if (MouseIn(this.toggleSharedButton.x, this.toggleSharedButton.y, this.toggleSharedButton.width, this.toggleSharedButton.height) &&
	                DialogModeShowsInventory() && (DialogMenuMode === "permissions" || (Player.CanInteract() && !InventoryGroupIsBlocked(C, undefined, true)))) {
	                this.settings.seeSharedCrafts = !this.settings.seeSharedCrafts;
	                settingsSave();
	                DialogInventoryBuild(C, true, false);
	            }*/
	        });
	    }
	    /*_drawShareToggleButton(X: number, Y: number, Width: number, Height: number) {
	        DrawButton(X, Y, Width, Height, "", this.settings.seeSharedCrafts ? "White" : "Red", "", "Toggle Shared Crafts", false);
	        DrawImageResize("Icons/Online.png", X + 2, Y + 2, Width - 4, Height - 4);
	        DrawLineCorner(X + 2, Y + 2, X + Width - 2, Y + Height - 2, X + 2, Y + 2, 2, "Black");
	    }*/
	    Run() {
	        if (ServerPlayerIsInChatRoom()) {
	        }
	    }
	    Unload() {
	        removeAllHooksByModule(ModuleCategory.Core);
	    }
	    checkForPublicPacket(data) {
	        if (data.Sender != Player.MemberNumber &&
	            data.Type == "Hidden" &&
	            data.Content == "LLSMsg" &&
	            !!data.Dictionary &&
	            !!data.Dictionary[0]) {
	            let C = getChatroomCharacter(data.Sender);
	            let msg = data.Dictionary[0].message;
	            switch (msg.type) {
	                case "init":
	                    this.Init(C, msg);
	                    break;
	                case "sync":
	                    this.sync(C, msg);
	                    break;
	                case "command":
	                    this.command(C, msg);
	                    break;
	            }
	        }
	    }
	    Init(Sender, msg) {
	        this.sync(Sender, msg);
	    }
	    sync(Sender, msg) {
	        var _a, _b;
	        if (!Sender)
	            return;
	        Sender.LLS = Object.assign((_a = Sender.LLS) !== null && _a !== void 0 ? _a : {}, (_b = msg.settings) !== null && _b !== void 0 ? _b : {});
	        if (msg.reply) {
	            this.sendPublicPacket(false, msg.type);
	        }
	    }
	    command(Sender, msg) {
	        var _a;
	        if (!msg.command || msg.target != Player.MemberNumber)
	            return;
	        switch (msg.command.name) {
	            case "grab":
	                //getModule<ActivityModule>("ActivityModule")?.IncomingGrab(Sender!, msg.command.args.find(a => a.name == "type")?.value as GrabType);
	                break;
	            case "remote":
	                Object.assign(Player.LLS.ArtifactModule, (_a = msg.settings) === null || _a === void 0 ? void 0 : _a.ArtifactModule);
	                settingsSave(true);
	                sendLocal(`${!Sender ? "Someone" : CharacterNickname(Sender)} has accessed your remote settings!`);
	                break;
	        }
	    }
	}

	// Remote UI Module to handle configuration on other characters
	// Can be used to "program" another character's hypnosis, collar, etc.
	// Framework inspired from BCX
	class CommandModule extends BaseModule {
	    constructor() {
	        super(...arguments);
	        this.llsCommands = [
	            {
	                Tag: "help",
	                Description: ": Opens the help for LLS commands",
	                Action: (args, msg, parsed) => {
	                    let helpLines = [];
	                    this.orderedCommands.forEach((c) => {
	                        helpLines.push(`<br><b>/lls ${c.Tag}</b> ${c.Description}`);
	                    });
	                    let helpText = `<b>- Lillys Little Scrips -</b><br>${helpLines.join()}<br>`;
	                    sendLocal(helpText);
	                },
	            },
	            {
	                Tag: "cards",
	                Description: ": Card deck commands",
	                Action: (args, msg, parsed) => {
	                    let printHelp = false;
	                    if (parsed.length != 0) {
	                        let number = 1;
	                        let target;
	                        console.log(parsed);
	                        switch (parsed[0].toLowerCase()) {
	                            case "shuffle":
	                                this.cards.shuffleDeck();
	                                break;
	                            case "log":
	                                this.cards.printLog(false);
	                                break;
	                            case "deal":
	                                if (parsed.length != 3) {
	                                    printHelp = true;
	                                    break;
	                                }
	                                if (/^[0-9]+$/.test(parsed[1])) {
	                                    target = Number.parseInt(parsed[1], 10);
	                                }
	                                else {
	                                    target = getCharacterNumber(parsed[1]);
	                                }
	                                if (parsed[2] && /^[0-9]+$/.test(parsed[2])) {
	                                    number = Number.parseInt(parsed[2], 10);
	                                }
	                                this.cards.dealCards(target, number, false);
	                                break;
	                            case "dealopen":
	                                if (parsed.length != 3) {
	                                    printHelp = true;
	                                    break;
	                                }
	                                if (/^[0-9]+$/.test(parsed[1])) {
	                                    target = Number.parseInt(parsed[1], 10);
	                                }
	                                else {
	                                    target = getCharacterNumber(parsed[1]);
	                                }
	                                if (parsed[2] && /^[0-9]+$/.test(parsed[2])) {
	                                    number = Number.parseInt(parsed[2], 10);
	                                }
	                                this.cards.dealCards(target, number, true);
	                                break;
	                            case "log":
	                                if (parsed[1] == "public")
	                                    this.cards.printLog(false);
	                                else if (parsed[1] == "private")
	                                    this.cards.printLog(true);
	                                else
	                                    printHelp = true;
	                                break;
	                        }
	                    }
	                    if (printHelp) {
	                        let text = "<br><b>/lls cards shuffle</b>: Shuffles the deck" +
	                            "<br><b>/lls cards deal (player) [number]</b>: Deals [number] cards to the player face down. No number means 1" +
	                            "<br><b>/lls cards dealopen (player) [number]</b>: Deals [number] cards to the player face up. No number means 1" +
	                            "<br><b>/lls cards log (private/public) </b>: Prints the log" +
	                            "<br><b>/lls cards show </b>: Deals an open card";
	                        sendLocal(`<b>- Lillys Little Scrips -</b><br>Cards: ${text}<br>`);
	                    }
	                },
	            },
	            {
	                Tag: "visibility",
	                Description: ": Change the visibility of your character",
	                Action: (args, msg, parsed) => {
	                    let printHelp = false;
	                    if (parsed.length != 0) {
	                        switch (parsed[0].toLowerCase()) {
	                            case "hide":
	                                this.misc.characterToggleVisibility("all", Player);
	                                break;
	                            case "clothes":
	                                this.misc.characterToggleVisibility("bodyOnly", Player);
	                                break;
	                            case "show":
	                                this.misc.characterToggleVisibility("visible", Player);
	                                break;
	                            default:
	                                printHelp = true;
	                        }
	                    }
	                    if (printHelp) {
	                        let text = "For these commands to work you need to enable 'hide' for 'self' in your Script-Settings" +
	                            "<br><b>/lls visibility hide</b>: Hides your character" +
	                            "<br><b>/lls visibility show</b>: Shows your character" +
	                            "<br><b>/lls visibility clothes</b>: Only shows your clothes";
	                        sendLocal(`<b>- Lillys Little Scrips -</b><br>Visibility: ${text}<br>`);
	                    }
	                },
	            }, {
	                Tag: "save",
	                Description: ": Save chatlogs",
	                Action: (args, msg, parsed) => {
	                    let printHelp = true;
	                    if (parsed.length != 0 && /^[0-9]+$/.test(parsed[0])) {
	                        this.save.saveChatOfRoom(Number(parsed[0]));
	                        printHelp = false;
	                    }
	                    if (printHelp) {
	                        let text = "<br><b>/lls save [number]</b>: Saves the chat log of the [number]th room";
	                        sendLocal(`<b>- Lillys Little Scrips -</b><br>Saving: ${text}<br>`);
	                    }
	                }
	            }, {
	                Tag: "savebeeps",
	                Description: ": Save beeps",
	                Action: (args, msg, parsed) => {
	                    this.save.saveBeepsToFile();
	                }
	            }
	        ];
	    }
	    get cards() {
	        return getModule("CardsModule");
	    }
	    get misc() {
	        return getModule("MiscModule");
	    }
	    get save() {
	        return getModule("SavingModule");
	    }
	    get orderedCommands() {
	        let helpCommand = this.getSubcommand("help");
	        let sorted = this.llsCommands.filter((c) => c.Tag != "help").sort((a, b) => a.Tag.localeCompare(b.Tag));
	        return [helpCommand, ...sorted];
	    }
	    get subCommands() {
	        return this.orderedCommands.map((c) => c.Tag);
	    }
	    getSubcommand(name) {
	        return this.llsCommands.find((c) => c.Tag.toLocaleLowerCase() == name.toLocaleLowerCase());
	    }
	    getCharacterByNicknameOrMemberNumber(target) {
	        target = target.toLocaleLowerCase();
	        let targetC;
	        if (CommonIsNumeric(target))
	            targetC = getChatroomCharacter(target);
	        if (!targetC) {
	            targetC = ChatRoomCharacter.find((c) => CharacterNickname(c).toLocaleLowerCase() == target);
	        }
	        return targetC;
	    }
	    Load() {
	        CommandCombine([
	            {
	                Tag: "lls",
	                Description: "or <b>/lls help</b> : Opens the help for LLS commands",
	                AutoComplete(parsed, low, msg) { },
	                Action: (args, msg, parsed) => {
	                    if (parsed.length <= 0) {
	                        this.getSubcommand("help").Action("", msg, []);
	                    }
	                    else {
	                        let command = this.getSubcommand(parsed[0]);
	                        let subArgs = parsed.slice(1);
	                        command === null || command === void 0 ? void 0 : command.Action(subArgs.join(" "), msg, subArgs);
	                    }
	                },
	            },
	        ]);
	    }
	    Unload() {
	        removeAllHooksByModule(ModuleCategory.Commands);
	    }
	    emergencyRelease() {
	        // Run Safeword action on all modules
	        for (const m of modules()) {
	            m.Safeword();
	            if (!!m.settingsStorage)
	                Player.LLS[m.settingsStorage] = m.defaultSettings;
	        }
	        settingsSave(true);
	    }
	}

	let cardDeck = ([] = []);
	let dealersLog = new Map();
	class CardsModule extends BaseModule {
	    shuffleDeck() {
	        cardDeck = [];
	        dealersLog.clear();
	        const cardSuits = ["♥", "♦", "♠", "♣"];
	        const cardRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	        cardSuits.forEach((suit) => {
	            cardRanks.forEach((rank) => {
	                cardDeck.push([rank, suit]);
	            });
	        });
	        shuffleArray(cardDeck);
	        sendActivityMessage(`${Player.Nickname ? Player.Nickname : Player.Name} took the remaining ${cardDeck.length} cards from the deck and shuffled all cards for a new deck.`);
	    }
	    dealCard(target = null, open = false) {
	        var _a, _b;
	        if (cardDeck.length === 0) {
	            this.shuffleDeck();
	        }
	        const card = cardDeck.pop();
	        if (!card)
	            return;
	        if (target) {
	            if (open) {
	                sendActivityMessage(`${Player.Nickname ? Player.Nickname : Player.Name} dealt this card openly to ${getCharacterName(target, "unknown")}: ${card.join("")}`);
	                if (dealersLog.has(target)) {
	                    (_a = dealersLog.get(target)) === null || _a === void 0 ? void 0 : _a.push(card);
	                }
	                else {
	                    dealersLog.set(target, new Array(card));
	                }
	            }
	            else {
	                sendActivityMessage(`${Player.Nickname ? Player.Nickname : Player.Name} dealt you this card face down: ${card.join("")}`, target);
	                if (dealersLog.has(target)) {
	                    (_b = dealersLog.get(target)) === null || _b === void 0 ? void 0 : _b.push(card);
	                }
	                else {
	                    dealersLog.set(target, new Array(card));
	                }
	            }
	        }
	        else {
	            sendActivityMessage(`${Player.Nickname ? Player.Nickname : Player.Name} openly drew this card face up: ${card.join("")}`, target);
	        }
	    }
	    dealCards(targets, numberOfCards, open = false) {
	        if (!targets) {
	        }
	        if (typeof targets === "number") {
	            const target = targets;
	            for (let i = 0; i < numberOfCards; i++) {
	                this.dealCard(target, open);
	            }
	        }
	        if (Array.isArray(targets)) {
	            for (const target of targets !== null && targets !== void 0 ? targets : [null]) {
	                for (let i = 0; i < numberOfCards; i++) {
	                    this.dealCard(target, open);
	                }
	            }
	        }
	    }
	    printLog(priv) {
	        let message = "";
	        for (let [key, value] of dealersLog) {
	            message = message.concat("\n", getCharacterName(key, "unknown"), ": ");
	            value
	                .sort((a, b) => {
	                if (a[1] < b[1])
	                    return -1;
	                if (a[1] > b[1])
	                    return 1;
	                if (Number(a[0])) {
	                    if (Number(b[0])) {
	                        return Number(a[0]) - Number(b[0]);
	                    }
	                    return -1;
	                }
	                else if (Number(b[0])) {
	                    return 1;
	                }
	                if (a[0] == "A") {
	                    return 1;
	                }
	                else if (b[0] == "A") {
	                    return -1;
	                }
	                if (a[0] == "K") {
	                    return 1;
	                }
	                else if (b[0] == "K") {
	                    return -1;
	                }
	                if (a[0] == "Q") {
	                    return 1;
	                }
	                else if (b[0] == "Q") {
	                    return -1;
	                }
	                if (a[0] == "J") {
	                    return 1;
	                }
	                else if (b[0] == "J") {
	                    return -1;
	                }
	                return 0;
	            })
	                .forEach((e) => (message += e.join("") + ", "));
	            message = message.slice(0, -2);
	        }
	        if (priv) {
	            sendLocal(message);
	        }
	        else {
	            sendMessage(message);
	        }
	    }
	    Unload() {
	        removeAllHooksByModule(ModuleCategory.Commands);
	    }
	}

	class CraftsModule extends BaseModule {
	    constructor() {
	        super(...arguments);
	        this.private = false;
	    }
	    get Enabled() {
	        return super.Enabled;
	    }
	    Load() {
	        /*hookFunction("CraftingRun", 1, (args, next) => {
	            next(args)
	            if(!this.Enabled) return;
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
	            if(!this.Enabled) return;
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
	        }, ModuleCategory.Crafts);*/
	    }
	    Unload() {
	        removeAllHooksByModule(ModuleCategory.Commands);
	    }
	}

	class MiscModule extends BaseModule {
	    get settings() {
	        return super.settings;
	    }
	    get defaultSettings() {
	        return {
	            orgasmSkip: false,
	        };
	    }
	    Safeword() { }
	    Load() {
	        // To draw the button for orgasm resist
	        hookFunction("ChatRoomRun", 1, (args, next) => {
	            next(args);
	            if (!this.Enabled)
	                return;
	            if (this.settings.orgasmSkip) {
	                if (Player.ArousalSettings != null &&
	                    Player.ArousalSettings.Active != null &&
	                    Player.ArousalSettings.Active != "Inactive" &&
	                    Player.ArousalSettings.Active != "NoMeter") {
	                    if (Player.ArousalSettings.OrgasmTimer != null &&
	                        typeof Player.ArousalSettings.OrgasmTimer === "number" &&
	                        !isNaN(Player.ArousalSettings.OrgasmTimer) &&
	                        Player.ArousalSettings.OrgasmTimer > 0) {
	                        if (Player.ArousalSettings.OrgasmStage == 1)
	                            DrawButton(10, 10, 250, 64, "Autoresist", "White");
	                    }
	                }
	            }
	        });
	        //To click the button for orgasm resist
	        hookFunction("ChatRoomClick", 1, (args, next) => {
	            next(args);
	            if (!this.Enabled)
	                return;
	            if (this.settings.orgasmSkip) {
	                if (Player.ArousalSettings != null &&
	                    Player.ArousalSettings.OrgasmTimer != null &&
	                    typeof Player.ArousalSettings.OrgasmTimer === "number" &&
	                    !isNaN(Player.ArousalSettings.OrgasmTimer) &&
	                    Player.ArousalSettings.OrgasmTimer > 0) {
	                    if (MouseX >= 10 && MouseX <= 260 && MouseY >= 10 && MouseY <= 74 && Player.ArousalSettings.OrgasmStage == 1) {
	                        ActivityOrgasmGameGenerate(ActivityOrgasmGameDifficulty + 1);
	                    }
	                }
	            }
	        });
	        // Screenshot Cross Origin
	        patchFunction("DrawRoomBackground", {
	            'const img = URL !== "" ? DrawGetImage(URL) : undefined;': 'const img = URL !== "" ? DrawGetImage(URL) : undefined;\n\t\tif(img) img.crossOrigin = "anonymous";',
	        });
	    }
	    characterToggleVisibility(mode, C) {
	        let script = InventoryWear(C, "Script", "ItemScript");
	        if (!script)
	            return;
	        script.Property = script.Property || {};
	        if (mode === "bodyOnly") {
	            script.Property.Hide = AssetGroup
	                .filter(g => g.Category === "Appearance" && !g.Clothing && !["Height", "Emoticon", "Pronouns"]
	                .includes(g.Name)).map(g => g.Name);
	        }
	        else if (mode === "all") {
	            script.Property.Hide = AssetGroup.map(g => g.Name).filter(gn => gn !== "ItemScript");
	        }
	        else {
	            InventoryRemove(C, "ItemScript", true);
	        }
	        CharacterScriptRefresh(C);
	    }
	    Unload() { }
	}

	class GuiArtifact extends GuiSubscreen {
	    get name() {
	        return "Artifacts";
	    }
	    get icon() {
	        return "";
	    }
	    get settings() {
	        return super.settings;
	    }
	    get multipageStructure() {
	        return [
	            [
	                {
	                    type: "checkbox",
	                    label: "Enable Petsuit Collar:",
	                    description: "Enables petsuit collar features.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.enabled) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.enabled = val),
	                    disabled: this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "colorpicker",
	                    id: "petsuitCollar_buckleColor",
	                    label: "Petsuit Buckle Color:",
	                    description: "Sets the color of the buckles on the petsuit.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.buckleColor) !== null && _a !== void 0 ? _a : "#5AC5EE"; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.buckleColor = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "colorpicker",
	                    id: "petsuitCollar_strapColor",
	                    label: "Petsuit Strap Color:",
	                    description: "Sets the color of the straps on the petsuit.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.strapColor) !== null && _a !== void 0 ? _a : "#2C2C2C"; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.strapColor = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "checkbox",
	                    label: "Lock Owner:",
	                    description: "Only allows the person that locked the collar to trigger it.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.lockOwner) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.lockOwner = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "text",
	                    id: "petsuitCollar_allowedMembers",
	                    label: "Allowed Member IDs:",
	                    description: "A list of member IDs seperated by a comma, who are allowed to use the collar.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.allowedMembers) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.allowedMembers = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "text",
	                    id: "petsuitCollar_trigger",
	                    label: "Trigger:",
	                    description: "Sets the trigger word/sentence for the petsuit collar.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.trigger) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.trigger = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "checkbox",
	                    label: "Allow Self-Trigger:",
	                    description: "Allows the wearer of the collar to trigger the speech commands.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.allowSelfTrigger) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.allowSelfTrigger = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "checkbox",
	                    label: "Remote Access:",
	                    description: "Allows other users to change the settings.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.remoteAccess) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.remoteAccess = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "checkbox",
	                    label: "Lockable:",
	                    description: "Allows other users to lock you out of all the settings.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.lockable) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.lockable = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "craftselect",
	                    id: "petsuitCollar",
	                    label: "Petsuit Collar",
	                    slot: "ItemNeck",
	                    description: "The current collar equipped.",
	                    setting: () => this.settings.petsuitCollarSetting.petsuitCollar,
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.petsuitCollar = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || this.settings.petsuitCollarSetting.locked,
	                },
	                {
	                    type: "null"
	                },
	            ],
	            [
	                {
	                    type: "checkbox",
	                    label: "Catmask speech:",
	                    description: "Forces the wearer to speek like a cat when wearing a cat mask.",
	                    setting: () => { var _a; return (_a = this.settings.catSpeechEnabled) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.catSpeechEnabled = val),
	                },
	                {
	                    type: "checkbox",
	                    label: "Cosplay Ears:",
	                    description: "Enables cosplay ears features.",
	                    setting: () => { var _a; return (_a = this.settings.cosplayEarEnabled) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.cosplayEarEnabled = val),
	                },
	                {
	                    type: "colorpicker",
	                    id: "cosplayTailColor",
	                    label: "Cosplay Tail Color:",
	                    description: "Sets the color of the tail on the cosplay outfit.",
	                    setting: () => { var _a; return (_a = this.settings.cosplayTailColor) !== null && _a !== void 0 ? _a : "#060606"; },
	                    setSetting: (val) => (this.settings.cosplayTailColor = val),
	                    disabled: !this.settings.cosplayEarEnabled,
	                },
	                {
	                    type: "craftselect",
	                    id: "cosplayEars",
	                    label: "Cat Cosplay Mask",
	                    slot: "ItemHood",
	                    description: "The current mask equipped.",
	                    setting: () => this.settings.cosplayEars,
	                    setSetting: (val) => (this.settings.cosplayEars = val),
	                    disabled: !this.settings.cosplayEarEnabled,
	                },
	                {
	                    type: "null"
	                },
	                {
	                    type: "checkbox",
	                    label: "Gag Collar:",
	                    description: "Enables gag collar features.",
	                    setting: () => { var _a; return (_a = this.settings.gagCollarEnabled) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.gagCollarEnabled = val),
	                },
	                {
	                    type: "text",
	                    id: "gagCollar_trigger",
	                    label: "Gag Collar Trigger:",
	                    description: "Sets the trigger word/sentence for the gag collar.",
	                    setting: () => { var _a; return (_a = this.settings.gagCollarTrigger) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.gagCollarTrigger = val),
	                    disabled: !this.settings.gagCollarEnabled,
	                },
	                {
	                    type: "colorpicker",
	                    id: "gagCollar_color",
	                    label: "Gag Collar Color:",
	                    description: "Sets the color of the gag on the gag collar.",
	                    setting: () => { var _a; return (_a = this.settings.gagCollarColor) !== null && _a !== void 0 ? _a : "#4FD5F7"; },
	                    setSetting: (val) => (this.settings.gagCollarColor = val),
	                    disabled: !this.settings.gagCollarEnabled,
	                },
	                {
	                    type: "null"
	                },
	                {
	                    type: "craftselect",
	                    id: "gagCollar",
	                    label: "Gag Collar",
	                    slot: "ItemNeck",
	                    description: "The current collar equipped.",
	                    setting: () => this.settings.gagCollar,
	                    setSetting: (val) => (this.settings.gagCollar = val),
	                    disabled: !this.settings.gagCollarEnabled,
	                },
	                {
	                    type: "null"
	                },
	                {
	                    type: "checkbox",
	                    label: "Leash Collar:",
	                    description: "Enables leash collar features.",
	                    setting: () => { var _a; return (_a = this.settings.leashCollarEnabled) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.leashCollarEnabled = val),
	                },
	                {
	                    type: "text",
	                    id: "leashCollar_trigger",
	                    label: "Leash Collar Trigger:",
	                    description: "Sets the trigger word/sentence for the leash collar.",
	                    setting: () => { var _a; return (_a = this.settings.leashCollarTrigger) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.leashCollarTrigger = val),
	                    disabled: !this.settings.leashCollarEnabled,
	                },
	                {
	                    type: "colorpicker",
	                    id: "leashCollar_color",
	                    label: "Leash Collar Color:",
	                    description: "Sets the color of the leash on the leash collar.",
	                    setting: () => { var _a; return (_a = this.settings.leashCollarColor) !== null && _a !== void 0 ? _a : "#333333"; },
	                    setSetting: (val) => (this.settings.leashCollarColor = val),
	                    disabled: !this.settings.leashCollarEnabled,
	                },
	                {
	                    type: "craftselect",
	                    id: "leashCollar",
	                    label: "Leash Collar",
	                    slot: "ItemNeck",
	                    description: "The current collar equipped.",
	                    setting: () => this.settings.leashCollar,
	                    setSetting: (val) => (this.settings.leashCollar = val),
	                    disabled: !this.settings.leashCollarEnabled,
	                },
	                {
	                    type: "null"
	                },
	            ], [
	                {
	                    type: "checkbox",
	                    label: "Chastity Piercings:",
	                    description: "Enables chastity piercings features.",
	                    setting: () => { var _a; return (_a = this.settings.chastityPiercingsEnabled) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.chastityPiercingsEnabled = val),
	                },
	                {
	                    type: "text",
	                    id: "chastityPiercing_trigger",
	                    label: "Chastity Piercing Trigger:",
	                    description: "Sets the trigger word/sentence for the chastity piercings.",
	                    setting: () => { var _a; return (_a = this.settings.chastityPiercingTrigger) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.chastityPiercingTrigger = val),
	                    disabled: !this.settings.chastityPiercingsEnabled,
	                },
	                {
	                    type: "craftselect",
	                    id: "clitChastityPiercing",
	                    label: "Clit Chastity Piercing",
	                    slot: "ItemVulvaPiercings",
	                    description: "",
	                    setting: () => this.settings.clitChastityPiercing,
	                    setSetting: (val) => (this.settings.clitChastityPiercing = val),
	                    disabled: !this.settings.chastityPiercingsEnabled,
	                },
	                {
	                    type: "null"
	                },
	                /*<Setting>{
	                    type: "craftselect",
	                    id: "nippleChastityPiercing",
	                    label: "Nipple Chastity Piercing",
	                    slot: "ItemNipplesPiercings",
	                    description: "",
	                    setting: () => this.settings.nippleChastityPiercing,
	                    setSetting: (val) => (this.settings.nippleChastityPiercing = val),
	                    disabled: !this.settings.chastityPiercingsEnabled,
	                },
	                <Setting>{
	                    type: "null"
	                }*/
	            ],
	        ];
	    }
	    Run() {
	        super.Run();
	    }
	    Click() {
	        super.Click();
	    }
	    Exit() {
	        super.Exit();
	    }
	    Load() {
	        var _a;
	        // Load up module settings to ensure defaults..
	        (_a = getModule("MiscModule")) === null || _a === void 0 ? void 0 : _a.settings;
	        super.Load();
	    }
	}

	let petsuitActivated = false;
	let clothesSafe = "";
	let disallowedItemsPetsuit = [
	    "Bib",
	    "LargeBelt",
	    "Camera1",
	    "FrillyApron",
	    "FurBolero",
	    "LeatherStraps",
	    "Scarf",
	    "StudentOutfit3Bow1",
	    "StudentOutfit3Bow2",
	    "StudentOutfit3Bow3",
	    "StudentOutfit3Scarf",
	];
	class ArtifactModule extends BaseModule {
	    get settingsStorage() {
	        return "ArtifactModule";
	    }
	    get settings() {
	        return super.settings;
	    }
	    get defaultSettings() {
	        return {
	            ropeOfTighteningEnabled: false,
	            publicRopeOfTighteningEnabled: false,
	            catSpeechEnabled: false,
	            petsuitCollarSetting: {
	                enabled: false,
	                remoteAccess: false,
	                lockable: false,
	                speechEnabled: false,
	                trigger: "",
	                allowedMembers: "",
	                allowSelfTrigger: false,
	                lockOwner: false,
	                locked: false,
	                buckleColor: "#5AC5EE",
	                strapColor: "#2C2C2C",
	                petsuitCollar: { name: "", creator: 0 },
	            },
	            cosplayEarEnabled: false,
	            cosplayEars: { name: "", creator: 0 },
	            cosplayTailColor: "#060606",
	            gagCollarEnabled: false,
	            gagCollar: { name: "", creator: 0 },
	            gagCollarTrigger: "",
	            gagCollarColor: "#4FD5F7",
	            leashCollarEnabled: false,
	            leashCollar: { name: "", creator: 0 },
	            leashCollarTrigger: "",
	            leashCollarColor: "#333333",
	            chastityPiercingsEnabled: false,
	            clitChastityPiercing: { name: "", creator: 0 },
	            nippleChastityPiercing: { name: "", creator: 0 },
	            chastityPiercingTrigger: "",
	        };
	    }
	    get settingsScreen() {
	        return GuiArtifact;
	    }
	    get Enabled() {
	        return super.Enabled;
	    }
	    Load() {
	        onChat(100, ModuleCategory.Artifacts, false, true, (data, sender, msg, metadata) => {
	            if (!this.Enabled)
	                return;
	            let artifactSettings = this.settings;
	            if (artifactSettings && artifactSettings.petsuitCollarSetting.enabled) {
	                if (artifactSettings.petsuitCollarSetting.trigger.trim() != "" &&
	                    isPhraseInString(msg.toLowerCase(), artifactSettings.petsuitCollarSetting.trigger.toLowerCase(), false) &&
	                    this.wearingPetsuitCollar(Player)) {
	                    if ((sender === null || sender === void 0 ? void 0 : sender.IsPlayer()) && !artifactSettings.petsuitCollarSetting.allowSelfTrigger) { }
	                    else if (sender === null || sender === void 0 ? void 0 : sender.IsPlayer())
	                        this.petsuitCollarToggle(Player);
	                    else if (this.isAllowedPetsuitCollarMember(sender)) {
	                        this.petsuitCollarToggle(Player);
	                    }
	                }
	            }
	            if (artifactSettings.gagCollarEnabled && this.wearingGagCollar(Player)) {
	                if (artifactSettings.gagCollarTrigger.trim() != "" && isPhraseInString(msg.toLowerCase(), artifactSettings.gagCollarTrigger.toLowerCase(), false)) {
	                    this.toggleGagCollar(Player);
	                }
	            }
	            if (artifactSettings.leashCollarEnabled && this.wearingLeashCollar(Player)) {
	                if (artifactSettings.leashCollarTrigger.trim() != "" && isPhraseInString(msg.toLowerCase(), artifactSettings.leashCollarTrigger.toLowerCase(), false)) {
	                    this.toggleLeashCollar(Player);
	                }
	            }
	            if (artifactSettings.chastityPiercingsEnabled && artifactSettings.chastityPiercingTrigger.trim() != "" && isPhraseInString(msg.toLowerCase(), artifactSettings.chastityPiercingTrigger.toLowerCase(), false)) {
	                if (this.wearingClitChastityPiercing(Player)) {
	                    this.toggleClitChastityPiercing(Player);
	                }
	                /*if (this.wearingNippleChastityPiercing(Player)) {
	                    this.toggleNippleChastityPiercing(Player);
	                }*/
	            }
	            return;
	        });
	        onActivity(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => { });
	        onAction(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	            if (!this.Enabled)
	                return;
	            if (msg == "ItemHoodHarnessCatMaskSetEars") {
	                this.activateCosplayTail(Player);
	            }
	            else if (msg == "ItemHoodHarnessCatMaskSetNoEars") {
	                this.deactivateCosplayTail(Player);
	            }
	            return;
	        });
	        onSentMessage(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	            if (!this.Enabled)
	                return;
	            if (data.Type === "Chat") {
	                sender = sender ? sender : Player;
	                this.catSpeech(data);
	            }
	            return;
	        });
	    }
	    // Chastity Piercings
	    wearingClitChastityPiercing(C) {
	        var _a, _b, _c, _d;
	        let piercing = InventoryGet(C, "ItemVulvaPiercings");
	        if (!piercing)
	            return false;
	        let piercingName = (_b = (_a = piercing === null || piercing === void 0 ? void 0 : piercing.Craft) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : "";
	        let piercingCreator = (_d = (_c = piercing === null || piercing === void 0 ? void 0 : piercing.Craft) === null || _c === void 0 ? void 0 : _c.MemberNumber) !== null && _d !== void 0 ? _d : -1;
	        return piercingName == this.settings.clitChastityPiercing.name && piercingCreator == this.settings.clitChastityPiercing.creator;
	    }
	    toggleClitChastityPiercing(C) {
	        let bra = InventoryGet(C, "ItemPelvis");
	        if (bra) {
	            this.deactivateClitChastityPiercing(C);
	        }
	        else {
	            this.activateClitChastityPiercing(C);
	        }
	    }
	    activateClitChastityPiercing(C) {
	        InventoryWear(C, "PolishedChastityBelt", "ItemPelvis", "Default");
	        lockItem(C, InventoryGet(C, "ItemPelvis"), "PasswordPadlock");
	        sendAction("Chastity belt activate - TODO");
	        ChatRoomCharacterUpdate(C);
	    }
	    deactivateClitChastityPiercing(C) {
	        InventoryRemove(C, "ItemPelvis");
	        sendAction("Chastity belt deactivate - TODO");
	        ChatRoomCharacterUpdate(C);
	    }
	    /*wearingNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): boolean {
	        let piercing = InventoryGet(C, "ItemNipplesPiercings");
	        if (!piercing) return false;
	        let piercingName = piercing?.Craft?.Name ?? "";
	        let piercingCreator = piercing?.Craft?.MemberNumber ?? -1;
	        return piercingName == this.settings.nippleChastityPiercing.name && piercingCreator == this.settings.nippleChastityPiercing.creator;
	    }

	    toggleNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
	        let belt = InventoryGet(C, "ItemBreast");
	        if (belt){
	            this.deactivateNippleChastityPiercing(C);
	        }else{
	            this.activateNippleChastityPiercing(C);
	        }
	    }

	    activateNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
	        InventoryWear(C, "PolishedChastityBra", "ItemBreast", "Default");
	        lockItem(C, InventoryGet(C, "ItemBreast"), "PasswordPadlock");
	        sendAction("Chastity bra activate - TODO")
	        ChatRoomCharacterUpdate(C);
	    }

	    deactivateNippleChastityPiercing(C: OtherCharacter | PlayerCharacter): void {
	        InventoryRemove(C, "ItemBreast");
	        sendAction("Chastity bra deactivate - TODO");
	        ChatRoomCharacterUpdate(C);
	    }*/
	    // Leash Collar
	    wearingLeashCollar(C) {
	        var _a, _b, _c, _d;
	        let collar = InventoryGet(C, "ItemNeck");
	        if (!collar)
	            return false;
	        let collarName = (_b = (_a = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : "";
	        let collarCreator = (_d = (_c = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _c === void 0 ? void 0 : _c.MemberNumber) !== null && _d !== void 0 ? _d : -1;
	        return collarName == this.settings.leashCollar.name && collarCreator == this.settings.leashCollar.creator;
	    }
	    toggleLeashCollar(C) {
	        let leash = InventoryGet(C, "ItemNeckRestraints");
	        if (leash) {
	            this.deactivateLeashCollar(C);
	        }
	        else {
	            this.activateLeashCollar(C);
	        }
	    }
	    activateLeashCollar(C) {
	        let color = this.settings.leashCollarColor;
	        if (!color.startsWith("#"))
	            color = "#" + color;
	        InventoryWear(C, "CollarLeash", "ItemNeckRestraints", color);
	        lockItem(C, InventoryGet(C, "ItemNeckRestraints"), "PasswordPadlock");
	        sendAction("A leash extends from %NAME%'s collar, ready to be used.");
	        ChatRoomCharacterUpdate(C);
	    }
	    deactivateLeashCollar(C) {
	        InventoryRemove(C, "ItemNeckRestraints");
	        sendAction("The leash retracts back into %NAME%'s collar.");
	        ChatRoomCharacterUpdate(C);
	    }
	    // Gag collar
	    wearingGagCollar(C) {
	        var _a, _b, _c, _d;
	        let collar = InventoryGet(C, "ItemNeck");
	        if (!collar)
	            return false;
	        let collarName = (_b = (_a = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : "";
	        let collarCreator = (_d = (_c = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _c === void 0 ? void 0 : _c.MemberNumber) !== null && _d !== void 0 ? _d : -1;
	        return collarName == this.settings.gagCollar.name && collarCreator == this.settings.gagCollar.creator;
	    }
	    toggleGagCollar(C) {
	        if (InventoryGet(C, "ItemMouth2")) {
	            this.deactivateGagCollar(C);
	        }
	        else {
	            this.activateGagCollar(C);
	        }
	    }
	    activateGagCollar(C) {
	        let color = this.settings.gagCollarColor;
	        if (!color.startsWith("#"))
	            color = "#" + color;
	        InventoryWear(C, "BallGag", "ItemMouth2", color);
	        let gag = InventoryGet(C, "ItemMouth2");
	        if (gag && gag.Property && gag.Property.TypeRecord)
	            gag.Property.TypeRecord.typed = 2;
	        lockItem(C, InventoryGet(C, "ItemMouth2"), "PasswordPadlock");
	        sendAction("A gag extends from %NAME%'s collar, spreading %POSSESSIVE% lips and muffling %POSSESSIVE% words.");
	        ChatRoomCharacterUpdate(C);
	    }
	    deactivateGagCollar(C) {
	        InventoryRemove(C, "ItemMouth2");
	        sendAction("The gag retracts back into %NAME%'s collar.");
	        ChatRoomCharacterUpdate(C);
	    }
	    //Cosplay Ears + Tail
	    wearingCosplayEars(C) {
	        var _a, _b, _c, _d, _e;
	        let ears = InventoryGet(C, "ItemHood");
	        let earSetting = this.settings.cosplayEars;
	        let enabled = this.settings.cosplayEarEnabled;
	        if (!ears || !enabled || !earSetting)
	            return false;
	        if (!earSetting.creator) {
	            return ears.Asset.Name != "HarnessCatMask";
	        }
	        else {
	            let collarName = (_c = (_b = (_a = ears.Craft) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : ears === null || ears === void 0 ? void 0 : ears.Asset.Name) !== null && _c !== void 0 ? _c : "";
	            let collarCreator = (_e = (_d = ears === null || ears === void 0 ? void 0 : ears.Craft) === null || _d === void 0 ? void 0 : _d.MemberNumber) !== null && _e !== void 0 ? _e : -1;
	            return collarName == earSetting.name && collarCreator == earSetting.creator;
	        }
	    }
	    activateCosplayTail(C) {
	        if (!this.wearingCosplayEars(C))
	            return;
	        let color = this.settings.cosplayTailColor;
	        if (!color.startsWith("#"))
	            color = "#" + color;
	        InventoryWear(C, "KittenTailStrap1", "TailStraps", color);
	        ChatRoomCharacterUpdate(C);
	    }
	    deactivateCosplayTail(C) {
	        if (!this.wearingCosplayEars(C))
	            return;
	        InventoryRemove(C, "TailStraps");
	        ChatRoomCharacterUpdate(C);
	    }
	    // Cat Speech Mask
	    catSpeech(data) {
	        let catSpeech = this.settings.catSpeechEnabled;
	        if (!catSpeech)
	            return;
	        if (!this.wearingCatSpeechMask(Player))
	            return;
	        data.Content = data.Content.replace(/\b\S+\b/g, (str) => {
	            if (str.length <= 3)
	                return "mew";
	            else {
	                let length = str.length - 3;
	                return "m" + "e".repeat(length) + "ow";
	            }
	        });
	        return;
	    }
	    wearingCatSpeechMask(C) {
	        let gag1 = InventoryGet(C, "ItemMouth");
	        let gag2 = InventoryGet(C, "ItemMouth2");
	        let gag3 = InventoryGet(C, "ItemMouth3");
	        if (gag1 && (gag1.Asset.Name == "KittyHarnessPanelGag" || gag1.Asset.Name == "KittyGag" || gag1.Asset.Name == "KittyMuzzleGag"))
	            return true;
	        else if (gag2 && (gag2.Asset.Name == "KittyHarnessPanelGag" || gag2.Asset.Name == "KittyGag" || gag2.Asset.Name == "KittyMuzzleGag"))
	            return true;
	        else if (gag3 && (gag3.Asset.Name == "KittyHarnessPanelGag" || gag3.Asset.Name == "KittyGag" || gag3.Asset.Name == "KittyMuzzleGag"))
	            return true;
	        return false;
	    }
	    // Petsuit Collar
	    wearingPetsuitCollar(C) {
	        var _a, _b, _c, _d, _e;
	        let collar = InventoryGet(C, "ItemNeck");
	        let collarSettings = this.settings.petsuitCollarSetting;
	        if (!collar || !collarSettings || !collarSettings.enabled)
	            return false;
	        if (!collarSettings.petsuitCollar.name)
	            return true;
	        // If configured collar is not crafted, let any inherited collar work.
	        if (!collarSettings.petsuitCollar.creator) {
	            return (collar === null || collar === void 0 ? void 0 : collar.Asset.Name) == collarSettings.petsuitCollar.name;
	        }
	        else {
	            let collarName = (_c = (_b = (_a = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : collar === null || collar === void 0 ? void 0 : collar.Asset.Name) !== null && _c !== void 0 ? _c : "";
	            let collarCreator = (_e = (_d = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _d === void 0 ? void 0 : _d.MemberNumber) !== null && _e !== void 0 ? _e : -1;
	            return collarName == collarSettings.petsuitCollar.name && collarCreator == collarSettings.petsuitCollar.creator;
	        }
	    }
	    petsuitCollarToggle(C) {
	        if (petsuitActivated) {
	            this.petsuitCollarDeactivate(C);
	        }
	        else {
	            this.petsuitCollarActivate(C);
	        }
	    }
	    petsuitCollarActivate(C) {
	        var _a, _b;
	        let collarSettings = this.settings.petsuitCollarSetting;
	        let buckleColor = (_a = collarSettings === null || collarSettings === void 0 ? void 0 : collarSettings.buckleColor) !== null && _a !== void 0 ? _a : "#5AC5EE";
	        let strapColor = (_b = collarSettings === null || collarSettings === void 0 ? void 0 : collarSettings.strapColor) !== null && _b !== void 0 ? _b : "#2C2C2C";
	        if (!buckleColor.startsWith("#"))
	            buckleColor = "#" + buckleColor;
	        if (!strapColor.startsWith("#"))
	            strapColor = "#" + strapColor;
	        InventoryWear(C, "ShinyPetSuit", "ItemArms", ["#3A3A3A", "Default", strapColor, buckleColor, "Default"], 1000, C.MemberNumber, {
	            Item: "ShinyPetSuit",
	            ItemProperty: {},
	            Property: "Comfy",
	            Lock: "",
	            Name: "Pet Collar Petsuit",
	            Description: `A Petsuit which has extended from the collar to cover the entire body. Whisper \"!petsuitcollar\" to ${C.Nickname == "" ? C.Name : C.Nickname} to deactivate.`,
	            Color: "#3A3A3A,Default,#2C2C2C,#5AC5EE,Default",
	            Private: true,
	            Type: "Closed",
	            OverridePriority: 532328,
	            MemberNumber: C.MemberNumber,
	            MemberName: C.Name,
	            TypeRecord: {
	                typed: 1,
	            },
	        });
	        let suit = InventoryGet(C, "ItemArms");
	        if (suit && suit.Property && suit.Property.TypeRecord)
	            suit.Property.TypeRecord.typed = 1;
	        //if(suit && suit.Property) suit.Property.Hide = ["Bra", "Panties", "ItemNipples","ItemNipplesPiercings", "ItemBreasts", "Socks", "Suit", "SuitLower", "SocksLeft", "SocksRight"];
	        clothesSafe = LZString.compressToBase64(JSON.stringify(itemsToItemBundles(C.Appearance)));
	        let accessory = InventoryGet(C, "ClothAccessory");
	        let socksLeft = InventoryGet(C, "SocksLeft");
	        let socksRight = InventoryGet(C, "SocksRight");
	        if (accessory && disallowedItemsPetsuit.indexOf(accessory.Asset.Name) != -1) {
	            InventoryRemove(C, "ClothAccessory");
	        }
	        if (socksLeft) {
	            InventoryRemove(C, "SocksLeft");
	        }
	        if (socksRight) {
	            InventoryRemove(C, "SocksRight");
	        }
	        lockItem(C, InventoryGet(C, "ItemArms"), "PasswordPadlock");
	        ChatRoomCharacterUpdate(C);
	        sendAction("The collar on %NAME%'s neck releases a strange black fluid, which runs over %POSSESSIVE% body, covering it in a shiny black material that forms a petsuit.");
	        petsuitActivated = true;
	    }
	    petsuitCollarDeactivate(C) {
	        InventoryRemove(C, "ItemArms");
	        let items = JSON.parse(LZString.decompressFromBase64(clothesSafe));
	        items.forEach((item) => {
	            var _a;
	            let asset = AssetGet(C.AssetFamily, item.Group, item.Name);
	            if (!!asset) {
	                let isRoomDisallowed = !InventoryChatRoomAllow((_a = asset === null || asset === void 0 ? void 0 : asset.Category) !== null && _a !== void 0 ? _a : []);
	                if (isRoomDisallowed) {
	                    let newItem = InventoryWear(C, item.Name, item.Group, item.Color, item.Difficulty, -1, item.Craft, false);
	                    if (!!newItem) {
	                        if (!!item.Property)
	                            newItem.Property = item.Property;
	                    }
	                }
	            }
	        });
	        ChatRoomCharacterUpdate(C);
	        sendAction("The petsuit on %NAME% turns back into the black fluid and returns into %POSSESSIVE% collar.");
	        petsuitActivated = false;
	    }
	    get allowedPetsuitCollarMembers() {
	        let stringList = getDelimitedList(this.settings.petsuitCollarSetting.allowedMembers, ",");
	        let memberList = stringList
	            .filter((str) => !!str && +str === +str)
	            .map((str) => parseInt(str))
	            .filter((id) => id != Player.MemberNumber);
	        return memberList;
	    }
	    isAllowedPetsuitCollarMember(member) {
	        var _a;
	        if (!member)
	            return false;
	        if (this.settings.petsuitCollarSetting.lockOwner == true) {
	            let collar = InventoryGet(Player, "ItemNeck");
	            if (collar && collar.Property && collar.Property.LockMemberNumber) {
	                if (collar.Property.LockMemberNumber == member.MemberNumber)
	                    return true;
	                else
	                    return false;
	            }
	        }
	        if (this.allowedPetsuitCollarMembers.length > 0)
	            return this.allowedPetsuitCollarMembers.indexOf((_a = member.MemberNumber) !== null && _a !== void 0 ? _a : 0) >= 0;
	        return true;
	    }
	    Unload() {
	        removeAllHooksByModule(ModuleCategory.Commands);
	    }
	    Safeword() {
	        if (petsuitActivated) {
	            this.petsuitCollarDeactivate(Player);
	        }
	    }
	    validationVerifyCraftData(Craft, Asset) {
	        if (Craft === undefined) {
	            return {
	                result: undefined,
	                messages: [],
	            };
	        }
	        const saved = console.warn;
	        try {
	            const messages = [];
	            console.warn = (m) => {
	                if (typeof m === "string") {
	                    messages.push(m);
	                }
	            };
	            const result = CraftingValidate(Craft, Asset, true);
	            return {
	                result: result > CraftingStatusType.CRITICAL_ERROR ? Craft : undefined,
	                messages,
	            };
	        }
	        catch (error) {
	            saved("BCX: Failed crafted data validation because of crash:", error);
	            return {
	                result: undefined,
	                messages: [`Validation failed: ${error}`],
	            };
	        }
	        finally {
	            console.warn = saved;
	        }
	    }
	}

	class RemoteGuiSubscreen extends GuiSubscreen {
	    constructor(module, C) {
	        super(module);
	        this.dirty = false;
	        this.Character = C;
	    }
	    get SubscreenName() {
	        return SETTING_NAME_PREFIX + this.constructor.name;
	    }
	    setSubscreen(screen) {
	        let rootModule = getModule("RemoteUiModule");
	        if (!!rootModule && !!screen)
	            rootModule.currentSubscreen = screen;
	        return screen;
	    }
	    get settings() {
	        var _a;
	        if (!this.module.settingsStorage)
	            return {};
	        if (!((_a = this.Character) === null || _a === void 0 ? void 0 : _a.LLS) || !this.Character.LLS[this.module.settingsStorage]) {
	            return {}; // Somehow a non-mod user made it this far?
	        }
	        return this.Character.LLS[this.module.settingsStorage];
	    }
	    settingsSave() {
	        var _a;
	        if (!this.Character || !this.dirty)
	            return;
	        sendLLSMessage({
	            type: "command",
	            reply: false,
	            target: (_a = this.Character) === null || _a === void 0 ? void 0 : _a.MemberNumber,
	            version: LLS_VERSION,
	            settings: this.Character.LLS,
	            command: {
	                name: "remote",
	            },
	        });
	    }
	    Load() {
	        super.Load();
	        this.dirty = false;
	    }
	    Click() {
	        super.Click();
	        this.dirty = true;
	    }
	    Exit() {
	        this.structure.forEach((item) => {
	            switch (item.type) {
	                case "number":
	                    if (!CommonIsNumeric(ElementValue(item.id))) {
	                        ElementRemove(item.id);
	                        break;
	                    }
	                case "text":
	                    let val = ElementValue(item.id);
	                    if (val != item.setting())
	                        this.dirty = true;
	                    item.setSetting(ElementValue(item.id));
	                    ElementRemove(item.id);
	                    break;
	                case "colorpicker":
	                    if (CommonIsColor(ElementValue(item.id))) {
	                        item.setSetting(ElementValue(item.id));
	                    }
	                    ElementRemove(item.id);
	                    break;
	            }
	        });
	        this.settingsSave();
	        let rootModule = getModule("RemoteUiModule");
	        if (!!rootModule)
	            rootModule.currentSubscreen = new RemoteMainMenu(rootModule, this.Character);
	    }
	}

	class RemotePetsuitCollar extends RemoteGuiSubscreen {
	    constructor() {
	        super(...arguments);
	        this.subscreens = [];
	        this.blinkLastTime = 0;
	        this.blinkColor = "Red";
	    }
	    get name() {
	        return "Petsuit Collar";
	    }
	    get allowedMemberIds() {
	        var _a;
	        let idList = (_a = getDelimitedList(this.settings.petsuitCollarSetting.allowedMembers)
	            .map((id) => +id)
	            .filter((id) => id > 0)) !== null && _a !== void 0 ? _a : [];
	        if (this.settings.petsuitCollarSetting.petsuitCollar && this.settings.petsuitCollarSetting.petsuitCollar.creator > 0)
	            idList.push(this.settings.petsuitCollarSetting.petsuitCollar.creator);
	        let collar = InventoryGet(this.Character, "ItemNeck");
	        if (this.settings.petsuitCollarSetting.lockOwner && collar && collar.Property && collar.Property.LockMemberNumber)
	            idList.push(collar.Property.LockMemberNumber);
	        if (idList.includes(this.Character.MemberNumber))
	            idList.splice(idList.indexOf(this.Character.MemberNumber), 1);
	        return idList;
	    }
	    get disabledReason() {
	        let memberIdIsAllowed = ServerChatRoomGetAllowItem(Player, this.Character);
	        if (this.allowedMemberIds.length > 0)
	            memberIdIsAllowed = this.allowedMemberIds.indexOf(Player.MemberNumber) > -1;
	        if (!memberIdIsAllowed)
	            return "You do not have access to their artifacts...";
	        else if (!this.settings.petsuitCollarSetting.remoteAccess)
	            return "Remote Access is Disabled";
	        else if (!this.settings.petsuitCollarSetting.enabled)
	            return "Section is Disabled";
	        else
	            return "Section is Unavailable";
	    }
	    get enabled() {
	        let memberIdIsAllowed = ServerChatRoomGetAllowItem(Player, this.Character);
	        if (this.allowedMemberIds.length > 0)
	            memberIdIsAllowed = this.allowedMemberIds.indexOf(Player.MemberNumber) > -1;
	        return this.settings.petsuitCollarSetting.remoteAccess && this.settings.petsuitCollarSetting.enabled && memberIdIsAllowed;
	    }
	    get icon() {
	        return "";
	    }
	    get settings() {
	        return super.settings;
	    }
	    get multipageStructure() {
	        return [
	            [
	                {
	                    type: "colorpicker",
	                    id: "petsuitCollar_buckleColor",
	                    label: "Petsuit Buckle Color:",
	                    description: "Sets the color of the buckles on the petsuit.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.buckleColor) !== null && _a !== void 0 ? _a : "#5AC5EE"; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.buckleColor = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	                {
	                    type: "colorpicker",
	                    id: "petsuitCollar_strapColor",
	                    label: "Petsuit Strap Color:",
	                    description: "Sets the color of the straps on the petsuit.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.strapColor) !== null && _a !== void 0 ? _a : "#2C2C2C"; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.strapColor = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	                {
	                    type: "checkbox",
	                    label: "Lock Owner:",
	                    description: "Only allows the person that locked the collar to trigger it.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.lockOwner) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.lockOwner = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	                {
	                    type: "text",
	                    id: "petsuitCollar_allowedMembers",
	                    label: "Allowed Member IDs:",
	                    description: "A list of member IDs seperated by a comma, who are allowed to use the collar.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.allowedMembers) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.allowedMembers = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	                {
	                    type: "text",
	                    id: "petsuitCollar_trigger",
	                    label: "Trigger:",
	                    description: "Sets the trigger word/sentence for the petsuit collar.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.trigger) !== null && _a !== void 0 ? _a : ""; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.trigger = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	                {
	                    type: "checkbox",
	                    label: "Allow Self-Speechtrigger:",
	                    description: "Allows the wearer of the collar to trigger the speech commands.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.allowSelfTrigger) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.allowSelfTrigger = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	                {
	                    type: "checkbox",
	                    label: "Locked:",
	                    description: "Disallows the wearer of the collar from modifying any settings regarding the petsuit collar.",
	                    setting: () => { var _a; return (_a = this.settings.petsuitCollarSetting.locked) !== null && _a !== void 0 ? _a : false; },
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.locked = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled || !this.settings.petsuitCollarSetting.lockable,
	                },
	                {
	                    type: "craftselect",
	                    id: "petsuitCollar",
	                    label: "Petsuit Collar",
	                    slot: "ItemNeck",
	                    description: "The current collar equipped.",
	                    setting: () => this.settings.petsuitCollarSetting.petsuitCollar,
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.petsuitCollar = val),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
	                },
	            ], /*[
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
	    Run() {
	        super.Run();
	    }
	    Click() {
	        super.Click();
	    }
	}

	class RemoteMainMenu extends RemoteGuiSubscreen {
	    get name() {
	        return "MainMenu";
	    }
	    get enabled() {
	        return false;
	    }
	    get hidden() {
	        return true;
	    }
	    constructor(module, C) {
	        super(module, C);
	        this.subscreens = [];
	    }
	    onChange(source) {
	        if (source === this.character.MemberNumber) {
	            this.Load();
	        }
	    }
	    Load() {
	        this.subscreens = [
	            new RemotePetsuitCollar(getModule("ArtifactModule"), this.Character)
	        ];
	    }
	    get character() {
	        // Because we're initialized by that instance, it must already exist
	        return this.Character;
	    }
	    Run() {
	        var _a, _b;
	        let prev = MainCanvas.textAlign;
	        MainCanvas.textAlign = "left";
	        DrawText(`- Lillys Little Scripts ${(_b = (_a = this.Character.LLS) === null || _a === void 0 ? void 0 : _a.Version) !== null && _b !== void 0 ? _b : "?.?.?"} -`, GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
	        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	        MainCanvas.textAlign = "center";
	        let i = 0;
	        for (const screen of this.subscreens) {
	            const PX = Math.floor(i / 6);
	            const PY = i % 6;
	            const isDisabled = !screen.enabled;
	            const reason = screen.disabledReason;
	            // Skip disabled screens for the time being
	            if (screen.name == "MainMenu" || screen.hidden)
	                continue;
	            DrawButton(150 + 430 * PX, 190 + 120 * PY, 450, 90, "", isDisabled ? "#ddd" : "White", "", isDisabled ? reason : "", isDisabled);
	            //DrawImageResize(screen.icon, 150 + 430 * PX + 10, 190 + 120 * PY + 10, 70, 70);
	            MainCanvas.textAlign = "left";
	            DrawTextFit(screen.name, 250 + 430 * PX, 235 + 120 * PY, 340, "Black");
	            MainCanvas.textAlign = "center";
	            i++;
	        }
	        MainCanvas.textAlign = prev;
	    }
	    Click() {
	        if (MouseIn(1815, 75, 90, 90))
	            return this.Exit();
	        let i = 0;
	        for (const screen of this.subscreens) {
	            const PX = Math.floor(i / 6);
	            const PY = i % 6;
	            if (screen.name == "MainMenu" || screen.hidden)
	                continue;
	            if (MouseIn(150 + 430 * PX, 190 + 120 * PY, 450, 90) && screen.enabled) {
	                this.setSubscreen(screen);
	                return;
	            }
	            i++;
	        }
	    }
	    Exit() {
	        this.module.currentSubscreen = null;
	    }
	}

	// Remote UI Module to handle configuration on other characters
	// Can be used to "program" another character's hypnosis, collar, etc.
	// Framework inspired from BCX
	class RemoteUiModule extends BaseModule {
	    constructor() {
	        super(...arguments);
	        this._currentSubscreen = null;
	    }
	    get currentSubscreen() {
	        return this._currentSubscreen;
	    }
	    set currentSubscreen(subscreen) {
	        if (this._currentSubscreen) {
	            this._currentSubscreen.Unload();
	        }
	        this._currentSubscreen = subscreen;
	        if (this._currentSubscreen) {
	            this._currentSubscreen.Load();
	        }
	    }
	    getInformationSheetCharacter() {
	        const C = InformationSheetSelection;
	        if (!C || typeof C.MemberNumber !== "number")
	            return null;
	        if (C.IsPlayer())
	            return Player;
	        return getChatroomCharacter(C.MemberNumber);
	    }
	    hasAccessToPlayer(C) {
	        return ServerChatRoomGetAllowItem(C, Player);
	    }
	    playerHasAccessToCharacter(C) {
	        return !!C && !C.IsPlayer() && ServerChatRoomGetAllowItem(Player, C);
	    }
	    get playerIsRestrained() {
	        return Player.IsRestrained();
	    }
	    characterHasMod(C) {
	        return !!C.LLS;
	    }
	    Load() {
	        hookFunction("InformationSheetRun", 11, (args, next) => {
	            var _a;
	            if ((_a = window.bcx) === null || _a === void 0 ? void 0 : _a.inBcxSubscreen())
	                return next(args);
	            if (this._currentSubscreen) {
	                window.LLS_REMOTE_WINDOW_OPEN = true;
	                MainCanvas.textAlign = "left";
	                this._currentSubscreen.Run();
	                MainCanvas.textAlign = "center";
	                return;
	            }
	            window.LLS_REMOTE_WINDOW_OPEN = false;
	            next(args);
	            const C = this.getInformationSheetCharacter();
	            if (!!C && this.characterHasMod(C) && !C.IsPlayer()) {
	                const playerHasAccessToCharacter = this.playerHasAccessToCharacter(C);
	                DrawButton(450, 60, 60, 60, "", (playerHasAccessToCharacter && !this.playerIsRestrained) ? "White" : "#ddd", "", playerHasAccessToCharacter ? (this.playerIsRestrained ? "Cannot access while restrained" : "LLS Remote Settings") : "Needs BC item permission", !playerHasAccessToCharacter || this.playerIsRestrained);
	                DrawImageResize(ICONS.REMOTE, 455, 65, 50, 50);
	            }
	        }, ModuleCategory.RemoteUi);
	        hookFunction("InformationSheetClick", 10, (args, next) => {
	            if (this._currentSubscreen) {
	                return this._currentSubscreen.Click();
	            }
	            const C = this.getInformationSheetCharacter();
	            const playerHasAccessToCharacter = this.playerHasAccessToCharacter(C);
	            if (MouseIn(450, 60, 60, 60) && playerHasAccessToCharacter && !this.playerIsRestrained) {
	                this.currentSubscreen = new RemoteMainMenu(this, C);
	            }
	            else {
	                return next(args);
	            }
	        }, ModuleCategory.RemoteUi);
	        hookFunction("InformationSheetExit", 10, (args, next) => {
	            if (this._currentSubscreen) {
	                return this._currentSubscreen.Exit();
	            }
	            return next(args);
	        }, ModuleCategory.RemoteUi);
	    }
	    Unload() {
	        removeAllHooksByModule(ModuleCategory.RemoteUi);
	    }
	}

	class GuiSavings extends GuiSubscreen {
	    get name() {
	        return "Saves";
	    }
	    get icon() {
	        return "";
	    }
	    get save() {
	        return getModule("SavingModule");
	    }
	    get settings() {
	        return super.settings;
	    }
	    get multipageStructure() {
	        return [
	            [
	                {
	                    type: "checkbox",
	                    id: "saveasCSV",
	                    label: "Save as CSV",
	                    description: "If enabled, nay logs will be saved as a CSV file instead of a text file.",
	                    setting: () => this.settings.csv,
	                    setSetting: (val) => {
	                        this.settings.csv = val;
	                    }
	                },
	                {
	                    type: "dropdown",
	                    options: this.save.getAllRoomNames(),
	                    id: "roomSelect",
	                    label: "Selected Room",
	                    description: "Enable saving of chat messages. If set to 'Only in rooms', saving will only occur in rooms where the user is present.",
	                    setting: () => "Off",
	                    setSetting: (val) => {
	                        this.save.selectedRoom = this.save.getAllRoomNames().indexOf(val);
	                    },
	                },
	                {
	                    type: "button",
	                    id: "savechat",
	                    label: "Save chat",
	                    description: "Save the chat log of the selceted room.",
	                    setSetting: (val) => {
	                        this.save.settingChatRoomSave();
	                    },
	                    buttonText: "Save"
	                },
	                {
	                    type: "checkbox",
	                    id: "sortBeepsByMemberNumber",
	                    label: "Sort beeps by members",
	                    description: "If enabled, beeps will be sorted by membernumbers.",
	                    setting: () => this.settings.sortBeepsByMemberNumber,
	                    setSetting: (val) => {
	                        this.settings.sortBeepsByMemberNumber = val;
	                    }
	                },
	                {
	                    type: "button",
	                    id: "savebeeps",
	                    label: "Save beeps",
	                    description: "Save all beeps of the current session to a file.",
	                    setSetting: (val) => {
	                        this.save.saveBeepsToFile();
	                    },
	                    buttonText: "Save"
	                },
	                {
	                    type: "text",
	                    id: "delimitor",
	                    label: "Delimitor",
	                    description: "The delimitor used to separate values in the CSV file.",
	                    setting: () => this.settings.delimitor,
	                    setSetting: (val) => {
	                        this.settings.delimitor = val;
	                    },
	                },
	            ],
	        ];
	    }
	    Run() {
	        super.Run();
	    }
	    Click() {
	        super.Click();
	    }
	    Exit() {
	        super.Exit();
	    }
	    Load() {
	        var _a;
	        // Load up module settings to ensure defaults..
	        (_a = getModule("MiscModule")) === null || _a === void 0 ? void 0 : _a.settings;
	        super.Load();
	    }
	}

	class SavingModule extends BaseModule {
	    constructor() {
	        super(...arguments);
	        this.selectedRoom = 0;
	    }
	    get settings() {
	        return super.settings;
	    }
	    get defaultSettings() {
	        return {
	            csv: false, // Default to false, can be changed in settings
	            sortBeepsByMemberNumber: true, // Default to false, can be changed in settings
	            delimitor: ";", // Default to semicolon, can be changed in settings
	        };
	    }
	    get settingsScreen() {
	        return GuiSavings;
	    }
	    Safeword() { }
	    Load() { }
	    Unload() { }
	    saveChatOfRoom(roomId) {
	        const messages = this.getAllMessagesForRooms();
	        if (!messages) {
	            console.warn("No messages found for room:", roomId);
	            return;
	        }
	        if (roomId < 0 || roomId > messages.length) {
	            console.warn("Invalid room ID:", roomId);
	            return;
	        }
	        this.exportMessagesToFile(messages[roomId]);
	    }
	    settingChatRoomSave() {
	        this.saveChatOfRoom(this.selectedRoom);
	    }
	    getAllRoomNames() {
	        var _a;
	        const container = document.querySelector("#TextAreaChatLog");
	        if (!container) {
	            return [];
	        }
	        const separators = Array.from(container.querySelectorAll(".chat-room-sep"));
	        const roomNames = [];
	        for (const sep of separators) {
	            const roomNameElement = sep.querySelector(".chat-room-sep-header");
	            if (roomNameElement) {
	                const header = (_a = roomNameElement.textContent) === null || _a === void 0 ? void 0 : _a.split("-");
	                if (header && header.length > 0) {
	                    const roomName = header[header.length - 1].trim();
	                    roomNames.push(roomName);
	                }
	            }
	        }
	        return roomNames;
	    }
	    async exportMessagesToFile(messages) {
	        const lines = [];
	        let format = "txt"; // Default format is txt
	        if (this.settings.csv) {
	            format = "csv";
	        }
	        const delimitor = this.settings.delimitor || ";";
	        if (format === "csv") {
	            // Add CSV header
	            lines.push(`Time${delimitor}Sender${delimitor}UserID${delimitor}MessageType${delimitor}Content`);
	        }
	        for (const message of messages) {
	            const messageType = this.getMessageType(message) || "Unknown Type";
	            const time = this.getMessageTime(message) || "Unknown Time";
	            const sender = this.getSenderName(message) || "Unknown Sender";
	            const userId = this.getSenderId(message) || "Unknown ID";
	            const content = this.getMessageContent(message) || "";
	            const escapeCSV = (text) => `"${text.replace(/"/g, '""')}"`; // Handle quotes inside fields
	            switch (messageType) {
	                case "Chat": {
	                    if (format === "csv") {
	                        lines.push([escapeCSV(time), escapeCSV(sender), escapeCSV(userId), escapeCSV("Chat"), escapeCSV(content)].join(delimitor));
	                    }
	                    else {
	                        lines.push(`${time} ${sender} (${userId}): ${content}`);
	                    }
	                    break;
	                }
	                case "Whisper":
	                    let sent = Player.MemberNumber == Number(userId);
	                    console.log(content, sender, userId);
	                    if (format === "csv") {
	                        lines.push([
	                            escapeCSV(time),
	                            escapeCSV(sender),
	                            escapeCSV(userId),
	                            escapeCSV("Whisper"),
	                            escapeCSV(`${sent ? "to" : "from"} ${sender}: ` + content),
	                        ].join(delimitor));
	                    }
	                    else {
	                        if (sent) {
	                            lines.push(`${time} (You -> ${sender}): ${content}`);
	                        }
	                        else {
	                            lines.push(`${time} (${sender} (${userId}) -> You): ${content}`);
	                        }
	                    }
	                    break;
	                case "Emote": {
	                    if (format === "csv") {
	                        lines.push([
	                            escapeCSV(time),
	                            "", // no sender
	                            escapeCSV(userId),
	                            escapeCSV("Emote"),
	                            escapeCSV(content),
	                        ].join(delimitor));
	                    }
	                    else {
	                        lines.push(`${time} (${userId}): ${content}`);
	                    }
	                    break;
	                }
	                case "Activity":
	                case "Action":
	                    const action = this.getOwnTextContent(message);
	                    if (action.includes("[NotifyPlus]"))
	                        break; // Skip NotifyPlus messages
	                    if (action === "(Type /help for a list of commands)") {
	                        break; // Skip help message
	                    }
	                    if (format === "csv") {
	                        lines.push([
	                            escapeCSV(time),
	                            "", // no sender
	                            escapeCSV(userId),
	                            escapeCSV(messageType),
	                            escapeCSV(action),
	                        ].join(delimitor));
	                    }
	                    else {
	                        lines.push(`${time} (${userId}): ${action}`);
	                    }
	                    break;
	            }
	        }
	        const roomName = this.getAllRoomNames()[this.selectedRoom] || null;
	        const fileContent = lines.join("\n");
	        const extension = format === "csv" ? "csv" : "txt";
	        const mimeType = format === "csv" ? "text/csv" : "text/plain";
	        const filename = roomName ? `chat_export_${roomName.replace(/[^a-z0-9]/gi, "").toLowerCase()}.${extension}` : `chat_export.${extension}`;
	        this.saveFile(filename, fileContent, mimeType);
	    }
	    getAllMessagesForRooms() {
	        const container = document.querySelector("#TextAreaChatLog");
	        if (!container) {
	            return;
	        }
	        const separators = Array.from(container.querySelectorAll(".chat-room-sep"));
	        const results = [];
	        for (let i = 0; i < separators.length; i++) {
	            const start = separators[i];
	            const end = separators[i + 1] || null; // null if no next separator (i.e., last one)
	            const elementsBetween = [];
	            let node = start.nextElementSibling;
	            while (node && node !== end) {
	                elementsBetween.push(node);
	                node = node.nextElementSibling;
	            }
	            results.push(elementsBetween);
	        }
	        return results; // Array of arrays: elements between each sep, and after last sep
	    }
	    saveBeepsToFile() {
	        var _a;
	        const beeps = this.settings.sortBeepsByMemberNumber ? this.sortBeepsByMemberNumber(FriendListBeepLog) : FriendListBeepLog;
	        if (!beeps || beeps.length === 0) {
	            console.warn("No beeps found to save.");
	            return;
	        }
	        const format = this.settings.csv ? "csv" : "txt";
	        const delimiter = this.settings.delimitor || ";";
	        const lines = [];
	        let lastMemberNumber = null;
	        let otherName = null;
	        const escapeCSV = (value) => `"${value.replace(/"/g, '""')}"`;
	        if (format === "csv") {
	            lines.push(["Time", "Sender", "SenderID", "Recipient", "RecipientID", "Message"].join(delimiter));
	        }
	        for (const beep of beeps) {
	            const time = beep.Time ? new Date(beep.Time).toLocaleString() : "Unknown Time";
	            const otherNumber = beep.MemberNumber || null;
	            const rawContent = ((_a = beep.Message) === null || _a === void 0 ? void 0 : _a.replace(/\n\n\uF124\{.*?"messageType":"Message".*?\}/g, "")) || "";
	            const sent = beep.Sent || false;
	            if (lastMemberNumber == null || otherNumber !== lastMemberNumber) {
	                otherName = beep.MemberName || "Unknown Sender";
	                if (format === "txt" && lastMemberNumber !== null) {
	                    lines.push(""); // Only insert blank line in TXT format
	                }
	            }
	            lastMemberNumber = otherNumber;
	            const senderName = sent ? Player.Name : otherName;
	            const senderId = sent ? Player.MemberNumber : otherNumber;
	            const recipientName = sent ? otherName : Player.Name;
	            const recipientId = sent ? otherNumber : Player.MemberNumber;
	            if (format === "csv") {
	                lines.push([
	                    escapeCSV(time),
	                    escapeCSV(senderName || "Unknown"),
	                    escapeCSV(String(senderId !== null && senderId !== void 0 ? senderId : "Unknown")),
	                    escapeCSV(recipientName || "Unknown"),
	                    escapeCSV(String(recipientId !== null && recipientId !== void 0 ? recipientId : "Unknown")),
	                    escapeCSV(rawContent),
	                ].join(delimiter));
	            }
	            else {
	                const beepLine = `${time} ${senderName} (${senderId}) -> ${recipientName} (${recipientId}): ${rawContent}`;
	                lines.push(beepLine);
	            }
	        }
	        const extension = format === "csv" ? "csv" : "txt";
	        const mimeType = format === "csv" ? "text/csv" : "text/plain";
	        const fileContent = lines.join("\n");
	        this.saveFile(`beep_export.${extension}`, fileContent, mimeType);
	    }
	    sortBeepsByMemberNumber(beeps) {
	        return beeps.sort((a, b) => {
	            const aNumber = a.MemberNumber ? parseInt(a.MemberNumber, 10) : 0;
	            const bNumber = b.MemberNumber ? parseInt(b.MemberNumber, 10) : 0;
	            return aNumber - bNumber;
	        });
	    }
	    async saveFile(filename, content, mimeType = "text/plain") {
	        // Check for File System Access API
	        const useFSAccess = "showSaveFilePicker" in window;
	        if (useFSAccess) {
	            try {
	                const opts = {
	                    suggestedName: filename,
	                    types: [
	                        {
	                            description: mimeType,
	                            accept: { [mimeType]: [`.${filename.split(".").pop()}`] },
	                        },
	                    ],
	                };
	                // @ts-ignore - showSaveFilePicker is not yet in official TS typings
	                const handle = await window.showSaveFilePicker(opts);
	                const writable = await handle.createWritable();
	                await writable.write(content);
	                await writable.close();
	                return;
	            }
	            catch (error) {
	                if (error instanceof Error && error.name === "AbortError") {
	                    console.warn("File save operation was aborted.");
	                    return;
	                }
	                console.warn("File System Access API error, falling back to download:", error);
	            }
	        }
	        // Fallback: Download automatically
	        const blob = new Blob([content], { type: mimeType });
	        const url = URL.createObjectURL(blob);
	        const a = document.createElement("a");
	        a.href = url;
	        a.download = filename;
	        document.body.appendChild(a);
	        a.click();
	        document.body.removeChild(a);
	        URL.revokeObjectURL(url);
	    }
	    getMessageType(message) {
	        if (message) {
	            for (const className of Array.from(message.classList)) {
	                const match = className.match(/^ChatMessage(.+)$/);
	                if (match) {
	                    return match[1];
	                }
	            }
	        }
	        return null;
	    }
	    getOwnTextContent(element) {
	        let text = "";
	        for (const node of Array.from(element.childNodes)) {
	            if (node.nodeType === Node.TEXT_NODE) {
	                text += node.textContent;
	            }
	        }
	        return text.trim();
	    }
	    getMessageContent(message) {
	        if (message) {
	            const contents = message.querySelectorAll(".chat-room-message-content");
	            const content = contents[contents.length - 1];
	            return content ? content.textContent : null;
	        }
	        return null;
	    }
	    getSenderName(message) {
	        if (message) {
	            const sender = message.querySelector(".ChatMessageName");
	            return sender ? sender.textContent : null;
	        }
	        return null;
	    }
	    getSenderId(message) {
	        if (message) {
	            const sender = message.querySelector(".chat-room-sender");
	            return sender ? sender.textContent : null;
	        }
	        return null;
	    }
	    getMessageTime(message) {
	        if (message) {
	            const time = message.querySelector(".chat-room-time");
	            return time ? time.textContent : null;
	        }
	        return null;
	    }
	}

	function initWait() {
	    console.debug("LLS: Init wait");
	    if (CurrentScreen == null || CurrentScreen === "Login") {
	        hookFunction("LoginResponse", 0, (args, next) => {
	            console.debug("LLS: Init LoginResponse caught", args);
	            next(args);
	            const response = args[0];
	            if (isObject(response) && typeof response.Name === "string" && typeof response.AccountName === "string") {
	                loginInit(args[0]);
	            }
	        });
	        console.log(`LLS Ready!`);
	    }
	    else {
	        console.debug("LLS: Already logged in, init");
	        init();
	    }
	}
	function loginInit(C) {
	    if (window.LLS_Loaded)
	        return;
	    init();
	}
	function init() {
	    var _a;
	    if (window.LLS_Loaded)
	        return;
	    // clear any old settings.
	    //if (!!(<any>Player.OnlineSettings)?.LillysScripts)
	    //	delete (<any>Player.OnlineSettings).LillysScripts;
	    //if (!!(<any>Player.OnlineSettings)?.ClubGames)
	    //	delete (<any>Player.OnlineSettings).ClubGames;
	    /*const before = Player.OnlineSettings?.LLS || <ISettingsModel>{};
	    console.warn("LLS: Loading settings");
	    let reduced = new SettingsModel();
	    lo.assign(reduced , lo.pick(before, lo.keys(reduced)));
	    Player.LLS = reduced
	    console.warn("LLS: Done Loading settings");*/
	    Player.LLS = ((_a = Player.OnlineSettings) === null || _a === void 0 ? void 0 : _a.LLS) || {};
	    if (!initModules()) {
	        unload();
	        return;
	    }
	    settingsSave();
	    const currentAccount = Player.MemberNumber;
	    if (currentAccount == null) {
	        throw new Error("No player MemberNumber");
	    }
	    hookFunction("LoginResponse", 0, (args, next) => {
	        const response = args[0];
	        if (isObject(response) &&
	            typeof response.Name === "string" &&
	            typeof response.AccountName === "string" &&
	            response.MemberNumber !== currentAccount) {
	            alert(`Attempting to load LLS with different account than already loaded (${response.MemberNumber} vs ${currentAccount}). This is not supported, please refresh the page.`);
	            throw new Error("Attempting to load LLS with different account");
	        }
	        return next(args);
	    });
	    window.LLS_Loaded = true;
	    console.log(`LLS loaded! Version: ${LLS_VERSION}`);
	}
	function initModules() {
	    registerModule(new CoreModule());
	    registerModule(new CommandModule());
	    registerModule(new CardsModule());
	    registerModule(new CraftsModule());
	    registerModule(new GUI());
	    registerModule(new MiscModule());
	    registerModule(new ArtifactModule());
	    registerModule(new RemoteUiModule());
	    registerModule(new SavingModule());
	    for (const m of modules()) {
	        m.init();
	    }
	    for (const m of modules()) {
	        m.Load();
	    }
	    for (const m of modules()) {
	        m.Run();
	    }
	    hookFunction("ChatRoomSafewordRevert", 1, (args, next) => {
	        for (const m of modules()) {
	            m.Safeword();
	        }
	        return next(args);
	    });
	    hookFunction("ChatRoomSafewordRelease", 1, (args, next) => {
	        let ret = next(args);
	        for (const m of modules()) {
	            m.Safeword();
	        }
	        return ret;
	    });
	    console.info("LLS Modules Loaded.");
	    return true;
	}
	function unload() {
	    unloadModules();
	    delete window.LLS_Loaded;
	    console.log("LLS: Unloaded.");
	    return true;
	}
	function unloadModules() {
	    for (const m of modules()) {
	        m.Unload();
	    }
	}
	initWait();

	exports.init = init;
	exports.loginInit = loginInit;
	exports.unload = unload;

	return exports;

})({});
//# sourceMappingURL=bundle.js.map
