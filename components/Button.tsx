import styles from '../styles/Button.module.css'
import { useState } from 'react'

interface ButtonProps  {
  color?: string
  disabled?: boolean

  icon?: JSX.Element
  centered?: boolean

  filled?: boolean
  fullWidth?: boolean
}

interface IColors {
  [key: string]: {
    main: string
    text: string

    alwaysTextColor?: boolean
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
      text: 'white',

      alwaysTextColor: true
    }
  },
  buttonStyle = (
    { color, filled, shadow, disabled }: {
      color?: string
      filled?: boolean
      shadow?: boolean
      disabled?: boolean
    }
  ) => {
    const palette = colors[color || 'default'] || colors.default

    return {
      padding: '10px 30px 10px 30px',
      outline: 'none',
      
      border: `2px solid ${palette.main}`,
      borderRadius: '30px',
      
      fontSize: '20px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      
      transition: 'ease-in-out .2s',
      backgroundColor: filled ? palette.main : 'transparent',

      fontFamily: 'Lemon',

      color: filled ? (
          palette.text
        ) : (
          palette.alwaysTextColor ? palette.text : palette.main
        ),

      boxShadow: shadow ? (
        `0px 0px 15px ${palette.main}`
      ) : 'none'
    }
  }

const Button = (
  {
    centered,
    color,
    filled,
    disabled,
    onClick,
    fullWidth,
    ...props
  }: ButtonProps & JSX.IntrinsicElements['button']
) => {
  const [style, setStyle] = useState(
      buttonStyle(
        { color, filled }
      )
    )

  return (
    <button
      onMouseEnter={
        () => {
          setStyle(
            buttonStyle(
              { color, filled: true, shadow: true }
            )
          )
        }
      }
      onMouseLeave={
        () => {
          setStyle(
            buttonStyle(
              { color, filled }
            )
          )
        }
      }

      onClick={
        (e) => {
          if (disabled || !onClick) return
          onClick(e)
        }
      }

      {...props}
      style={
        {
          width: fullWidth ? '100%' : undefined,

          ...(props.style),
          ...style,

          display: 'flex',
          flexDirection: 'row',

          flexWrap: 'wrap',
          gap: '10px',

          ...(
            centered ? (
              {
                justifyContent: 'center',
                alignItems: 'center',

                textAlign: 'center'
              }
            ) : {}
          )
        }
      }

      className={`${styles.btn} ${props.className ?? ''}`}
    >
      <div>
        {props.children}
      </div>

      {
        props.icon ? (
          <div>
            {props.icon}
          </div>
        ) : null
      }
    </button>
  )
}

export default Button