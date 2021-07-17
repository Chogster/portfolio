module.exports = {
  siteMetadata: {
    title: "Chogster",
    supportedLanguages: ["tr", "de", "en"],
    siteUrl: "http://localhost",
    defaultLanguage: "en"
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-netlify",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-json",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
      __key: "jsonData",
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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chogster | Portfolio`,
        short_name: `Chogster`,
        start_url: `/`,
        background_color: `#151515`,
        theme_color: `#151515`,
        display: `standalone`,
        icon: `static/icon/icon.png`
      },
    },
  ],
};
