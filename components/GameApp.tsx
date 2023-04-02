import React, { FC, useEffect } from 'react';

import { GameCmsContent } from '../types/cmsContent';
import GameComponent from './GameComponent';
import { GameContextProvider } from './GameContext';
import { Provider } from 'react-redux';
import { gameCmsActions } from '../redux/gameCmsSlice';
import { store } from '../redux/store';

type GameAppProps = {
  cmsContent: GameCmsContent;
};

const GameApp: FC<GameAppProps> = ({ cmsContent }) => {
  useEffect(() => {
    const content: Record<string, any> = {};
    const classKeys = Object.keys(new GameCmsContent());

    classKeys.forEach(key => {
      content[key as keyof typeof content] = cmsContent[
        key as keyof typeof cmsContent
      ] as any;
    });

    store.dispatch(gameCmsActions.dataLoaded(content as GameCmsContent));
  }, [cmsContent]);

  return (
    // @ts-ignore
    <Provider store={store}>
      <GameContextProvider>
        <GameComponent />
      </GameContextProvider>
    </Provider>
  );
};

export default GameApp;
