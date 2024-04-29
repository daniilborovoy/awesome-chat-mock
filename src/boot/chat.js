import { boot } from 'quasar/wrappers'
import { register } from 'vue-advanced-chat'

export default boot(({ app }) => {
  register()
})
