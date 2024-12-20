interface IState {
	InsertQuarter(): void;

	EjectQuarter(): void;

	TurnCrank(): void;

	Dispense(): void;

	ToString(): string;
}

interface IGumballMachine {
	ReleaseBall(): void;

	GetBallCount(): number;

	SetSoldOutState(): void;

	SetNoQuarterState(): void;

	SetSoldState(): void;

	SetHasQuarterState(): void;

	AddQuarter(): void;
	ReturnAllQuarters(): void;
	GetQuarterCount(): number;
	Refill(count: number): void;
}

class SoldState implements IState {
	constructor(private _gumballMachine: IGumballMachine) {
	}

	InsertQuarter(): void {
		console.log("Please wait, we're already giving you a gumball");
	}

	EjectQuarter(): void {
		console.log("Sorry you already turned the crank");
	}

	TurnCrank(): void {
		console.log("Turning twice doesn't get you another gumball");
	}

	Dispense(): void {
		this._gumballMachine.ReleaseBall();
		if (this._gumballMachine.GetBallCount() === 0) {
			console.log("Oops, out of gumballs");
			this._gumballMachine.SetSoldOutState();
		} else if (this._gumballMachine.GetQuarterCount() > 0) {
			this._gumballMachine.SetHasQuarterState();
		} else {
			this._gumballMachine.SetNoQuarterState();
		}
	}

	Refill(count: number): void {
		throw new Error('Cannot refill while dispensing');
	}

	ToString(): string {
		return "delivering a gumball";
	}
}

class SoldOutState implements IState {
	constructor(private _gumballMachine: IGumballMachine) {
	}

	InsertQuarter(): void {
		console.log("You can't insert a quarter, the machine is sold out");
	}

	EjectQuarter(): void {
		console.log("You can't eject, you haven't inserted a quarter yet");
	}

	TurnCrank(): void {
		console.log("You turned but there's no gumballs");
	}

	Dispense(): void {
		console.log("No gumball dispensed");
	}

	Refill(count: number): void {
		console.log(`Machine refilled with ${count} gumballs`);
		this._gumballMachine.Refill(count);
		//TODO: Добавить переход на состояние
	}

	ToString(): string {
		return "sold out";
	}
}

class HasQuarterState implements IState {
	constructor(private _gumballMachine: IGumballMachine) {
	}

	InsertQuarter(): void {
		if (this._gumballMachine.GetQuarterCount() >= 5) {
			console.log("You can't insert another quarter, machine already has 5 quarters");
		} else {
			console.log('You inserted another quarter');
			this._gumballMachine.AddQuarter();
		}
	}

	EjectQuarter(): void {
		console.log("Quarter returned");
		this._gumballMachine.ReturnAllQuarters();
		this._gumballMachine.SetNoQuarterState();
	}

	TurnCrank(): void {
		console.log("You turned...");
		this._gumballMachine.SetSoldState();
	}

	Dispense(): void {
		console.log("No gumball dispensed");
	}

	Refill(count: number): void {
		console.log(`Machine refilled with ${count} gumballs`);
		this._gumballMachine.Refill(count);
	}

	ToString(): string {
		return "waiting for turn of crank";
	}
}

class NoQuarterState implements IState {
	constructor(private _gumballMachine: IGumballMachine) {
	}

	InsertQuarter(): void {
		console.log("You inserted a quarter");
		this._gumballMachine.AddQuarter();
		this._gumballMachine.SetHasQuarterState();
	}

	EjectQuarter(): void {
		console.log("You haven't inserted a quarter");
	}

	TurnCrank(): void {
		console.log("You turned but there's no quarter");
	}

	Dispense(): void {
		console.log("You need to pay first");
	}

	Refill(count: number): void {
		console.log(`Machine refilled with ${count} gumballs`);
		this._gumballMachine.Refill(count);
	}

	ToString(): string {
		return "waiting for quarter";
	}
}

class GumballMachine implements IGumballMachine {
	private _count: number;
	private _quarterCount: number = 0;
	private _soldState: SoldState;
	private _soldOutState: SoldOutState;
	private _noQuarterState: NoQuarterState;
	private _hasQuarterState: HasQuarterState;
	private _state: IState;

	constructor(numBalls: number) {
		this._count = numBalls;
		this._soldState = new SoldState(this);
		this._soldOutState = new SoldOutState(this);
		this._noQuarterState = new NoQuarterState(this);
		this._hasQuarterState = new HasQuarterState(this);
		this._state = numBalls > 0 ? this._noQuarterState : this._soldOutState;
	}

	EjectQuarter(): void {
		this._state.EjectQuarter();
	}

	InsertQuarter(): void {
		this._state.InsertQuarter();
	}

	TurnCrank(): void {
		this._state.TurnCrank();
		this._state.Dispense();
	}

	GetBallCount(): number {
		return this._count;
	}

	ReleaseBall(): void {
		if (this._count > 0) {
			console.log("A gumball comes rolling out the slot...");
			this._count--;
			this._quarterCount--;
		}
	}

	AddQuarter(): void {
		this._quarterCount++;
	}

	ReturnAllQuarters(): void {
		console.log(`Returning ${this._quarterCount} quarters`);
		this._quarterCount = 0;
	}

	GetQuarterCount(): number {
		return this._quarterCount;
	}

	SetSoldOutState(): void {
		this._state = this._soldOutState;
	}

	SetNoQuarterState(): void {
		this._state = this._noQuarterState;
	}

	SetSoldState(): void {
		this._state = this._soldState;
	}

	SetHasQuarterState(): void {
		this._state = this._hasQuarterState;
	}

	Refill(count: number): void {
		//TODO: Обработать отрицательное кол-во
		console.log(`Refilling machine with ${count} gumballs...`);
		this._count += count;

		if (this._state instanceof SoldOutState && this._count > 0) {
			this._state = this._quarterCount > 0 ? this._hasQuarterState : this._noQuarterState;
		}
	}

	ToString(): string {
		return `
Mighty Gumball, Inc.
TypeScript-enabled Standing Gumball Model #2024
Inventory: ${this._count} gumball${this._count !== 1 ? "s" : ""}
Machine is ${this._state.ToString()}
`;
	}
}

export {GumballMachine, HasQuarterState, NoQuarterState, SoldOutState, SoldState}