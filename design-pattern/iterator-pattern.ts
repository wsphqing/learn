/**
 * 迭代器模式
 * 提供一种方法顺序的访问一个聚合对象中各个元素，而又不暴露该对象的内部表示
 * 
 * 聚集类：Aggregate(抽象类)和ConcreteAggregate(具体聚集类)表示聚集类，是用来存储迭代器的数据。
 * 在Aggregate(抽象类)中有一个CreateIterator方法，用来获取迭代器
 * 迭代器：迭代器用来为聚集类提供服务，提供了一系列访问聚集类对象元素的方法。
 */

// 1、首先定义一个迭代器的抽象，使用接口定义
interface MyIterator {
  // 将游标指向第一个元素
  first(): void;
  // 将游标指向第一个元素
  next(): void;
  // 判断是否有下一个元素
  hasNext(): boolean;

  // 判断是否是第一个元素
  isFirst(): boolean;
  // 判断是否是最后一个元素
  isLast(): boolean;
  //获取当前对象
  getCurrentObj(): any;
}

// 2、自定义聚集类。在聚集类内部，使用内部类的方式来定义迭代器的具体实现
class ConcreteMyAggregate {
  private list: Array<any> = new Array();
  // private iteratorInstance: MyIterator;

  public addObject(obj: any): void {
    this.list.push(obj);
  }
  public removeObject(obj: any): void {
    const index = this.list.findIndex((item) => item === obj)
    this.list.splice(index, 1);
  }
  public getList(): Array<any> {
    return this.list;
  }
  public setList(list: Array<any>): void {
    this.list = list;
  }

  //获得迭代器
  public createIterator(): MyIterator {
    // this.iteratorInstance = 
    return new ConcreteIterator(this.list);
  }

}
//使用内部类来定义迭代器，好处就是可以直接使用外部类的属性
class ConcreteIterator implements MyIterator {
  // 定义一个迭代器游标
  private cursor: number = 0;
  private list: Array<any> = new Array();

  constructor(list: Array<any>) {
    this.list = list;
  }

  public first(): void {
    this.cursor = 0;
  }

  public next(): void {
    if (this.cursor < this.list.length) {
      this.cursor++;
    }
  }

  public hasNext(): boolean {
    //如果游标<list的大小，则说明还有下一个
    if (this.cursor < this.list.length) {
      return true;
    }
    return false;
  }

  public isFirst(): boolean {
    return this.cursor === 0 ? true:false;
  }
  public isLast(): boolean {
    //判断游标是否是容器的最后一个
    return this.cursor === (this.list.length - 1) ? true : false;
  }
  public getCurrentObj(): any {
    // 获取当前游标指向的元素
    return this.list[this.cursor];
  }
}

const cma: ConcreteMyAggregate = new ConcreteMyAggregate();

cma.addObject("111");
cma.addObject("222");
cma.addObject("333");
cma.addObject("444");
        
const iterator: MyIterator = cma.createIterator();
// 如果删除一个元素的话，迭代的时候也同样会被删除
cma.removeObject("111");
while (iterator.hasNext()) {
  //获取当前对象
  console.log(iterator.getCurrentObj());
  //将游标向下移
  iterator.next();
}