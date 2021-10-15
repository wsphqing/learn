/**
 * 委派模式
 * 委派模式不属于GOF23种设计模式, 主要角色有三种: 抽象任务角色, 委派者角色, 具体任务角色.
 * 实现层面上, 定义一个抽象接口, 它有若干实现类, 他们真正执行业务方法, 这些子类是具体任务角色; 定义委派者角色也实现该接口, 但它负责在各个具体角色实例之间做出决策, 由它判断并调用具体实现的方法.
 * 委派模式对外隐藏了具体实现, 仅将委派者角色暴露给外部, 如Spring的DispatcherServlet.
 */

// 1、定义抽象任务角色接口
interface Task {
  doTask(): void;
}

// 2、具体任务角色, 实现上面的接口, 这里定义两个实现类
class ConcreteTaskA implements Task {
  public doTask(): void {
    console.log("执行 , 由A实现");
  }
}

class ConcreteTaskB implements Task {
  public doTask(): void {
    console.log("执行 , 由B实现");
  }
}

// 3、委派角色, 是整个模式的核心角色, 下面代码中我们使用随机数来判断应该实例化哪个具体实现类
class TaskDelegate implements Task{
  public doTask(): void {
    console.log("代理执行开始....");

    let task = null;
    if (Math.random() > 0.5){
      task = new ConcreteTaskA();
    } else {
      task = new ConcreteTaskB();
    }
    task.doTask();

    console.log("代理执行完毕....");
  }
}

// 4、调用
// class TaskTest {
//   public static main(): void {
//     new TaskDelegate().doTask();
//   }
// }

const taskTest = new TaskDelegate();

taskTest.doTask()