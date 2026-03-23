import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Fill up to 100
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          handleExplode();
          return 100;
        }
        return p + Math.floor(Math.random() * 5) + 1; // Random jumps between 1 and 5
      });
    }, 40); // 40ms interval = ~2-3 seconds to load

    return () => clearInterval(interval);
  }, []);

  const handleExplode = () => {
    setTimeout(() => {
      setIsExploding(true);
      // Wait for explosion animation, then call onComplete
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 500); // 500ms delay at 100%
  };

  return (
    <AnimatePresence>
      {!isExploding && (
        <motion.div 
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 2, filter: "brightness(5)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            overflow: 'hidden'
          }}
        >
          {/* Matrix data particles pulling in */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="loader-particle"
              initial={{ 
                x: (Math.random() - 0.5) * 500, 
                y: (Math.random() - 0.5) * 500,
                scale: 0.5,
                opacity: 0
              }}
              animate={{ 
                x: 0, 
                y: 0,
                scale: 1,
                opacity: [0, 1, 0.2]
              }}
              transition={{ 
                duration: 1 + Math.random() * 2, 
                repeat: Infinity,
                ease: "circIn"
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: '#00ff00',
                borderRadius: '50%',
                boxShadow: '0 0 10px #00ff00',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '10px',
                color: '#00ff00'
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}

          {/* Central Circular progress */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle 
                cx="100" cy="100" r="90" 
                fill="none" 
                stroke="rgba(0, 255, 0, 0.1)" 
                strokeWidth="4" 
              />
              <motion.circle 
                cx="100" cy="100" r="90" 
                fill="none" 
                stroke="#00ff00" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="565.48" // 2 * PI * 90
                strokeDashoffset={565.48 - (565.48 * Math.min(progress, 100)) / 100}
                style={{
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              color: '#00ff00',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '2rem',
              fontWeight: 'bold',
              textShadow: '0 0 15px rgba(0,255,0,0.8)'
            }}>
              {Math.min(progress, 100)}%
            </div>
            {/* Inner glowing core that grows */}
            <motion.div 
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#00ff00',
                boxShadow: '0 0 40px 20px rgba(0,255,0,0.5)'
              }}
              animate={{
                scale: 1 + (progress / 20)
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
