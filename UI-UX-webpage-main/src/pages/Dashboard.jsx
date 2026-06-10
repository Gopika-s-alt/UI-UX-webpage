
import React, { useState, useEffect } from 'react'
import { useHome } from '../context/HomeContext'
import styles from './Dashboard.module.css'
import { Html5QrcodeScanner } from 'html5-qrcode'

export default function Dashboard() {

  const {
    rooms,
    totalDevices,
    activeDevices,
  } = useHome()

  const [openScanner, setOpenScanner] = useState(false)

  const [scanResult, setScanResult] = useState('')

  /* QR SCANNER */

  useEffect(() => {

    let scanner

    if(openScanner){

      setTimeout(() => {

        scanner = new Html5QrcodeScanner(

          "reader",

          {

            fps:10,

            qrbox:{
              width:220,
              height:220,
            },

            aspectRatio:1,

            rememberLastUsedCamera:true,

            videoConstraints:{
              facingMode:"environment"
            }

          },

          false

        )

        scanner.render(

          (decodedText) => {

            setScanResult(decodedText)

          },

          (error) => {

            console.log(error)

          }

        )

      }, 500)

    }

    return () => {

      if(scanner){

        scanner.clear().catch(error => console.log(error))

      }

    }

  }, [openScanner])

  return (

    <div className={styles.page}>

      <div className={styles.hero}>

        <div className={styles.overlay} />

        {/* TOP RIGHT STATUS */}

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

          {/* QR BUTTON */}

          <button
            className={styles.qrButton}
            onClick={() => setOpenScanner(true)}
          >
            📷
            <span>Scan QR</span>
          </button>

        </div>

        {/* QR POPUP */}

        {
          openScanner && (

            <div className={styles.scannerOverlay}>

              <div className={styles.scannerBox}>

                <div className={styles.scannerHeader}>

                  <h2>Add Smart Device</h2>

                  <button
                    className={styles.closeBtn}
                    onClick={() => {

                      setOpenScanner(false)

                      setScanResult('')

                    }}
                  >
                    ✕
                  </button>

                </div>

                <p className={styles.scanText}>
                  Scan your device QR code to connect instantly
                </p>

                {/* QR SCANNER */}

                <div
                  id="reader"
                  className={styles.qrWrapper}
                ></div>

                {/* RESULT */}

                {
                  scanResult && (

                    <div className={styles.resultBox}>

                      <strong>Connected Device:</strong>

                      <p>{scanResult}</p>

                    </div>

                  )
                }

              </div>

            </div>

          )
        }

        {/* CENTER TEXT */}

        <div className={styles.center}>

          <p className={styles.greeting}>
            Good day! 👋
          </p>

          <h1 className={styles.title}>
            Welcome to AutoHome
          </h1>

          <p className={styles.sub}>
            Monitor, manage, and automate your home effortlessly.
          </p>

        </div>

      </div>

    </div>

  )

}

