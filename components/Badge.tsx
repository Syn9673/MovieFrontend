import styles from '../styles/Badge.module.css'

interface BadgeProps  {
  color?: string
}

interface IColors {
  [key: string]: {
    main: string
    text: string
  }
}

const colors: IColors  = {
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
    text: 'white'
  }
}

const Badge = (
  { color, ...props }: BadgeProps & JSX.IntrinsicElements['div']
) => {
  const colorChoice = colors[color ?? 'default'] ?? colors.default

  return (
    <div
      style={
        {
          color: colorChoice.main,
          borderColor: colorChoice.main,
          backgroundColor: colorChoice.main + '33'
        }
      }
      className={styles.badge}
    >
      {props.children}
    </div>
  )
}

export default Badge