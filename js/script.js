//wait for the structure to load and then comes the javascript
//news variable taken to show item added to cart
//itemnumbers has the purpose to show item numbers in top right of the cart icon
/* let news = 1; */
let itemnumbers = 0;

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
//main function
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove-btn');
    for(var i=0; i<removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i=0; i<quantityInputs.length; i++) {
        var quantityInput = quantityInputs[i];
        quantityInput.addEventListener('change', quantityChanged);

    }
    var addToCartButtons = document.getElementsByClassName('add-cart-btn');
    for(var i=0; i<addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);

    }
    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);
    


}
//purchase clicked
function purchaseClicked() {
    var totalPrice = document.getElementsByClassName('cart-total-price')[0].innerText;
    if(totalPrice == '$0'){
        alert('The Cart is Empty!');
        updateCartTotal();
    } else {
        /* console.log(totalPrice); */
        alert('Thanks for your purchase.');
        var cartItems = document.getElementsByClassName('cart-list')[0];
        while(cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
        itemnumbers = '';
        updateCartNUM();

    }

}

//remove cart item
function removeCartItem(event) {
    /* console.log("clicked"); */
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    itemnumbers--;
    updateCartNUM();
}

//QUANITY CHANGED  
function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();


}

//add to Cart Clicked
function addToCartClicked(event) {
/*     if(news <= 2) {
        alert('Added to cart');
    } */
    /* console.log(event.target); */
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('product-name')[0].innerText;
    var price = shopItem.getElementsByClassName('product-price')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('product-img-2')[0].src;
    /* console.log(title, price, imgSrc); */
    addItemToCart(title, price, imgSrc);
    updateCartTotal();

    updateCartNUM();




}



//addItemToCart function
function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('tr');
    cartRow.classList.add('table-row')
    var cartList = document.getElementsByClassName('cart-list')[0];
    var cartitemNames = cartList.getElementsByClassName('cart-item-name');
    for(var i=0; i<cartitemNames.length; i++) {
        if(cartitemNames[i].innerText == title) {
            alert('This item is already in cart!');
            return;
        }
    }
    var cartRowContents = `

       <td class="td-image"><img class="cart-item-image" src="${imgSrc}" alt="" width="60" height="60"></td>
       <td class="cart-item-name">${title}</td>
       <td class="cart-price">${price}</td>
       <td class="cart-quantity"><input class="cart-quantity-input" type="number" value="1"</td>
       <td><button class="remove-btn">X</button></td>

    `;
    cartRow.innerHTML = cartRowContents;  
    cartList.append(cartRow);
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    itemnumbers++;

}



//update cart total
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-list')[0];
    var cartRows = cartItemContainer.getElementsByClassName('table-row');
    var total = 0;
    for(var i=0; i<cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = parseFloat(quantityElement.value);
        total = total + (price*quantity);

    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerHTML = `$${total}`;
    


}

//updaate cart item number
function updateCartNUM() {
/*     var cartnum = document.getElementsByClassName('notification')[0];
    cartnum.innerText = `${itemnumbers}`; */
    document.getElementsByClassName('notification')[0].innerText = `${itemnumbers}`;
    

}

