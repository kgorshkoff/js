const names = ['Мышь', 'Монитор', 'Клавиатура', 'Материнская плата', 'Коврик'];
const prices = ['250', '7500', '3000', '5500', '300'];
const imgs = [
    'https://placehold.it/300x200',
    'https://placehold.it/300x200',
    'https://placehold.it/300x200',
    'https://placehold.it/300x200',
    'https://placehold.it/300x200'
];

let catalog = {
    items: [],
    container: null,
    init() {
        this.container = document.querySelector('#app')
        this.items = createCatalog();
        this._render();
    },
    _render() {
        let html = '';
        this.items.forEach(item => {
            html += `
            <div class="card">
                <img src="https://placehold.it/80x100" alt="">
                <br>
                <strong>${item.name}</strong>
                <hr>
                <p>${item.price}руб</p>
                <hr>
                <i>powered by js</i>
            </div>
            `
        });
        this.container.innerHTML = html;
    }
}

function createCatalog() {
    let arr = [];
    names.forEach((name, index) => {
        let id = 'item_' + index;
        arr.push(createItem(id, name, prices[index], imgs[index]))
    })
    return arr;
}

function createItem(id, name, price, img) {
    return { id, name, price, img }
}

catalog.init()