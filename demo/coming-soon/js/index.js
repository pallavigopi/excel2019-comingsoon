var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var STEP_LENGTH = 1;
var CELL_SIZE = Math.floor(window.innerWidth/128);
var BORDER_WIDTH = Math.max(Math.floor(CELL_SIZE/4), 1);
var MAX_FONT_SIZE = 500;
var MAX_ELECTRONS = 100;
var CELL_DISTANCE = CELL_SIZE + BORDER_WIDTH;

// shorter for brighter paint
// be careful of performance issue
var CELL_REPAINT_INTERVAL = [
    300, // from
    500];


var BG_COLOR = '#1d2227';
var BORDER_COLOR = '#13191f';
var CELL_HIGHLIGHT = '#328bf6';
var ELECTRON_COLOR = '#00b07c';
var FONT_COLOR = '#249B81';

var FONT_FAMILY = 'Helvetica, Arial, "Hiragino Sans GB", "Microsoft YaHei", "WenQuan Yi Micro Hei", sans-serif';

var DPR = window.devicePixelRatio || 1;

var ACTIVE_ELECTRONS = [];
var PINNED_CELLS = [];

var MOVE_TRAILS = [
    [0, 1], // down
    [0, -1], // up
    [1, 0], // right
    [-1, 0]].
    map(function (_ref) {var _ref2 = _slicedToArray(_ref, 2),x = _ref2[0],y = _ref2[1];return [x * CELL_DISTANCE, y * CELL_DISTANCE];});

var END_POINTS_OFFSET = [
    [0, 0], // left top
    [0, 1], // left bottom
    [1, 0], // right top
    [1, 1]].
    map(function (_ref3) {var _ref4 = _slicedToArray(_ref3, 2),x = _ref4[0],y = _ref4[1];return [
        x * CELL_DISTANCE - BORDER_WIDTH / 2,
        y * CELL_DISTANCE - BORDER_WIDTH / 2];});var


FullscreenCanvas = function () {
    function FullscreenCanvas() {var disableScale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;_classCallCheck(this, FullscreenCanvas);
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        this.canvas = canvas;
        this.context = context;
        this.disableScale = disableScale;

        this.resizeHandlers = [];
        this.handleResize = _.debounce(this.handleResize.bind(this), 100);

        this.adjust();

        window.addEventListener('resize', this.handleResize);
    }_createClass(FullscreenCanvas, [{ key: 'adjust', value: function adjust()

        {var

            canvas =
                this.canvas,context = this.context,disableScale = this.disableScale;var _window =
                window,innerWidth = _window.innerWidth,innerHeight = _window.innerHeight;

            this.width = innerWidth;
            this.height = innerHeight;

            var scale = disableScale ? 1 : DPR;

            this.realWidth = canvas.width = innerWidth * scale;
            this.realHeight = canvas.height = innerHeight * scale;
            canvas.style.width = innerWidth + 'px';
            canvas.style.height = innerHeight + 'px';

            context.scale(scale, scale);
        } }, { key: 'clear', value: function clear()

            {var
                context = this.context;

                context.clearRect(0, 0, this.width, this.height);
            } }, { key: 'makeCallback', value: function makeCallback(

                fn) {
                fn(this.context, this);
            } }, { key: 'blendBackground', value: function blendBackground(

                background) {var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.05;
                return this.paint(function (ctx, _ref5) {var realWidth = _ref5.realWidth,realHeight = _ref5.realHeight,width = _ref5.width,height = _ref5.height;
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.globalAlpha = opacity;

                    ctx.drawImage(background, 0, 0, realWidth, realHeight, 0, 0, width, height);
                });
            } }, { key: 'paint', value: function paint(

                fn) {
                if (!_.isFunction(fn)) return;var

                context = this.context;

                context.save();

                this.makeCallback(fn);

                context.restore();

                return this;
            } }, { key: 'repaint', value: function repaint(

                fn) {
                if (!_.isFunction(fn)) return;

                this.clear();

                return this.paint(fn);
            } }, { key: 'onResize', value: function onResize(

                fn) {
                if (!_.isFunction(fn)) return;

                this.resizeHandlers.push(fn);
            } }, { key: 'handleResize', value: function handleResize()

                {var
                    resizeHandlers = this.resizeHandlers;

                    if (!resizeHandlers.length) return;

                    this.adjust();

                    resizeHandlers.forEach(this.makeCallback.bind(this));
                } }, { key: 'renderIntoView', value: function renderIntoView()

                    {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;var
                        canvas = this.canvas;

                        this.container = target;

                        canvas.style.position = 'absolute';
                        canvas.style.left = '0px';
                        canvas.style.top = '0px';

                        target.appendChild(canvas);
                    } }, { key: 'remove', value: function remove()

                        {
                            if (!this.container) return;

                            try {
                                window.removeEventListener('resize', this.handleResize);
                                this.container.removeChild(this.canvas);
                            } catch (e) {}
                        } }]);return FullscreenCanvas;}();var


