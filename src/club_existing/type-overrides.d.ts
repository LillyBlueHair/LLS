interface PlayerCharacter extends Character {
    LLS: import("Settings/Models/settings").ISettingsModel;
}

interface OtherCharacter extends Character {
    LLS: import("Settings/Models/settings").IPublicSettingsModel;
}

interface PlayerOnlineSettings {
	LLS: import("Settings/Models/settings").ISettingsModel;
}

interface LLSMessageDictionaryEntry {
    message: LLSMessageModel;
}

type LLSMessageModelType = "init" | "sync" | "command";

type LLSCommandName = "grab" | "release" | "remote" | "escape" | "collar-tighten" | "collar-loosen" | "collar-stats";

interface LLSMessageModel {
    type: LLSMessageModelType;
    version: string;
    settings: import("Settings/Models/settings").IPublicSettingsModel | null,
    target: number | null,
    reply: boolean,
    command?: {
        name: LLSCommandName,
        args: {name: string, value: any}[]
    }
}