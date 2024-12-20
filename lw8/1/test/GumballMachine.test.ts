import {describe, expect, it, jest} from "@jest/globals"; // Убедитесь, что путь верный
import {GumballMachine, HasQuarterState, NoQuarterState, SoldOutState, SoldState} from "../src/GumballMachine"; // Убедитесь, что путь правильный

describe('GumballMachine', () => {
	it('should start with no quarter state when there are gumballs', () => {
		const machine = new GumballMachine(5);
		expect(machine.ToString()).toContain('waiting for quarter');
	});

	it('should start with sold out state when there are no gumballs', () => {
		const machine = new GumballMachine(0);
		expect(machine.ToString()).toContain('sold out');
	});

	it('should transition to has quarter state when quarter is inserted', () => {
		const machine = new GumballMachine(5);
		machine.InsertQuarter();
		expect(machine.ToString()).toContain('waiting for turn of crank');
	});

	it('should return to no quarter state if quarter is ejected', () => {
		const machine = new GumballMachine(5);
		machine.InsertQuarter();
		machine.EjectQuarter();
		expect(machine.ToString()).toContain('waiting for quarter');
	});

	it('should dispense a gumball and go to no quarter state on crank turn', () => {
		const machine = new GumballMachine(5);
		machine.InsertQuarter();
		machine.TurnCrank();
		expect(machine.ToString()).toContain('waiting for quarter');
		expect(machine.GetBallCount()).toBe(4);
	});

	it('should go to sold out state when the last gumball is dispensed', () => {
		const machine = new GumballMachine(1);
		machine.InsertQuarter();
		machine.TurnCrank();
		expect(machine.ToString()).toContain('sold out');
		expect(machine.GetBallCount()).toBe(0);
	});

	it('should not allow inserting another quarter in has quarter state', () => {
		const machine = new GumballMachine(5);
		machine.InsertQuarter();
		machine.InsertQuarter();
		expect(machine.ToString()).toContain('waiting for turn of crank');
	});

	it('should not allow ejecting a quarter in no quarter state', () => {
		const machine = new GumballMachine(5);
		machine.EjectQuarter();
		expect(machine.ToString()).toContain('waiting for quarter');
	});

	it('should not allow turning crank without a quarter', () => {
		const machine = new GumballMachine(5);
		machine.TurnCrank();
		expect(machine.ToString()).toContain('waiting for quarter');
	});

	it('should not dispense a gumball in sold out state', () => {
		const machine = new GumballMachine(0);
		machine.TurnCrank();
		expect(machine.ToString()).toContain('sold out');
	});
});

// Заглушка для интерфейса IGumballMachine
const createMockGumballMachine = () => ({
	ReleaseBall: jest.fn(),
	GetBallCount: jest.fn(),
	SetSoldOutState: jest.fn(),
	SetNoQuarterState: jest.fn(),
	SetSoldState: jest.fn(),
	SetHasQuarterState: jest.fn(),
});

describe('State Tests', () => {
	describe('NoQuarterState', () => {
		it('should transition to HasQuarterState on InsertQuarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new NoQuarterState(mockMachine as any);

			state.InsertQuarter();

			expect(mockMachine.SetHasQuarterState).toHaveBeenCalled();
		});

		it('should not allow EjectQuarter without a quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new NoQuarterState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.EjectQuarter();

			expect(consoleSpy).toHaveBeenCalledWith("You haven't inserted a quarter");
		});

		it('should not allow TurnCrank without a quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new NoQuarterState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.TurnCrank();

			expect(consoleSpy).toHaveBeenCalledWith("You turned but there's no quarter");
		});

		it('should not dispense a gumball', () => {
			const mockMachine = createMockGumballMachine();
			const state = new NoQuarterState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.Dispense();

			expect(consoleSpy).toHaveBeenCalledWith('You need to pay first');
		});
	});

	describe('HasQuarterState', () => {
		it('should not allow inserting another quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new HasQuarterState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.InsertQuarter();

			expect(consoleSpy).toHaveBeenCalledWith("You can't insert another quarter");
		});

		it('should transition to NoQuarterState on EjectQuarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new HasQuarterState(mockMachine as any);

			state.EjectQuarter();

			expect(mockMachine.SetNoQuarterState).toHaveBeenCalled();
		});

		it('should transition to SoldState on TurnCrank', () => {
			const mockMachine = createMockGumballMachine();
			const state = new HasQuarterState(mockMachine as any);

			state.TurnCrank();

			expect(mockMachine.SetSoldState).toHaveBeenCalled();
		});

		it('should not dispense a gumball', () => {
			const mockMachine = createMockGumballMachine();
			const state = new HasQuarterState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.Dispense();

			expect(consoleSpy).toHaveBeenCalledWith('No gumball dispensed');
		});
	});

	describe('SoldState', () => {
		it('should not allow inserting another quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.InsertQuarter();

			expect(consoleSpy).toHaveBeenCalledWith("Please wait, we're already giving you a gumball");
		});

		it('should not allow ejecting the quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.EjectQuarter();

			expect(consoleSpy).toHaveBeenCalledWith('Sorry you already turned the crank');
		});

		it('should not allow turning the crank again', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.TurnCrank();

			expect(consoleSpy).toHaveBeenCalledWith("Turning twice doesn't get you another gumball");
		});

		it('should dispense a gumball and transition to the correct state', () => {
			const mockMachine = createMockGumballMachine();
			mockMachine.GetBallCount.mockReturnValueOnce(1);
			const state = new SoldState(mockMachine as any);

			state.Dispense();

			expect(mockMachine.ReleaseBall).toHaveBeenCalled();
			expect(mockMachine.SetNoQuarterState).toHaveBeenCalled();
		});

		it('should transition to SoldOutState if no gumballs are left', () => {
			const mockMachine = createMockGumballMachine();
			mockMachine.GetBallCount.mockReturnValueOnce(0);
			const state = new SoldState(mockMachine as any);

			state.Dispense();

			expect(mockMachine.ReleaseBall).toHaveBeenCalled();
			expect(mockMachine.SetSoldOutState).toHaveBeenCalled();
		});
	});

	describe('SoldOutState', () => {
		it('should not allow inserting a quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldOutState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.InsertQuarter();

			expect(consoleSpy).toHaveBeenCalledWith("You can't insert a quarter, the machine is sold out");
		});

		it('should not allow ejecting a quarter', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldOutState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.EjectQuarter();

			expect(consoleSpy).toHaveBeenCalledWith("You can't eject, you haven't inserted a quarter yet");
		});

		it('should not allow turning the crank', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldOutState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.TurnCrank();

			expect(consoleSpy).toHaveBeenCalledWith("You turned but there's no gumballs");
		});

		it('should not dispense a gumball', () => {
			const mockMachine = createMockGumballMachine();
			const state = new SoldOutState(mockMachine as any);

			const consoleSpy = jest.spyOn(console, 'log');
			state.Dispense();

			expect(consoleSpy).toHaveBeenCalledWith('No gumball dispensed');
		});
	});
});
