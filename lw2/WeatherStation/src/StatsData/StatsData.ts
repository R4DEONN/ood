class StatsData {
	private _minValue = Infinity
	private _maxValue = -Infinity
	private _accValue = 0
	private _accCount = 0

	update(value: number) {
		if (this._minValue > value) {
			this._minValue = value
		}
		if (this._maxValue < value) {
			this._maxValue = value
		}

		this._accValue += value
		++this._accCount
	}

	get minValue(): number {
		return this._minValue;
	}

	get maxValue(): number {
		return this._maxValue;
	}

	getAverage() {
		if (this._accCount)
		{
			return this._accValue
		}
		return this._accValue / this._accCount;
	}
}

export {StatsData}