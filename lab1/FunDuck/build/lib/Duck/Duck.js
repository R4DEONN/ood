class Duck {
    #flyBehavior;
    #quackBehavior;
    constructor(flyBehavior, quackBehavior) {
        this.#quackBehavior = quackBehavior;
        this.#flyBehavior = flyBehavior;
    }
    quack() {
        this.#quackBehavior.quack();
    }
    swim() {
        console.log('I\'m swimming');
    }
    fly() {
        this.#flyBehavior.fly();
    }
    dance() {
        console.log('I\'m Dancing');
    }
    setFlyBehavior(value) {
        this.#flyBehavior = value;
    }
    display() { }
}
export { Duck };
//# sourceMappingURL=Duck.js.map