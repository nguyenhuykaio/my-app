import { extendTheme, theme } from '@chakra-ui/react'

const breakpoints = {
  base: 0,
  '320': '20em',
  '375': '23.4375em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  '2lg': '64em',
  '3lg': '68.75em',
  xl: '80em',
  xxl: '89em',
  '2xl': '96em',
  '3xl': '120em',
}

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      textPrimary: "#070814",
    },
    dark: {
      textPrimary: "#fff",
    },
  },
  shadows: {
    ...theme.shadows,
    outline: 'none',
  },
  breakpoints,
})

export default customTheme
