<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Bartu.me | Portfolio (Work in progress)
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/9d57ddab-0044-4bb9-942f-88a93a2b9d1d/deploy-status)](https://app.netlify.com/sites/elegant-khorana-044623/deploys)

# Introduction

This is a personal portfolio that is made using `Gatsby` and `Chakra UI`. Feel free to use it and customize it according to your own needs. [Click to see the license](LICENSE).

Use `npm run develop` to run it locally and `npm run buld` to build it.



## 🚀 Features

* Easily customizable
* Multiple language support
* Dark/light mode support

# Documentation

## gatsby-config.js and translations.json

These two files are very important for you to personalise your website. Please make sure to go through them so that everything works and looks as you want. It is very important that you edit the `siteMetadata` in `gatsby-config.js`. The site may not work if you don't set `supportedLanguages` properly.

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

More will be added here...
