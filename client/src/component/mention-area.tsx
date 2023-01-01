import React from "react";
import InputTrigger from "react-input-trigger";
import { Meta } from "../types/react-input-trigger";

function MentionArea() {
  const [state, setState] = React.useState({
    left: 0,
    top: 0,
    isSuggestor: false,
    text: "",
  });

  const { left, top, isSuggestor, text } = state;

  const people = ["foo", "bar", "beta", "gama"];

  function setSuggestor(meta: Meta) {
    const { hookType, cursor } = meta;
    switch (hookType) {
      case "start":
        setState({
          isSuggestor: true,
          left: cursor.left,
          top: cursor.top + cursor.height,
          text: "",
        });
        break;
      case "cancel":
        setState({ isSuggestor: false, top: 0, left: 0, text: "" });
        break;

      default:
        break;
    }
  }

  function handleTyping(meta: Meta) {
    if (meta.hookType === "typing")
      setState({ isSuggestor, top, left, text: meta.text });
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <InputTrigger
          trigger={{
            keyCode: 50,
            shiftKey: true,
          }}
          onStart={setSuggestor}
          onCancel={setSuggestor}
          onType={handleTyping}
        >
          <textarea
            style={{
              height: "100px",
              width: "400px",
              lineHeight: "1em",
            }}
          />
        </InputTrigger>
        <div
          style={{
            position: "absolute",
            top: top,
            left: left,
            width: "200px",
            borderRadius: "6px",
            background: "white",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",
            display: isSuggestor ? "block" : "none",
          }}
        >
          {people.map((person, index) => (
            <div key={index} style={{ padding: ".5rem 1rem" }}>
              {person}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MentionArea;
