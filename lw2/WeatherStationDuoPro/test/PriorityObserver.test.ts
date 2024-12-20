import {expect, test} from "@jest/globals";
import {IObserver, Observable} from "../src/Observer";

let updateOrder: string[] = []

class MockData {}

class MockObserver implements IObserver<MockData> {
	id: string

	constructor(id: string) {
		this.id = id
	}

	update(data: MockData): void {
		updateOrder.push(this.id)
	}
}

class MockObservable extends Observable<MockData> {
	protected getChangedData(): MockData {
		return {} as MockData;
	}
}

test("", () => {
	const observer1 = new MockObserver("1")
	const observer2 = new MockObserver("2")
	const observable = new MockObservable()
	observable.registerObserver(observer1)
	observable.registerObserver(observer2, 1)

	observable.notifyObservers()

	expect(updateOrder).toEqual(["2", "1"])
});