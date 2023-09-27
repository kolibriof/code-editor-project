import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (input: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/ }, async (args: any) => {

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
        }
    }
}