Electron = function () {
    function Electron()







    {var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},_ref6$lifeTime = _ref6.lifeTime,lifeTime = _ref6$lifeTime === undefined ? 3 * 1e3 : _ref6$lifeTime,_ref6$speed = _ref6.speed,speed = _ref6$speed === undefined ? STEP_LENGTH : _ref6$speed,_ref6$color = _ref6.color,color = _ref6$color === undefined ? ELECTRON_COLOR : _ref6$color;_classCallCheck(this, Electron);
        this.lifeTime = lifeTime;
        this.expireAt = Date.now() + lifeTime;

        this.speed = speed;
        this.color = color;

        this.radius = BORDER_WIDTH / 2;
        this.current = [x, y];
        this.visited = {};
        this.setDest(this.randomPath());
    }_createClass(Electron, [{ key: 'randomPath', value: function randomPath()

        {var _current = _slicedToArray(


            this.current, 2),x = _current[0],y = _current[1];var

            length = MOVE_TRAILS.length;var _MOVE_TRAILS$_$random = _slicedToArray(

                MOVE_TRAILS[_.random(length - 1)], 2),deltaX = _MOVE_TRAILS$_$random[0],deltaY = _MOVE_TRAILS$_$random[1];

            return [
                x + deltaX,
                y + deltaY];

        } }, { key: 'composeCoord', value: function composeCoord(

            coord) {
            return coord.join(',');
        } }, { key: 'hasVisited', value: function hasVisited(

            dest) {
            var key = this.composeCoord(dest);

            return this.visited[key];
        } }, { key: 'setDest', value: function setDest(

            dest) {
            this.destination = dest;
            this.visited[this.composeCoord(dest)] = true;
        } }, { key: 'next', value: function next()

            {var

                speed =


                    this.speed,current = this.current,destination = this.destination;

                if (Math.abs(current[0] - destination[0]) <= speed / 2 &&
                    Math.abs(current[1] - destination[1]) <= speed / 2)
                {
                    destination = this.randomPath();

                    var tryCnt = 1;
                    var maxAttempt = 4;

                    while (this.hasVisited(destination) && tryCnt <= maxAttempt) {
                        tryCnt++;
                        destination = this.randomPath();
                    }

                    this.setDest(destination);
                }

                var deltaX = destination[0] - current[0];
                var deltaY = destination[1] - current[1];

                if (deltaX) {
                    current[0] += deltaX / Math.abs(deltaX) * speed;
                }

                if (deltaY) {
                    current[1] += deltaY / Math.abs(deltaY) * speed;
                }

                return [].concat(_toConsumableArray(this.current));
            } }, { key: 'paintNextTo', value: function paintNextTo()

                {var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new FullscreenCanvas();var

                    radius =



                        this.radius,color = this.color,expireAt = this.expireAt,lifeTime = this.lifeTime;var _next =

                        this.next(),_next2 = _slicedToArray(_next, 2),x = _next2[0],y = _next2[1];

                    layer.paint(function (ctx) {
                        ctx.globalAlpha = Math.max(0, expireAt - Date.now()) / lifeTime;
                        ctx.fillStyle = color;
                        ctx.shadowColor = color;
                        ctx.shadowBlur = radius * 5;
                        ctx.globalCompositeOperation = 'lighter';

                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, Math.PI * 2);
                        ctx.closePath();

                        ctx.fill();
                    });
                } }]);return Electron;}();var


