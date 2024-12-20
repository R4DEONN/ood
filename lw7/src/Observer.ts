interface IObserver<T> {
	update(data: T): void
}

interface IObservable<T> {
	registerObserver(observer: IObserver<T>, priority?: number): void
	notifyObservers(): void
	removeObserver(observer: IObserver<T>): void
}

class Observable<T> implements IObservable<T> {
	private _observers: Map<IObserver<T>, number> = new Map();

	registerObserver(observer: IObserver<T>, priority: number = 0): void {
		if (!this._observers.has(observer)) {
			this._observers.set(observer, priority);
		}
	}

	removeObserver(observer: IObserver<T>): void {
		this._observers.delete(observer);
	}

	notifyObservers(): void {
		const data = this.getChangedData();

		const sortedObservers = Array.from(this._observers.entries())
			.sort((a, b) => b[1] - a[1])
		for (const [observer] of sortedObservers)
		{
			observer.update(data);
		}
	}

	protected getChangedData(): T {
		return {} as T;
	}
}

export {IObserver, IObservable, Observable}