export const get = async (endpoint) => {
  const results = await axios.get(endpoint);
  return results.data;
};