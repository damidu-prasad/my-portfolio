import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import AIAssistant from "./components/AIAssistant";
import Cursor from "./components/Cursor";
import { Suspense } from "react";

function App() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      {/* Custom Mouse Trailer */}
      <Cursor />

      <Suspense fallback={<div className="loading">INITIALIZING NEURAL UPLINK...</div>}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 12], fov: 42 }}
          gl={{ antialias: true }}
        >
          <Experience />
        </Canvas>
        <AIAssistant />
      </Suspense>
    </div>
  );
}

export default App;
