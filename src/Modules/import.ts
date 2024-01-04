import { BaseModule } from "base";
import { isObject } from "utils";
import * as LZString from "lz-string";

/*export class ImportModule extends BaseModule {

	doImport(category: string, data: string, character: PlayerCharacter | null): string {
		const definition = exportImportCategories.find((c) => c.category === category);
		if (!definition) {
			throw new Error(`Unknown import category "${category}"`);
		}

		data = data.trim();

		let parsedData: unknown;

		try {
			if (data && !data.startsWith("{")) {
				data = LZString.decompressFromBase64(data) || "";
				if (!data || typeof data !== "string" || !data.startsWith("{")) {
					return "Invalid input: decompression failed";
				}
				data = data.trim();
			}

			parsedData = JSON.parse(data);
		} catch (err) {
			return `Invalid input: parse error: ${err}`;
		}

		if (!isObject(parsedData) || typeof parsedData.__bcxExport !== "number") {
			return "Invalid input: Input is not data exported from BCX";
		}

		if (parsedData.__bcxExport !== EXPORT_IMPORT_FORMAT_VERSION) {
			return `Unable to load version ${parsedData.__bcxExport} of export, maximum compatible version: ${EXPORT_IMPORT_FORMAT_VERSION}`;
		}

		if (parsedData[category] === undefined) {
			return (
				`Input doesn't include data for category "${definition.name}"\n` +
				`Input has data for following known categories:\n` +
				(Object.keys(parsedData)
					.map((key) => {
						const knownCategory = exportImportCategories.find((c) => c.category === key);
						return knownCategory ? ` - ${knownCategory.name}\n` : "";
					})
					.join("") || "[NONE]\n")
			);
		}

		const zodResult = definition.importValidator.safeParse(parsedData[category]);
		if (!zodResult.success) {
			return `Invalid input:\n${JSON.stringify(zodResult.error.format(), undefined, "\t")}`;
		}

		return definition.import(zodResult.data, character);
	}
}
/**/