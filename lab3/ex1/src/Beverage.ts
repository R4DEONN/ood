import {IBeverage} from "./IBeverage";

class Beverage implements IBeverage {
	private readonly description: string;

	constructor(description: string) {
		this.description = description;
	}

	getCost(): number {
		throw new Error("Method not implemented");
	}

	getDescription(): string {
		return this.description;
	}
}

class Coffee extends Beverage {
	constructor(description = "Coffee") {
		super(description);
	}

	getCost(): number {
		return 60;
	}
}

class Cappuccino extends Coffee {
	constructor() {
		super("Cappuccino");
	}

	getCost(): number {
		return 80;
	}
}

class DoubleCappuccino extends Coffee {
	constructor() {
		super("DoubleCappuccino");
	}

	getCost(): number {
		return 120;
	}
}

class Latte extends Coffee {
	constructor() {
		super("Latte");
	}

	getCost(): number {
		return 90;
	}
}

class DoubleLatte extends Coffee {
	constructor() {
		super("DoubleLatte");
	}

	getCost(): number {
		return 130;
	}
}

abstract class Tea extends Beverage {
	getCost(): number {
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

	getCost(): number {
		return 50;
	}
}

class MediumMilkshake extends Beverage {
	constructor() {
		super("Medium Milkshake");
	}

	getCost(): number {
		return 60;
	}
}

class LargeMilkshake extends Beverage {
	constructor() {
		super("Large Milkshake");
	}

	getCost(): number {
		return 80;
	}
}

export {
	Coffee,
	Tea,
	Latte,
	LargeMilkshake,
	Cappuccino,
	BlackTea,
	DoubleCappuccino,
	DoubleLatte,
	WhiteTea,
	GreenTea,
	OolongTea,
	Beverage,
	MediumMilkshake,
	SmallMilkshake
}