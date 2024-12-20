class CCondimentDecorator {
    _beverage;
    constructor(beverage) {
        this._beverage = beverage;
    }
    getDescription() {
        return `${this._beverage.getDescription()}, ${this.getCondimentDescription()}`;
    }
    getCost() {
        return this._beverage.getCost() + this.getCondimentCost();
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
class Cream extends CCondimentDecorator {
    getCondimentCost() {
        return 25;
    }
    getCondimentDescription() {
        return "Cream";
    }
}
class Lemon extends CCondimentDecorator {
    _quantity;
    constructor(beverage, quantity = 1) {
        super(beverage);
        this._quantity = quantity;
    }
    getCondimentCost() {
        return 10 * this._quantity;
    }
    getCondimentDescription() {
        return `Lemon x ${this._quantity}`;
    }
}
class Chocolate extends CCondimentDecorator {
    _quantity;
    constructor(beverage, quantity = 1) {
        super(beverage);
        this._quantity = quantity > 5 ? 5 : quantity;
    }
    getCondimentCost() {
        return 10 * this._quantity;
    }
    getCondimentDescription() {
        return `Chocolate x ${this._quantity}`;
    }
}
var IceCubeType;
(function (IceCubeType) {
    IceCubeType["Dry"] = "Dry";
    IceCubeType["Water"] = "Water";
})(IceCubeType || (IceCubeType = {}));
class IceCubes extends CCondimentDecorator {
    _quantity;
    _type;
    constructor(beverage, quantity, type = IceCubeType.Water) {
        super(beverage);
        this._quantity = quantity;
        this._type = type;
    }
    getCondimentCost() {
        return (this._type === IceCubeType.Dry ? 10 : 5) * this._quantity;
    }
    getCondimentDescription() {
        return `${this._type} ice cubes x ${this._quantity}`;
    }
}
var SyrupType;
(function (SyrupType) {
    SyrupType["Chocolate"] = "Chocolate";
    SyrupType["Maple"] = "Maple";
})(SyrupType || (SyrupType = {}));
class Syrup extends CCondimentDecorator {
    _syrupType;
    constructor(beverage, syrupType) {
        super(beverage);
        this._syrupType = syrupType;
    }
    getCondimentCost() {
        return 15;
    }
    getCondimentDescription() {
        return `${this._syrupType} syrup`;
    }
}
var LiquorType;
(function (LiquorType) {
    LiquorType["Chocolate"] = "Chocolate";
    LiquorType["Nut"] = "Nut";
})(LiquorType || (LiquorType = {}));
class Liquor extends CCondimentDecorator {
    _liquorType;
    constructor(beverage, liquorType) {
        super(beverage);
        this._liquorType = liquorType;
    }
    getCondimentCost() {
        return 50;
    }
    getCondimentDescription() {
        return `${this._liquorType} liquor`;
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
    _mass;
    constructor(beverage, mass) {
        super(beverage);
        this._mass = mass;
    }
    getCondimentCost() {
        return this._mass;
    }
    getCondimentDescription() {
        return `Coconut flakes ${this._mass}g`;
    }
}
export { CCondimentDecorator, Syrup, SyrupType, Lemon, IceCubeType, IceCubes, ChocolateCrumbs, CoconutFlakes, Cinnamon, Chocolate, LiquorType, Liquor, Cream, };
