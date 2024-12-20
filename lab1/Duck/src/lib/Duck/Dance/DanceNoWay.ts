import {IDanceBehavior} from "./IDanceBehavior";

class DanceNoWay implements IDanceBehavior {
	dance() {}

	isDancing() {
		return false
	}
}

export {DanceNoWay}