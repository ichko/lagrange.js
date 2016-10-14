class IO {

    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
            scroll: () => {},
            click: () => {}
        };

        this.registerBindings();
    }

    registerBindings() {
        let me = this
        window.addEventListener('mousewheel', (event) => {
            me.mouse.scroll(Math.sign(event.wheelDelta));
        });

        window.addEventListener('click', (event) => {
            me.mouse.click({ x: event.x, y: event.y });
        });
    }


}