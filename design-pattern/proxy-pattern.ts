/**
 * 代理模式
 * 一个类代表另一个类的功能。这种类型的设计模式属于结构型模式。
 * 在代理模式中，我们创建具有现有对象的对象，以便向外界提供功能接口。
 */

// 1、创建一个接口
interface Image {
  display(): void;
}

// 2、创建实现接口的实体类
class RealImage implements Image {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk(fileName);
  }
  private loadFromDisk(fileName: string): void {
    console.log('Loading %s', fileName);
  }

  public  display(): void {
    console.log('Displaying %s', this.fileName);
  }
}

class ProxyImage implements Image {
  private realImage?: RealImage;
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public display():void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName)
    }
    this.realImage.display()
  }
}

const image: Image = new ProxyImage('test_10mb.jpg');

// 图像将从磁盘加载
image.display(); 
console.log("");
// 图像不需要从磁盘加载
image.display(); 