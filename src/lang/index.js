import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementEN from 'element-ui/lib/locale/lang/en' // 引入英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入中文包
import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包

Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookie.get('language') || 'zh',
  messages: {
    zh: {
      ...elementZH,
      ...customZH
    },
    en: {
      ...elementEN,
      ...customEN
    }
  }
})
