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
        this.canvas.addEventListener('mousedown', this._start.bind(this));
        document.addEventListener('mouseup', this._stop.bind(this));

        this.tools.addEventListener('click', this._clickHandler.bind(this));
        this.tools.addEventListener('change', this._changeHandler.bind(this));
    },
    _moveHandler(evt) {
        this.x = evt.offsetX;
        this.y = evt.offsetY;
        this._renderCoordinates(this.x, this.y);
    },
    _clickHandler(evt) {
        if (evt.target.name === 'tool') {
            this.editor['currentTool'] = evt.target.dataset.tool;
        }
        if (evt.target.name === 'save') {
            this._save();
        }
    },
    _changeHandler(evt) {
        if (evt.target.name === 'tool-input') {
            this.editor[`current${evt.target.dataset.tool}`] = evt.target.value;
        }
    },
    _renderCoordinates(x, y) {
        document.querySelector('#xCoord').innerText = x;
        document.querySelector('#yCoord').innerText = y;
    },
    _start() {
        this.ctx.fillStyle = this.editor.currentColor;
        this[`_${this.editor.currentTool}`]();
    },
    _stop() {
        this.canvas.onmousemove = null;
    },
    _pencil() {
        let size = this.editor.currentBrushSize;
        this.canvas.onmousemove = () => {
            this.ctx.fillRect(this.x, this.y, size, size);
        }
    },
    _fill() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    _eraser() {
        this.ctx.fillStyle = '#FFFFFF';
        let size = this.editor.currentBrushSize;

        this.canvas.onmousemove = () => {
            this.ctx.fillRect(this.x, this.y, size, size);
        }
    },
    _eyeDropper() {
        let color = this.ctx.getImageData(this.x, this.y, 1, 1).data;
        let hex = [color[0], color[1], color[2]].map(function(x){
            x = parseInt(x).toString(16);
        return (x.length==1) ? "0" + x : x;
        });

        this.canvas.onclick = function () {
            this.editor.currentColor = '#' + hex.join('');
        }

    },
    _clear() {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    _save() {
        let img = new Image();
        img.src = this.canvas.toDataURL();

        let link = document.createElement('a');
        link.setAttribute('href', img.src);
        link.setAttribute('download', 'canvasImage');

        link.click();
    },
    rgbToHex(arr) {

    }

}

abobe.init();