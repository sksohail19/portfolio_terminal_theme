import React from "react";
import Terminal from "./components/Terminal";
import Lanyard from "./components/Lanyard";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Left: Lanyard */}
      <div className="lanyard-section">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* Right: Terminal */}
      <div className="terminal-section">
        <Terminal />
      </div>
    </div>
  );
}

export default App;
