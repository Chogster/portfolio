// theme.js
// 1. import `extendTheme` function
import {DeepPartial, extendTheme, ThemeConfig} from "@chakra-ui/react"
// 2. Add your color mode config
const config: DeepPartial<ThemeConfig> = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({ config })
export default theme