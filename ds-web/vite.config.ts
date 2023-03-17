import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts'
import path from "path"

export default defineConfig({
    build: {
        emptyOutDir: true,
        target: 'modules',
        outDir: "es",
        minify: false,
        sourcemap:true,
        cssCodeSplit: false,
        rollupOptions: {
            external: ['vue'],
            input: ['./src/index.ts'],
            output:[
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'es',
                    preserveModulesRoot: 'src'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'lib',
                    preserveModulesRoot: 'src'
                }
            ]
        },
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),
            name:"dscloud",
            formats: ['es','cjs']
        }
    },
    plugins: [
        vue(),
        /*dts({
            //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
            tsConfigFilePath: '../tsconfig.json'
        }),*/
        //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
        /*dts({
            outputDir:'lib',
            tsConfigFilePath: '../tsconfig.json'
        })*/
    ]
})

