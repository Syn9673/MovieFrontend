interface Palette {
  [key: string]: {
    main: string
    text: string

    alwaysTextColor?: boolean
  }
}

const palette: Palette  = {
  red: {
    main: '#F73939',
    text: 'white'
  },

  purple: {
    main: '#AA55FF',
    text: 'white'
  },

  green: {
    main: '#0BF275',
    text: 'white'
  },

  cyan: {
    main: '#39CAF7',
    text: 'white'
  },

  blue: {
    main: '#426AF8',
    text: 'white'
  },

  brown: {
    main: '#B26D58',
    text: 'white'
  },

  orange: {
    main: '#FF7628',
    text: 'white'
  },

  default: {
    main: '#2c2c2c',
    text: 'white',

    alwaysTextColor: true
  }
}

const colors = {
  light: '#E2E8F0',
  dark: '#171923',

  shadow: '#0e0e0e',
  palette
}

export default colors