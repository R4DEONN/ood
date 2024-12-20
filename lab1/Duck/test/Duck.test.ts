import {describe, expect, jest, test} from "@jest/globals";
import {RedheadDuck} from "../src/lib/Duck/RedheadDuck";
import {MallardDuck} from "../src/lib/Duck/MallardDuck";
import {DecoyDuck} from "../src/lib/Duck/DecoyDuck";
import {ModelDuck} from "../src/lib/Duck/ModelDuck";
import {RubberDuck} from "../src/lib/Duck/RubberDuck";
import {DanceMinuet} from "../src/lib/Duck/Dance/DanceMinuet";
import {QuackBehavior} from "../src/lib/Duck/Quack/QuackBehavior";
import {FlyWithWings} from "../src/lib/Duck/Fly/FlyWithWings";
import {Duck} from "../src/lib/Duck/Duck";

describe('DuckTest', () => {
	test('RedheadDuck Dancing', () => {
		const quackBehavior = new QuackBehavior();
		const flyBehavior = new FlyWithWings();
		const danceBehavior = new DanceMinuet();
		const duck = new Duck(flyBehavior, quackBehavior, danceBehavior);
		const danceSpy = jest.spyOn(danceBehavior, 'dance');
		const flySpy = jest.spyOn(flyBehavior, 'fly');
		const quackSpy = jest.spyOn(quackBehavior, 'quack');

		duck.dance();
		expect(danceSpy).toHaveBeenCalled();

		duck.fly();
		expect(flyBehavior.getFlightCount()).toBe(1);
		expect(quackSpy).toHaveBeenCalledTimes(0);
		expect(flySpy).toHaveBeenCalled();


		duck.fly();
		expect(flyBehavior.getFlightCount()).toBe(2);
		expect(quackSpy).toHaveBeenCalledTimes(1);
		expect(flySpy).toHaveBeenCalled();

		duck.quack()
		expect(quackSpy).toHaveBeenCalledTimes(2);

		danceSpy.mockRestore();
		flySpy.mockRestore();
		quackSpy.mockRestore();
	})

	test('MallardDuck Dancing', () => {
		const duck = new MallardDuck()
		const consoleSpy = jest.spyOn(console, 'log');

		duck.dance();

		expect(consoleSpy).toHaveBeenCalledWith("I'm dancing waltz");

		consoleSpy.mockRestore();
	})

	test('DecoyDuck Dancing', () => {
		const duck = new DecoyDuck()
		const consoleSpy = jest.spyOn(console, 'log');

		duck.dance();

		expect(consoleSpy).not.toHaveBeenCalled();

		consoleSpy.mockRestore();
	})

	test('ModelDuck Dancing', () => {
		const duck = new ModelDuck()
		const consoleSpy = jest.spyOn(console, 'log');

		duck.dance();

		expect(consoleSpy).not.toHaveBeenCalled();

		consoleSpy.mockRestore();
	})

	test('ModelDuck Dancing', () => {
		const duck = new ModelDuck()
		const consoleSpy = jest.spyOn(console, 'log');

		duck.dance();

		expect(consoleSpy).not.toHaveBeenCalled();

		consoleSpy.mockRestore();
	})

	test('RubberDuck Dancing', () => {
		const duck = new RubberDuck()
		const consoleSpy = jest.spyOn(console, 'log');

		duck.dance();

		expect(consoleSpy).not.toHaveBeenCalled();

		consoleSpy.mockRestore();
	})
})