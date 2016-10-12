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
        return (x) => roots.reduce((product, xi) => product * (x - xi), 1);
    }

    splitPolynomial(i) {
        let left = this.fullPolynomial(this.px.slice(0, i));
        let right = this.fullPolynomial(this.px.slice(i + 1, this.px.length));
        return (x) => left(x) * right(x);
    }

    buildPolynomial() {
        let divisor = this.px.map((x, i) => this.splitPolynomial(i)(x), this);
        let dividentPolynomial = this.fullPolynomial(this.px);
        
        this.polynomial = (x) => {
            let sum = 0;
            let divident = dividentPolynomial(x);

            return this.py.reduce((sum, y, i) => {
                let value = y * divident / (x - this.px[i]) * divisor[i];
                return sum + value;
            });
        };

        return this;
    }

}