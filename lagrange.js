class Point {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

}

class Lagrange {

    constructor(points = []) {
        this.px = points.map((p) => p.x);
        this.py = points.map((p) => p.y);
        this.polynomial = (x) => 1;

        this.buildPolynomial();
    }

    fullPolynomial(roots) {
        return (x) => {
            let product = 1;
            roots.forEach((xi) => {
                product *= x - xi;
            }, this);

            return product;
        };
    }

    buildPolynomial() {
        let divisor = this.px.map((x, i) => {
            let left = this.fullPolynomial(this.px.slice(0, i));
            let right = this.fullPolynomial(this.px.slice(i + 1, this.px.length));
            return left(x) * right(x);
        }, this);
        let dividentPolynomial = this.fullPolynomial(this.px);
        
        this.polynomial = (x) => {
            let sum = 0;
            let divident = dividentPolynomial(x);
            this.py.forEach((y, i) => {
                sum +=  y * divident / (x - this.px[i]) * divisor[i];
            }, this);

            return sum;
        };

        return this;
    }

}