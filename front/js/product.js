// load a single product from http://localhost:3000/api/products/id api
// get the product id from the url - URLSearchParams 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id'); // we want to get the specific thing from url
//console.log(id); // it shows the unique number of each id

fetch(`http://localhost:3000/api/products/${id} `)
    .then(response => {
        response.json().then(product => {
            // console.log(product.price);
   
           let price = product.price;

        //getting imageUrl and alt through backtick template
        //modifying div and class content
        let imgDiv = document.getElementsByClassName('item__img')[0];
        imgDiv.innerHTML = 
        `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

        //get product title by name 
        let productTitle = document.getElementById("title");
        productTitle.innerHTML = product.name;

        //get price by price id tag 
        let productPrice = document.getElementById("price");
        productPrice.innerHTML = product.price;

        //get product description by description id 
        let productDescription = document.getElementById("description");
        productDescription.innerHTML = product.description;

        let colorsDropdown = document.getElementById("colors");
        //making a loop for each element in array of colors
    
        product.colors.forEach(element =>{
            colorsDropdown.innerHTML += 
            `<option value="${element}">
            ${element}</option>`
            });

        })

        });