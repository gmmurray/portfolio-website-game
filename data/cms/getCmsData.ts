import { AboutPageContent, CmsData, ProjectsPageContent } from './cmsTypes';

export const getCmsData = async (): Promise<CmsData> => {
  const [aboutContent, projectsContent] = await Promise.all([
    cmsFetch<AboutPageContent>('/content/anima/about'),
    cmsFetch<ProjectsPageContent>('/content/anima/projects'),
  ]);

  return {
    aboutDescription: aboutContent.page.gameAbout,
    experiences: aboutContent.experiences.data,
    projects: projectsContent.projects.data,
  };
};

async function cmsFetch<T>(path: string): Promise<T> {
  const { baseUrl, apiKey } = getConfig();

  const url = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `CMS request failed: ${response.status} ${response.statusText}`,
    );
  }

  const json = await response.json();
  return json.data as T;
}

function getConfig() {
  const baseUrl = process.env.CMS_BASE_URL;
  const apiKey = process.env.CMS_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error(
      'missing CMS config: CMS_BASE_URL and CMS_API_KEY are required',
    );
  }

  return { baseUrl, apiKey };
}
