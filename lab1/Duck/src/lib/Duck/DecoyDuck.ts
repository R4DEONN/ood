import {Duck} from "./Duck";
import {FlyNoWay} from "./Fly/FlyNoWay";
import {MuteQuackBehavior} from "./Quack/MuteQuackBehavior";
import {DanceNoWay} from "./Dance/DanceNoWay";

class DecoyDuck extends Duck {
	constructor() {
		super(new FlyNoWay(), new MuteQuackBehavior(), new DanceNoWay());
	}

	display() {
		console.log('I\'m decoy duck')
	}

	dance() {}
}

export {DecoyDuck}