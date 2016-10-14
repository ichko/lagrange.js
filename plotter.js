class Plotter {

    constructor(ctx, config = {
        from: -500, to: 500,
        color: 'blue',
        lineSize: 2,
        stepSize: 5,
        scale: 20,
        origin: { x: 0, y: 0 }
    }) {
        this.ctx = ctx;
        this.config = config;
        this.functions = [];
        this.points = [];
    }

    addFunctions(functions) {
        this.functions = this.functions.concat(functions);
        return this;
    }

    addPoints(points) {
        this.points = this.points.concat(points);
        return this;
    }

    show() {
        this.functions.forEach((func) => {
            this.plotFunction(func);
        }, this);

        this.points.forEach((point) => {
            this.drawPoint(point.x, point.y);
        }, this);
        
        return this;
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

        return this;
    }

    drawPoint(x, y) {
        this.ctx.fillStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineSize;

        this.ctx.beginPath();
        this.ctx.arc(x, -y, 10, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();

        return this;
    }

    
                
    clear(width, height) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.fillRect(-width / 2, -height / 2, width, height);
        return this;
    }

}
