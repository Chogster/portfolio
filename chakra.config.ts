// theme.js
// 1. import `extendTheme` function
import {DeepPartial, extendTheme, ThemeComponents, ThemeConfig} from "@chakra-ui/react"
import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
    global: props => ({
        body: {
            bg: mode('white', '#151515')(props)
        }
    })
}

const components: ThemeComponents = {
    Checkbox: {
        baseStyle: (props) => ({
            border: '1px solid white',
            control: {
                _focus: {
                    border: "none",
                    boxShadow: mode('0 0 0 3px rgba(21, 21, 21, 0.6)', '0 0 0 3px rgba(255, 255, 255, 0.6)')(props)
                },
                _checked: {
                    bg: mode('#151515', 'white')(props),
                    borderColor: mode('#151515', 'white')(props),
                    color: mode('white', '#151515')(props),
                    _hover: {
                        bg: mode('#151515', 'white')(props),
                        borderColor: mode('#151515', 'white')(props),
                    }
                },
                _indeterminate: {
                    bg: "none"
                }
            }
        })
    },
    Popover: {
        baseStyle: {
            content: {
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                bg: '#151515',
            },
            _focus: {
                boxShadow: 'rgba(255, 255, 2555, 0.6) 0.5px solid'
            }
        }
    },
    Avatar: {
        baseStyle: {
            badge: {
                borderColor: 'white',
                borderSize: '1px'
            }
        }
    },
    Tooltip: {
        baseStyle: {
            bg: '#151515',
            border: 'rgba(255, 255, 255, 0.6) 0.5px solid'
        }
    },
    Button: {
        baseStyle: (props) => ({
            _focus: {
                boxShadow: mode('0 0 0 3px rgba(21, 21, 21, 0.6)', '0 0 0 3px rgba(255, 255, 255, 0.6)')(props)
            }
        })
    },
    Drawer: {
        baseStyle: (props) => ({
            closeButton: {
                _focus: {
                    boxShadow: mode('0 0 0 3px rgba(21, 21, 21, 0.6)', '0 0 0 3px rgba(255, 255, 255, 0.6)')(props)
                }
            }
        })
    }
}

// 2. Add your color mode config
const config: DeepPartial<ThemeConfig> = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}

const colors = {
    b2dark: '#151515'
}


// 3. extend the theme
// @ts-ignore
const theme = extendTheme({ config, styles, colors, components })
export default theme