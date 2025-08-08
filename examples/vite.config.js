import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { kebabCase } from 'cat-kit'

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
        path: `element-nice-ui/lib/${partialName}`
      }
    }
    return {
      path: `element-nice-ui/lib/${partialName}`,
      sideEffects: [`element-nice-ui/theme-chalk/components/${partialName}`]
    }
  } else if (kebabName.startsWith('ic-')) {
    return {
      path: `@/components/${name.slice(2)}/main.vue`
    }
  }
}

export default defineConfig({
  resolve: {
    alias: [
      { find: 'element-nice-ui', replacement: resolve(__dirname, '../') }
    ],

    extensions: ['.js', '.tsx', '.vue', '.json']
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
})
