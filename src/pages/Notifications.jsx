import React from 'react'
import { useHome } from '../context/HomeContext'
import PageHeader from '../components/PageHeader'
import styles from './Notifications.module.css'

export default function Notifications() {
  const { notifications, dismissNotification } = useHome()

  return (
    <div>
      <PageHeader title="Notifications" subtitle={`${notifications.length} active alerts`} />

      {notifications.length === 0 ? (
        <div className={styles.empty}>
          <span style={{ fontSize: 48 }}>🎉</span>
          <p>All clear! No notifications.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {notifications.map(n => (
            <div key={n.id} className={`${styles.item} glass`}>
              <span className={`${styles.dot} ${n.type === 'warning' ? styles.dotAmber : n.type === 'action' ? styles.dotAccent : styles.dotTeal}`} />
              <div className={styles.content}>
                <p className={styles.text}>{n.text}</p>
                <p className={styles.time}>{n.time}</p>
              </div>
              <button className={styles.dismiss} onClick={() => dismissNotification(n.id)}>
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
