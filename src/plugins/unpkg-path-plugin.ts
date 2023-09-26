import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (input: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }
        if (args.path.includes("./") || args.path.includes("../")) {
          const joinedURL = new URL(
            args.path,
            "https://unpkg.com" + args.resolveDir + "/"
          );
          return {
            namespace: "a",
            path: joinedURL.href,
          };
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: input,
          };
        }
        const cachedItem = await fileCache.getItem(args.path);
        if (cachedItem) {
          return cachedItem;
        }
        const { data, request } = await axios(args.path);

        const newItem = await fileCache.setItem(args.path, {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        });
        return newItem;
      });
    },
  };
};