Cell = function () {
    function Cell()








    {var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},_ref7$electronCount = _ref7.electronCount,electronCount = _ref7$electronCount === undefined ? _.random(1, 4) : _ref7$electronCount,_ref7$background = _ref7.background,background = _ref7$background === undefined ? ELECTRON_COLOR : _ref7$background,_ref7$forceElectrons = _ref7.forceElectrons,forceElectrons = _ref7$forceElectrons === undefined ? false : _ref7$forceElectrons,_ref7$electronOptions = _ref7.electronOptions,electronOptions = _ref7$electronOptions === undefined ? {} : _ref7$electronOptions;_classCallCheck(this, Cell);
        this.background = background;
        this.electronOptions = electronOptions;
        this.forceElectrons = forceElectrons;
        this.electronCount = Math.min(electronCount, 4);

        this.startY = row * CELL_DISTANCE;
        this.startX = col * CELL_DISTANCE;
    }_createClass(Cell, [{ key: 'delay', value: function delay()

        {var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            this.pin(ms * 1.5);
            this.nextUpdate = Date.now() + ms;
        } }, { key: 'pin', value: function pin()

            {var lifeTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1 >>> 1;
                this.expireAt = Date.now() + lifeTime;

                PINNED_CELLS.push(this);
            } }, { key: 'scheduleUpdate', value: function scheduleUpdate()




                {var t1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CELL_REPAINT_INTERVAL[0];var t2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CELL_REPAINT_INTERVAL[1];
                    this.nextUpdate = Date.now() + _.random(t1, t2);
                } }, { key: 'paintNextTo', value: function paintNextTo()

                    {var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new FullscreenCanvas();var

                        startX =



                            this.startX,startY = this.startY,background = this.background,nextUpdate = this.nextUpdate;

                        if (nextUpdate && Date.now() < nextUpdate) return;

                        this.scheduleUpdate();
                        this.createElectrons();

                        layer.paint(function (ctx) {
                            ctx.globalCompositeOperation = 'lighter';
                            ctx.fillStyle = background;
                            ctx.fillRect(startX, startY, CELL_SIZE, CELL_SIZE);
                        });
                    } }, { key: 'popRandom', value: function popRandom()

                        {var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                            var ramIdx = _.random(arr.length - 1);

                            return arr.splice(ramIdx, 1)[0];
                        } }, { key: 'createElectrons', value: function createElectrons()

                            {var

                                startX =




                                    this.startX,startY = this.startY,electronCount = this.electronCount,electronOptions = this.electronOptions,forceElectrons = this.forceElectrons;

                                if (!electronCount) return;

                                var endpoints = [].concat(_toConsumableArray(END_POINTS_OFFSET));

                                var max = forceElectrons ? electronCount : Math.min(electronCount, MAX_ELECTRONS - ACTIVE_ELECTRONS.length);

                                for (var i = 0; i < max; i++) {var _popRandom =
                                        this.popRandom(endpoints),_popRandom2 = _slicedToArray(_popRandom, 2),offsetX = _popRandom2[0],offsetY = _popRandom2[1];

                                    ACTIVE_ELECTRONS.push(new Electron(
                                        startX + offsetX,
                                        startY + offsetY,
                                        electronOptions));

                                }
                            } }]);return Cell;}();


var bgLayer = new FullscreenCanvas();
var mainLayer = new FullscreenCanvas();
var shapeLayer = new FullscreenCanvas(true);

function stripOld() {var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    var now = Date.now();

    for (var i = 0, max = ACTIVE_ELECTRONS.length; i < max; i++) {
        var e = ACTIVE_ELECTRONS[i];

        if (e.expireAt - now < limit) {
            ACTIVE_ELECTRONS.splice(i, 1);

            i--;
            max--;
        }
    }
}

function createRandomCell() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (ACTIVE_ELECTRONS.length >= MAX_ELECTRONS) return;var

    width = mainLayer.width,height = mainLayer.height;

    var cell = new Cell(
        _.random(height / CELL_DISTANCE),
        _.random(width / CELL_DISTANCE),
        options);


    cell.paintNextTo(mainLayer);
}

function drawGrid() {
    bgLayer.paint(function (ctx, _ref8) {var width = _ref8.width,height = _ref8.height;
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = BORDER_COLOR;

        // horizontal lines
        for (var h = CELL_SIZE; h < height; h += CELL_DISTANCE) {
            ctx.fillRect(0, h, width, BORDER_WIDTH);
        }

        // vertical lines
        for (var w = CELL_SIZE; w < width; w += CELL_DISTANCE) {
            ctx.fillRect(w, 0, BORDER_WIDTH, height);
        }
    });
}

