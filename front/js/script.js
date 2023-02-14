// load all products from http://localhost:3000/api/products  api



fetch('http://localhost:3000/api/products')
    .then(response => {
        response.json().then(data => {
            console.log(data);
            
        
            // tag the product div

          

            // loop through the array to build the html to be added to our dom
            // Template Strings (`` backtick strings)

            /* definition for me: will delete later on;
            Template literals are enclosed by backtick (`) 
            characters instead of double or single quotes.

Along with having normal strings, 
template literals can also contain other parts called placeholders, 
which are embedded expressions delimited by a dollar sign and curly braces: 
${expression}. 
The strings and placeholders get passed to a function — either a default 
function, or a function you supply. The default function 
(when you don’t supply your own) just performs string interpolation to do 
substitution of the placeholders and then concatenate the parts into a 
single string. */
/*          <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */
// I have used forEach loop to repeat the tasks
let productHTML = '';
        // tag the product div 
        let productsDiv = document.getElementById('items');
        // loop through the array for each product to build the html to be added to our dom
        data.forEach((product) => {
            productHTML += `
                <a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>
                `;
        });
        // modify the content of the div with the html produced
        productsDiv.innerHTML = productHTML;
       
        })
    })
