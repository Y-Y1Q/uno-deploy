import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const ROOT_PATH = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_PATH = path.join(ROOT_PATH, "unogame", "frontendV2");
const BACKEND_PATH = path.join(ROOT_PATH, "unogame", "backend");
const OUT_PATH = path.join(ROOT_PATH, "unogame", "static", "dist");

console.log(ROOT_PATH);

const isDev = process.env.NODE_ENV === "development";

if (fs.existsSync(OUT_PATH)) {
    fs.rmSync(OUT_PATH, { recursive: true, force: true });
}

const FE_CONFIG = {
    entryPoints: [path.join(FRONTEND_PATH, "index.ts")],
    bundle: true,
    outdir: path.join(OUT_PATH),
    minify: !isDev,
    sourcemap: isDev,
    logLevel: "info",
};

const BE_CONFIG = {
    entryPoints: [path.join(BACKEND_PATH, "server.ts")],
    bundle: true,
    outdir: path.join(OUT_PATH),
    minify: !isDev,
    sourcemap: isDev,
    logLevel: "info",
    platform: "node",
    external: ["livereload-js","@resvg/resvg-js","sharp","exiftool-vendored"]
};

if (isDev) {
    async function watch() {

        let ctxFE = await esbuild.context(FE_CONFIG);
        await ctxFE.watch();

        let ctxBE = await esbuild.context(BE_CONFIG);
        await ctxBE.watch();

        console.log("Watching...");
    }
    watch();
} else {
    await esbuild.build(FE_CONFIG);
    await esbuild.build(BE_CONFIG);
}