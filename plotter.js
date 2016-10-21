class Plotter {

    constructor(ctx, config = {
        from: -500, to: 500,
        color: '#f70e75',
        size: 10,
        stepSize: 9,
        scale: 20,
        origin: { x: 0, y: 0 }
    }) {
        this.ctx = ctx;
        this.config = config;
        this.functionBuilders = [];
        this.points = [];
    }

    addFunctionBuilders(functions) {
        this.functionBuilders = this.functionBuilders.concat(functions);
        return this;
    }

    addScaledPoint(point) {
        return this.addPoint({
            x: point.x / this.config.scale,
            y: point.y / this.config.scale
        });
    }

    addPoint(point) {
        this.points.push(point);
        return this;
    }

    show() {
        this.functionBuilders.forEach((builder) => {
            this.plotFunction(builder());
        }, this);

        this.points.forEach((point) => {
            this.drawPoint(
                point.x * this.config.scale,
                point.y * this.config.scale,
                point.style || {}
            );
        }, this);
        
        return this;
    }

    plotFunction(func) {
        let fromY = func(this.config.from / this.config.scale + this.config.origin.x) * this.config.scale + this.config.origin.y;
        for (let x = this.config.from + this.config.stepSize;x < this.config.to;x += this.config.stepSize) {
            let toX = x + this.config.origin.x;
            let fromX = toX - this.config.stepSize;
            let toY = func(x / this.config.scale + this.config.origin.x) * this.config.scale  + this.config.origin.y;

            this.drawLine(fromX, fromY, toX, toY, func.style || {});
            fromY = toY;
        }
    }

    drawLine(fromX, fromY, toX, toY, style) {
        this.ctx.strokeStyle = style.color || this.config.color;
        this.ctx.lineWidth = style.size || this.config.size;

        this.ctx.beginPath();
        this.ctx.moveTo(fromX, -fromY);
        this.ctx.lineTo(toX, -toY);
        this.ctx.stroke();
        this.ctx.closePath();
        this.drawPoint(fromX, fromY, { size: this.config.size / 2 });

        return this;
    }

    drawPoint(x, y, style) {
        this.ctx.fillStyle = style.color || this.config.color;

        this.ctx.beginPath();
        this.ctx.arc(x, -y, style.size || this.config.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();

        return this;
    }


    clear(width, height) {
        this.ctx.fillStyle = '#1D1E45';
        this.ctx.fillRect(-width / 2, -height / 2, width, height);
        return this;
    }

}
