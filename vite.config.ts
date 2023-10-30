import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'

function createMonacoEditorPlugin() {
  return {
    name: 'monaco-editor-plugin',
    resolveId(id) {
      // 在这里编写逻辑，以确定文件是否属于 monaco-editor 的组件
      // 返回 null 表示不处理，返回 id 表示处理该文件
      if (id.startsWith('monaco-editor/')) {
        return id;
      }
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite',
  publicPath: './',
  plugins: [
    vue(),
    vueJsx(),
  ],
  optimizeDeps: {
    // include: [
    //   `monaco-editor/esm/vs/language/json/json.worker`,
    //   `monaco-editor/esm/vs/language/css/css.worker`,
    //   `monaco-editor/esm/vs/language/html/html.worker`,
    //   `monaco-editor/esm/vs/language/typescript/ts.worker`,
    //   `monaco-editor/esm/vs/editor/editor.worker`
    // ],
  },
  build: {
    outDir: "dist",
    // 9月更新
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
      // output: {
      //   // 最小化拆分包
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return id.toString().split('node_modules/')[1].split('/')[0].toString()
      //     }
      //   },
      //   // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
      //   entryFileNames: 'js/[name].[hash].js',
      //   // 用于命名代码拆分时创建的共享块的输出命名
      //   // chunkFileNames: 'js/[name].[hash].js',
      //   // 用于输出静态资源的命名，[ext]表示文件扩展名
      //   // assetFileNames: '[ext]/[name].[hash].[ext]',
      //   assetFileNames(chunkInfo) {
      //     if (chunkInfo.name) {
      //       const [name, ext] = path.basename(chunkInfo.name).split('.')
      //       return `assets/${name.toLocaleLowerCase()}.${ext}`
      //     }
      //     return ''
      //   },
      //   // 拆分js到模块文件夹
      //   chunkFileNames: (chunkInfo) => {
      //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
      //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
      //     return `js/${fileName}/[name].[hash].js`
      //   },
      //
      // },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
