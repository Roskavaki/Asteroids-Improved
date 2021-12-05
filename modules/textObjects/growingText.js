import {
  drawText,
  drawTextCenterScreen,
  drawTextUpperLeft,
} from "../utils/textUtils.js";
import { obj } from "../obj.js";

export class GrowingText extends obj {
  constructor(myText = "") {
    super();

    this.textSize = 0;

    this.myText = myText;

    const canvas = document.getElementById("canvas");
    let width = canvas.width;
    let height = canvas.height;
    this.screenwidth = width;
    this.screenheight = height;

    this.maxTextSize = 100;
  }

  update(deltaT) {}

  draw(ctx) {
    this.textSize += 2;

    if (this.textSize >= this.maxTextSize) {
      this.textSize = this.maxTextSize;
    }

    drawTextCenterScreen(
      ctx,
      this.myText,
      this.screenwidth,
      this.screenheight,
      this.textSize
    );
    
    if (this.textSize < this.maxTextSize) {
    } else {
      //	this.markedForDestroy=true;
    }
  }
}
