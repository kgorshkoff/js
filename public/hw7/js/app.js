const container = document.querySelector('#app')
const canvas = document.querySelector('#canv')
const tools = document.querySelector('#tools')
const coordinates = document.querySelector('#coordinates')


const abobe = {
    app: null,
    canvas: null,
    tools: null,
    coordinates: null,
    ctx: null,
    x: 0,
    y: 0,
    editor: {
        currentTool: null,
        currentColor: '#000',
        currentBrushSize: 10
    },
    init() {
        this.app = container;
        this.canvas = canvas;
        this.tools = tools;
        this.coordinates = coordinates;
        this.ctx = this.canvas.getContext('2d');

        this._handleEvents();
    },
    _handleEvents() {
        this.canvas.addEventListener('mousemove', this._moveHandler.bind(this));
        this.tools.addEventListener('click', this._clickHandler.bind(this));
        this.tools.addEventListener('change', this._changeHandler.bind(this));
    },
    _moveHandler(evt) {
        this.x = evt.offsetX;
        this.y = evt.offsetY;
        this._renderCoordinates(this.x, this.y);
    },
    _clickHandler(evt) {
        this.editor.currentTool = evt.target.dataset.tool;
    },
    _changeHandler(evt) {
        switch (evt.target.dataset.tool) {
            case "Color":
                this.editor.currentColor = evt.target.value;
                break
            case "BrushSize":
                this.editor.currentBrushSize = evt.target.value;
                break
        }
    },
    _renderCoordinates(x, y) {
        document.querySelector('#xCoord').innerText = x;
        document.querySelector('#yCoord').innerText = y;
    },

}

abobe.init();