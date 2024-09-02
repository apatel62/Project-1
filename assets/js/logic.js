//keys defined to be used when storing and reading local storage
const shiftkey = 'Shift'
const machine1Key = 'Machine 1';
const machine2Key = 'Machine 2';

// It reads from local storage and returns the data, and if no data exists it returns an empty array 
function readLocalStorage(key) {
    const retData = JSON.parse(localStorage.getItem(key));
    if (retData !== null) {
      return retData;
    } else {
      return [];
    }
  }

// Stores in local storage, takes an object and stores it
function storeLocalStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

//function used to check, grab any machine data from localStorage, and push them to corresponding machine saved data array
function retObject(key, arr) {
  const grab = readLocalStorage(key);
  if (grab.length > 0) {
      for (i=0; i<grab.length; i++) {
          arr.push(grab[i]);
      }
  }
}

// Redirects the page 
const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
  };

