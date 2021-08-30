class AbstractGun {
  // constructor() {}
  // 枪用来干什么？杀敌！
  shoot() {
    console.log('射击....')
  }
}

class Handgun extends AbstractGun {
  shoot() {
    console.log('手枪射击...');
  }
}

class Rifle extends AbstractGun {
  shoot() {
    console.log('步枪射击...');
  }
}

class MachineGune extends AbstractGun {
  shoot() {
    console.log('机枪扫射...');
  }
}

class Solider {
  constructor() {
    this.gun = null;
  }
  setGun(_gun) {
    this.gun = _gun;
  }

  killEnemy() {
    console.log('士兵开始杀敌人...');
    this.gun.shoot();
  }
}

class Client {
  static main(args) {
    const sanMao = new Solider();
    sanMao.setGun(new Rifle());
    sanMao.killEnemy();
  }
}

Client.main()