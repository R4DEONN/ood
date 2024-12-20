import {describe, expect, jest, test} from "@jest/globals";
import {RedheadDuck} from "../src/lib/Duck/RedheadDuck";
import {MallardDuck} from "../src/lib/Duck/MallardDuck";
import {DecoyDuck} from "../src/lib/Duck/DecoyDuck";
import {ModelDuck} from "../src/lib/Duck/ModelDuck";
import {RubberDuck} from "../src/lib/Duck/RubberDuck";

describe('DuckTest', () => {
	test('RedheadDuck Dancing', () => {
		const duck = new RedheadDuck()
		const consoleSpy = jest.spyOn(console, 'log');

		duck.dance();
		expect(consoleSpy).toHaveBeenCalledWith("I'm dancing minuet");

		duck.fly();
		expect(consoleSpy).toHaveBeenCalledWith("I'm flying with wings 1 times!!");
		expect(consoleSpy).not.toHaveBeenCalledWith('Quack Quack!!!');

		duck.fly();
		expect(consoleSpy).toHaveBeenCalledWith("I'm flying with wings 2 times!!");
		expect(consoleSpy).toHaveBeenCalledWith('Quack Quack!!!');

		duck.quack()
		expect(consoleSpy).toHaveBeenCalledWith("Quack Quack!!!");

		consoleSpy.mockRestore();
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