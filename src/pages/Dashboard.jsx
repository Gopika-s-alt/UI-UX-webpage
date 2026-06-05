import React, { useState } from 'react'
import { useHome } from '../context/HomeContext'
import styles from './Dashboard.module.css'
import { QrReader } from 'react-qr-reader'

export default function Dashboard() {
  const {
    rooms,
    totalDevices,
    activeDevices,
  } = useHome()

  const [openScanner, setOpenScanner] = useState(false)
  const [scanResult, setScanResult] = useState('')

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.overlay} />

        {/* Stat pills */}
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statNum}>{rooms.length}</span>
            <span className={styles.statLbl}>Rooms</span>
          </div>

          <div className={styles.statPill}>
            <span className={styles.statNum}>{activeDevices}</span>
            <span className={styles.statLbl}>Active</span>
          </div>

          <div className={styles.statPill}>
            <span className={styles.statNum}>{totalDevices}</span>
            <span className={styles.statLbl}>Total Devices</span>
          </div>

          {/* QR Scan Button */}
          <button
            className={styles.qrButton}
            onClick={() => setOpenScanner(true)}
          >
            📷
            <span>Scan QR</span>
          </button>
        </div>

        {/* QR Scanner Popup */}
        {openScanner && (
          <div className={styles.scannerOverlay}>
            <div className={styles.scannerBox}>
              <div className={styles.scannerHeader}>
                <h2>Add Smart Device</h2>

                <button
                  className={styles.closeBtn}
                  onClick={() => setOpenScanner(false)}
                >
                  ✕
                </button>
              </div>

              <p className={styles.scanText}>
                Scan your device QR code to connect instantly
              </p>

              <div className={styles.qrWrapper}>
                <QrReader
                  constraints={{ facingMode: 'environment' }}
                  onResult={(result, error) => {
                    if (!!result) {
                      setScanResult(result?.text)
                    }
                  }}
                  style={{ width: '100%' }}
                />
              </div>

              {scanResult && (
                <div className={styles.resultBox}>
                  <strong>Connected Device:</strong>
                  <p>{scanResult}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Center Content */}
        <div className={styles.center}>
          <p className={styles.greeting}>Good day! 👋</p>

          <h1 className={styles.title}>Welcome to AutoHome</h1>

          <p className={styles.sub}>
            Monitor, manage, and automate your home effortlessly.
          </p>
        </div>
      </div>
    </div>
  )
}
