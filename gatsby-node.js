const path = require(`path`)
const config = require('./gatsby-config');

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
    reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.onCreatePage = async ({ page, actions: { createPage, deletePage, createRedirect } }) => {
    const isEnvDevelopment = process.env.NODE_ENV === 'development';
    const originalPath = page.path;

    // Delete the original page (since we are gonna create localized versions of it)
    await deletePage(page);

    // Create one page for each locale
    await Promise.all(
        config.siteMetadata.supportedLanguages.map(async lang => {
            const localizedPath = `/${lang}${page.path}`;

            // create a redirect based on the accept-language header
            createRedirect({
                fromPath: originalPath,
                toPath: localizedPath,
                Language: lang,
                isPermanent: false,
                redirectInBrowser: isEnvDevelopment,
                statusCode: 301,
            });

        
            await createPage({
                ...page,
                path: localizedPath,
                context: {
                    ...page.context,
                    originalPath,
                    lang,
                },
            });
        })
    );
    
    // Create a fallback redirect if the language is not supported or the
    // Accept-Language header is missing for some reason
    createRedirect({
      fromPath: originalPath,
      toPath: `/${config.siteMetadata.defaultLanguage}${page.path}`,
      isPermanent: false,
      redirectInBrowser: isEnvDevelopment,
      statusCode: 301,
    });
};