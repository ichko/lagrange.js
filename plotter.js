class Plotter {

    constructor(ctx, config = { 
        from: 0, to: 256,
        color: 'black', lineSize = 2,
        stepSize = 10,
        scale = 1,
        origin = { x: 0, y: 0 }
    }) {
        this.ctx = ctx;
    }

    plot(functions) {
        functions.forEach((func) => {
            this.plotFunction(func);
        }, this);
    }

    plotFunction(func) {
        let formY = func(this.config.from / this.config.scale + this.config.origin.x) * this.config.scale + this.config.origin.y;
        for (let x = this.config.from + this.config.stepSize;x < this.config.to;x += this.config.stepSize) {
            let toX = x + this.config.origin.x;
            let fromX = toX - this.config.stepSize;
            let toY = func(x / this.config.scale + this.config.origin.x) * this.scale  + this.config.origin.y;

            this.drawLine(fromX, fromY, toX, toY);
            formY = toY;
        }

    }

    drawLine(fromX, fromY, toX, toY) {
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
    }

}
