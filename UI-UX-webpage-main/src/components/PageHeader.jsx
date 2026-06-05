import React from 'react'
import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
