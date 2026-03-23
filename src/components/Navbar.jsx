import React from 'react';
import { Phone, Terminal } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-brand">
        <Terminal size={18} />
        <span>CONTACT_NODE</span>
      </div>
      
      <div className="navbar-links">
        <a href="tel:+94770073699" className="nav-link">
          <Phone size={14} /> +94 77 007 3699
        </a>
        <span className="nav-divider">//</span>
        <a href="tel:+94772020158" className="nav-link">
          <Phone size={14} /> +94 77 202 0158
        </a>
      </div>
    </div>
  );
};

export default Navbar;
