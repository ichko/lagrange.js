class Plotter {

    constructor(ctx, config = {
        from: -800, to: 800,
        color: 'blue',
        lineSize: 2,
        stepSize: 5,
        scale: 20,
        origin: { x: 0, y: 0 }
    }) {
        this.ctx = ctx;
        this.config = config;
        this.functions = [];
    }

    addFunction(func) {
        this.functions.push(func);
        return this;
    }

    show() {
        this.functions.forEach((func) => {
            this.plotFunction(func);
        }, this);
    }

    plotFunction(func) {
        let fromY = func(this.config.from / this.config.scale + this.config.origin.x) * this.config.scale + this.config.origin.y;
        for (let x = this.config.from + this.config.stepSize;x < this.config.to;x += this.config.stepSize) {
            let toX = x + this.config.origin.x;
            let fromX = toX - this.config.stepSize;
            let toY = func(x / this.config.scale + this.config.origin.x) * this.config.scale  + this.config.origin.y;

            this.drawLine(fromX, fromY, toX, toY);
            fromY = toY;
        }
    }

    drawLine(fromX, fromY, toX, toY) {
        this.ctx.strokeStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineSize;

        this.ctx.beginPath();
        this.ctx.moveTo(fromX, -fromY);
        this.ctx.lineTo(toX, -toY);
        this.ctx.stroke();
        this.ctx.closePath();
    }

}
