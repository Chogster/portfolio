module.exports = {
  siteMetadata: {
    title: "Bartu.me",
    menuLinks: [
      {
        language: "en",
        links: [
          {
            name: "About",
            link: "/"
          },
          {
            name: "Contact",
            link: "/contact"
          }
        ]
      },
      {
        language: "de",
        links: [
          {
            name: "Über mich",
            link: "/de/"
          },
          {
            name: "Kontakt",
            link: "/de/contact"
          }
        ]
      },
      {
        language: "tr",
        links: [
          {
            name: "Hakkimda",
            link: "/tr/"
          },
          {
            name: "Iletisim",
            link: "/tr/contact"
          }
        ]
      }
    ]
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'en',
        langKeyForNull: 'en',
        useLangKeyLayout: false
      }
    }
  ],
};
