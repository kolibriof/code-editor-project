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

        build.onLoad({filter: /(^index\.js$)/}, ()=> {
            return {
            loader: "jsx",
            contents: input,
          };
        });

        build.onLoad({filter: /.css$/}, async(args: any) => {
            
        const cachedItem = await fileCache.getItem(args.path);
        if (cachedItem) {
          return cachedItem;
        }

        const { data, request } = await axios(args.path);

        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'")

        const contents =  `
        const style = document.createElement('style');
        style.innerText = '${escaped}'
        document.head.appendChild(style)        
        ` ;
        
        const newItem = await fileCache.setItem(args.path, {
          loader: 'jsx',
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        });
        return newItem;
        })

        build.onLoad({ filter: /.*/ }, async (args: any) => {

        const cachedItem = await fileCache.getItem(args.path);
        if (cachedItem) {
          return cachedItem;
        }

        const { data, request } = await axios(args.path);

        
        const newItem = await fileCache.setItem(args.path, {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        });
        return newItem;
       
      });
        }
    }
}