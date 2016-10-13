class IO {

    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            scroll: () => {}
        };

        this.registerBindings();
    }

    registerBindings() {
        let me = this
        window.addEventListener('mousewheel', (event) => {
            me.mouse.scroll(Math.sign(event.wheelDelta));
        }, this);
    }


}