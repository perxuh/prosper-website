"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Design tokens ──────────────────────────────────────────
const BLUE      = '#2B2BAA'
const BLUE_MID  = '#3B3BC0'
const BLUE_LITE = '#E8E8F8'
const GREEN     = '#22C55E'
const RED       = '#EF4444'
const GRAY      = '#888899'
const TEXT      = '#111122'

// ── Shared helpers ─────────────────────────────────────────
function Sparkline({ data, color = '#22C55E', w = 80, h = 32 }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / range) * (h - 4) - 2,
  ])
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={path + ` L${w},${h} L0,${h} Z`} fill={color} fillOpacity="0.13"/>
      <path d={path} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

function Donut({ slices, size = 110 }) {
  const r = 40, cx = 55, cy = 55, stroke = 14, circ = 2 * Math.PI * r
  let off = 0
  return (
    <svg width={size} height={size} viewBox="0 0 110 110">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EBEBF5" strokeWidth={stroke}/>
      {slices.map((s, i) => {
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${(s.pct/100)*circ} ${circ}`}
            strokeDashoffset={-(off/100)*circ}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }}
          />
        )
        off += s.pct; return el
      })}
    </svg>
  )
}

// ── Web sidebar + topbar shell ─────────────────────────────
function WebShell({ activeNav, children }) {
  const navItems = [
    { id: 'dashboard',   label: 'Dashboard',   icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { id: 'investments', label: 'Investments', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
    { id: 'chat',        label: 'Messages',    icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { id: 'upload',      label: 'Documents',   icon: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12' },
    { id: 'ai',          label: 'AI Advisor',  icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4M12 16h.01' },
  ]
  return (
    <div style={{ display: 'flex', height: '100%', background: '#F7F7FB', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: 190, background: 'white', borderRight: '1px solid #EEEEF5', display: 'flex', flexDirection: 'column', padding: '18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 18px 18px' }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill={BLUE}/>
            <rect x="5" y="16" width="4" height="7" rx="1" fill="white"/>
            <rect x="11" y="11" width="4" height="12" rx="1" fill="white"/>
            <rect x="17" y="6" width="4" height="17" rx="1" fill="white"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 14, color: BLUE, letterSpacing: -0.3 }}>PRO$PER</span>
        </div>
        {navItems.map(n => (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'center', gap: 9, padding: '9px 18px',
            background: n.id === activeNav ? '#F0F0FF' : 'transparent',
            borderRight: n.id === activeNav ? `2.5px solid ${BLUE}` : '2.5px solid transparent',
            color: n.id === activeNav ? BLUE : '#777788',
            fontSize: 12.5, fontWeight: n.id === activeNav ? 700 : 500,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.icon}/>
            </svg>
            {n.label}
          </div>
        ))}
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 18px', borderTop: '1px solid #EEEEF5' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 800 }}>AL</div>
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: TEXT }}>Albert L.</p>
            <p style={{ fontSize: 10, color: GRAY }}>Premium</p>
          </div>
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'white', borderBottom: '1px solid #EEEEF5', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ background: '#F4F4F8', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 7, width: 200 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GRAY} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span style={{ fontSize: 12, color: GRAY }}>Search...</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GRAY} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
              <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid white' }}/>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 800 }}>AL</div>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'hidden', padding: '12px 16px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Desktop: Dashboard ─────────────────────────────────────
function DesktopDashboard() {
  const spark = [58,60,57,62,64,61,65,67,65,69,71,70,73,72,75,78,76,80,82,84]
  const holdings = [
    { ticker: 'AAPL', val: '$2,274', chg: '+1.24%', pos: true },
    { ticker: 'MSFT', val: '$3,322', chg: '+0.86%', pos: true },
    { ticker: 'VOO',  val: '$15,042', chg: '+0.91%', pos: true },
    { ticker: 'NVDA', val: '$4,392', chg: '+2.31%', pos: true },
  ]
  return (
    <WebShell activeNav="dashboard">
      <p style={{ fontSize: 11, color: GRAY, marginBottom: 1 }}>Good morning 👋</p>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 10 }}>Welcome back, Albert</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
        {[
          { label: 'Portfolio Value', val: '$48,291.50', sub: '▲ +$342.18 today', subColor: GREEN },
          { label: 'Total Return', val: '+17.2%', sub: 'Since inception', subColor: GRAY },
          { label: "Today's Gain", val: '+$342.18', sub: '+0.71% today', subColor: GREEN },
        ].map(c => (
          <div key={c.label} style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #EEEEF5' }}>
            <p style={{ fontSize: 10, color: GRAY, marginBottom: 2 }}>{c.label}</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>{c.val}</p>
            <p style={{ fontSize: 11, color: c.subColor, fontWeight: 600, marginTop: 2 }}>{c.sub}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 10 }}>
        <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #EEEEF5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Portfolio Performance</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {['1W','1M','3M','1Y'].map((t,i) => (
                <span key={t} style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 5, background: i===1 ? BLUE : '#F4F4F8', color: i===1 ? 'white' : GRAY, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
          <Sparkline data={spark} color={BLUE} w={340} h={72}/>
          <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
            {holdings.map(h => (
              <div key={h.ticker} style={{ flex: 1, background: '#F8F8FC', borderRadius: 8, padding: '8px 10px' }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: TEXT }}>{h.ticker}</p>
                <p style={{ fontSize: 11, color: TEXT, fontWeight: 700 }}>{h.val}</p>
                <p style={{ fontSize: 10, color: h.pos ? GREEN : RED, fontWeight: 600 }}>{h.chg}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #EEEEF5' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 6 }}>Allocation</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <div style={{ position: 'relative' }}>
              <Donut slices={[{pct:47,color:BLUE},{pct:32,color:'#4444CC'},{pct:12,color:'#6666DD'},{pct:9,color:'#9999EE'}]}/>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: GRAY }}>Return</p>
                <p style={{ fontSize: 12, fontWeight: 800, color: GREEN }}>+17.2%</p>
              </div>
            </div>
          </div>
          {[['ETFs','47%',BLUE],['Tech','32%','#4444CC'],['Intl','12%','#6666DD'],['Bonds','9%','#9999EE']].map(([l,p,c]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }}/>
                <span style={{ fontSize: 11, color: TEXT }}>{l}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </WebShell>
  )
}

// ── Desktop: Investments ───────────────────────────────────
function DesktopInvestments() {
  const stocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', shares: 12, price: 189.50, chg: +1.24, val: 2274.00, color: BLUE },
    { ticker: 'MSFT', name: 'Microsoft', shares: 8, price: 415.20, chg: +0.86, val: 3321.60, color: '#4444CC' },
    { ticker: 'VOO',  name: 'Vanguard S&P 500', shares: 30, price: 501.40, chg: +0.91, val: 15042.00, color: '#6666DD' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', shares: 5, price: 878.30, chg: +2.31, val: 4391.50, color: '#8888EE' },
    { ticker: 'AMZN', name: 'Amazon.com', shares: 10, price: 198.70, chg: -0.47, val: 1987.00, color: '#9999EE' },
  ]
  return (
    <WebShell activeNav="investments">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Investments</h2>
          <p style={{ fontSize: 12, color: GRAY }}>6 positions · Updated just now</p>
        </div>
        <div style={{ background: BLUE, color: 'white', fontSize: 12, fontWeight: 700, padding: '8px 16px', borderRadius: 8 }}>+ Add Position</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 8 }}>
        {[
          { label: 'Total Value', val: '$28,223', color: TEXT },
          { label: 'Total Cost', val: '$24,100', color: TEXT },
          { label: 'Total Return', val: '+$4,123', color: GREEN },
          { label: 'Return %', val: '+17.1%', color: GREEN },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: 10, padding: '12px 14px', border: '1px solid #EEEEF5' }}>
            <p style={{ fontSize: 10.5, color: GRAY, marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px', padding: '10px 16px', borderBottom: '1px solid #F0F0F8', background: '#FAFAFC' }}>
          {['Asset','Shares','Price','Change','Value','Spark'].map(h => (
            <span key={h} style={{ fontSize: 10.5, fontWeight: 700, color: GRAY, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
          ))}
        </div>
        {stocks.map((s, i) => (
          <div key={s.ticker} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px', padding: '8px 14px', alignItems: 'center', borderBottom: i < stocks.length - 1 ? '1px solid #F4F4F8' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 800 }}>{s.ticker.slice(0,4)}</div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{s.ticker}</p>
                <p style={{ fontSize: 10.5, color: GRAY }}>{s.name}</p>
              </div>
            </div>
            <span style={{ fontSize: 12, color: TEXT }}>{s.shares}</span>
            <span style={{ fontSize: 12, color: TEXT }}>${s.price}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: s.chg > 0 ? GREEN : RED }}>{s.chg > 0 ? '+' : ''}{s.chg}%</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>${s.val.toLocaleString('en-US',{minimumFractionDigits:2})}</span>
            <Sparkline data={[50,52,49,55,58,54,60,62,59,65,68,66,70]} color={s.chg > 0 ? GREEN : RED} w={70} h={28}/>
          </div>
        ))}
      </div>
    </WebShell>
  )
}

// ── Desktop: Chat ──────────────────────────────────────────
function DesktopChat() {
  const msgs = [
    { from: 'them', text: "Hi Albert! I've reviewed your portfolio. Your NVDA position is up 2.31% today — great timing on that entry.", time: '2:09 PM' },
    { from: 'me', text: "Thanks Robby! I was thinking about rebalancing. My tech exposure feels high.", time: '2:12 PM' },
    { from: 'them', text: "Good instinct. Tech is at 32% of your allocation. A healthy target is usually 20–25%. I'd suggest trimming NVDA and rotating into VOO to bring it down.", time: '2:14 PM' },
    { from: 'me', text: "That makes sense. What about adding some bonds for stability?", time: '2:16 PM' },
    { from: 'them', text: "Given your 15-year horizon, I'd keep bonds under 10%. You have time to ride out volatility. Shall I prepare a rebalancing proposal?", time: '2:17 PM' },
  ]
  const contacts = [
    { initials: 'RR', name: 'Robby Robby', preview: "Shall I prepare a rebalancing...", time: '2:17 PM', unread: 0, active: true, bg: BLUE },
    { initials: 'AI', name: 'Prosper AI', preview: 'Your portfolio is up 0.71% today', time: '12:07 PM', unread: 1, active: false, bg: BLUE },
    { initials: 'PS', name: 'Support', preview: 'Account verified! Welcome aboard.', time: 'Yesterday', unread: 0, active: false, bg: GREEN },
  ]
  return (
    <WebShell activeNav="chat">
      <div style={{ display: 'flex', gap: 12, height: 420 }}>
        <div style={{ width: 220, background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #F0F0F8' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: TEXT }}>Messages</p>
          </div>
          {contacts.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', background: c.active ? '#F0F0FF' : 'transparent', borderLeft: c.active ? `2.5px solid ${BLUE}` : '2.5px solid transparent' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{c.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{c.name}</p>
                <p style={{ fontSize: 10.5, color: GRAY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.preview}</p>
              </div>
              {c.unread > 0 && <div style={{ width: 16, height: 16, borderRadius: '50%', background: BLUE, color: 'white', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.unread}</div>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #F0F0F8', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 800 }}>RR</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Robby Robby</p>
              <p style={{ fontSize: 11, color: GRAY }}>Financial Advisor · Online</p>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {msgs.map((m, i) => {
              const isMe = m.from === 'me'
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '72%', background: isMe ? BLUE : '#F2F2F8', color: isMe ? 'white' : TEXT, borderRadius: isMe ? '14px 14px 3px 14px' : '14px 14px 14px 3px', padding: '9px 13px', fontSize: 12.5, lineHeight: 1.5 }}>{m.text}</div>
                  <span style={{ fontSize: 10, color: GRAY, marginTop: 3 }}>{m.time}</span>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '10px 14px', borderTop: '1px solid #F0F0F8', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, background: '#F4F4F8', borderRadius: 20, padding: '8px 14px', fontSize: 12.5, color: GRAY }}>Write a message...</div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </div>
          </div>
        </div>
      </div>
    </WebShell>
  )
}

// ── Desktop: File Upload ───────────────────────────────────
function DesktopUpload() {
  const files = [
    { name: '2024_Tax_Return.pdf', type: 'PDF', size: '2.4 MB', date: 'Apr 14, 2026', status: 'Verified', color: '#EF4444' },
    { name: 'Fidelity_Statement_Q1.pdf', type: 'PDF', size: '1.1 MB', date: 'Apr 10, 2026', status: 'Verified', color: '#EF4444' },
    { name: 'Robinhood_Portfolio.csv', type: 'CSV', size: '84 KB', date: 'Apr 8, 2026', status: 'Processing', color: GREEN },
    { name: 'W2_2024_Employer.pdf', type: 'PDF', size: '520 KB', date: 'Mar 22, 2026', status: 'Verified', color: '#EF4444' },
  ]
  return (
    <WebShell activeNav="upload">
      <h2 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 4 }}>Documents</h2>
      <p style={{ fontSize: 12, color: GRAY, marginBottom: 16 }}>Upload statements, tax returns, and financial documents for your advisor</p>
      <div style={{ border: `2px dashed ${BLUE}55`, borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 14, background: '#F8F8FF', marginBottom: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: BLUE_LITE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>Drop files here or click to upload</p>
          <p style={{ fontSize: 11, color: GRAY, marginBottom: 6 }}>PDF, CSV, XLSX, DOCX · Max 50MB</p>
          <div style={{ background: BLUE, color: 'white', fontSize: 11, fontWeight: 700, display: 'inline-block', padding: '6px 14px', borderRadius: 7 }}>Choose File</div>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 80px 100px 120px 100px', padding: '10px 16px', borderBottom: '1px solid #F0F0F8', background: '#FAFAFC' }}>
          {['File','Type','Size','Date','Status'].map(h => (
            <span key={h} style={{ fontSize: 10.5, fontWeight: 700, color: GRAY, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
          ))}
        </div>
        {files.map((f, i) => (
          <div key={f.name} style={{ display: 'grid', gridTemplateColumns: '2fr 80px 100px 120px 100px', padding: '8px 14px', alignItems: 'center', borderBottom: i < files.length - 1 ? '1px solid #F4F4F8' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{f.name}</p>
            </div>
            <span style={{ fontSize: 11, color: GRAY, background: '#F4F4F8', borderRadius: 4, padding: '2px 6px', display: 'inline-block', fontWeight: 700 }}>{f.type}</span>
            <span style={{ fontSize: 12, color: GRAY }}>{f.size}</span>
            <span style={{ fontSize: 12, color: GRAY }}>{f.date}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: f.status === 'Verified' ? GREEN : f.status === 'Processing' ? '#F59E0B' : BLUE, background: f.status === 'Verified' ? '#F0FDF4' : f.status === 'Processing' ? '#FFFBEB' : '#EEF2FF', borderRadius: 20, padding: '3px 10px', display: 'inline-block' }}>{f.status}</span>
          </div>
        ))}
      </div>
    </WebShell>
  )
}

// ── Desktop: AI Advisor ────────────────────────────────────
function DesktopAI() {
  const msgs = [
    { from: 'ai', text: "Good morning, Albert! Your portfolio is up 0.71% today. NVDA led gains at +2.31%. Would you like a full breakdown or have questions about your positions?", time: '9:01 AM' },
    { from: 'me', text: "What's the best way to reduce my tax liability this year?", time: '9:04 AM' },
    { from: 'ai', text: "Great question! Based on your income and portfolio, here are 3 strategies:\n\n1. Max out your 401(k) — you're currently at $14,000 of the $23,000 limit\n2. Harvest tax losses — AMZN is down 4% from your cost basis\n3. Consider a Roth conversion given your tax bracket this year", time: '9:04 AM' },
    { from: 'me', text: "Can you show me my projected tax savings if I max out my 401k?", time: '9:06 AM' },
  ]
  const suggestions = ['Rebalance my portfolio', 'Explain my returns', 'Set a savings goal', 'Compare ETF options']
  return (
    <WebShell activeNav="ai">
      <div style={{ display: 'flex', flexDirection: 'column', height: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: TEXT }}>Prosper AI</p>
            <p style={{ fontSize: 11, color: GREEN }}>● Online · Powered by financial intelligence</p>
          </div>
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => {
              const isMe = m.from === 'me'
              return (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                  {!isMe && (
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    </div>
                  )}
                  <div style={{ maxWidth: '75%', background: isMe ? BLUE : '#F2F2F8', color: isMe ? 'white' : TEXT, borderRadius: isMe ? '14px 14px 3px 14px' : '14px 14px 14px 3px', padding: '10px 13px', fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{m.text}</div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '10px 14px', borderTop: '1px solid #F0F0F8' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {suggestions.map(s => (
                <span key={s} style={{ fontSize: 11, background: BLUE_LITE, color: BLUE, padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: '#F4F4F8', borderRadius: 20, padding: '8px 14px', fontSize: 12.5, color: GRAY }}>Ask Prosper AI anything...</div>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebShell>
  )
}

// ── Mobile Shell ───────────────────────────────────────────
function MobileShell({ children, bg = '#F7F7FB' }) {
  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ background: bg === 'white' ? 'white' : bg, paddingTop: 14, paddingLeft: 20, paddingRight: 20, paddingBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>9:41</span>
        <div style={{ width: 90, height: 14, background: '#111', borderRadius: 10 }}/>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${TEXT}`, display: 'flex', alignItems: 'center', padding: 1.5 }}>
            <div style={{ width: '75%', height: '100%', background: GREEN, borderRadius: 1.5 }}/>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

function MobileBottomNav({ active }) {
  const tabs = [
    { id: 'home',      icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', label: 'Home' },
    { id: 'portfolio', icon: 'M22 12h-4l-3 9L9 3l-3 9H2', label: 'Portfolio' },
    { id: 'chat',      icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z', label: 'Chat' },
    { id: 'docs',      icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6', label: 'Docs' },
    { id: 'ai',        icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4M12 16h.01', label: 'AI' },
  ]
  return (
    <div style={{ background: 'white', borderTop: '1px solid #EFEFEF', display: 'flex', paddingBottom: 18, paddingTop: 10, flexShrink: 0 }}>
      {tabs.map(t => {
        const on = t.id === active
        return (
          <div key={t.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill={on ? BLUE : 'none'} stroke={on ? BLUE : '#AAA'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={t.icon}/>
            </svg>
            <span style={{ fontSize: 9.5, color: on ? BLUE : '#AAA', fontWeight: on ? 700 : 400 }}>{t.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function MobileDashboard() {
  return (
    <MobileShell>
      <div style={{ padding: '4px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: BLUE }}>PRO$PER</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '2px 13px 6px' }}>
        <p style={{ color: GRAY, fontSize: 11, marginBottom: 1 }}>Good morning 👋</p>
        <h1 style={{ fontSize: 17, fontWeight: 800, color: TEXT, marginBottom: 8 }}>Hi, Albert</h1>
        <div style={{ background: BLUE, borderRadius: 14, padding: '12px 14px', marginBottom: 7 }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 2 }}>Total Portfolio Value</p>
          <h2 style={{ color: 'white', fontSize: 21, fontWeight: 800, letterSpacing: -0.5 }}>$48,291.50</h2>
          <span style={{ background: 'rgba(255,255,255,0.18)', color: 'white', fontSize: 10, fontWeight: 600, borderRadius: 20, padding: '2px 8px' }}>▲ +$342.18 (0.71%)</span>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 8 }}>
            {[['Invested','$41,200'],['Returns','+$7,092'],['Yield','17.2%']].map(([l,v]) => (
              <div key={l}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginBottom: 2 }}>{l}</p>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
        {[{s:'S&P 500',v:'5,842.16',c:'+0.87%',pos:true},{s:'NASDAQ',v:'18,290.4',c:'+1.12%',pos:true},{s:'DOW',v:'43,228.5',c:'-0.23%',pos:false}].map(m => (
          <div key={m.s} style={{ background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', padding: '7px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 12, color: TEXT }}>{m.s}</p>
              <p style={{ fontSize: 11, color: GRAY }}>{m.v}</p>
            </div>
            <Sparkline data={[50,53,51,56,59,55,61,63,60,66,70,69]} color={m.pos ? GREEN : RED} w={60} h={26}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: m.pos ? GREEN : RED }}>{m.c}</span>
          </div>
        ))}
      </div>
      <MobileBottomNav active="home"/>
    </MobileShell>
  )
}

function MobileInvestments() {
  const holdings = [
    { ticker: 'AAPL', shares: 12, val: '$2,274', chg: '+1.24%', pos: true, color: BLUE },
    { ticker: 'MSFT', shares: 8, val: '$3,322', chg: '+0.86%', pos: true, color: '#4444CC' },
    { ticker: 'VOO',  shares: 30, val: '$15,042', chg: '+0.91%', pos: true, color: '#6666DD' },
  ]
  return (
    <MobileShell>
      <div style={{ padding: '4px 16px 8px', flexShrink: 0 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Investments</h2>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '2px 13px 6px' }}>
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #EEEEF5', padding: '10px 12px', marginBottom: 7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: GRAY, fontSize: 11, marginBottom: 2 }}>Total Value</p>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>$48,291.50</h3>
              <span style={{ color: GREEN, fontWeight: 700, fontSize: 11 }}>▲ +$342.18 today</span>
            </div>
            <div style={{ position: 'relative' }}>
              <Donut slices={[{pct:47,color:BLUE},{pct:32,color:'#6366F1'},{pct:12,color:'#8B5CF6'},{pct:9,color:'#C4B5FD'}]} size={80}/>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <p style={{ fontSize: 9, color: GRAY }}>Return</p>
                <p style={{ fontSize: 11, fontWeight: 800, color: GREEN }}>+17.2%</p>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 5 }}>Holdings</p>
        {holdings.map(h => (
          <div key={h.ticker} style={{ background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: h.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9.5, fontWeight: 800, flexShrink: 0 }}>{h.ticker}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{h.ticker}</p>
              <p style={{ fontSize: 10.5, color: GRAY }}>{h.shares} shares</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{h.val}</p>
              <p style={{ fontSize: 11.5, fontWeight: 600, color: h.pos ? GREEN : RED }}>{h.chg}</p>
            </div>
          </div>
        ))}
      </div>
      <MobileBottomNav active="portfolio"/>
    </MobileShell>
  )
}

function MobileChat() {
  const msgs = [
    { from: 'them', text: "Hi Albert! I've reviewed your portfolio. Your NVDA is up 2.31% today.", time: '2:09 PM' },
    { from: 'me', text: "Thanks Robby! Thinking about rebalancing — tech feels heavy.", time: '2:12 PM' },
    { from: 'them', text: "Good instinct. Tech is at 32%. I'd trim NVDA and rotate into VOO. Shall I prepare a proposal?", time: '2:14 PM' },
  ]
  return (
    <MobileShell bg="white">
      <div style={{ padding: '4px 14px 10px', borderBottom: '1px solid #F0F0F6', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 800 }}>RR</div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>Robby Robby</p>
          <p style={{ fontSize: 11, color: GRAY }}>Financial Advisor</p>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {msgs.map((m, i) => {
          const isMe = m.from === 'me'
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%', background: isMe ? BLUE : '#F2F2F8', color: isMe ? 'white' : TEXT, borderRadius: isMe ? '16px 16px 3px 16px' : '16px 16px 16px 3px', padding: '10px 13px', fontSize: 13, lineHeight: 1.5 }}>{m.text}</div>
              <span style={{ fontSize: 10, color: GRAY, marginTop: 3 }}>{m.time}</span>
            </div>
          )
        })}
      </div>
      <div style={{ padding: '8px 14px', borderTop: '1px solid #F0F0F6', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
        <div style={{ flex: 1, background: '#F4F4F8', borderRadius: 20, padding: '10px 14px', fontSize: 13, color: GRAY }}>Write a message...</div>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
      <MobileBottomNav active="chat"/>
    </MobileShell>
  )
}

function MobileUpload() {
  const files = [
    { name: '2024_Tax_Return.pdf', size: '2.4 MB', status: 'Verified', color: '#EF4444' },
    { name: 'Fidelity_Q1.pdf', size: '1.1 MB', status: 'Verified', color: '#EF4444' },
    { name: 'Portfolio.csv', size: '84 KB', status: 'Processing', color: '#F59E0B' },
  ]
  return (
    <MobileShell>
      <div style={{ padding: '4px 16px 8px', flexShrink: 0 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Documents</h2>
        <p style={{ fontSize: 11, color: GRAY }}>Upload & manage your financial docs</p>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '2px 12px 4px' }}>
        <div style={{ border: `2px dashed ${BLUE}44`, borderRadius: 12, padding: '10px 12px', background: '#F8F8FF', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: BLUE_LITE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 2 }}>Upload Documents</p>
            <div style={{ background: BLUE, color: 'white', fontSize: 10.5, fontWeight: 700, display: 'inline-block', padding: '5px 12px', borderRadius: 7 }}>Choose File</div>
          </div>
        </div>
        {files.map(f => (
          <div key={f.name} style={{ background: 'white', borderRadius: 10, border: '1px solid #EEEEF5', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: 12, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</p>
              <p style={{ fontSize: 10.5, color: GRAY }}>{f.size}</p>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: f.status === 'Verified' ? GREEN : '#F59E0B', background: f.status === 'Verified' ? '#F0FDF4' : '#FFFBEB', borderRadius: 20, padding: '2px 8px', flexShrink: 0 }}>{f.status}</span>
          </div>
        ))}
      </div>
      <MobileBottomNav active="docs"/>
    </MobileShell>
  )
}

function MobileAI() {
  const msgs = [
    { from: 'ai', text: "Good morning! Portfolio up 0.71% today. NVDA led at +2.31%. What would you like to know?", time: '9:01 AM' },
    { from: 'me', text: "How can I reduce my tax liability this year?", time: '9:04 AM' },
    { from: 'ai', text: "3 strategies:\n1. Max 401(k) — $9K remaining\n2. Harvest losses on AMZN\n3. Consider a Roth conversion", time: '9:04 AM' },
  ]
  return (
    <MobileShell bg="white">
      <div style={{ padding: '4px 14px 10px', borderBottom: '1px solid #F0F0F6', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>Prosper AI</p>
          <p style={{ fontSize: 11, color: GREEN }}>● Online</p>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {msgs.map((m, i) => {
          const isMe = m.from === 'me'
          return (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: isMe ? 'row-reverse' : 'row' }}>
              {!isMe && (
                <div style={{ width: 26, height: 26, borderRadius: 7, background: `${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                </div>
              )}
              <div style={{ maxWidth: '78%', background: isMe ? BLUE : '#F2F2F8', color: isMe ? 'white' : TEXT, borderRadius: isMe ? '16px 16px 3px 16px' : '16px 16px 16px 3px', padding: '10px 13px', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-line' }}>{m.text}</div>
            </div>
          )
        })}
      </div>
      <div style={{ padding: '5px 12px 5px', borderTop: '1px solid #F0F0F6', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#F4F4F8', borderRadius: 20, padding: '9px 13px', fontSize: 12.5, color: GRAY }}>Ask anything...</div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>
      <MobileBottomNav active="ai"/>
    </MobileShell>
  )
}

// ── Device Frames ──────────────────────────────────────────
function BrowserFrame({ children }) {
  return (
    <div className="about-browser-wrap" style={{ width: 680, borderRadius: 14, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)', flexShrink: 0 }}>
      <div style={{ background: '#1C1C28', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }}/>)}
        </div>
        <div style={{ flex: 1, background: '#2A2A38', borderRadius: 6, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style={{ fontSize: 11.5, color: '#888', fontFamily: 'monospace' }}>app.prosper.com/dashboard</span>
        </div>
      </div>
      <div style={{ height: 520, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="about-phone-wrap" style={{ width: 240, background: '#18181E', borderRadius: 40, padding: '10px 8px', boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)', flexShrink: 0, alignSelf: 'flex-end', marginBottom: 24, position: 'relative' }}>
      <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 28, background: '#333', borderRadius: '2px 0 0 2px' }}/>
      <div style={{ position: 'absolute', left: -3, top: 148, width: 3, height: 44, background: '#333', borderRadius: '2px 0 0 2px' }}/>
      <div style={{ position: 'absolute', right: -3, top: 160, width: 3, height: 60, background: '#333', borderRadius: '0 2px 2px 0' }}/>
      <div style={{ borderRadius: 32, overflow: 'hidden', height: 480, position: 'relative', background: '#F7F7FB' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 26, background: '#18181E', borderRadius: '0 0 18px 18px', zIndex: 10 }}/>
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
        <div style={{ width: 70, height: 4, borderRadius: 2, background: '#444' }}/>
      </div>
    </div>
  )
}

// ── Tab config ─────────────────────────────────────────────
const TABS = [
  { id: 'dashboard',   label: 'Dashboard',   icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', color: '#2B2BAA', headline: ['Prosper sees your full ', 'financial picture.'], desc: "Get a bird's-eye view of your entire portfolio, market performance, and daily gains — all in one place.", desktop: <DesktopDashboard/>, mobile: <MobileDashboard/> },
  { id: 'investments', label: 'Investments', icon: 'M22 12h-4l-3 9L9 3l-3 9H2', color: '#2B2BAA', headline: ['Track every position, ', 'in real time.'], desc: 'Monitor your holdings across brokerages, view performance charts, and get deep insights on each position.', desktop: <DesktopInvestments/>, mobile: <MobileInvestments/> },
  { id: 'chat',        label: 'Chat',        icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z', color: '#2B2BAA', headline: ['Your advisor, ', 'always a message away.'], desc: 'Chat with your dedicated human financial advisor and get personalized guidance on every decision.', desktop: <DesktopChat/>, mobile: <MobileChat/> },
  { id: 'upload',      label: 'File Upload', icon: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12', color: '#2B2BAA', headline: ['Share documents ', 'securely.'], desc: 'Upload tax returns, brokerage statements, and financial documents so your advisor always has what they need.', desktop: <DesktopUpload/>, mobile: <MobileUpload/> },
  { id: 'ai',          label: 'AI Advisor',  icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4M12 16h.01', color: '#2B2BAA', headline: ['Intelligence that works ', 'for you, 24/7.'], desc: 'Ask Prosper AI anything — from tax strategies to rebalancing recommendations — and get instant, data-driven answers.', desktop: <DesktopAI/>, mobile: <MobileAI/> },
]

// ── Main export ────────────────────────────────────────────
export default function AboutUsSection() {
  const [activeId, setActiveId] = useState('dashboard')
  const [animKey, setAnimKey] = useState(0)
  const active = TABS.find(t => t.id === activeId)

  function switchTab(id) {
    if (id === activeId) return
    setActiveId(id)
    setAnimKey(k => k + 1)
  }

  return (
    <section className="w-full bg-transparent text-white" style={{ padding: 'clamp(56px, 9vw, 90px) 20px clamp(56px, 9vw, 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Headline */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={activeId + '-headline'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, textAlign: 'center', letterSpacing: '-0.5px', lineHeight: 1.1, maxWidth: 640, marginBottom: 36 }}
          className="font-heading"
        >
          <span style={{ color: 'white' }}>{active.headline[0]}</span>
          <span style={{ color: active.color }}>{active.headline[1]}</span>
        </motion.h2>
      </AnimatePresence>

      {/* Tab pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 18 }}>
        {TABS.map(tab => {
          const on = tab.id === activeId
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="font-heading"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 100, border: on ? 'none' : '1px solid rgba(255,255,255,0.12)', background: on ? 'white' : 'rgba(255,255,255,0.04)', color: on ? '#0A0A18' : 'rgba(255,255,255,0.55)', fontSize: 13.5, fontWeight: on ? 700 : 500, cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <span style={{ width: 22, height: 22, borderRadius: 6, background: on ? tab.color : `${tab.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s ease' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={on ? 'white' : tab.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.icon}/>
                </svg>
              </span>
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeId + '-desc'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="font-heading"
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, marginBottom: 52 }}
        >
          {active.desc}
        </motion.p>
      </AnimatePresence>

      {/* Mockup stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          className="about-mockup-stage"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: [0.22, 0.8, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'flex-end', gap: 28, justifyContent: 'center', width: '100%', maxWidth: 1000 }}
        >
          <BrowserFrame>{active.desktop}</BrowserFrame>
          <PhoneFrame>{active.mobile}</PhoneFrame>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .about-mockup-stage {
            flex-direction: column !important;
            align-items: center !important;
          }
          .about-browser-wrap {
            display: none !important;
          }
          .about-phone-wrap {
            align-self: center !important;
            margin-bottom: 0 !important;
            width: min(240px, calc(100vw - 60px)) !important;
          }
        }
      `}</style>
    </section>
  )
}
