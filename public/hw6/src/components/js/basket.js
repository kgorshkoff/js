let basket = [];
let total = 0;
let onAddToBasket = document.querySelectorAll(".buyButton");

onAddToBasket.forEach(e => {
    e.addEventListener('click', evt => {
        basket.push([evt.currentTarget.dataset.name, evt.currentTarget.dataset.price]);
        total += parseInt(evt.currentTarget.dataset.price);
        })
    }
);