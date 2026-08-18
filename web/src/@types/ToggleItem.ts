/** One labelled on/off row in the settings panel, with its handler attached. */
export type ToggleItem = {
  readonly id: string;
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
};
