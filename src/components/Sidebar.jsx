import React from 'react'
import { NavLink } from 'react-router-dom'
import { useHome } from '../context/HomeContext'
import styles from './Sidebar.module.css'

const NAV = [
   {
    to: '/', label: 'Home',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
  },
  {
    to: '/rooms', label: 'Rooms',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  },
  {
    to: '/devices', label: 'Appliances',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
  },

  {
    to: '/members', label: 'Members',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
  },
 
]

export default function Sidebar({ open, onClose }) {
  const { notifications } = useHome()
  return (
   <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
  <div className={styles.brand}>
  <button className={styles.closeBtn} onClick={onClose}>✕</button>
  <img src="/logo.jpg" alt="Logo" className={styles.logoImage} />
  <span className={styles.brandName}>SmartNest</span>
</div>
      <nav className={styles.nav}>
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {item.to === '/notifications' && notifications.length > 0 && (
              <span className={styles.badge}>{notifications.length}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className={styles.bottom}>
        <div className={styles.userCard}>
          <span className={styles.avatar}>👤</span>
          <div>
            <div className={styles.userName}>Admin</div>
            <div className={styles.userRole}>Owner</div>
          </div>
        </div>
      </div>
    </aside>
  )
}