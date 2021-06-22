import {select, settings, templates, classNames} from '/js/settings.js';
import utils from '/js/utils.js';
import CartProduct from './CartProduct.js';


class Cart {
    constructor(element){
      const thisCart = this;

      thisCart.products = [];

      thisCart.getElements(element);
      thisCart.initActions();
      thisCart.sendOrder();

      //console.log('new Cart:', thisCart);
    }

    getElements(element){
      const thisCart = this;

      thisCart.dom = {
        wrapper: element,
        toggleTrigger: element.querySelector(select.cart.toggleTrigger),
        productList: element.querySelector(select.cart.productList),
        deliveryFee: element.querySelector(select.cart.deliveryFee),
        subTotalPrice: element.querySelector(select.cart.subtotalPrice),
        totalPriceUp: element.querySelector(select.cart.totalPriceUp),
        totalPriceDown: element.querySelector(select.cart.totalPriceDown),
        totalNumber: element.querySelector(select.cart.totalNumber),
        form: element.querySelector(select.cart.form),
        address: element.querySelector(select.cart.address).value,
        phone: element.querySelector(select.cart.phone).value,
      };
    }

    initActions(){
      const thisCart = this;

      thisCart.dom.toggleTrigger.addEventListener('click', function(){
        thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
      });

      thisCart.dom.productList.addEventListener('updated', function(){
        thisCart.update();
      });

      thisCart.dom.productList.addEventListener('remove', function(event){
        thisCart.remove(event.detail.cartProduct);
      });

      thisCart.dom.form.addEventListener('submit', function(event){
        event.preventDefault();
        thisCart.sendOrder();
      });
    }

    add(menuProduct){
      const thisCart = this;

      const generatedHTML = templates.cartProduct(menuProduct);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      const cartContainer = thisCart.dom.productList;

      cartContainer.appendChild(generatedDOM);

      thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
      thisCart.update();
      console.log('thisCart.products', thisCart.products);

      //console.log('adding product:', menuProduct);
    }

    update(){
      
      const thisCart = this;
      const deliveryFee = settings.cart.defaultDeliveryFee;
      thisCart.totalNumber = 0;
      thisCart.subTotalPrice = 0;
      thisCart.totalPrice = 0;
      
      for (let product of thisCart.products) {
        thisCart.totalNumber += product.amount;
        thisCart.subTotalPrice += product.priceSingle * product.amount;

        thisCart.dom.subTotalPrice.innerHTML = thisCart.subTotalPrice;
        thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
      }
      if(thisCart.subTotalPrice > 0) {
        thisCart.totalPrice = thisCart.subTotalPrice + deliveryFee;

        thisCart.dom.deliveryFee.innerHTML = deliveryFee;
        thisCart.dom.totalPriceUp.innerHTML = thisCart.totalPrice;
        thisCart.dom.totalPriceDown.innerHTML = thisCart.totalPrice;
      } else {
        thisCart.dom.deliveryFee.innerHTML = 0;
        thisCart.dom.totalPriceUp.innerHTML = 0;
        thisCart.dom.totalPriceDown.innerHTML = 0;
        thisCart.dom.subTotalPrice.innerHTML = 0;
        thisCart.dom.totalNumber.innerHTML = 0;
      } 
    }

    remove(product){ 
      const thisCart = this;

      //find product to remove
      const productIndex = thisCart.products.indexOf(product);

      thisCart.products.splice(productIndex, 1);
      product.dom.wrapper.remove();

      thisCart.update();
    }

    sendOrder(){
      const thisCart = this;

      const url = settings.db.url + '/' + settings.db.orders;

      const payload = {
        address: thisCart.dom.address,
        phone: thisCart.dom.phone,
        totalPrice: thisCart.totalPrice,
        subTotalPrice: thisCart.subTotalPrice,
        totalNumber: thisCart.totalNumber,
        deliveryFee: thisCart.dom.deliveryFee,
        products: [],
      };

      for(let prod of thisCart.products) {
        payload.products.push(prod.getData());
      }

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    }
  }
  export default Cart;