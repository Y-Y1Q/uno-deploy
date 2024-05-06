import autoprefixer from "autoprefixer";
import * as esbuild from "esbuild";
import postCssPlugin from "esbuild-style-plugin";
import * as fs from "fs";
import * as path from "path";
import tailwindcss from "tailwindcss";

const ROOT_PATH = import.meta.dirname;
const OUT_PATH = path.join(ROOT_PATH, "unogame", "static", "dist");
// console.log(ROOT_PATH);

const isDev = process.env.NODE_ENV === "development";

if (fs.existsSync(OUT_PATH)) {
  fs.rmSync(OUT_PATH, { recursive: true, force: true });
}

const CONFIG = {
  bundle: true,
  format: "esm",
  outdir: OUT_PATH,
  minify: !isDev,
  sourcemap: isDev,
  logLevel: "info",
};

const FE_CONFIG = {
  ...CONFIG,
  entryPoints: [path.join(ROOT_PATH, "unogame", "frontendV2", "index.ts")],
};

const CSS_CONFIG = {
  ...CONFIG,
  entryPoints: [
    path.join(ROOT_PATH, "unogame", "frontendV2", "css", "style.css"),
  ],
  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
};

const BE_CONFIG = {
  ...CONFIG,
  entryPoints: [path.join(ROOT_PATH, "unogame", "backend", "server.ts")],
  platform: "node",
  packages: "external",
};

if (isDev) {
  async function watch() {
    let ctxBE = await esbuild.context(BE_CONFIG);
    await ctxBE.watch();

    let ctxCSS = await esbuild.context(CSS_CONFIG);
    await ctxCSS.watch();

    let ctxFE = await esbuild.context(FE_CONFIG);
    await ctxFE.watch();

    console.log("Watching...");
  }
  watch();
} else {
  await esbuild.build(BE_CONFIG);
  await esbuild.build(CSS_CONFIG);
  await esbuild.build(FE_CONFIG);
}
