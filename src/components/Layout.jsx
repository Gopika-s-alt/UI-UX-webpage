import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.shell}>

      {/* Mobile top bar */}
      <div className={styles.topbar}>
        <button className={styles.menuBtn} onClick={() => setSidebarOpen(o => !o)}>
          ☰
        </button>
        <span className={styles.topbarTitle}>SmartNest</span>
      </div>

      {/* Overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={styles.main}>
        <Outlet />
      </main>

    </div>
  )
}