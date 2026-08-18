/**
 * Scene — the WebGL half of the app: camera, lights, and the dial in space.
 *
 * The default camera looks down the time axis from above, so the circle reads
 * much as the original 2D sketch did and the history recedes behind it; orbit
 * to trade that reading for the depth.
 */

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { ReactNode } from 'react';
import { Provider, useStore } from 'react-redux';
import { BACKGROUND_COLOR } from '../../data/theme';
import CircleOfFifthsContainer from '../containers/CircleOfFifthsContainer';
import NoteRibbonsContainer from '../containers/NoteRibbonsContainer';
import SoundingNotesContainer from '../containers/SoundingNotesContainer';
import styles from './Scene.module.css';

function Scene(): ReactNode {
  // react-three-fiber renders through its own React root, and context does not
  // cross that boundary — without handing the store over explicitly, every
  // selector inside the canvas would throw.
  const store = useStore();

  return (
    <Canvas
      className={styles.root}
      camera={{ position: [0, 7.5, 14], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Provider store={store}>
        <color attach="background" args={[BACKGROUND_COLOR]} />
        {/* Fog does the fading of old notes, so nothing has to animate opacity
            per frame to make the past recede. */}
        <fog attach="fog" args={[BACKGROUND_COLOR, 10, 38]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 10, 12]} intensity={1.1} />
        <CircleOfFifthsContainer />
        <SoundingNotesContainer />
        <NoteRibbonsContainer />
        <OrbitControls target={[0, 0, -5]} enablePan={false} minDistance={6} maxDistance={45} />
      </Provider>
    </Canvas>
  );
}

export default Scene;
