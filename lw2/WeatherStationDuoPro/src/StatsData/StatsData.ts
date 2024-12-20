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

	toString(): string {
		return `Max: ${this._maxValue}\n`
		+ `Min: ${this._minValue}\n`
		+ `Average: ${(this._accValue / this._accCount)}\n`
		+ "----------------"
	}
}

export {StatsData}