import headers from "../helpers/headers";

const fetchWrapper = async (
  endpoint: string,
  method: string,
  body?: object
) => {
  const options: RequestInit = {
    method,
    headers: headers(),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(endpoint, options);

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
};

export default fetchWrapper;
