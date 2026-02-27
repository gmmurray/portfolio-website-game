import { CmsData, Experience, Project } from '../../cms/cmsTypes';

export function makeCmsExperience(
  overrides: Partial<Experience> = {},
): Experience {
  return {
    id: '1',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-06-01T12:00:00.000Z',
    title: 'Senior Developer',
    employer: 'Acme Corp',
    startDate: '2022-03-01',
    endDate: '2024-01-15',
    feats: [
      'Led migration to microservices',
      'Reduced build time by 40%',
    ],
    ...overrides,
  };
}

export function makeActiveCmsExperience(
  overrides: Partial<Experience> = {},
): Experience {
  return makeCmsExperience({
    id: '2',
    title: 'Lead Engineer',
    employer: 'Current Inc',
    startDate: '2024-02-01',
    endDate: undefined,
    ...overrides,
  });
}

export function makeFeaturedCmsProject(
  overrides: Partial<Project> = {},
): Project {
  return {
    id: '10',
    createdAt: '2023-05-10T08:00:00.000Z',
    updatedAt: '2023-11-20T09:00:00.000Z',
    name: 'Portfolio Game',
    description: 'A Phaser-based portfolio website game',
    isFavorite: true,
    sourceUrl: 'https://github.com/example/portfolio',
    siteUrl: 'https://portfolio.example.com',
    tags: ['TypeScript', 'Phaser'],
    isPublished: true,
    slug: 'portfolio-game',
    ...overrides,
  };
}

export function makeOtherCmsProject(
  overrides: Partial<Project> = {},
): Project {
  return {
    id: '20',
    createdAt: '2023-08-01T07:00:00.000Z',
    updatedAt: '2023-12-15T11:00:00.000Z',
    name: 'CLI Tool',
    description: 'A command-line utility',
    isFavorite: false,
    sourceUrl: 'https://github.com/example/cli',
    siteUrl: null,
    tags: ['Node.js'],
    isPublished: true,
    slug: 'cli-tool',
    ...overrides,
  };
}

export function makeTaglessCmsProject(
  overrides: Partial<Project> = {},
): Project {
  return makeOtherCmsProject({
    id: '30',
    name: 'No Tags Project',
    tags: [],
    slug: 'no-tags-project',
    ...overrides,
  });
}

export function makeCmsData(overrides: Partial<CmsData> = {}): CmsData {
  return {
    experiences: [makeCmsExperience(), makeActiveCmsExperience()],
    projects: [makeFeaturedCmsProject(), makeOtherCmsProject()],
    ...overrides,
  };
}
