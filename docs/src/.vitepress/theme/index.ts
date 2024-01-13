import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import './styles/custom.css'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 布局插槽 https://vitepress.vuejs.org/guide/theme-introduction.html#layout-slots
    })
  },
  enhanceApp({ app }) {
    // 使用组件 https://vitepress.vuejs.org/guide/using-vue.html#using-components
  }
}
