// load a single product from http://localhost:3000/api/products/id api
// get the product id from the url - URLSearchParams 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id'); // we want to get the specific thing from url
//console.log(id); // it shows the unique number of each id

// retrieve the product id from the url 
fetch(`http://localhost:3000/api/products/${id} `)
    .then(response => {
        response.json().then(product => {
            // console.log(product.price);
   
           let price = product.price;

        //inserting details into the product page (into the DOM)
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
            `<option value="${element}"> ${element}</option>`
        });
    });
});
/*
        })

      
    }).then(()=>{
        addEventListeners();
    })

function addEventListeners(){
    const colors = document.getElementById('colors');
    colors.addEventListener('change', upDateColor)

}


function upDateColor(event){
 console.log(event.target.value);
} 

//add event listener on button Add To Cart
console.log('helo');
const btn = document.getElementById('addToCart');

btn.addEventListener('click', function(event){
    productsInTheCart();
});

function productsInTheCart () {
    let productNumbers = localStorage.getItem('productsInTheCart');
    //converting a string into a number
    
    productNumbers = parseInt(productNumbers);
    
    if (productNumbers){
        localStorage.setItem('productsInTheCart', productNumbers +1);
    } else {
        localStorage.setItem('productsInTheCart', 1);
    }
};

*/

//Milestone #7: Adding products to the cart
/*
--I have stored 'addToCart' button in a variable called addToCartElement
let addToCartElement = document.getElementById("addToCart");
, then I have added an Event Listener to that button everytime is clicked
*/

let addToCartElement = document.getElementById("addToCart");
addToCartElement.addEventListener("click", () => {
    let cart = localStorage.getItem("cart"); //will get the item at the given key value
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    // check if color has been selected
    if (color == "") { 
        alert("please select a color");
    }
    else {
        let products = []; 
        if (cart == null) { //if cart is equal to 0
            products.push({ _id: id, quantity: parseInt(quantity), color: color });
            localStorage.setItem("cart", JSON.stringify(products));
        } // If a cart doesn't exist push object to array then store array in local storage
/*
--From a technical perspective the cart can be made as an array
containing three things: (.push)- the product ID, - the quantity of the
product, - the colour of the product.
--parseInt : converts into a number
--(method) Storage.setItem(key: string, value: string): void
Sets the value of the pair identified by key to value, 
creating a new key/value pair if none existed for key previously.
--You must use LocalStorage to access this array from the product
page
*/
        else {
            // if there is already an object in the array then find if it hase same id
            let cart = JSON.parse(localStorage.getItem("cart"));
            let index = cart.findIndex((object) => object._id == id && object.color == color);
             /*cart.findIndex((object) is equal or greater than object._id (=>) is the same 
            as id (==) and (&&) object.color is the same (==) as color );*/

            // comparing if id is the same then check the color
            if (index != -1) {
                // if color is the same then add 1 to quantity
                cart[index].quantity += parseInt(quantity);
            }
            else {
                cart.push({ _id: id, quantity: parseInt(quantity), color: color });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        
    }
});



