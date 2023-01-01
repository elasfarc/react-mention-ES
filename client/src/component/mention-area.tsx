import React from "react";
import InputTrigger from "react-input-trigger";
import { ColorRing } from "react-loader-spinner";
import { Meta } from "../types/react-input-trigger";
import { Person, SearchResult } from "../types/api";

function MentionArea() {
  const [state, setState] = React.useState<{
    left: number;
    top: number;
    isSuggestor: boolean;
    text: string;
    currentSelection: number;
    scrollThrough: "mouse" | "keyboard" | null;
  }>({
    left: 0,
    top: 0,
    isSuggestor: false,
    text: "",
    currentSelection: 0,
    scrollThrough: null,
  });

  const [fetchState, setFetchState] = React.useState<{
    loading: boolean;
    data: Person[] | null;
    error: Error | null;
  }>({ loading: false, data: null, error: null });

  const listRef = React.useRef<HTMLDivElement | null>(null);

  const { left, top, isSuggestor, text, currentSelection, scrollThrough } =
    state;
  const { loading, data } = fetchState;

  function setSuggestor(meta: Meta) {
    const { hookType, cursor } = meta;
    switch (hookType) {
      case "start":
        setState((state) => ({
          ...state,
          isSuggestor: true,
          left: cursor.left,
          top: cursor.top + cursor.height,
        }));
        break;
      case "cancel":
        setState({
          isSuggestor: false,
          top: 0,
          left: 0,
          text: "",
          currentSelection: 0,
          scrollThrough: null,
        });
        break;

      default:
        break;
    }
  }

  function handleTyping(meta: Meta) {
    if (meta.hookType === "typing")
      setState((state) => ({
        ...state,
        text: meta.text.toLowerCase(),
        currentSelection: state.currentSelection,
      }));
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;

    if ((key === "ArrowDown" || key === "ArrowUp") && data) {
      e.preventDefault();
      setState((state) => ({
        ...state,
        scrollThrough: "keyboard",
        currentSelection:
          key === "ArrowDown"
            ? (state.currentSelection + 1) % data?.length
            : state.currentSelection === 0
            ? data.length - 1
            : state.currentSelection - 1,
      }));
    }
  };

  const handleMouseOver = (selectionIdx: number) =>
    setState((state) => ({
      ...state,
      scrollThrough: "mouse",
      currentSelection: selectionIdx,
    }));

  React.useEffect(() => {
    if (isSuggestor) {
      setFetchState({ loading: true, data: null, error: null });
      fetch(`/search?q=${text}`)
        .then((res) => res.json())
        .then((hits: SearchResult[]) => {
          setFetchState({
            loading: false,
            data: hits.map((hit) => ({ ...hit._source, id: hit._id })),
            error: null,
          });
        })
        .catch((error) => setFetchState({ data: null, loading: false, error }));
    }
  }, [isSuggestor, text]);

  React.useLayoutEffect(() => {
    if (listRef.current && scrollThrough === "keyboard" && data) {
      const item = listRef.current.firstElementChild as HTMLDivElement;
      const itemHeight = item.offsetHeight;

      if (currentSelection * itemHeight > listRef.current.scrollTop)
        listRef.current.scrollTop = listRef.current.scrollTop + itemHeight;

      if (currentSelection * itemHeight < listRef.current.scrollTop)
        listRef.current.scrollTop = listRef.current.scrollTop - itemHeight;

      if (currentSelection === 0) listRef.current.scrollTop = 0;
      if (currentSelection === data?.length - 1)
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [currentSelection, data, scrollThrough]);

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
        onKeyDown={handleKeyDown}
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
          ref={listRef}
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
            data.map(({ name, id }, index) => (
              <div
                key={id}
                style={{
                  padding: ".5rem 1rem",
                  background: index === currentSelection ? "#8989ff" : "",
                }}
                onMouseOver={() => handleMouseOver(index)}
              >
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
