class Lagrange {

    constructor(points = []) {
        this.polynomial = (x) => 1;
        this.setPoints(points);
    }

    setPoints(points) {
        this.points = points;
        this.build();

        return this;
    }

    get() {
        return this.polynomial;
    }

    fullPolynomial(roots) {
        return (x) => roots.reduce((product, xi) =>
            product * (x - xi), 1);
    }

    splitPolynomial(i, px) {
        let left = this.fullPolynomial(px.slice(0, i)),
            right = this.fullPolynomial(px.slice(i + 1, px.length));

        return (x) => left(x) * right(x);
    }

    build() {
        let px = this.points.map((p) => p.x),
            divisor = px.map((x, i) =>
                this.splitPolynomial(i, px)(x), this),
            me = this;

        return this.polynomial = (x) => 
            this.points.map((p) => p.y).reduce((sum, y, i) =>
                sum + y * me.splitPolynomial(i, px)(x) / divisor[i], 0);
    }

}
