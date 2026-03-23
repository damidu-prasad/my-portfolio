import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import AIAssistant from "./components/AIAssistant";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { Suspense, useState } from "react";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      {/* Custom Mouse Trailer */}
      <Cursor />

      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      <Suspense fallback={<div className="loading" style={{ opacity: isLoaded ? 0 : 1 }}>INITIALIZING NEURAL UPLINK...</div>}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 12], fov: 42 }}
          gl={{ antialias: true }}
        >
          <Experience />
        </Canvas>
        
        {isLoaded && (
          <>
            <AIAssistant />
            <Navbar />
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
