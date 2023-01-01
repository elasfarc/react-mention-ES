import React from "react";
import InputTrigger from "react-input-trigger";
import { OnStartMeta } from "./types/react-input-trigger";

import "./App.css";

function App() {
  return (
    <div className="App">
      <InputTrigger
        trigger={{
          keyCode: 50,
          shiftKey: true,
        }}
        onStart={(meta: OnStartMeta) => console.log(meta)}
      >
        <textarea
          style={{
            marginTop: "100px",
            height: "100px",
            width: "400px",
            lineHeight: "1em",
          }}
        />
      </InputTrigger>
    </div>
  );
}

export default App;
