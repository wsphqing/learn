import { Edge } from 'butterfly-dag';
import $ from 'jquery';

class BaseEdge extends Edge {
  draw(obj: any) {
    let path = super.draw(obj);
    if (this.options.color) {
      $(path).addClass(this.options.color);
    }
    return path;
  }
  drawArrow(isShow: any) {
    let dom = super.drawArrow(isShow);
    if (this.options.color) {
      $(dom).addClass(this.options.color);
    }
    return dom;
  }
  drawLabel(text: string) {
    let dom = null;
    if (text) {
      dom = $(`<span class="label">${text}</span>`)[0];
    }
    return dom;
  }
}

export default BaseEdge;