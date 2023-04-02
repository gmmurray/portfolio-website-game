import GameOverlayComponent from '../GameOverlay/GameOverlayComponent';
import React from 'react';
import { overlaySelectors } from '../redux/overlaySlice';
import { useGameContext } from './GameContext';
import { useSelector } from 'react-redux';

const GameComponent = () => {
  const isOverlayOpen = useSelector(overlaySelectors.selectOverlayOpen);
  const {} = useGameContext() ?? {};

  return (
    <div id="game" className="game-container">
      {isOverlayOpen && <GameOverlayComponent />}
    </div>
  );
};

export default GameComponent;
