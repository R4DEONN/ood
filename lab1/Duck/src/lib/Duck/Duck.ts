import {IFlyBehavior} from "./Fly/IFlyBehavior";
import {IQuackBehavior} from "./Quack/IQuackBehavior";
import {IDanceBehavior} from "./Dance/IDanceBehavior";

class Duck {
	#flyBehavior: IFlyBehavior
	#quackBehavior: IQuackBehavior
	#danceBehavior: IDanceBehavior

	constructor(flyBehavior: IFlyBehavior, quackBehavior: IQuackBehavior, danceBehavior: IDanceBehavior) {
		this.#quackBehavior = quackBehavior
		this.#flyBehavior = flyBehavior
		this.#danceBehavior = danceBehavior
	}

	quack() {
		this.#quackBehavior.quack()
	}

	swim() {
		console.log('I\'m swimming')
	}

	fly() {
		this.#flyBehavior.fly();
		if (this.getFlightCount() % 2 === 0)
		{
			this.quack()
		}
	}

	dance() {
		this.#danceBehavior.dance()
	}

	setFlyBehavior(value: IFlyBehavior) {
		this.#flyBehavior = value
	}

	getFlightCount() {
		return this.#flyBehavior.getFlightCount();
	}

	display() {}
}

export {Duck}