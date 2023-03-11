    //#8 retreive local storage array
    // I have created variables that contain cart array from the local storage 
    // with the total price and total quantity
    let products = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = document.getElementById("totalPrice");
    let totalArticles = document.getElementById("totalQuantity");
    let cart_quantity = 0; //is set to 0
    let cart_price = 0;    //is set to 0

    //Loop through the product array fom local storage
    products.forEach((product) => {
        fetch(`http://localhost:3000/api/products/${product._id} `)
            .then(response => {
            response.json().then(p => {
                let cartItems = ""; 

                // have selected cart items id from the uncomented article 
// using the right loop and template literals we re able to list 
// through the array depending on selected items
// and to create and insert the elements on the cart page.

                let cart = document.getElementById("cart__items");
                cartItems += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
              <div class="cart__item__img">
                <img src="${p.imageUrl}" alt="Photo of a sofa">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${p.name}</h2>
                  <p>${product.color} </p>
                  <p> &euro;${p.price}</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Q té:</p>
                    <input id='${p._id}-${product.color}' type="number" class="itemQuantity" 
                    onchange="updateCart('${p._id}','${product.color}')" name="itemQuantity" 
                    min="1" max="100" value="${product.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" onclick="deleteItem('${p._id}','${product.color}')" >Delete</p>            
                  </div>
                </div>
              </div>
            </article>`;
            
                cart.innerHTML += cartItems;
/*I am amending the inside of the cart var(id of "cart__items") by ( += ) 
operator that adds the value of the right operand (let cartItems= "") to a 
variable and assigns the result to the variable which is in the template literals.*/
                cart_quantity += parseInt(product.quantity);
/*cart_quantity which was set to 0 in a string is now parsed into a 
number of product quantity */
                cart_price += parseInt(p.price) * parseInt(product.quantity);
/*cart_price which was set to 0 in a string is now parsed into a 
number of product product price which is multiplied by quantity*/
                totalArticles.innerHTML = cart_quantity;
/*let totalArticles = document.getElementById("totalQuantity");
is being changed to cart_quantity; */
                totalPrice.innerHTML = cart_price;
/*let totalPrice = document.getElementById("totalPrice");
is being changed to cart_price (multiplication od price and quantity) */
            });

            
            
        });
        //End of foreach Loop
        //Modify the totalQuantity Element 

    }); 
   // Now we have a cart page which displays all previously-added articles.
   // With no duplicates of the same id or color.


//#9 milestone

//Now I am able to delete the item on the cart page by clicking on the Delete button
//therefore deleting in local storage and in total price

    const deleteItem = (id, color) => {
      // collect local storage array
      let products = JSON.parse(localStorage.getItem("cart"));
      // target id && color of item to be deleted
      let index = products.findIndex((entry) => entry._id === id && entry.color === color);
      if (index != -1) {
          // remove item from array
          products.splice(index, 1);
          // store new array back to local storage
          localStorage.setItem('cart', JSON.stringify(products));
      }
    //Update the cart
    //clearing the cart items element
    document.getElementById("cart__items").innerHTML = "";
    // reload element
    loadCart();
};

//now I am able to change the quantity on the cart page, manually
//therefore changing in local storage and in total price
const updateCart = (id, color) => {
  // alert('updating');
  //retrieve the quantity
  let quantity = parseInt(document.getElementById(`${id}-${color}`).value);
  // retrieve the products array
  let products = JSON.parse(localStorage.getItem("cart"));
  // find the index of the product
  let index = products.findIndex((entry) => entry._id == id && entry.color == color);
  // update the quantity
  if (index != -1) {
      products[index].quantity = quantity;
      products[index].price = parseInt(products[index].uPrice) * quantity;
  }
  // update local storage
  localStorage.setItem('cart', JSON.stringify(products));
  // clear the cart display
  document.getElementById("cart__items").innerHTML = "";
  // reload the cart and total
  loadCart();
};


// #10 milestone
// form data
// regular expressions for validation
let emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let charAlphaRegExp = /^[A-Za-z -]{3,32}$/;
let addressRegExp = /^[A-Za-z0-9 ]{7,32}$/;
//getting access to form data in the DOM
let form = document.querySelector('.cart__order__form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let validFirstName = false;
let validLastName = false;
let validAddress = false;
let validCity = false;
let validEmail = false;

firstName.addEventListener('change', checkFirstName)
lastName.addEventListener('change', checkLastName)
address.addEventListener('change', checkAddress)
city.addEventListener('change', checkCity)
email.addEventListener('change', checkEmail)

//First name:
function checkFirstName(){
  if (charAlphaRegExp.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = null;
    firstName.style.border = '2px solid green';
    validFirstName = true;
    } else if (charAlphaRegExp.test(firstName.value) === false||firstName.value === '') {
    firstNameErrorMsg.innerHTML = 'Please enter a valid first name';
    firstName.style.border = '2px solid red';
    validFirstName = false;
    }
};

//Name:
function checkLastName(){
  if (charAlphaRegExp.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = null;
    lastName.style.border = '2px solid green';
    validLastName = true;
    } else if (charAlphaRegExp.test(lastName.value) === false||lastName.value === '') {
    lastNameErrorMsg.innerHTML = 'Please enter a valid last name';
    lastName.style.border = '2px solid red';
    validLastName = false;
    }
};

//Address:
function checkAddress(){
  if (addressRegExp.test(address.value)) {
    addressErrorMsg.innerHTML = null;
    address.style.border = '2px solid green';
    validAddress = true;
    } else if (addressRegExp.test(address.value) === false||address.value === '') {
    addressErrorMsg.innerHTML = 'Please enter a valid address';
    address.style.border = '2px solid red';
    validAddress = false;
    }
};

//City:
function checkCity(){
  if (charAlphaRegExp.test(city.value)) {
    cityErrorMsg.innerHTML = null;
    city.style.border = '2px solid green';
    validCity = true;
    } else if (charAlphaRegExp.test(city.value) === false||city.value === '') {
      cityErrorMsg.innerHTML = 'Please enter a valid city';
      city.style.border = '2px solid red';
    validCity = false;
    }
};


//Email:
function checkEmail(){
  if (emailRegExp.test(email.value)) {
    emailErrorMsg.innerHTML = null;
    email.style.border = '2px solid green';
    validEmail = true;
    } else if (emailRegExp.test(email.value) === false||email.value === '') {
      emailErrorMsg.innerHTML = 'Please enter a valid email';
      email.style.border = '2px solid red';
    validEmail = false;
    }
};
// order button
let orderButton = document.getElementById('order');
orderButton.addEventListener('click', orderItem);

// post form and gathering order data
function orderItem(event){
  event.preventDefault();
  // contact object
  let contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  city: city.value,
  email: email.value,
  }
  // creation of product array, get item IDs
  const productArray = [];
  for (let i = 0; i < products.length; i++) {
  productArray.push(products[i]._id);
  }
  // collection of form data object
  const formData = {
  contact,
  productArray,
  }
  // header and stringified form object
  const orderData = {
  method: 'POST',
  body: JSON.stringify(formData),
  headers: {
  'Content-type': 'application/json',
  }
  };
  // POST request
  if (validFirstName === true && validLastName === true && validAddress === true && validCity === true && validEmail === true ){
  fetch('http://localhost:3000/api/products/order', orderData)
  .then(response => response.json())
  .then((data) => {
  let confirmationUrl = './confirmation.html?id=' + data.orderId;
  localStorage.clear();
  window.location.href = confirmationUrl;
  })
  .catch(error => console.log(error));
    } else {
      alert('Please properly fill out the form');
          }
  };