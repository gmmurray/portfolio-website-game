import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getGameElement, getGameInstance } from '../config';

import React from 'react';
import { TILE_SIZE } from '../constants/gameConstants';
import { getMaxSquareScreenDimension } from '../helpers/gameDimensions';
import { useWindowSize } from '../helpers/useWindowSize';

type GameContextType = {
  dimension: number;
};

const GameContext = createContext<GameContextType | null>(null);

export const useGameContext = () => useContext(GameContext);

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [dimension, setDimension] = useState(0);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // create a new game instance on load
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    getGameInstance();
  }, []);

  // handle window/game resizing
  const handleResizeEvent = useCallback(() => {
    const game = getGameInstance();
    if (!game || !windowWidth || !windowHeight) return;
    const sizeDimension = getMaxSquareScreenDimension(
      windowWidth,
      windowHeight,
      TILE_SIZE,
    );
    game.scale.resize(sizeDimension, sizeDimension);
    const canvasEl = getGameElement();
    if (canvasEl) {
      canvasEl.style.width = `${sizeDimension}px`;
      canvasEl.style.height = `${sizeDimension}px`;
    }
    setDimension(sizeDimension);
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    handleResizeEvent();
  }, [windowWidth, windowHeight, handleResizeEvent]);

  const value = {
    dimension,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
