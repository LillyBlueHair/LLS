import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import progress from "rollup-plugin-progress";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json" assert { type: "json" };

export default {
	input: "src/main.ts",
	output: {
		name: "LLS",
		file: "bundle.js",
		format: "iife",
		sourcemap: true,
		banner: `// LLS: Lillys Little Scripts
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
`,
		intro: async () => {
			let LLS_VERSION = packageJson.version;
			LLS_VERSION = (LLS_VERSION.length > 0 && LLS_VERSION[0] == 'v') ? LLS_VERSION : "v" + LLS_VERSION;
      		return `const LLS_VERSION="${LLS_VERSION}";`;
			//return `const LLS_VERSION="0.0.1";`
		},
	},
	treeshake: false,
	plugins: [
		progress({ clearLine: true }),
		resolve({ browser: true }),
		json(),
		typescript({
			tsconfig: "./tsconfig.json",
			inlineSources: true
		}),
		commonjs()
	]
};