function iterateItemsIn(list) {
    var now = Date.now();

    for (var i = 0, max = list.length; i < max; i++) {
        var item = list[i];

        if (now >= item.expireAt) {
            list.splice(i, 1);
            i--;
            max--;
        } else {
            item.paintNextTo(mainLayer);
        }
    }
}

function drawItems() {
    iterateItemsIn(PINNED_CELLS);
    iterateItemsIn(ACTIVE_ELECTRONS);
}

var nextRandomAt = void 0;

function activateRandom() {
    var now = Date.now();

    if (now < nextRandomAt) {
        return;
    }

    nextRandomAt = now + _.random(300, 1000);

    for(var i = 0; i < 10; ++i)
        setTimeout(createRandomCell, _.random(0, 300));;
}

function handlePointer() {
    var lastCell = [];
    var touchRecords = {};

    function isSameCell(i, j) {var _lastCell =
            lastCell,_lastCell2 = _slicedToArray(_lastCell, 2),li = _lastCell2[0],lj = _lastCell2[1];

        lastCell = [i, j];

        return i === li && j === lj;
    };

    function print(isMove, _ref9) {var clientX = _ref9.clientX,clientY = _ref9.clientY;
        var i = Math.floor(clientY / CELL_DISTANCE);
        var j = Math.floor(clientX / CELL_DISTANCE);

        if (isMove && isSameCell(i, j)) {
            return;
        }

        var cell = new Cell(i, j, {
            background: CELL_HIGHLIGHT,
            forceElectrons: true,
            electronCount: isMove ? 2 : 4,
            electronOptions: {
                speed: 3,
                lifeTime: isMove ? 500 : 1000,
                color: CELL_HIGHLIGHT } });



        cell.paintNextTo(mainLayer);
    }

    var handlers = {
        touchend: function touchend(_ref10) {var changedTouches = _ref10.changedTouches;
            if (changedTouches) {
                Array.from(changedTouches).forEach(function (_ref11) {var identifier = _ref11.identifier;
                    delete touchRecords[identifier];
                });
            } else {
                touchRecords = {};
            }
        } };


    function filterTouches(touchList) {
        return Array.from(touchList).filter(function (_ref12) {var identifier = _ref12.identifier,clientX = _ref12.clientX,clientY = _ref12.clientY;
            var rec = touchRecords[identifier];
            touchRecords[identifier] = { clientX: clientX, clientY: clientY };

            return !rec || clientX !== rec.clientX || clientY !== rec.clientY;
        });
    }

    [
        'mousedown',
        'touchstart',
        'mousemove',
        'touchmove'].
        forEach(function (name) {
            var isMove = /move/.test(name);
            var isTouch = /touch/.test(name);

            var fn = print.bind(null, isMove);

            handlers[name] = function handler(evt) {
                if (isTouch) {
                    filterTouches(evt.touches).forEach(fn);
                } else {
                    fn(evt);
                }
            };
        });

    var events = Object.keys(handlers);

    events.forEach(function (name) {
        document.addEventListener(name, handlers[name]);
    });

    return function unbind() {
        events.forEach(function (name) {
            document.removeEventListener(name, handlers[name]);
        });
    };
}

function prepaint() {
    drawGrid();

    mainLayer.paint(function (ctx, _ref13) {var width = _ref13.width,height = _ref13.height;
        // composite with rgba(255,255,255,255) to clear trails
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
    });

    mainLayer.blendBackground(bgLayer.canvas, 0.9);
}

function render() {
    mainLayer.blendBackground(bgLayer.canvas);

    drawItems();
    activateRandom();

    shape.renderID = requestAnimationFrame(render);
}

