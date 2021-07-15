<h1 align="center">
  Chogster | Portfolio
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/9d57ddab-0044-4bb9-942f-88a93a2b9d1d/deploy-status)](https://app.netlify.com/sites/elegant-khorana-044623/deploys)

# Introduction

This is a personal portfolio that is made using [Gatsby](https://www.gatsbyjs.com), [Chakra UI](https://chakra-ui.com/), and [i18next](https://www.i18next.com/). Feel free to use it and customize it according to your own needs. [Click to see the license](LICENSE).

Use `npm run develop` to run it locally and `npm run build` to build it.



## 🚀 Features

* Highly customizable
* Multiple language support
* Dark/light mode support
* Ready to deploy on netlify
* Basic SEO support

## Demo

* Demo could be found at [netlify](https://elegant-khorana-044623.netlify.app) or [my website](https://bartu.me)

# Documentation

## gatsby-config.js and translations.json

These two files are very important for you to personalise your website. Please make sure to go through them so that everything works and looks as you want. It is very important that you edit the `siteMetadata` in `gatsby-config.js`. The site may not work if you don't set `supportedLanguages` properly.

## Contact form

In order for the contact form to work, you need to set up a form provider and use call the respective action URL for it to work. Check out gatsby building a form  [documentation](https://www.gatsbyjs.com/docs/building-a-contact-form) for more information on how to achieve this.

Note: There is a placeholder function for the contact form. Remove the `onSubmit` method from the `form` tag and add your action with your provider URL.

## Text, projects, content in general

All of the text is taken directly from `translations.json`, so this file serves as the main source of content. In order to change the text, this file must be edited, this includes "projects" as well. 

## Social links, activity hours

As a little addition, I put a small "activity badge" next to the avatar. The colour and the tooltip of this badge changes according to the day of the week, and time of the day. You can change the time, days, and the tooltips for this feature in `src/data/personal.json`. For reference, the badge is <span style="color: orange">orange</span>, when it's the weekend, <span style="color: green">green</span> when you're available (not working, not sleeping, and it's not the weekend), <span style="color:red">red</span> when you're working, and <span style="color:gray">gray</span> when you're asleep. I set the sleeping duration to 8 hours by default, but you can change this in `sidebar.tsx` as well.

You can also add links to your social media accounts in `src/data/personal.json`, and leave them as an empty string if you want them hidden.

## Further component customisation

The current dark/light mode themes are already partially customised. You can check out `chakra.config.ts` to see overriden styles. If you want to customise the theme further, please look at [Chakra UI github repo](https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src) and [Chakra UI documentation](https://chakra-ui.com/docs/theming/customize-theme).

## Adding links and other custom components to translations

It is possible to add links and custom components to your translations. You must give an index and use it in the following way:

```
// translations.json
"termsAcceptedLabel": "I have read and accepted the <0>terms</0>"

// .tsx file
<Trans components={[<Link href="YOUR_LINK" />]} t={t} i18nKey="termsAcceptedLabel" />
```

More on this could be found at [react i18next documentation](https://react.i18next.com/latest/trans-component)

## Netlify redirect setup

* By default there are redirects in place thanks to `gatsby-plugin-netlify`, however 404 redirects didn't seem to work. Therefore, I added some default `_redirects` inside `static` folder for 404 handling.
* In order to support your own website's redirects according to your specified languages, edit the `_redirects` accordingly.

## nginx redirect setup

* My default nginx settings for language detection and redirection are below. You can change it according to your own needs.
```
  map $http_accept_language $lang {
    default /en;
    ~de     /de;
    ~tr     /tr; 
  }

  ...

  location ~ ^/$ {
		return 301 $uri$lang;
	}

  ...

  error_page 404 /404;
  location = /404 {
    set $fof "YOUR_WEBSITE_ADDRESS${lang}/404";
    return 301 $fof;
  }
```

# Credits

* Illustrations are done by [Katerina Limpitsouni](https://undraw.co)
* Images are from [Fernando Hernandez](https://unsplash.com/photos/efzwcMRM6j4), [AltumCode](https://unsplash.com/photos/dC6Pb2JdAqs), [Quino Al](https://unsplash.com/photos/4SNUcHPiC8c), [Sigmund](https://unsplash.com/photos/HsTnjCVQ798), [Ethan Sykes](https://unsplash.com/photos/iISyBKOT2D0)
* Tag icons are from [devicons](https://github.com/devicons/devicon). Download and add the icons you want to use to `static/devicons`.
