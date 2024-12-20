import {Duck} from "./Duck";
import {flyNoWay} from "./Fly/FlyNoWay";
import {quackBehavior} from "./Quack/QuackBehavior";
import {danceNoWay} from "./Dance/DanceNoWay";

class ModelDuck extends Duck {
	constructor() {
		super(flyNoWay, quackBehavior, danceNoWay);
	}

	display() {
		console.log('I\'m model duck')
	}

	dance() {}
}

export {ModelDuck}