import { assetCredits, guideCredits } from '../helpers/creditsSceneContent';

import Link from 'next/link';
import React from 'react';

const CreditsPage = () => {
  return (
    <div className="credits-page">
      <div className="credits-page-container">
        <div className="credits-page-header">
          <h1>Credits</h1>
          <Link href="/">Back to game</Link>
        </div>
        <div className="credits-page-section">
          <h2>Guides</h2>
          {guideCredits.map((gc, index) => (
            <div key={index} className="credits-page__item">
              <a href={gc.link} target="_blank" rel="noopener noreferrer">
                {gc.name}
              </a>
            </div>
          ))}
        </div>
        <div className="credits-page-section">
          <h2>Assets</h2>
          {assetCredits.map((ac, index) => (
            <div key={index} className="credits-page__item">
              <a href={ac.link}>{ac.name}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
