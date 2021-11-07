import axios from 'axios';
import Noty from 'noty';
import { initAdmin } from './admin';

let addToCart = document.querySelectorAll('.add-to-cart')


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e)
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(function(res) {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item Added to Cart",
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "somthing went wrong",
            progressBar: false
        }).show();
    })
}
// remove alert message
const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove();
    }, 2000)
}
initAdmin()