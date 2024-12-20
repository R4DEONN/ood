import {Duck} from "./Duck";
import {FlyNoWay} from "./Fly/FlyNoWay";
import {QuackBehavior} from "./Quack/QuackBehavior";
import {DanceNoWay} from "./Dance/DanceNoWay";

class ModelDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new QuackBehavior(), new DanceNoWay());
	}

	display() {
		console.log('I\'m model duck')
	}

	dance() {}
}

export {ModelDuck}