import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*']
  },

  skipFormatting,

  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-unused-vars': ['warn'],
      'prefer-promise-reject-errors': 'off',
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'no-empty': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0
        }
      ],
      'vue/html-indent': ['error', 2, {
        attribute: 1, // отступы для атрибутов
        baseIndent: 1, // базовый отступ внутри <template>
        closeBracket: 0, // перенос закрывающей скобки
        alignAttributesVertically: true,
        ignores: []
      }],

      // 'prettier/prettier': [
      //   'error',
      //   {
      //     endOfLine: 'auto',
      //   },
      // ],
      quotes: [2, 'single', { avoidEscape: true }],

      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off'
    }
  }
])
