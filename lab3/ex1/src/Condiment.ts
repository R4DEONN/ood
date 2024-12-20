import {IBeverage} from "./IBeverage";

abstract class CCondimentDecorator implements IBeverage {
	protected _beverage: IBeverage;

	constructor(beverage: IBeverage) {
		this._beverage = beverage;
	}

	getDescription(): string {
		return `${this._beverage.getDescription()}, ${this.getCondimentDescription()}`;
	}

	getCost(): number {
		return this._beverage.getCost() + this.getCondimentCost();
	}

	abstract getCondimentDescription(): string;

	abstract getCondimentCost(): number;
}

class Cinnamon extends CCondimentDecorator {
	getCondimentCost(): number {
		return 20;
	}

	getCondimentDescription(): string {
		return "Cinnamon";
	}
}

class Cream extends CCondimentDecorator {
	getCondimentCost(): number {
		return 25;
	}

	getCondimentDescription(): string {
		return "Cream";
	}
}

class Lemon extends CCondimentDecorator {
	private readonly _quantity: number;

	constructor(beverage: IBeverage, quantity: number = 1) {
		super(beverage);
		this._quantity = quantity;
	}

	getCondimentCost(): number {
		return 10 * this._quantity;
	}

	getCondimentDescription(): string {
		return `Lemon x ${this._quantity}`;
	}
}

class Chocolate extends CCondimentDecorator {
	private readonly _quantity: number;

	constructor(beverage: IBeverage, quantity: number = 1) {
		super(beverage);
		this._quantity = quantity > 5 ? 5 : quantity;
	}

	getCondimentCost(): number {
		return 10 * this._quantity;
	}

	getCondimentDescription(): string {
		return `Chocolate x ${this._quantity}`;
	}
}

enum IceCubeType {
	Dry = "Dry",
	Water = "Water",
}

class IceCubes extends CCondimentDecorator {
	private readonly _quantity: number;
	private readonly _type: IceCubeType;

	constructor(beverage: IBeverage, quantity: number, type: IceCubeType = IceCubeType.Water) {
		super(beverage);
		this._quantity = quantity;
		this._type = type;
	}

	getCondimentCost(): number {
		return (this._type === IceCubeType.Dry ? 10 : 5) * this._quantity;
	}

	getCondimentDescription(): string {
		return `${this._type} ice cubes x ${this._quantity}`;
	}
}

enum SyrupType {
	Chocolate = "Chocolate",
	Maple = "Maple",
}

class Syrup extends CCondimentDecorator {
	private readonly _syrupType: SyrupType;

	constructor(beverage: IBeverage, syrupType: SyrupType) {
		super(beverage);
		this._syrupType = syrupType;
	}

	getCondimentCost(): number {
		return 15;
	}

	getCondimentDescription(): string {
		return `${this._syrupType} syrup`;
	}
}

enum LiquorType {
	Chocolate = "Chocolate",
	Nut = "Nut",
}

class Liquor extends CCondimentDecorator {
	private readonly _liquorType: LiquorType;

	constructor(beverage: IBeverage, liquorType: LiquorType) {
		super(beverage);
		this._liquorType = liquorType;
	}

	getCondimentCost(): number {
		return 50;
	}

	getCondimentDescription(): string {
		return `${this._liquorType} liquor`;
	}
}

class ChocolateCrumbs extends CCondimentDecorator {
	private readonly mass: number;

	constructor(beverage: IBeverage, mass: number) {
		super(beverage);
		this.mass = mass;
	}

	getCondimentCost(): number {
		return 2 * this.mass;
	}

	getCondimentDescription(): string {
		return `Chocolate crumbs ${this.mass}g`;
	}
}

class CoconutFlakes extends CCondimentDecorator {
	private readonly _mass: number;

	constructor(beverage: IBeverage, mass: number) {
		super(beverage);
		this._mass = mass;
	}

	getCondimentCost(): number {
		return this._mass;
	}

	getCondimentDescription(): string {
		return `Coconut flakes ${this._mass}g`;
	}
}

export {
	CCondimentDecorator,
	Syrup,
	SyrupType,
	Lemon,
	IceCubeType,
	IceCubes,
	ChocolateCrumbs,
	CoconutFlakes,
	Cinnamon,
	Chocolate,
	LiquorType,
	Liquor,
	Cream,
};