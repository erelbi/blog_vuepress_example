const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '(er-el-bi)! blog',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Kimim',
        link: '/aboutme/'
      },
      {
        text: 'Blog',
        link: '/blog/',
      },

    ],
    sidebar: {
      '/aboutme/': [
        {
          title: 'Ben Kimim',
          collapsable: false,
          children: [
            '/blog/',
          ]
        }
      ],
         '/blog/': [
        {
          title: 'blog',
          collapsable: true,
          children: [
            'ifsnedir.md',
            'djangovegüvenlik.md',
            'donanımkimlikleri.md'
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
  ]
}

