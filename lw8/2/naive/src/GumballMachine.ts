enum State {
	SoldOut, // Жвачка закончилась
	NoQuarter, // Нет монеток
	HasQuarters, // Есть монетки
	Sold, // Шарик выдан
}

class MultiGumballMachine {
	private count: number; // Количество шариков
	private quarters: number = 0; // Количество монеток (максимум 5)
	private state: State = State.SoldOut;

	private readonly MAX_QUARTERS = 5;

	constructor(count: number) {
		this.count = count;
		this.state = count > 0 ? State.NoQuarter : State.SoldOut;
	}

	insertQuarter(): void {
		if (this.quarters >= this.MAX_QUARTERS) {
			console.log("You can't insert another quarter. The machine already has 5 quarters.");
			return;
		}

		switch (this.state) {
			case State.SoldOut:
				console.log("You can't insert a quarter, the machine is sold out.");
				break;
			case State.NoQuarter:
			case State.HasQuarters:
				console.log("You inserted a quarter.");
				this.quarters++;
				this.state = State.HasQuarters;
				break;
			case State.Sold:
				console.log("Please wait, we're already giving you a gumball.");
				break;
		}
	}

	ejectQuarters(): void {
		if (this.quarters === 0) {
			console.log("You haven't inserted any quarters.");
			return;
		}

		switch (this.state) {
			case State.HasQuarters:
			case State.NoQuarter:
				console.log(`Returning ${this.quarters} quarter(s).`);
				this.quarters = 0;
				this.state = State.NoQuarter;
				break;
			case State.SoldOut:
				console.log("You can't eject quarters, the machine is sold out.");
				break;
			case State.Sold:
				console.log(`Returning ${this.quarters} quarter(s).`);
				this.quarters = 0;
				this.state = this.count > 0 ? State.NoQuarter : State.SoldOut;
				break;
		}
	}

	turnCrank(): void {
		if (this.quarters === 0) {
			console.log("You turned, but there are no quarters.");
			return;
		}

		switch (this.state) {
			case State.SoldOut:
				console.log("You turned, but there are no gumballs.");
				break;
			case State.NoQuarter:
				console.log("You turned, but there are no quarters.");
				break;
			case State.HasQuarters:
				console.log("You turned...");
				this.quarters--;
				this.dispense();
				break;
			case State.Sold:
				console.log("Turning again doesn't get you another gumball.");
				break;
		}
	}

	refill(numBalls: number): void {
		this.count += numBalls;
		console.log(`Machine refilled. New inventory: ${this.count} gumball(s).`);
		this.state = this.count > 0 ? (this.quarters > 0 ? State.HasQuarters : State.NoQuarter) : State.SoldOut;
	}

	toString(): string {
		const stateDescription = this.state === State.SoldOut
			? "sold out"
			: this.state === State.NoQuarter
				? "waiting for quarter"
				: this.state === State.HasQuarters
					? `waiting for turn of crank with ${this.quarters} quarter(s)`
					: "delivering a gumball";

		return `
Mighty Multi Gumball, Inc.
TS-enabled Standing Gumball Model #2024
Inventory: ${this.count} gumball${this.count !== 1 ? "s" : ""}
Quarters: ${this.quarters}
Machine is ${stateDescription}
        `;
	}

	private dispense(): void {
		if (this.state === State.HasQuarters || this.state === State.Sold) {
			if (this.count > 0) {
				console.log("A gumball comes rolling out the slot.");
				this.count--;

				if (this.count === 0) {
					console.log("Oops, out of gumballs.");
					this.state = this.quarters > 0 ? State.HasQuarters : State.SoldOut;
				} else {
					this.state = this.quarters > 0 ? State.HasQuarters : State.NoQuarter;
				}
			} else {
				console.log("No gumball dispensed. Out of inventory.");
				this.state = State.SoldOut;
			}
		} else {
			console.log("No gumball dispensed.");
		}
	}
}

export {MultiGumballMachine}