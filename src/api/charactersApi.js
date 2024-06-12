import md5 from 'md5';

const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

const generateHash = (timestamp, privateKey, apiKey) => {
  return md5(timestamp + privateKey + apiKey);
};

const buildUrlWithQuery = (baseUrl, endpoint, query) => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.keys(query).forEach((key) => url.searchParams.append(key, query[key]));
  return url;
};

async function doFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    throw new Error('Failed to do fetch', error);
  }
}

export async function getCharacters(additionalQuery = {}) {
  const now = Date.now().toString();

  const hash = generateHash(now, privateKey, apiKey);

  const query = {
    apikey: apiKey,
    ts: now,
    hash,
    ...additionalQuery,
  };

  const url = buildUrlWithQuery(baseUrl, '/characters', query);

  try {
    const charactersResponse = await doFetch(url);
    const results = charactersResponse.map(({ id, name, thumbnail }) => ({
      id,
      name,
      image: `${thumbnail.path}/portrait_medium.${thumbnail.extension}`,
    }));
    return { results };
  } catch (error) {
    return { error: 'Failed to fetch characters' };
  }
}

export async function getCharacter(characterId) {
  const now = Date.now().toString();

  const hash = generateHash(now, privateKey, apiKey);

  const query = {
    apikey: apiKey,
    ts: now,
    hash,
  };

  const url = buildUrlWithQuery(baseUrl, `/characters/${characterId}`, query);

  try {
    const characterResponse = await doFetch(url);
    const character = characterResponse.map(
      ({ id, name, description, thumbnail }) => ({
        id,
        name,
        description,
        image: `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`,
      })
    );
    return character.length ? { result: character[0] } : undefined;
  } catch (error) {
    return { error: 'Failed to fetch character details' };
  }
}

export async function getComicsByCharacter(characterId) {
  const now = Date.now().toString();

  const hash = generateHash(now, privateKey, apiKey);

  const query = {
    apikey: apiKey,
    ts: now,
    hash,
    orderBy: '-onsaleDate',
    limit: '20',
  };

  const url = buildUrlWithQuery(
    baseUrl,
    `/characters/${characterId}/comics`,
    query
  );

  try {
    const comicsResponse = await doFetch(url);
    const results = comicsResponse.map(({ id, title, dates, thumbnail }) => {
      const fullDate = dates.find((date) => date.type === 'onsaleDate').date;
      const [year] = fullDate.split('-');

      return {
        id,
        title,
        year,
        image: `${thumbnail.path}/portrait_medium.${thumbnail.extension}`,
      };
    });
    return { results };
  } catch (error) {
    return { error: 'Failed to fetch comics' };
  }
}
