import md5 from 'md5';

const generateHash = (timestamp, privateKey, apiKey) => {
  return md5(timestamp + privateKey + apiKey);
};

const buildUrlWithQuery = (baseUrl, endpoint, query) => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.keys(query).forEach((key) => url.searchParams.append(key, query[key]));
  return url;
};

export async function getCharacters(additionalQuery = {}) {
  const now = Date.now().toString();
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const hash = generateHash(now, privateKey, apiKey);

  const query = {
    apikey: apiKey,
    ts: now,
    hash,
    ...additionalQuery,
  };

  const url = buildUrlWithQuery(baseUrl, '/characters', query);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    throw new Error('Failed to fetch characters:', error);
  }
}
