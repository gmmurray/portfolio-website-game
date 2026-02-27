jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-1234'),
}));

jest.mock('../projectIcons', () => ({
  generateProjectIcons: jest.fn(() => [
    { icon: 'fa-solid fa-gem', color: '#ff6f61' },
    { icon: 'fa-solid fa-cog', color: '#6a89cc' },
    { icon: 'fa-solid fa-bolt', color: '#38ada9' },
    { icon: 'fa-solid fa-shield-alt', color: '#e58e26' },
  ]),
}));

const MOCK_NOW = '2024-06-15T12:00:00.000Z';
jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  const mockedDayjs = (date?: string | Date) => {
    if (date === undefined) {
      return actualDayjs(MOCK_NOW);
    }
    return actualDayjs(date);
  };
  Object.assign(mockedDayjs, actualDayjs);
  return { __esModule: true, default: mockedDayjs };
});

import { dataConverter } from '../dataConverter';
import { ABOUT_DESCRIPTION } from '../staticData';
import {
  makeCmsData,
  makeCmsExperience,
  makeActiveCmsExperience,
  makeFeaturedCmsProject,
  makeOtherCmsProject,
  makeTaglessCmsProject,
} from './fixtures/cmsFixtures';

describe('dataConverter', () => {
  describe('about section', () => {
    it('uses static ABOUT_DESCRIPTION when aboutDescription is not provided', () => {
      const result = dataConverter(makeCmsData());

      expect(result.about.description).toBe(ABOUT_DESCRIPTION);
    });

    it('uses CMS aboutDescription when provided', () => {
      const customDesc = 'Custom about description from CMS';
      const result = dataConverter(
        makeCmsData({ aboutDescription: customDesc }),
      );

      expect(result.about.description).toBe(customDesc);
    });

    it('falls back to static ABOUT_DESCRIPTION when aboutDescription is empty string', () => {
      const result = dataConverter(makeCmsData({ aboutDescription: '' }));

      expect(result.about.description).toBe(ABOUT_DESCRIPTION);
    });

    it('falls back to static ABOUT_DESCRIPTION when aboutDescription is undefined', () => {
      const result = dataConverter(
        makeCmsData({ aboutDescription: undefined }),
      );

      expect(result.about.description).toBe(ABOUT_DESCRIPTION);
    });

    it('populates techTree from static data', () => {
      const result = dataConverter(makeCmsData());

      expect(result.about.techTree).toBeDefined();
      expect(result.about.techTree.items.length).toBeGreaterThan(0);
    });

    it('sets technologies to empty array', () => {
      const result = dataConverter(makeCmsData());

      expect(result.about.technologies).toEqual([]);
    });

    it('generates base props with mocked uuid and timestamps', () => {
      const result = dataConverter(makeCmsData());

      expect(result.about.id).toBe('mock-uuid-1234');
      expect(result.about.status).toBe('published');
      expect(result.about.createdAt).toBeDefined();
      expect(result.about.updatedAt).toBeDefined();
    });
  });

  describe('experience conversion', () => {
    it('converts a completed experience with correct date formatting', () => {
      const exp = makeCmsExperience({
        start: '2022-03-01',
        end: '2024-01-15',
      });
      const result = dataConverter(makeCmsData({ experiences: [exp] }));
      const converted = result.experience[0];

      expect(converted.employer).toBe('Acme Corp');
      expect(converted.title).toBe('Senior Developer');
      expect(converted.isActive).toBe(false);
      expect(converted.dateString).toBe('March 2022 - January 2024');
      expect(converted.endDate).not.toBeNull();
    });

    it('marks active experience (no end date) correctly', () => {
      const exp = makeActiveCmsExperience();
      const result = dataConverter(makeCmsData({ experiences: [exp] }));
      const converted = result.experience[0];

      expect(converted.isActive).toBe(true);
      expect(converted.dateString).toContain('- Present');
      expect(converted.endDate).toBeNull();
    });

    it('maps feats text correctly', () => {
      const exp = makeCmsExperience({
        feats: [
          { id: 'f1', text: 'First feat' },
          { id: 'f2', text: 'Second feat' },
        ],
      });
      const result = dataConverter(makeCmsData({ experiences: [exp] }));

      expect(result.experience[0].feats).toEqual([
        'First feat',
        'Second feat',
      ]);
    });

    it('preserves id as string', () => {
      const exp = makeCmsExperience({ id: 42 });
      const result = dataConverter(makeCmsData({ experiences: [exp] }));

      expect(result.experience[0].id).toBe('42');
    });

    it('sets status based on isPublished flag', () => {
      const published = makeCmsExperience({ isPublished: true });
      const draft = makeCmsExperience({ id: 99, isPublished: false });
      const result = dataConverter(
        makeCmsData({ experiences: [published, draft] }),
      );

      expect(result.experience[0].status).toBe('published');
      expect(result.experience[1].status).toBe('draft');
    });

    it('handles empty experiences array', () => {
      const result = dataConverter(makeCmsData({ experiences: [] }));

      expect(result.experience).toEqual([]);
    });
  });

  describe('project conversion', () => {
    it('splits projects by type into featured and other', () => {
      const result = dataConverter(makeCmsData());

      expect(result.featured.length).toBe(1);
      expect(result.other.length).toBe(1);
      expect(result.featured[0].title).toBe('Portfolio Game');
      expect(result.other[0].title).toBe('CLI Tool');
    });

    it('assigns deterministic icons from mocked generateProjectIcons', () => {
      const result = dataConverter(makeCmsData());

      expect(result.featured[0].iconName).toBe('fa-solid fa-gem');
      expect(result.featured[0].iconColor).toBe('#ff6f61');
      expect(result.other[0].iconName).toBe('fa-solid fa-cog');
      expect(result.other[0].iconColor).toBe('#6a89cc');
    });

    it('maps tags text, falling back to empty array when undefined', () => {
      const withTags = makeFeaturedCmsProject();
      const withoutTags = makeTaglessCmsProject();
      const result = dataConverter(
        makeCmsData({ projects: [withTags, withoutTags] }),
      );

      expect(result.featured[0].tags).toEqual(['TypeScript', 'Phaser']);
      expect(result.other[0].tags).toEqual([]);
    });

    it('sets content from description', () => {
      const result = dataConverter(makeCmsData());

      expect(result.featured[0].content).toBe(
        'A Phaser-based portfolio website game',
      );
    });

    it('sets featured-specific fields to empty strings', () => {
      const result = dataConverter(makeCmsData());

      expect(result.featured[0].titleUrl).toBe('');
      expect(result.featured[0].imageUrl).toBe('');
    });

    it('sets other-specific fields to empty strings', () => {
      const result = dataConverter(makeCmsData());

      expect(result.other[0].repositoryUrl).toBe('');
      expect(result.other[0].websiteUrl).toBe('');
    });

    it('handles empty projects array', () => {
      const result = dataConverter(makeCmsData({ projects: [] }));

      expect(result.featured).toEqual([]);
      expect(result.other).toEqual([]);
    });
  });

  describe('output shape (CmsData -> IPortfolioContent contract)', () => {
    it('returns object with all four top-level keys', () => {
      const result = dataConverter(makeCmsData());

      expect(result).toHaveProperty('about');
      expect(result).toHaveProperty('experience');
      expect(result).toHaveProperty('featured');
      expect(result).toHaveProperty('other');
    });

    it('about has all required IAboutContent fields', () => {
      const { about } = dataConverter(makeCmsData());

      expect(about).toHaveProperty('id');
      expect(about).toHaveProperty('status');
      expect(about).toHaveProperty('createdAt');
      expect(about).toHaveProperty('updatedAt');
      expect(about).toHaveProperty('description');
      expect(about).toHaveProperty('technologies');
      expect(about).toHaveProperty('techTree');
      expect(about).toHaveProperty('imageUrl');
    });
  });
});
