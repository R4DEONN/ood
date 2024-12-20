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
class DoubleCappuccino extends Coffee {
    constructor() {
        super("DoubleCappuccino");
    }
    getCost() {
        return 120;
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
class DoubleLatte extends Coffee {
    constructor() {
        super("DoubleLatte");
    }
    getCost() {
        return 130;
    }
}
class Tea extends Beverage {
    getCost() {
        return 30;
    }
}
class BlackTea extends Tea {
    constructor() {
        super("Black Tea");
    }
}
class WhiteTea extends Tea {
    constructor() {
        super("White Tea");
    }
}
class OolongTea extends Tea {
    constructor() {
        super("Oolong Tea");
    }
}
class GreenTea extends Tea {
    constructor() {
        super("Green Tea");
    }
}
class SmallMilkshake extends Beverage {
    constructor() {
        super("Small Milkshake");
    }
    getCost() {
        return 50;
    }
}
class MediumMilkshake extends Beverage {
    constructor() {
        super("Medium Milkshake");
    }
    getCost() {
        return 60;
    }
}
class LargeMilkshake extends Beverage {
    constructor() {
        super("Large Milkshake");
    }
    getCost() {
        return 80;
    }
}
export { Coffee, Tea, Latte, LargeMilkshake, Cappuccino, BlackTea, DoubleCappuccino, DoubleLatte, WhiteTea, GreenTea, OolongTea, Beverage, MediumMilkshake, SmallMilkshake };
