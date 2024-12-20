import {IFlyBehavior} from "./IFlyBehavior";
import {IQuackBehavior} from "../Quack/IQuackBehavior";

class FlyWithWings implements IFlyBehavior {
	#countOfFlights = 0;

	fly() {
		this.#countOfFlights++;
		console.log(`I\'m flying with wings ${this.#countOfFlights} times!!`);
	}

	getFlightCount() {
		return this.#countOfFlights;
	}
}

export {FlyWithWings}