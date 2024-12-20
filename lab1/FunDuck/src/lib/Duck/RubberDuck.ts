import {Duck} from "./Duck";
import {danceNoWay} from "./Dance/DanceNoWay";
import {squeakBehavior} from "./Quack/SqueakBehavior";
import {flyNoWay} from "./Fly/FlyNoWay";

class RubberDuck extends Duck {
	constructor() {
		super(flyNoWay, squeakBehavior, danceNoWay);
	}

	display() {
		console.log('I\'m rubber duck')
	}

	dance() {}
}

export {RubberDuck}