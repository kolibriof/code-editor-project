import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle a root file of index.js
      build.onResolve({filter: /(^index\.js$)/}, ()=>{
        return {path: 'index.js', namespace: 'a'}
      })

      // Handle relative paths in the module 
      build.onResolve({filter: /^\.+\//}, (args)=>{
        const joinedURL = new URL(
            args.path,
            "https://unpkg.com" + args.resolveDir + "/"
          );
          return {
            namespace: "a",
            path: joinedURL.href,
          };
      })

      // Handle the main file of the module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      
    },
  };
};
