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
	    var bgColor = Player.ChatSettings.ColorTheme.indexOf("Light") > -1 ? "#f2feff" : "#1c2829";
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
	        var data = args[0];
	        var sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Whisper")
	            if (callback(data, sender, data.Content, data.Dictionary) == "skipBCX") {
	                //EWW, but it works
	                return;
	            }
	        next(args);
	    }, module);
	}
	function onChat(priority, module, callback) {
	    hookFunction("ChatRoomMessage", priority, (args, next) => {
	        var data = args[0];
	        var sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Chat" || data.Type == "Whisper")
	            callback(data, sender, data.Content, data.Dictionary);
	        next(args);
	    }, module);
	}
	function onAction(priority, module, callback) {
	    hookFunction("ChatRoomMessage", priority, (args, next) => {
	        var data = args[0];
	        var sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Action" || data.Type == "Emote") {
	            callback(data, sender, data.Content, data.Dictionary);
	        }
	        next(args);
	    }, module);
	}
	function onActivity(priority, module, callback) {
	    hookFunction("ChatRoomMessage", priority, (args, next) => {
	        var data = args[0];
	        var sender = getChatroomCharacter(data.Sender);
	        if (data.Type == "Activity") {
	            callback(data, sender, data.Content, data.Dictionary);
	        }
	        next(args);
	    }, module);
	}
	function onSentMessage(priority, module, callback) {
	    hookFunction("ServerSend", priority, (args, next) => {
	        var data = args[1];
	        var sender = getChatroomCharacter(data.Sender);
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
	    var result = "";
	    var Par = false;
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
	        if (!Player.LLS || !Player.LLS.GlobalModule)
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
	class PublicSettingsModel {
	    constructor() {
	        this.Version = LLS_VERSION;
	        this.GlobalModule = {};
	        this.MiscModule = { enabled: false };
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
	                petsuitCollar: { name: "", creator: 0 },
	                ropeOfTighteningEnabled: false,
	                publicRopeOfTighteningEnabled: false,
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
	        // create each handler for a new preference subscreen
	        SETTING_FUNC_NAMES.forEach((name) => {
	            const fName = SETTING_FUNC_PREFIX + SETTING_NAME_PREFIX + this.name + name;
	            if (typeof this[name] === "function" && typeof window[fName] !== "function")
	                window[fName] = () => {
	                    this[name]();
	                };
	        });
	    }
	    get name() {
	        return "UNKNOWN";
	    }
	    /*get icon(): string {
	        return ICONS.BOUND_GIRL;
	    }*/
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
	                    if (setting.type == "text" || setting.type == "number" || setting.type == "colorpicker")
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
	            }
	        }));
	    }
	    Run() {
	        var prev = MainCanvas.textAlign;
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
	                case "text":
	                case "number":
	                    this.ElementPosition(item.id, item.label, item.description, ix, item.disabled);
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
	                        var collar = InventoryGet(Player, item.slot);
	                        if (!collar || !collar.Craft)
	                            break;
	                        var name = collar.Craft.Name;
	                        var creator = collar.Craft.MemberNumber;
	                        item.setSetting({ name: name, creator: creator });
	                        console.log(item.setting());
	                    }
	                    else if (MouseIn(this.getXPos(ix) + 464, this.getYPos(ix) + 40, 200, 64) && !item.disabled) {
	                        item.setSetting({ name: "", creator: 0 });
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
	        var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
	        DrawCheckbox(this.getXPos(order) + 600, this.getYPos(order) - 32, 64, 64, "", value !== null && value !== void 0 ? value : false, disabled);
	        if (isHovering)
	            this.Tooltip(description);
	    }
	    DrawColorPicker(id, name, description, setting, order, disabled = false) {
	        var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        //Label
	        DrawTextFit(name, this.getXPos(order), this.getYPos(order), 300, isHovering ? "Red" : "Black", "Gray");
	        //Color Textfield
	        ElementPosition(id, this.getXPos(order) + 500, this.getYPos(order), 200);
	        var color = "";
	        if (CommonIsColor(ElementValue(id)))
	            color = ElementValue(id);
	        else
	            color = setting;
	        var element = document.getElementById(id);
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
	        if (MouseIn(this.getXPos(order) + 464, this.getYPos(order) - 32, 600, 64))
	            this.Tooltip("Sets the " + name + " to the one currently worn");
	        DrawButton(this.getXPos(order) + 464, this.getYPos(order) + 40, 200, 64, "Clear", disabled ? "#CCCCCC" : "White", undefined, "", disabled);
	        if (MouseIn(this.getXPos(order) + 464, this.getYPos(order) + 40, 600, 64))
	            this.Tooltip("Set " + name + " to default");
	        MainCanvas.textAlign = "left";
	        if (!!setting) {
	            DrawText("Current Name: " + setting.name, this.getXPos(order), this.getYPos(order) + 60, "Gray", "Gray");
	            if (!!setting.creator && setting.creator > 0)
	                DrawText("Current Crafter: " + setting.creator, this.getXPos(order), this.getYPos(order) + 110, "Gray", "Gray");
	        }
	        MainCanvas.textAlign = prev;
	    }
	    ElementHide(elementId) {
	        ElementPosition(elementId, -999, -999, 1, 1);
	    }
	    ElementPosition(elementId, label, description, order, disabled = false) {
	        var _a;
	        var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
	        DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
	        ElementPosition(elementId, this.getXPos(order) + 750, this.getYPos(order), 300);
	        if (disabled)
	            ElementSetAttribute(elementId, "disabled", "true");
	        else {
	            (_a = document.getElementById(elementId)) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
	        }
	        if (isHovering)
	            this.Tooltip(description);
	    }
	    DrawLabel(name, description, order) {
	        var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
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
	                label: "Automatically resist orgasms:",
	                description: "Enables the button to immediately resist orgasms.",
	                setting: () => { var _a; return (_a = Player.LLS.MiscModule.orgasmSkip) !== null && _a !== void 0 ? _a : false; },
	                setSetting: (val) => Player.LLS.MiscModule.orgasmSkip = val
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
	        var prev = MainCanvas.textAlign;
	        MainCanvas.textAlign = "left";
	        DrawText(`- Lillys Little Scripts ${LLS_VERSION} -`, GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
	        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	        MainCanvas.textAlign = "center";
	        let i = 0;
	        //console.log(this.subscreens);
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
	    }
	}

	class GUI extends BaseModule {
	    get subscreens() { return this._subscreens; }
	    get mainMenu() {
	        return this._mainMenu;
	    }
	    get currentSubscreen() {
	        return this._currentSubscreen;
	    }
	    set currentSubscreen(subscreen) {
	        var _a, _b;
	        if (this._currentSubscreen) {
	            this._currentSubscreen.Unload();
	        }
	        if (typeof subscreen === "string") {
	            const scr = (_a = this._subscreens) === null || _a === void 0 ? void 0 : _a.find(s => s.name === subscreen);
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
	        let subscreenName = "";
	        if (this._currentSubscreen) {
	            subscreenName = SETTING_NAME_PREFIX + ((_b = this._currentSubscreen) === null || _b === void 0 ? void 0 : _b.name);
	            this._currentSubscreen.Load();
	        }
	        // Get BC to render the new screen
	        PreferenceSubscreen = subscreenName;
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
	        this._subscreens = [
	            this._mainMenu
	        ];
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
	        var settings = new PublicSettingsModel();
	        for (const m of modules()) {
	            var moduleSettings = (_a = m.settings) !== null && _a !== void 0 ? _a : { enabled: false };
	            var moduleSettingStorage = (_b = m.settingsStorage) !== null && _b !== void 0 ? _b : "";
	            if (Object.hasOwn(settings, moduleSettingStorage)) {
	                var publicModuleSetting = settings[moduleSettingStorage];
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
	            var C = getChatroomCharacter(data.Sender);
	            var msg = data.Dictionary[0].message;
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
	                    if (parsed.length != 0) {
	                        let number = 1;
	                        let target;
	                        switch (parsed[0].toLowerCase()) {
	                            case "shuffle":
	                                this.cards.shuffleDeck();
	                                break;
	                            case "log":
	                                this.cards.printLog(false);
	                                break;
	                            case "deal":
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
	                                    sendLocal("Wrong usage");
	                                break;
	                        }
	                    }
	                    else {
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
	                    if (parsed.length == 1) {
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
	                        }
	                    }
	                    else {
	                        let text = "For these commands to work you need to enable 'hide' for 'self' in your Script-Settings" +
	                            "<br><b>/lls visibility hide</b>: Hides your character" +
	                            "<br><b>/lls visibility show</b>: Shows your character" +
	                            "<br><b>/lls visibility clothes</b>: Only shows your clothes";
	                        sendLocal(`<b>- Lillys Little Scrips -</b><br>Visibility: ${text}<br>`);
	                    }
	                },
	            },
	        ];
	    }
	    get cards() {
	        return getModule("CardsModule");
	    }
	    get misc() {
	        return getModule("MiscModule");
	    }
	    get orderedCommands() {
	        var helpCommand = this.getSubcommand("help");
	        var sorted = this.llsCommands.filter((c) => c.Tag != "help").sort((a, b) => a.Tag.localeCompare(b.Tag));
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
	                        var command = this.getSubcommand(parsed[0]);
	                        var subArgs = parsed.slice(1);
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
	    Load() {
	        hookFunction("CraftingRun", 1, (args, next) => {
	            next(args);
	            const C = Player;
	            if (!!C && C.IsPlayer() && !!C.Crafting && CraftingMode == "Slot") {
	                let craft = null;
	                for (let i = CraftingOffset; i < CraftingOffset + 20; i++) {
	                    craft = C.Crafting[i];
	                    if (craft) {
	                        break;
	                    }
	                }
	                if (craft && (craft === null || craft === void 0 ? void 0 : craft.Private)) {
	                    this.private = true;
	                    DrawButton(15, 15, 64, 64, "", "White", "Icons/Checked.png", "Whole page is private");
	                }
	                else {
	                    this.private = false;
	                    DrawButton(15, 15, 64, 64, "", "White", "", "Whole page is private");
	                }
	            }
	        }, ModuleCategory.Crafts);
	        hookFunction("CraftingClick", 1, (args, next) => {
	            next(args);
	            const C = Player;
	            if (!!C && C.IsPlayer() && !!C.Crafting && CraftingMode == "Slot") {
	                if (MouseIn(15, 15, 64, 64)) {
	                    this.private = !this.private;
	                    for (let i = CraftingOffset; i < CraftingOffset + 20; i++) {
	                        const craft = C.Crafting[i];
	                        if (craft) {
	                            craft.Private = this.private;
	                        }
	                    }
	                }
	            }
	        }, ModuleCategory.Crafts);
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
	                    label: "Allow Self-Speechtrigger:",
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
	                    setSetting: (val) => (this.settings.petsuitCollarSetting.petsuitCollar = { name: val.name, creator: val.creator }),
	                    disabled: !this.settings.petsuitCollarSetting.enabled,
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
	                    setSetting: (val) => (this.settings.cosplayEars = { name: val.name, creator: val.creator }),
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
	                    type: "craftselect",
	                    id: "gagCollar",
	                    label: "Gag Collar",
	                    slot: "ItemNeck",
	                    description: "The current collar equipped.",
	                    setting: () => this.settings.gagCollar,
	                    setSetting: (val) => (this.settings.gagCollar = { name: val.name, creator: val.creator }),
	                    disabled: !this.settings.gagCollarEnabled,
	                },
	                {
	                    type: "null"
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
	        };
	    }
	    get settingsScreen() {
	        return GuiArtifact;
	    }
	    Load() {
	        onChat(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	            var _a;
	            let petsuitCollarSettings = (_a = Player.LLS) === null || _a === void 0 ? void 0 : _a.ArtifactModule;
	            if (petsuitCollarSettings && petsuitCollarSettings.petsuitCollarSetting.enabled) {
	                if (isPhraseInString(msg.toLowerCase(), petsuitCollarSettings.petsuitCollarSetting.trigger.toLowerCase(), true) && this.wearingPetsuitCollar(Player)) {
	                    if ((sender === null || sender === void 0 ? void 0 : sender.IsPlayer()) && !petsuitCollarSettings.petsuitCollarSetting.allowSelfTrigger)
	                        return;
	                    else if (sender === null || sender === void 0 ? void 0 : sender.IsPlayer())
	                        this.petsuitCollarToggle(Player);
	                    else if (this.isAllowedPetsuitCollarMember(sender)) {
	                        this.petsuitCollarToggle(Player);
	                    }
	                }
	            }
	            else if (this.settings.gagCollarEnabled && this.wearingGagCollar(Player)) {
	            }
	            return;
	        });
	        /*hookFunction("SpeechGarble", 65, (args, next) => {
	            if (!this.Enabled)
	                return next(args);

	            const C = args[0] as Character;
	            if (ChatRoomIsViewActive(ChatRoomMapViewName) && !ChatRoomMapViewCharacterIsHearable(C))
	                return next(args);
	                
	            console.log(args[0]+"0")
	            // Check for non-garbled trigger word, this means a trigger word could be set to what garbled speech produces >.>
	            let msg = callOriginal("SpeechGarble", [args[0], args[1]]);
	            console.log(msg+"1")
	            
	            
	            return next(args);
	        }, ModuleCategory.Artifacts);*/
	        onWhisper(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	            var _a;
	            let petsuitCollarSettings = (_a = Player.LLS) === null || _a === void 0 ? void 0 : _a.ArtifactModule;
	            if (petsuitCollarSettings && petsuitCollarSettings.petsuitCollarSetting.enabled) {
	                if (isPhraseInString(msg.toLowerCase(), petsuitCollarSettings.petsuitCollarSetting.trigger.toLowerCase(), true) && this.wearingPetsuitCollar(Player)) {
	                    if ((sender === null || sender === void 0 ? void 0 : sender.IsPlayer()) && !petsuitCollarSettings.petsuitCollarSetting.allowSelfTrigger)
	                        return;
	                    else if (sender === null || sender === void 0 ? void 0 : sender.IsPlayer())
	                        this.petsuitCollarToggle(Player);
	                    else if (this.isAllowedPetsuitCollarMember(sender)) {
	                        this.petsuitCollarToggle(Player);
	                    }
	                }
	            }
	            else if (this.settings.gagCollarEnabled && this.wearingGagCollar(Player)) {
	            }
	            return;
	        });
	        onActivity(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	        });
	        onAction(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	            if (msg == "ItemHoodHarnessCatMaskSetEars") {
	                this.activateCosplayTail(Player);
	            }
	            else if (msg == "ItemHoodHarnessCatMaskSetNoEars") {
	                this.deactivateCosplayTail(Player);
	            }
	            return;
	        });
	        onSentMessage(10, ModuleCategory.Artifacts, (data, sender, msg, metadata) => {
	            if (data.Type === "Chat") {
	                sender = sender ? sender : Player;
	                this.catSpeech(data);
	            }
	            return;
	        });
	    }
	    // Gag collar
	    wearingGagCollar(C) {
	        var _a, _b, _c;
	        var collar = InventoryGet(C, "ItemNeck");
	        if (!collar)
	            return false;
	        var collarName = (_a = collar === null || collar === void 0 ? void 0 : collar.Asset.Name) !== null && _a !== void 0 ? _a : "";
	        var collarCreator = (_c = (_b = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _b === void 0 ? void 0 : _b.MemberNumber) !== null && _c !== void 0 ? _c : -1;
	        return collarName == this.settings.gagCollar.name && collarCreator == this.settings.gagCollar.creator;
	    }
	    toggleGagCollar(C) {
	        if (this.wearingGagCollar(C)) {
	            this.deactivateGagCollar(C);
	        }
	        else {
	            this.activateGagCollar(C);
	        }
	    }
	    activateGagCollar(C) {
	        InventoryWear(C, "BallGag", "ItemMouth2", "#4FD5F7");
	        let gag = InventoryGet(C, "ItemMouth2");
	        if (gag && gag.Property && gag.Property.TypeRecord)
	            gag.Property.TypeRecord.typed = 2;
	        ChatRoomCharacterUpdate(C);
	    }
	    deactivateGagCollar(C) {
	        InventoryRemove(C, "ItemMouth2");
	        ChatRoomCharacterUpdate(C);
	    }
	    //Cosplay Ears + Tail
	    wearingCosplayEars(C) {
	        var _a, _b, _c, _d, _e, _f, _g;
	        let ears = InventoryGet(C, "ItemHood");
	        let earSetting = (_a = C.LLS) === null || _a === void 0 ? void 0 : _a.ArtifactModule.cosplayEars;
	        let enabled = (_b = C.LLS) === null || _b === void 0 ? void 0 : _b.ArtifactModule.cosplayEarEnabled;
	        if (!ears || !enabled || !earSetting)
	            return false;
	        if (!earSetting.creator) {
	            return ears.Asset.Name != "HarnessCatMask";
	        }
	        else {
	            var collarName = (_e = (_d = (_c = ears.Craft) === null || _c === void 0 ? void 0 : _c.Name) !== null && _d !== void 0 ? _d : ears === null || ears === void 0 ? void 0 : ears.Asset.Name) !== null && _e !== void 0 ? _e : "";
	            var collarCreator = (_g = (_f = ears === null || ears === void 0 ? void 0 : ears.Craft) === null || _f === void 0 ? void 0 : _f.MemberNumber) !== null && _g !== void 0 ? _g : -1;
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
	        var _a, _b;
	        let catSpeech = (_b = (_a = Player.LLS) === null || _a === void 0 ? void 0 : _a.ArtifactModule) === null || _b === void 0 ? void 0 : _b.catSpeechEnabled;
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
	        var gag1 = InventoryGet(C, "ItemMouth");
	        var gag2 = InventoryGet(C, "ItemMouth2");
	        var gag3 = InventoryGet(C, "ItemMouth3");
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
	        var _a, _b, _c, _d, _e, _f;
	        var collar = InventoryGet(C, "ItemNeck");
	        let collarSettings = (_a = C.LLS) === null || _a === void 0 ? void 0 : _a.ArtifactModule.petsuitCollarSetting;
	        if (!collar || !collarSettings || !collarSettings.enabled)
	            return false;
	        if (!collarSettings.petsuitCollar.name)
	            return true;
	        // If configured collar is not crafted, let any inherited collar work.
	        if (!collarSettings.petsuitCollar.creator) {
	            return (collar === null || collar === void 0 ? void 0 : collar.Asset.Name) == collarSettings.petsuitCollar.name;
	        }
	        else {
	            var collarName = (_d = (_c = (_b = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _b === void 0 ? void 0 : _b.Name) !== null && _c !== void 0 ? _c : collar === null || collar === void 0 ? void 0 : collar.Asset.Name) !== null && _d !== void 0 ? _d : "";
	            var collarCreator = (_f = (_e = collar === null || collar === void 0 ? void 0 : collar.Craft) === null || _e === void 0 ? void 0 : _e.MemberNumber) !== null && _f !== void 0 ? _f : -1;
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
	        var _a, _b, _c;
	        let collarSettings = (_a = C.LLS) === null || _a === void 0 ? void 0 : _a.ArtifactModule.petsuitCollarSetting;
	        let buckleColor = (_b = collarSettings === null || collarSettings === void 0 ? void 0 : collarSettings.buckleColor) !== null && _b !== void 0 ? _b : "#5AC5EE";
	        let strapColor = (_c = collarSettings === null || collarSettings === void 0 ? void 0 : collarSettings.strapColor) !== null && _c !== void 0 ? _c : "#2C2C2C";
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
	        var suit = InventoryGet(C, "ItemArms");
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
	            var collar = InventoryGet(Player, "ItemNeck");
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
	        var rootModule = getModule("RemoteUiModule");
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
	        var rootModule = getModule("RemoteUiModule");
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
	        var memberIdIsAllowed = ServerChatRoomGetAllowItem(Player, this.Character);
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
	        var memberIdIsAllowed = ServerChatRoomGetAllowItem(Player, this.Character);
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
	        var prev = MainCanvas.textAlign;
	        let buttonPos = this.structure.length;
	        if (super.PreferenceColorPick != "" &&
	            ((super.PreferenceColorPickLeft && this.getXPos(buttonPos) < 1000) ||
	                (!super.PreferenceColorPickLeft && this.getXPos(buttonPos) > 1000)))
	            return;
	        else if (this.settings.petsuitCollarSetting.enabled && PreferencePageCurrent == 1) {
	            MainCanvas.textAlign = "left";
	            // Set/Update Collar	 	[Custom??]
	            let updateDisabled = !this.settings.petsuitCollarSetting.enabled;
	            DrawText("Update Collar:", this.getXPos(buttonPos), this.getYPos(buttonPos), updateDisabled ? "Gray" : "Black", "Gray");
	            MainCanvas.textAlign = "center";
	            DrawButton(this.getXPos(buttonPos) + 464, this.getYPos(buttonPos) - 32, 200, 64, "Update", updateDisabled ? "#CCCCCC" : "White", undefined, updateDisabled ? "" : "Update Collar to Current", updateDisabled);
	            MainCanvas.textAlign = "left";
	            if (!!this.settings.petsuitCollarSetting.petsuitCollar) {
	                DrawText("Current Name: " + this.settings.petsuitCollarSetting.petsuitCollar.name, this.getXPos(buttonPos), this.getYPos(buttonPos) + 60, "Gray", "Gray");
	                if (!!this.settings.petsuitCollarSetting.petsuitCollar.creator && this.settings.petsuitCollarSetting.petsuitCollar.creator > 0)
	                    DrawText("Current Crafter: " + this.settings.petsuitCollarSetting.petsuitCollar.creator, this.getXPos(buttonPos), this.getYPos(buttonPos) + 110, "Gray", "Gray");
	            }
	        }
	        MainCanvas.textAlign = prev;
	    }
	    Click() {
	        var _a, _b, _c, _d;
	        super.Click();
	        let buttonPos = this.structure.length;
	        if (super.PreferenceColorPick != "" &&
	            ((super.PreferenceColorPickLeft && this.getXPos(buttonPos) < 1000) ||
	                (!super.PreferenceColorPickLeft && this.getXPos(buttonPos) > 1000)))
	            return;
	        else if (this.settings.petsuitCollarSetting.enabled && PreferencePageCurrent == 1) {
	            if (this.settings.petsuitCollarSetting.enabled) {
	                // Update Collar Button
	                let buttonPos = this.structure.length;
	                if (MouseIn(this.getXPos(buttonPos) + 464, this.getYPos(buttonPos) - 32, 200, 64)) {
	                    var collar = InventoryGet(this.Character, "ItemNeck");
	                    if (!collar) {
	                        this.message = "No Collar Equipped";
	                    }
	                    else {
	                        this.message = "Collar updated";
	                        this.settings.petsuitCollarSetting.petsuitCollar = {
	                            name: (_b = (_a = collar.Craft) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : collar.Asset.Name,
	                            creator: (_d = (_c = collar.Craft) === null || _c === void 0 ? void 0 : _c.MemberNumber) !== null && _d !== void 0 ? _d : 0,
	                        };
	                    }
	                }
	            }
	        }
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
	        var prev = MainCanvas.textAlign;
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
	                //DrawImageResize(ICONS.REMOTE, 95, 65, 50, 50);
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
	function initSettingsScreen() {
	    PreferenceSubscreenList.push("LLSMainMenu");
	    console.log("LLS: init Settings");
	    hookFunction("TextGet", 2, (args, next) => {
	        if (args[0] == "HomepageLLSMainMenu")
	            return "LLS Settings";
	        return next(args);
	    });
	    hookFunction("DrawButton", 2, (args, next) => {
	        //if (args[6] == "Icons/LLSMainMenu.png") args[6] = ICONS.BOUND_GIRL;// "Icons/Asylum.png";
	        return next(args);
	    });
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
	    initSettingsScreen();
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
	        var ret = next(args);
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
	exports.initSettingsScreen = initSettingsScreen;
	exports.loginInit = loginInit;
	exports.unload = unload;

	return exports;

})({});
//# sourceMappingURL=bundle.js.map
