type HookType = "start" | "cancel";
type Cursor = {
  height: number;
  top: number;
  left: number;
  selectionEnd: number;
  selectionStart: number;
};
type OnStartMeta = {
  hookType: HookType;
  cursor: Cursor;
};

export { OnStartMeta };
