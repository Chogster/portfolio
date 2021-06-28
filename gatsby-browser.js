import * as React from "react"
import { I18nextProvider } from "react-i18next";
import Layout from "./src/modules/layout";
import i18n from "./src/translations/i18next"
import {ChakraProvider, ColorModeProvider} from '@chakra-ui/react';
import theme from './chakra.config';


// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  // Change language according to pageContext.lang props, this gets passed down from gatsby-node.js
  setTimeout(() => {
    i18n.changeLanguage(props.pageContext.lang);
  }, 100);
  return (
      <ChakraProvider theme={theme}>
        <ColorModeProvider options={theme.config} />
        <I18nextProvider i18n={i18n}>
            <Layout pageContext={props.pageContext}>
              {element}
            </Layout>
        </I18nextProvider>
      </ChakraProvider>
  )
}