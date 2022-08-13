import styles from '../styles/Badge.module.sass'
import colors from '../src/colors'

import { BadgeProps } from '../src/types/components'

const Badge = (
  {
    color,
    ...props
  }: BadgeProps & JSX.IntrinsicElements['div']
) => {
  const colorChoice = colors.palette[color ?? 'default'] ?? colors.palette.default

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