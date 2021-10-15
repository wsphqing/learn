class Person {
  private name: string;
  constructor(option) {
    this.name = option.name;
  }

  getName() {
    return this.name;
  }
}

const perspn = new Person({ name: 'huaqing' });

console.log(perspn.getName())