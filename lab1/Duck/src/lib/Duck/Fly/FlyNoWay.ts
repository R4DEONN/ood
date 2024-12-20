import {IFlyBehavior} from "./IFlyBehavior";

class FlyNoWay implements IFlyBehavior {
	fly() {}
	getFlightCount() {
		return 0
	}
}

export {FlyNoWay}