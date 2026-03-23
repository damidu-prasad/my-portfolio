import React from 'react';
import { Phone, Terminal } from 'lucide-react';

const Navbar = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      background: 'rgba(0, 15, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #00ff00',
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      zIndex: 9000,
      fontFamily: "'Share Tech Mono', monospace",
      color: '#00ff00',
      boxShadow: '0 -5px 15px rgba(0,255,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Terminal size={18} />
        <span style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>CONTACT_NODE</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="tel:+94770073699" style={{ 
            color: '#00ffff', 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            fontSize: '1rem',
            textShadow: '0 0 5px rgba(0,255,255,0.5)'
        }}>
          <Phone size={14} /> +94 77 007 3699
        </a>
        <span style={{ color: '#005500' }}>//</span>
        <a href="tel:+94772020158" style={{ 
            color: '#00ffff', 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            fontSize: '1rem',
            textShadow: '0 0 5px rgba(0,255,255,0.5)'
        }}>
          <Phone size={14} /> +94 77 202 0158
        </a>
      </div>
    </div>
  );
};

export default Navbar;
