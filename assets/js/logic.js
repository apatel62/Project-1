// It reads from local storage and returns the data, and if no data exists it returns an empty array 
function readLocalStorage() {
    const retData = JSON.parse(localStorage.getItem(key));
    if (retData !== null) {
      return retData;
    } else {
      return [];
    }
  }

// Stores in local storage, takes an object and stores it
function storeLocalStorage(obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

// Redirects the page 
const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
  };

