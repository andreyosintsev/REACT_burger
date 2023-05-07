const checkFetchResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res
      .json()
      .then((err) => Promise.reject(err));
  }
 };

 const getIngredientsFromApi = (api) => {
  try {
    return fetch(`${api}/ingredients`)
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data.data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
      throw new Error(`Ingredient data fetch error: ${error}`);
  }
};

 export default getIngredientsFromApi