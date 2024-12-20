class CCondimentDecorator {
    beverage;
    constructor(beverage) {
        this.beverage = beverage;
    }
    getDescription() {
        return `${this.beverage.getDescription()}, ${this.getCondimentDescription()}`;
    }
    getCost() {
        return this.beverage.getCost() + this.getCondimentCost();
    }
}
class Cinnamon extends CCondimentDecorator {
    getCondimentCost() {
        return 20;
    }
    getCondimentDescription() {
        return "Cinnamon";
    }
}
class Lemon extends CCondimentDecorator {
    quantity;
    constructor(beverage, quantity = 1) {
        super(beverage);
        this.quantity = quantity;
    }
    getCondimentCost() {
        return 10 * this.quantity;
    }
    getCondimentDescription() {
        return `Lemon x ${this.quantity}`;
    }
}
var IceCubeType;
(function (IceCubeType) {
    IceCubeType["Dry"] = "Dry";
    IceCubeType["Water"] = "Water";
})(IceCubeType || (IceCubeType = {}));
class IceCubes extends CCondimentDecorator {
    quantity;
    type;
    constructor(beverage, quantity, type = IceCubeType.Water) {
        super(beverage);
        this.quantity = quantity;
        this.type = type;
    }
    getCondimentCost() {
        return (this.type === IceCubeType.Dry ? 10 : 5) * this.quantity;
    }
    getCondimentDescription() {
        return `${this.type} ice cubes x ${this.quantity}`;
    }
}
var SyrupType;
(function (SyrupType) {
    SyrupType["Chocolate"] = "Chocolate";
    SyrupType["Maple"] = "Maple";
})(SyrupType || (SyrupType = {}));
class Syrup extends CCondimentDecorator {
    syrupType;
    constructor(beverage, syrupType) {
        super(beverage);
        this.syrupType = syrupType;
    }
    getCondimentCost() {
        return 15;
    }
    getCondimentDescription() {
        return `${this.syrupType} syrup`;
    }
}
class ChocolateCrumbs extends CCondimentDecorator {
    mass;
    constructor(beverage, mass) {
        super(beverage);
        this.mass = mass;
    }
    getCondimentCost() {
        return 2 * this.mass;
    }
    getCondimentDescription() {
        return `Chocolate crumbs ${this.mass}g`;
    }
}
class CoconutFlakes extends CCondimentDecorator {
    mass;
    constructor(beverage, mass) {
        super(beverage);
        this.mass = mass;
    }
    getCondimentCost() {
        return this.mass;
    }
    getCondimentDescription() {
        return `Coconut flakes ${this.mass}g`;
    }
}
export { CCondimentDecorator, Syrup, SyrupType, Lemon, IceCubeType, IceCubes, ChocolateCrumbs, CoconutFlakes, Cinnamon };
