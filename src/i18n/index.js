import en from './en.json'
import ru from './ru.json'
import { createI18n } from 'vue-i18n'

export const locales = {
  ru: {
    name: 'Русский',
    code: 'ru'
  },
  en: {
    name: 'English',
    code: 'en'
  }
}

export default createI18n({
  legacy: false,
  locale: 'ru',
  messages: Object.assign({ ru, en })
})
