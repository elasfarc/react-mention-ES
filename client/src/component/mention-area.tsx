import React from "react";
import InputTrigger from "react-input-trigger";
import { ColorRing } from "react-loader-spinner";
import { Meta } from "../types/react-input-trigger";
import { Person, SearchResult } from "../types/api";

function MentionArea() {
  const [state, setState] = React.useState({
    left: 0,
    top: 0,
    isSuggestor: false,
    text: "",
  });

  const [fetchState, setFetchState] = React.useState<{
    loading: boolean;
    data: Person[] | null;
    error: Error | null;
  }>({ loading: false, data: null, error: null });

  const { left, top, isSuggestor, text } = state;
  const { loading, data } = fetchState;

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
      setState({ isSuggestor, top, left, text: meta.text.toLowerCase() });
  }

  React.useEffect(() => {
    if (isSuggestor) {
      setFetchState({ loading: true, data: null, error: null });
      fetch(`/search?q=${text}`)
        .then((res) => res.json())
        .then((hits: SearchResult[]) => {
          console.log(hits);

          setFetchState({
            loading: false,
            data: hits.map((hit) => ({ ...hit._source, id: hit._id })),
            error: null,
          });
        })
        .catch((error) => setFetchState({ data: null, loading: false, error }));
    }
  }, [isSuggestor, text]);

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
            maxHeight: "25vh",
            overflowY: "scroll",
          }}
        >
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          ) : (
            data &&
            data.map(({ name, id }) => (
              <div key={id} style={{ padding: ".5rem 1rem" }}>
                {name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MentionArea;
