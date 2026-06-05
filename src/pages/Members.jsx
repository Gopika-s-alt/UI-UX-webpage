import React, { useState } from 'react'
import { useHome } from '../context/HomeContext'
import Modal from '../components/Modal'
import PageHeader from '../components/PageHeader'
import styles from './Members.module.css'

const ROLES = ['Admin', 'Full Access', 'Partial Access', 'View Only']

export default function Members() {
  const { members, addMember, removeMember } = useHome()
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('Partial Access')

  const handleAdd = () => {
    if (!name.trim()) return
    addMember(name.trim(), role)
    setName(''); setRole('Partial Access')
    setShowModal(false)
  }

  return (
    <div>
      <PageHeader
        title="Members"
        subtitle={`${members.length} people have access to your home`}
        action={
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            ＋ Add Member
          </button>
        }
      />

      <div className={styles.list}>
        {members.map(m => (
          <div key={m.id} className={`${styles.card} glass`}>
            <span className={styles.avatar}>{m.avatar}</span>
            <div className={styles.info}>
              <div className={styles.name}>{m.name}</div>
              <div className={styles.role}>{m.role}</div>
            </div>
            <span className={`tag ${m.role === 'Admin' ? 'tag-teal' : 'tag-amber'}`}>{m.role}</span>
            {m.role !== 'Admin' && (
              <button className={styles.remove} onClick={() => removeMember(m.id)}>Remove</button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="Add New Member" onClose={() => setShowModal(false)}>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sara" autoFocus onKeyDown={e => e.key === 'Enter' && handleAdd()} />
          <label>Access Level</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button style={{flex:1,padding:'11px',borderRadius:10,border:'none',background:'#f0f0f0',color:'#666',cursor:'pointer',fontFamily:'inherit',fontSize:14,fontWeight:700}} onClick={() => setShowModal(false)}>Cancel</button>
            <button style={{flex:1,padding:'11px',borderRadius:10,border:'none',background:'var(--accent)',color:'white',cursor:'pointer',fontFamily:'inherit',fontSize:14,fontWeight:700}} onClick={handleAdd}>Add</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
