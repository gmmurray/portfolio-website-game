import {
  CmsData,
  CmsExperience,
  CmsProject,
  PayloadApiSearchResponse,
  PayloadQuery,
} from './cmsTypes';

import axios from 'axios';
import { stringify } from 'qs-esm';

export const getCmsData = async (): Promise<CmsData> => {
  const [experiences, projects] = await Promise.all([
    getExperiences(),
    getProjects(),
  ]);

  return {
    experiences,
    projects,
  };
};

async function getExperiences(): Promise<CmsExperience[]> {
  const query: PayloadQuery = {
    sort: '-end',
    where: { isPublished: { equals: true } },
  };

  const queryString = stringify(query, { addQueryPrefix: true });

  const url = `${COLLECTION_SLUGS.EXPERIENCES}${queryString}`;

  const res = await findMany<CmsExperience>(url);

  return res?.docs ?? [];
}

async function getProjects(): Promise<CmsProject[]> {
  const query: PayloadQuery = {
    sort: '-createdAt',
    where: {
      isPublished: {
        equals: 'true',
      },
    },
  };
  const queryString = stringify(query, { addQueryPrefix: true });

  const url = `${COLLECTION_SLUGS.PROJECTS}${queryString}`;

  const res = await findMany<CmsProject>(url);

  return res?.docs ?? [];
}

async function findMany<TData>(
  path: string,
): Promise<PayloadApiSearchResponse<TData> | null> {
  return await sendApiRequest<PayloadApiSearchResponse<TData>>(path);
}

// wrapper for sending requests
async function sendApiRequest<TData>(path: string): Promise<TData> {
  const { baseUrl, apiKey } = getConfig();
  const res = await axios.get<TData>(new URL(path, baseUrl).toString(), {
    headers: {
      Authorization: `${COLLECTION_SLUGS.API_KEYS} API-Key ${apiKey}`,
    },
  });

  if (res.status !== 200) {
    console.log(res);
    throw new Error('error retrieving payload data');
  }

  return res.data;
}

// build base config for the api
const getConfig = () => {
  const payloadUrl = process.env.PAYLOAD_URL;
  const payloadApiKey = process.env.PAYLOAD_API_KEY;

  if (!payloadUrl || !payloadApiKey) {
    console.error('payload url: ', payloadUrl);
    console.error('payload api key: ', payloadApiKey);
    throw new Error('missing payload config');
  }

  return {
    baseUrl: payloadUrl + '/api/',
    apiKey: payloadApiKey,
  };
};

const COLLECTION_SLUGS = {
  EXPERIENCES: 'anima-experiences',
  PROJECTS: 'anima-projects',
  API_KEYS: 'api-keys',
} as const;
