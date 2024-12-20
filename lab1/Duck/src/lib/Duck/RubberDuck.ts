import {Duck} from "./Duck";
import {FlyNoWay} from "./Fly/FlyNoWay";
import {SqueakBehavior} from "./Quack/SqueakBehavior";
import {DanceNoWay} from "./Dance/DanceNoWay";

class RubberDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new SqueakBehavior(), new DanceNoWay());
	}

	display() {
		console.log('I\'m rubber duck')
	}

	dance() {}
}

export {RubberDuck}