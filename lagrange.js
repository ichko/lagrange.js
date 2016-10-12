class Point {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}

class Lagrange {

    constructor(points = []) {
        this.points = points;
        this.polynomial = (x) => 1;
        buildPolynomial();
    }





}