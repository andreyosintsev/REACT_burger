const checkFetchResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res
      .json()
      .then((err) => Promise.reject(err));
  }
 };

const getIngredientsFromAPI = (api) => {
  let ingredientsData = [];
  try {
    fetch(`${api}/ingredients`)
      .then(checkFetchResponse)
      .then((data) => {
        ingredientsData = [...data.data];
        console.log(ingredientsData);
      })
      .catch(error => {
        throw new Error(`Ingredient data fetch error: ${error}`);
      }
    );
  } catch (error) {
    ingredientsData = [];
  }


  return ingredientsData;
 };

 export default getIngredientsFromAPI