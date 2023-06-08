function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}

function saveBurgerToLocalStorage(constructorList, bun) {
  localStorage.setItem('constructorList', JSON.stringify(constructorList));
  localStorage.setItem('bun', JSON.stringify(bun));  
}

function clearBurgerLocalStorage() {
  localStorage.removeItem('constructorList');
  localStorage.removeItem('bun'); 
}

function loadBurgerFromLocalStorage() {
  const constructorList = localStorage.getItem('constructorList')
  ? JSON.parse(localStorage.getItem('constructorList'))
  : [];

  const bun = localStorage.getItem('bun')
  ? JSON.parse(localStorage.getItem('bun'))
  : null;

  return {
    constructorList,
    bun
  };
}

export {  saveToLocalStorage, 
          getFromLocalStorage,
          deleteFromLocalStorage,
          saveBurgerToLocalStorage,
          loadBurgerFromLocalStorage,
          clearBurgerLocalStorage }