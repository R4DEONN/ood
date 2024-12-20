class Beverage {
    description;
    constructor(description) {
        this.description = description;
    }
    getCost() {
        throw new Error("Method not implemented");
    }
    getDescription() {
        return this.description;
    }
}
class Coffee extends Beverage {
    constructor(description = "Coffee") {
        super(description);
    }
    getCost() {
        return 60;
    }
}
class Cappuccino extends Coffee {
    constructor() {
        super("Cappuccino");
    }
    getCost() {
        return 80;
    }
}
class Latte extends Coffee {
    constructor() {
        super("Latte");
    }
    getCost() {
        return 90;
    }
}
class Tea extends Beverage {
    constructor() {
        super("Tea");
    }
    getCost() {
        return 30;
    }
}
class Milkshake extends Beverage {
    constructor() {
        super("Milkshake");
    }
    getCost() {
        return 80;
    }
}
export { Coffee, Tea, Latte, Milkshake, Cappuccino };
