const { action, computed, makeObservable, observable } = require('mobx');

const store = makeObservable(
  {
    count: 0,
    get double() {
      console.log('ddddd')
      return this.count * 2;
    },
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    }
  },
  {
    count: observable,
    double: computed,
    increment: action,
    decrement: action,
  }
)
store.count = 2;

store.increment()


console.log(store.count)
console.log(store.double)