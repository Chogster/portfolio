// theme.js
// 1. import `extendTheme` function
import {DeepPartial, extendTheme, ThemeConfig} from "@chakra-ui/react"
import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
    global: props => ({
        body: {
            bg: mode('white', '#111')(props)
        }
    })
}

// 2. Add your color mode config
const config: DeepPartial<ThemeConfig> = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}

const colors = {
    b2dark: '#111'
}


// 3. extend the theme
// @ts-ignore
const theme = extendTheme({ config, styles, colors })
export default theme