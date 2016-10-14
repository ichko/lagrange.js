class IO {

    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            scroll: () => {},
            click: () => {}
        };
        this.mouseBindings = {
            click: [],
            scroll: []
        };
        this.keyBindings = {};
        this.registerBindings();
    }

    onMouse(event, handler) {
        if(this.mouseBindings[event]) {
            this.mouseBindings[event].push(handler);
        }

        return this;
    }

    onKey(key, handler) {
        this.keyBindings[key] = { isDown: false, handler };

        return this;
    }

    invokeHandlers() {
        for(let key in this.keyBindings){
            if(this.keyBindings[key].isDown){
                this.keyBindings[key].handler();
            }
        }

        return this;
    }

    registerBindings() {
        let me = this

        window.addEventListener('mousewheel', (event) => {
            me.mouseBindings.scroll.forEach((handler =>
                handler(Math.sign(event.wheelDelta))));
        });

        window.addEventListener('click', (event) => {
            me.mouseBindings.click.forEach((handler) =>
                handler({ x: event.x, y: event.y }));
        });

        window.addEventListener('keydown', (event) => {
            if(me.keyBindings[event.key]) {
                me.keyBindings[event.key].isDown = true;
            }
        });

        window.addEventListener('keyup', (event) => {
            if(me.keyBindings[event.key]) {
                me.keyBindings[event.key].isDown = false;
            }
        });
    }

}