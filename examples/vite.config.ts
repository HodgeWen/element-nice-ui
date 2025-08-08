import { defineConfig, type UserConfigExport } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { kebabCase } from 'cat-kit'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fg from 'fast-glob'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const componentResolver = name => {
  const kebabName = kebabCase(name)
  if (kebabName.startsWith('el-')) {
    const partialName = kebabName.slice(3)
    if (partialName === 'collapse-transition') {
      return {
        path: `element-nice-ui/lib/transitions/${partialName}`
      }
    }
    if (['icon', 'perfect-scrollbar'].includes(partialName)) {
      return {
        path: `element-nice-ui/lib/${partialName}`,
        sideEffects: [`element-nice-ui/lib/theme-chalk/${partialName}.css`]
      }
    }
    return {
      path: `element-nice-ui/lib/${partialName}`,
      sideEffects: [`element-nice-ui/lib/theme-chalk/${partialName}.css`]
    }
  }
}

export default defineConfig(async ({ command }) => {
  const ExtRE = /\.js$/
  const include = (
    await fg.glob(
      [
        'element-nice-ui/theme-chalk/components/*',
        'element-nice-ui/lib/**/*.js'
      ],
      {
        cwd: resolve(__dirname, 'node_modules'),
        deep: 3
      }
    )
  ).map(item => item.replace(ExtRE, ''))

  const config: UserConfigExport = {
    resolve: {
      extensions: ['.ts', '.js', '.tsx', 'vue', '.json']
    },
    optimizeDeps: {
      include: [...include, '@vue/babel-helper-vue-jsx-merge-props'],
      exclude: ['vue/types/umd'],
      rollupOptions: {
        jsx: 'preserve'
      }
    },

    define: {
      a: '1'
    },
    plugins: [
      createVuePlugin({ jsx: true }),
      vueJsx(),
      Components({
        // dts: true,
        resolvers: [componentResolver],
        directoryAsNamespace: true
      })
    ],
    server: {
      host: true,
      port: 4321,
      strictPort: false
    }
  }

  return config
})
