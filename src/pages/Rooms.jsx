import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHome } from '../context/HomeContext'
import Modal from '../components/Modal'
import PageHeader from '../components/PageHeader'
import styles from './Rooms.module.css'

const ICONS = ['🛋️','🛏️','🍳','🚿','📚','🏋️','🎮','🌿','🛁','🖥️','🚗','🧺']

export default function Rooms() {
  const { rooms, addRoom, removeRoom } = useHome()
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('🛋️')

  const handleAdd = () => {
    if (!name.trim()) return
    addRoom(name.trim(), icon)
    setName(''); setIcon('🛋️')
    setShowModal(false)
  }

  return (
    <div>
      <PageHeader
        title="Rooms"
        subtitle={`${rooms.length} room${rooms.length !== 1 ? 's' : ''} in your home`}
        action={
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            ＋ Add Room
          </button>
        }
      />

      <div className={styles.grid}>
        {rooms.map(r => {
          const active = r.devices.filter(d => d.on).length
          return (
            <Link key={r.id} to={`/rooms/${r.id}`} className={`${styles.card} glass`}>
              <button
                className={styles.removeRoom}
                onClick={e => { e.preventDefault(); removeRoom(r.id) }}
                title="Remove room"
              >✕</button>
              <div className={styles.roomIcon}>{r.icon}</div>
              <h3 className={styles.roomName}>{r.name}</h3>
              <p className={styles.roomSub}>{r.devices.length} device{r.devices.length !== 1 ? 's' : ''}</p>
              <div className={styles.statusRow}>
                <span className={active > 0 ? 'tag tag-green' : 'tag tag-amber'}>
                  {active > 0 ? `${active} active` : 'All off'}
                </span>
              </div>
              <div className={styles.deviceIcons}>
                {r.devices.slice(0, 4).map(d => (
                  <span key={d.id} style={{ opacity: d.on ? 1 : 0.3, fontSize: 18 }}>
                    {{'light':'💡','ac':'❄️','tv':'📺','fan':'🌀','purifier':'🌬️','speaker':'🔊','lock':'🔒','camera':'📷','vacuum':'🤖','wifi':'📶','other':'🔌'}[d.type]||'🔌'}
                  </span>
                ))}
                {r.devices.length > 4 && <span className={styles.more}>+{r.devices.length - 4}</span>}
              </div>
            </Link>
          )
        })}

        <button className={styles.newCard} onClick={() => setShowModal(true)}>
          <span className={styles.newPlus}>＋</span>
          <span className={styles.newLabel}>New Room</span>
        </button>
      </div>

      {showModal && (
        <Modal title="Add New Room" onClose={() => setShowModal(false)}>
          <label>Room Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Master Bedroom"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
          <label style={{ marginTop: 14 }}>Choose Icon</label>
          <div className={styles.iconGrid}>
            {ICONS.map(ic => (
              <button
                key={ic}
                className={`${styles.iconBtn} ${icon === ic ? styles.iconSelected : ''}`}
                onClick={() => setIcon(ic)}
              >
                {ic}
              </button>
            ))}
          </div>
          <div className="btnRow" style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button className="btn btnSecondary" style={{flex:1,padding:'11px',borderRadius:10,border:'none',background:'#f0f0f0',color:'#666',cursor:'pointer',fontFamily:'inherit',fontSize:14,fontWeight:700}} onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btnPrimary" style={{flex:1,padding:'11px',borderRadius:10,border:'none',background:'var(--accent)',color:'white',cursor:'pointer',fontFamily:'inherit',fontSize:14,fontWeight:700}} onClick={handleAdd}>Add Room</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