var shape = {
    lastText: '',
    lastMatrix: null,
    renderID: undefined,
    isAlive: false,

    get electronOptions() {
        return {
            speed: 2,
            color: FONT_COLOR,
            lifeTime: _.random(300, 500) };

    },

    get cellOptions() {
        return {
            background: FONT_COLOR,
            electronCount: _.random(1, 4),
            electronOptions: this.electronOptions };

    },

    get explodeOptions() {
        return Object.assign(this.cellOptions, {
            electronOptions: Object.assign(this.electronOptions, {
                lifeTime: _.random(1500, 2500) }) });


    },

    init: function init() {
        var _this = this;
        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
        if (this.isAlive) {
            return;
        }

        bgLayer.onResize(drawGrid);
        mainLayer.onResize(prepaint);

        mainLayer.renderIntoView(container);

        shapeLayer.onResize(function () {
            if (_this.lastText) {
                _this.print(_this.lastText);
            }
        });

        prepaint();
        render();

        this.unbindEvents = handlePointer();
        this.isAlive = true;
    },

    clear: function clear() {var

        lastMatrix =
            this.lastMatrix;

        this.lastText = '';
        this.lastMatrix = null;
        PINNED_CELLS.length = 0;

        if (lastMatrix) {
            this.explode(lastMatrix);
        }
    },

    destroy: function destroy() {
        if (!this.isAlive) {
            return;
        }

        bgLayer.remove();
        mainLayer.remove();
        shapeLayer.remove();

        this.unbindEvents();

        cancelAnimationFrame(this.renderID);

        ACTIVE_ELECTRONS.length = PINNED_CELLS.length = 0;
        this.lastMatrix = null;
        this.lastText = '';
        this.isAlive = false;
    },

    getTextMatrix: function getTextMatrix(
        text)




    {var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},_ref14$fontWeight = _ref14.fontWeight,fontWeight = _ref14$fontWeight === undefined ? 'bold' : _ref14$fontWeight,_ref14$fontFamily = _ref14.fontFamily,fontFamily = _ref14$fontFamily === undefined ? FONT_FAMILY : _ref14$fontFamily;var

        width =

            shapeLayer.width,height = shapeLayer.height;

        shapeLayer.repaint(function (ctx) {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = fontWeight + ' ' + MAX_FONT_SIZE + 'px ' + fontFamily;

            var scale = width / ctx.measureText(text).width;
            var fontSize = Math.min(MAX_FONT_SIZE, MAX_FONT_SIZE * scale * 0.8);

            ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;

            ctx.fillText(text, width / 2, height / 2);
        });

        var pixels = shapeLayer.context.getImageData(0, 0, width, height).data;
        var matrix = [];

        for (var i = 0; i < height; i += CELL_DISTANCE) {
            for (var j = 0; j < width; j += CELL_DISTANCE) {
                var alpha = pixels[(j + i * width) * 4 + 3];

                if (alpha > 0) {
                    matrix.push([
                        Math.floor(i / CELL_DISTANCE),
                        Math.floor(j / CELL_DISTANCE)]);

                }
            }
        }

        return matrix;
    },

    print: function print(text, options) {var _this2 = this;
        var isBlank = !!this.lastText;

        this.clear();

        if (text !== 0 && !text) {
            if (isBlank) {
                // release
                this.spiral({
                    reverse: true,
                    lifeTime: 500,
                    electronCount: 2 });

            }

            return;
        }

        this.spiral();

        this.lastText = text;

        var matrix = this.lastMatrix = _.shuffle(this.getTextMatrix(text, options));

        matrix.forEach(function (_ref15) {var _ref16 = _slicedToArray(_ref15, 2),i = _ref16[0],j = _ref16[1];
            var cell = new Cell(i, j, _this2.cellOptions);

            cell.scheduleUpdate(200);
            cell.pin();
        });
    },

    spiral: function spiral()






    {var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},radius = _ref17.radius,_ref17$increment = _ref17.increment,increment = _ref17$increment === undefined ? 0 : _ref17$increment,_ref17$reverse = _ref17.reverse,reverse = _ref17$reverse === undefined ? false : _ref17$reverse,_ref17$lifeTime = _ref17.lifeTime,lifeTime = _ref17$lifeTime === undefined ? 250 : _ref17$lifeTime,_ref17$electronCount = _ref17.electronCount,electronCount = _ref17$electronCount === undefined ? 1 : _ref17$electronCount,_ref17$forceElectrons = _ref17.forceElectrons,forceElectrons = _ref17$forceElectrons === undefined ? true : _ref17$forceElectrons;var

        width =

            mainLayer.width,height = mainLayer.height;

        var cols = Math.floor(width / CELL_DISTANCE);
        var rows = Math.floor(height / CELL_DISTANCE);

        var ox = Math.floor(cols / 2);
        var oy = Math.floor(rows / 2);

        var cnt = 1;
        var deg = _.random(360);
        var r = radius === undefined ? Math.floor(Math.min(cols, rows) / 3) : radius;

        var step = reverse ? 15 : -15;
        var max = Math.abs(360 / step);

        while (cnt <= max) {
            var i = oy + Math.floor(r * Math.sin(deg / 180 * Math.PI));
            var j = ox + Math.floor(r * Math.cos(deg / 180 * Math.PI));

            var cell = new Cell(i, j, {
                electronCount: electronCount,
                forceElectrons: forceElectrons,
                background: CELL_HIGHLIGHT,
                electronOptions: {
                    lifeTime: lifeTime,
                    speed: 3,
                    color: CELL_HIGHLIGHT } });




            cell.delay(cnt * 16);

            cnt++;
            deg += step;
            r += increment;
        }
    },

    explode: function explode(matrix) {
        stripOld();

        if (matrix) {var
            length = matrix.length;

            var max = Math.min(
                50,
                _.random(Math.floor(length / 20), Math.floor(length / 10)));


            for (var idx = 0; idx < max; idx++) {var _matrix$idx = _slicedToArray(
                matrix[idx], 2),i = _matrix$idx[0],j = _matrix$idx[1];

                var cell = new Cell(i, j, this.explodeOptions);

                cell.paintNextTo(mainLayer);
            }
        } else {
            var _max = _.random(10, 20);

            for (var _idx = 0; _idx < _max; _idx++) {
                createRandomCell(this.explodeOptions);
            }
        }
    } };


