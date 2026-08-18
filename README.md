# MagicCircleOfFifths
Magic Circle analyzes your piano play and instantly shows what notes and chords you are playing. Use it for improvisation, composition or fun.

Two implementations live here:

- **`/`** — the original Processing sketch (`MagicCircle.pde`), which needs the
  [rwmidi](http://ruinwesen.com/support-files/rwmidi.zip) library.
- **[`web/`](web/)** — a TypeScript/React/three.js rewrite that runs in the
  browser and adds time as a third axis: held notes extrude backwards from the
  circle, so you can see the last few bars as well as the current chord.
