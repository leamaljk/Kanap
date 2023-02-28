    // retreive local storage array
    // I have created variables that contain cart array from the local storage 
    // with the total price and total quantity
    let products = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = document.getElementById("totalPrice");
    let totalArticles = document.getElementById("totalQuantity");
    let cart_quantity = 0;
    let cart_price = 0;
    
    //Loop through the producrt array fom local storage
    //Create and insert the elements on the cart page.
    products.forEach((product) => {
        fetch(`http://localhost:3000/api/products/${product._id} `)
            .then(response => {
            response.json().then(p => {
                let cartItems = "";
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
                    <input id='${p._id}-${product.color}' type="number" class="itemQuantity" onchange="updateCart('${p._id}','${product.color}')" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" onclick="deleteItem('${p._id}','${product.color}')" >Delete</p>
                    
                  </div>
                </div>
              </div>
            </article>`;
                cart.innerHTML += cartItems;
                cart_quantity += parseInt(product.quantity);
                cart_price += parseInt(p.price) * parseInt(product.quantity);
                totalArticles.innerHTML = cart_quantity;
                totalPrice.innerHTML = cart_price;
            });
        });
        //End of foreach Loop
        //Modify the totalQuantity Element 
    });
