/**
 * 基础数据类型
 */
let str: string = 'hua';
let num: number = 12;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = { x: 12, y: 45 };
let big: bigint = 100n; // 目标低于ES2020不能使用
let sym: symbol = Symbol('hello');

/**
 * 其他类型
 */

// Arry
let arr: string[] = [''];
let arr2: Array<string> = [''];
let arr3: (string | number)[] = [0, '1'];
// 联合类型
type Commbinable = string | number;
let arr4: Commbinable[] = [0, '1'];

// 函数
function sum(x: number, y: number): number {
  return x + y
}
let sum2:(x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

// 接口定义
interface SearchFunc {
  (source: string) : boolean
}

let searchFn: SearchFunc = (source: string) => { return !source }

// 可选参数
function buildName(firstName: string, lastName?: string) {
  return lastName ? firstName + ' ' + lastName : firstName;
}
// 参数默认值
function buildName2(firstName: string, lastName: string = 'qing') {
  return firstName + ' ' + lastName;
}
// 剩余参数
function push(array: any[], ...items: any[]) {}

// Tuple(元组) 可以限制数组元素的个数和类型
let x: [string, number];

x = ['hello', 100];
// x = [, 100, 100]; // Error
// x = [100, 'hello']; // Error

// void
let v: void;
// v = 'str' // Error
// strictNullChecks = false 时
// v = undefined;
// v = null;

// 方法没有返回值将得到undefined，但是我们需要定义成void类型，而不是undefined类型
function fn(): void {
  console.log('this is fn')
}
console.log(fn())

// never 永不存在的值的类型



// any 允许被赋值为任意类型
let any_demo: any = 666;
any_demo = "Semlinker";
any_demo = false;
any_demo = 66
any_demo = undefined
any_demo = null
any_demo = []
any_demo = {}

// any上访问任何属性都是允许的,也允许调用任何方法
console.log(any_demo.myName);
any_demo.setName('hua');

// 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型
let any_num: number = any_demo;

// any 是魔鬼

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
let any_someting;
any_someting = 'someting';
any_someting = 123;
// 最后赋值进行了确定
// any_someting.setName;

// unknown 与any类似
let notSure: unknown = 4;
notSure = "maybe a string instead"; // OK
notSure = false; // OK

// 区别： unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any
let unknown_demo: unknown = '4';
// let unknown_num: number = unknown_demo; // Error

// object
let lowerCaseObject: object;
// lowerCaseObject = 1; // Error
// lowerCaseObject = 'a'; // Error
// lowerCaseObject = true; // Error
// lowerCaseObject = null; // Error
// lowerCaseObject = undefined; // Error
lowerCaseObject = {}; // ok