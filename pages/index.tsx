import GameLoading from '../components/GameLoading';
import { GetStaticProps } from 'next';
import { IPortfolioContent } from '../types/portfolioContent';
import Link from 'next/link';
import { PORTFOLIO_URL } from '../constants/urls';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { mockGetPortfolioContent } from '../mock';
const GameApp = dynamic(() => import('../components/GameApp'), {
  ssr: false,
  loading: () => <GameLoading />,
});
type Props = {
  content: IPortfolioContent;
};

export default function IndexPage({ content }: Props) {
  return (
    <div className="game-page">
      <div className="game-page__container">
        <div className="game-page__back-button">
          <a href={PORTFOLIO_URL}>Home</a>
        </div>
        <GameApp
          cmsContent={{
            aboutContent: content.about.description,
            technologyContent: content.about.technologies,
            technologyTree: content.about.techTree,
            experiencesContent: content.experience,
            featuredContent: content.featured,
            otherContent: content.other,
          }}
        />
      </div>
      <div className="game-page__small-viewport">
        <div className="subtitle is-2">
          This game is best experienced on larger screens and is not available
          for your current screen size.
        </div>
        <div>
          {/* @ts-ignore */}
          <a href={PORTFOLIO_URL}>Home</a>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.PORTFOLIO_API_URL;
  const apiKey = process.env.PORTFOLIO_API_KEY;
  if (!url || !apiKey) {
    throw new Error('invalid environment config');
  }

  const response = await axios.get<{
    success: boolean;
    data: IPortfolioContent;
  }>(url, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  return {
    props: {
      content: response.data.data,
    },
  };
};
