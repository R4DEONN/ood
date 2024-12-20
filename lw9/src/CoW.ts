class CoW<Value> {
    private _value: Value;

    constructor(value?: Value) {
        this._value = value !== undefined ? value : {} as Value; // создаем значение по умолчанию
    }

    private ensureUnique(): void {
        if (this._value.) {
            // Создаем новый экземпляр, если текущий не уникален
            this._value = Object.assign(Object.create(Object.getPrototypeOf(this._value)), this._value);
        }
    }

    public getValue(): Value {
        return this._value;
    }

    public write(modifyFn: (value: Value) => void): void {
        this.ensureUnique();
        modifyFn(this._value);
    }

    public writeProxy(): WriteProxy<Value> {
        this.ensureUnique();
        return new WriteProxy<Value>(this._value);
    }
}

class WriteProxy<Value> {
    private valuePtr: Value;

    constructor(value: Value) {
        this.valuePtr = value;
    }

    public getValue(): Value {
        return this.valuePtr;
    }

    public setValue(newValue: Value): void {
        this.valuePtr = newValue;
    }
}

export {CoW}
