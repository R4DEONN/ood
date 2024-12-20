class Duck {
	#flyBehavior: () => number
	readonly #quackBehavior: () => void
	readonly #danceBehavior: () => void

	constructor(flyBehavior: () => number, quackBehavior: () => void, danceBehavior: () => void) {
		this.#quackBehavior = quackBehavior
		this.#flyBehavior = flyBehavior
		this.#danceBehavior = danceBehavior
	}

	quack() {
		this.#quackBehavior()
	}

	swim() {
		console.log('I\'m swimming')
	}

	fly() {
		if (this.#flyBehavior() % 2 === 0)
		{
			this.#quackBehavior();
		}
	}

	dance() {
		this.#danceBehavior();
	}

	setFlyBehavior(value: () => number) {
		this.#flyBehavior = value
	}

	display() {}
}

export {Duck}