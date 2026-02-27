import { CmsData, CmsExperience, CmsProject } from '../../cms/cmsTypes';

export function makeCmsExperience(
  overrides: Partial<CmsExperience> = {},
): CmsExperience {
  return {
    id: 1,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-06-01T12:00:00.000Z',
    title: 'Senior Developer',
    employer: 'Acme Corp',
    start: '2022-03-01',
    end: '2024-01-15',
    feats: [
      { id: 'feat-1', text: 'Led migration to microservices' },
      { id: 'feat-2', text: 'Reduced build time by 40%' },
    ],
    isPublished: true,
    ...overrides,
  };
}

export function makeActiveCmsExperience(
  overrides: Partial<CmsExperience> = {},
): CmsExperience {
  return makeCmsExperience({
    id: 2,
    title: 'Lead Engineer',
    employer: 'Current Inc',
    start: '2024-02-01',
    end: '',
    ...overrides,
  });
}

export function makeFeaturedCmsProject(
  overrides: Partial<CmsProject> = {},
): CmsProject {
  return {
    id: 10,
    createdAt: '2023-05-10T08:00:00.000Z',
    updatedAt: '2023-11-20T09:00:00.000Z',
    title: 'Portfolio Game',
    description: 'A Phaser-based portfolio website game',
    type: 'highlight',
    sourceUrl: 'https://github.com/example/portfolio',
    siteUrl: 'https://portfolio.example.com',
    tags: [
      { id: 'tag-1', text: 'TypeScript' },
      { id: 'tag-2', text: 'Phaser' },
    ],
    isPublished: true,
    ...overrides,
  };
}

export function makeOtherCmsProject(
  overrides: Partial<CmsProject> = {},
): CmsProject {
  return {
    id: 20,
    createdAt: '2023-08-01T07:00:00.000Z',
    updatedAt: '2023-12-15T11:00:00.000Z',
    title: 'CLI Tool',
    description: 'A command-line utility',
    type: 'other',
    sourceUrl: 'https://github.com/example/cli',
    tags: [{ id: 'tag-3', text: 'Node.js' }],
    isPublished: true,
    ...overrides,
  };
}

export function makeTaglessCmsProject(
  overrides: Partial<CmsProject> = {},
): CmsProject {
  return makeOtherCmsProject({
    id: 30,
    title: 'No Tags Project',
    tags: undefined,
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
