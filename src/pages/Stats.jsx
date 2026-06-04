import React from 'react'
import { useHome } from '../context/HomeContext'
import PageHeader from '../components/PageHeader'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts'
import styles from './Stats.module.css'

const MONTHLY = [
  { month: 'Jan', kwh: 420 }, { month: 'Feb', kwh: 380 }, { month: 'Mar', kwh: 350 },
  { month: 'Apr', kwh: 310 }, { month: 'May', kwh: 340 }, { month: 'Jun', kwh: 410 },
  { month: 'Jul', kwh: 460 }, { month: 'Aug', kwh: 440 },
]

const BY_ROOM = [
  { room: 'Living', kwh: 120 }, { room: 'Bedroom', kwh: 85 },
  { room: 'Kitchen', kwh: 140 }, { room: 'Study', kwh: 60 },
]

const WEEKLY = [
  { day: 'Mon', kwh: 18 }, { day: 'Tue', kwh: 22 }, { day: 'Wed', kwh: 15 },
  { day: 'Thu', kwh: 28 }, { day: 'Fri', kwh: 32 }, { day: 'Sat', kwh: 24 }, { day: 'Sun', kwh: 19 },
]

const TOOLTIP_STYLE = {
  contentStyle: { background: 'rgba(255,255,255,0.97)', border: 'none', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' },
  labelStyle: { fontWeight: 700, color: '#333' },
}

export default function Stats() {
  const { totalDevices, activeDevices, rooms } = useHome()
  const totalRooms = rooms.length

  const statCards = [
    { label: 'Total Devices', value: totalDevices, icon: '📱', color: '#e8724a' },
    { label: 'Active Now', value: activeDevices, icon: '🟢', color: '#4caf88' },
    { label: 'Rooms', value: totalRooms, icon: '🚪', color: '#3ab5b0' },
    { label: 'Monthly kWh', value: '440', icon: '⚡', color: '#f5a623' },
  ]

  return (
    <div>
      <PageHeader title="Statistics" subtitle="Energy & device usage overview" />

      <div className={styles.statCards}>
        {statCards.map(s => (
          <div key={s.label} className={`${styles.statCard} glass`}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statVal} style={{ color: s.color }}>{s.value}</span>
            <span className={styles.statLbl}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.charts}>
        <div className={`${styles.chart} glass`}>
          <h3 className={styles.chartTitle}>Weekly Consumption (kWh)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={WEEKLY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="wk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#e8724a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e8724a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Area type="monotone" dataKey="kwh" stroke="#e8724a" strokeWidth={2.5} fill="url(#wk)" dot={{ r: 4, fill: '#e8724a', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={`${styles.chart} glass`}>
          <h3 className={styles.chartTitle}>By Room (kWh this month)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BY_ROOM} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="room" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="kwh" fill="#3ab5b0" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${styles.chartWide} glass`}>
          <h3 className={styles.chartTitle}>Monthly Trend (kWh)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="mo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4caf88" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4caf88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="kwh" stroke="#4caf88" strokeWidth={2.5} dot={{ r: 4, fill: '#4caf88', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