var timer = void 0;

function queue() {
    var text = 'Excel 2018';

    var i = 0;
    var max = text.length;

    var run = function run() {
        if (i >= max) return;

        shape.print(text.slice(0, ++i));
        timer = setTimeout(run, 4e2 + i);
    };

    run();
}

function countdown() {
    var arr = _.range(3, 0, -1);

    var i = 0;
    var max = arr.length;

    var run = function run() {
        if (i >= max) {
            shape.clear();
            return galaxy();
        }

        shape.print(arr[i++]);
        setTimeout(run, 1e3 + i);
    };

    run();
}

function galaxy() {
    shape.spiral({
        radius: 0,
        increment: 1,
        lifeTime: 100,
        electronCount: 1 });


    timer = setTimeout(galaxy, 16);
}

function ring() {
    shape.spiral();

    timer = setTimeout(ring, 16);
}

// document.getElementById('input').addEventListener('keypress', function (_ref18) {var keyCode = _ref18.keyCode,target = _ref18.target;
//     if (keyCode === 13) {
//         clearTimeout(timer);
//         var value = target.value.trim();
//         target.value = '';
//
//         switch (value) {
//             case '#destroy':
//                 return shape.destroy();
//
//             case '#init':
//                 return shape.init();
//
//             case '#explode':
//                 return shape.explode();
//
//             case '#clear':
//                 return shape.clear();
//
//             case '#queue':
//                 return queue();
//
//             case '#countdown':
//                 return countdown();
//
//             case '#galaxy':
//                 shape.clear();
//                 return galaxy();
//
//             case '#ring':
//                 shape.clear();
//                 return ring();
//
//             default:
//                 return shape.print(value);}
//
//     }
// });

function animationLoop() {
    queue();
    var flag = false;
    function run() {
        if(flag) {
            shape.print("Coming Soon");
        } else {
            shape.print("Excel 2018");
        }
        flag = !flag;
    }
    setInterval(run, 5e3);
}

function countdownToExcel() {
    var arr = _.range(3, 0, -1);

    var i = 0;
    var max = arr.length;

    var run = function run() {
        if (i >= max) {
            shape.clear();
            return animationLoop();
        }

        shape.print(arr[i++]);
        setTimeout(run, 1e3 + i);
    };
    run();
}

shape.init();
setTimeout(animationLoop, 1e2);

var footer = document.querySelector("footer");
function showFooter() {
    footer.style.opacity = 1;
}
setTimeout(showFooter, 9e3);

// prevent zoom
document.addEventListener('touchmove', function (e) {return e.preventDefault();});
