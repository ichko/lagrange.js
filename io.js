class IO {

    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            down: false,
            out: true
        };
        this.mouseBindings = {
            scroll: [],
            click: [],
            dblclick: []
        };
        this.keyBindings = {};
        this.registerBindings();
    }

    onMouse(event, handler) {
        if(!this.mouseBindings[event]) {
            this.mouseBindings[event] = [];
        }
        this.mouseBindings[event].push(handler);

        return this;
    }

    onKey(key, handler) {
        this.keyBindings[key] = { isDown: false, handler };

        return this;
    }

    trigger() {
        for(let key in this.keyBindings){
            if(this.keyBindings[key].isDown){
                this.keyBindings[key].handler();
            }
        }

        return this;
    }

    registerBindings() {
        let me = this
        let clickHandler = (handler, event) => handler({ x: event.x, y: event.y });

        window.addEventListener('mousewheel', (event) => {
            me.mouseBindings.scroll.forEach((handler =>
                handler(Math.sign(event.wheelDelta))));
        });

        window.addEventListener('click', (event) =>
            me.mouseBindings.click.forEach((handler) => clickHandler(handler, event)));

        window.addEventListener('dblclick', (event) =>
            me.mouseBindings.dblclick.forEach((handler) => clickHandler(handler, event)));


        window.addEventListener('keydown', (event) => {
            if(me.keyBindings[event.key]) {
                me.keyBindings[event.key].isDown = true;
            }
        });

        window.addEventListener('mousemove', (event) => {
            me.mouse.dx = event.movementX;
            me.mouse.dy = event.movementY;
            me.mouse.x = event.x;
            me.mouse.y = event.y;
        });

        window.addEventListener('mousedown', () => me.mouse.down = true);
        window.addEventListener('mouseup', () => me.mouse.down = false);
        
        window.document.addEventListener('mouseover', () => me.mouse.out = false);
        window.document.addEventListener('mouseout', () => me.mouse.out = true);

        window.addEventListener('keyup', (event) => {
            if(me.keyBindings[event.key]) {
                me.keyBindings[event.key].isDown = false;
            }
        });
    }

}