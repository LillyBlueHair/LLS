import { MiscSettingsModel } from "Settings/Models/base";
import { SavingSettingsModel } from "Settings/Models/saving";
import { GuiSavings } from "Settings/saving";
import { Subscreen } from "Settings/settingDefinitions";
import { BaseModule } from "base";
import { hookFunction, patchFunction } from "utils";

export class SavingModule extends BaseModule {
    get settings(): SavingSettingsModel {
        return super.settings as SavingSettingsModel;
    }

    get defaultSettings(): SavingSettingsModel | null {
        return <SavingSettingsModel>{
            csv: false, // Default to false, can be changed in settings
            sortBeepsByMemberNumber: true, // Default to false, can be changed in settings
            delimitor: ";", // Default to semicolon, can be changed in settings
        };
    }
    selectedRoom: number = 0;

    get settingsScreen(): Subscreen | null {
        return GuiSavings;
    }

    Safeword(): void {}

    Load(): void {}

    Unload(): void {}

    saveChatOfRoom(roomId: number) {
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

    getAllRoomNames(): string[] {
        const container = document.querySelector("#TextAreaChatLog");
        if (!container) {
            return [];
        }
        const separators = Array.from(container.querySelectorAll(".chat-room-sep"));
        const roomNames: string[] = [];
        for (const sep of separators) {
            const roomNameElement = sep.querySelector(".chat-room-sep-header");
            if (roomNameElement) {
                const header = roomNameElement.textContent?.split("-");
                if (header && header.length > 0) {
                    const roomName = header[header.length - 1].trim();
                    roomNames.push(roomName);
                }
            }
        }
        return roomNames;
    }

    async exportMessagesToFile(messages: Element[]) {
        const lines: string[] = [];
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

            const escapeCSV = (text: string) => `"${text.replace(/"/g, '""')}"`; // Handle quotes inside fields

            switch (messageType) {
                case "Chat": {
                    if (format === "csv") {
                        lines.push([escapeCSV(time), escapeCSV(sender), escapeCSV(userId), escapeCSV("Chat"), escapeCSV(content)].join(delimitor));
                    } else {
                        lines.push(`${time} ${sender} (${userId}): ${content}`);
                    }
                    break;
                }
                case "Whisper":
                    let sent: boolean = Player.MemberNumber == Number(userId);
                    console.log(content, sender, userId);
                    if (format === "csv") {
                        lines.push(
                            [
                                escapeCSV(time),
                                escapeCSV(sender),
                                escapeCSV(userId),
                                escapeCSV("Whisper"),
                                escapeCSV(`${sent ? "to" : "from"} ${sender}: ` + content),
                            ].join(delimitor)
                        );
                    } else {
                        if (sent) {
                            lines.push(`${time} (You -> ${sender}): ${content}`);
                        } else {
                            lines.push(`${time} (${sender} (${userId}) -> You): ${content}`);
                        }
                    }
                    break;
                case "Emote": {
                    if (format === "csv") {
                        lines.push(
                            [
                                escapeCSV(time),
                                "", // no sender
                                escapeCSV(userId),
                                escapeCSV("Emote"),
                                escapeCSV(content),
                            ].join(delimitor)
                        );
                    } else {
                        lines.push(`${time} (${userId}): ${content}`);
                    }
                    break;
                }
                case "Activity":
                case "Action":
                    const action = this.getOwnTextContent(message);
                    if (action.includes("[NotifyPlus]")) break; // Skip NotifyPlus messages
                    if (action === "(Type /help for a list of commands)") {
                        break; // Skip help message
                    }
                    if (format === "csv") {
                        lines.push(
                            [
                                escapeCSV(time),
                                "", // no sender
                                escapeCSV(userId),
                                escapeCSV(messageType),
                                escapeCSV(action),
                            ].join(delimitor)
                        );
                    } else {
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

    getAllMessagesForRooms(): Element[][] | undefined {
        const container = document.querySelector("#TextAreaChatLog");
        if (!container) {
            return;
        }
        const separators = Array.from(container.querySelectorAll(".chat-room-sep"));
        const results: Element[][] = [];

        for (let i = 0; i < separators.length; i++) {
            const start = separators[i];
            const end = separators[i + 1] || null; // null if no next separator (i.e., last one)
            const elementsBetween: Element[] = [];

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
        const beeps = this.settings.sortBeepsByMemberNumber ? this.sortBeepsByMemberNumber(FriendListBeepLog) : FriendListBeepLog;

        if (!beeps || beeps.length === 0) {
            console.warn("No beeps found to save.");
            return;
        }

        const format = this.settings.csv ? "csv" : "txt";
        const delimiter = this.settings.delimitor || ";";

        const lines: string[] = [];
        let lastMemberNumber: number | null = null;
        let otherName: string | null = null;

        const escapeCSV = (value: string): string => `"${value.replace(/"/g, '""')}"`;

        if (format === "csv") {
            lines.push(["Time", "Sender", "SenderID", "Recipient", "RecipientID", "Message"].join(delimiter));
        }

        for (const beep of beeps) {
            const time = beep.Time ? new Date(beep.Time).toLocaleString() : "Unknown Time";
            const otherNumber = beep.MemberNumber || null;
            const rawContent = beep.Message?.replace(/\n\n\uF124\{.*?"messageType":"Message".*?\}/g, "") || "";
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
                lines.push(
                    [
                        escapeCSV(time),
                        escapeCSV(senderName || "Unknown"),
                        escapeCSV(String(senderId ?? "Unknown")),
                        escapeCSV(recipientName || "Unknown"),
                        escapeCSV(String(recipientId ?? "Unknown")),
                        escapeCSV(rawContent),
                    ].join(delimiter)
                );
            } else {
                const beepLine = `${time} ${senderName} (${senderId}) -> ${recipientName} (${recipientId}): ${rawContent}`;
                lines.push(beepLine);
            }
        }

        const extension = format === "csv" ? "csv" : "txt";
        const mimeType = format === "csv" ? "text/csv" : "text/plain";
        const fileContent = lines.join("\n");

        this.saveFile(`beep_export.${extension}`, fileContent, mimeType);
    }

    sortBeepsByMemberNumber(beeps: IFriendListBeepLogMessage[]): IFriendListBeepLogMessage[] {
        return beeps.sort((a, b) => {
            const aNumber = a.MemberNumber ? parseInt(a.MemberNumber, 10) : 0;
            const bNumber = b.MemberNumber ? parseInt(b.MemberNumber, 10) : 0;
            return aNumber - bNumber;
        });
    }

    async saveFile(filename: string, content: string, mimeType = "text/plain") {
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
            } catch (error) {
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

    getMessageType(message: Element): string | null {
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

    getOwnTextContent(element: Element): string {
        let text = "";
        for (const node of Array.from(element.childNodes)) {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
            }
        }
        return text.trim();
    }

    getMessageContent(message: Element): string | null {
        if (message) {
            const contents = message.querySelectorAll(".chat-room-message-content");
            const content = contents[contents.length - 1];
            return content ? content.textContent : null;
        }
        return null;
    }

    getSenderName(message: Element): string | null {
        if (message) {
            const sender = message.querySelector(".ChatMessageName");
            return sender ? sender.textContent : null;
        }
        return null;
    }

    getSenderId(message: Element): string | null {
        if (message) {
            const sender = message.querySelector(".chat-room-sender");
            return sender ? sender.textContent : null;
        }
        return null;
    }

    getMessageTime(message: Element): string | null {
        if (message) {
            const time = message.querySelector(".chat-room-time");
            return time ? time.textContent : null;
        }
        return null;
    }
}
