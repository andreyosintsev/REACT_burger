const getIngredientDataById = (data, id) => data.find(data => data._id === id);

export { getIngredientDataById }