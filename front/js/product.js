// load a single product from http://localhost:3000/api/products/id api
// get the product id from the url - URLSearchParams 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id'); // we want to get the specific thing from url
//console.log(id); // it shows the unique number of each id

