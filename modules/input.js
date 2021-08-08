export class Input {
  constructor(canvas) {
    // super();
    this.canvas = canvas;
    this.pressed = {};
    this.canvas.onkeydown = (e) => {
      e = e || window.event;
      this.pressed[e.keyCode] = true;
    };
    this.canvas.onkeyup = (e) => {
      e = e || window.event;
      delete this.pressed[e.keyCode];
    };
  }

  /**
   * checks if the specified key is pressed or not
   * @param {string or int} keyName letter or keycode to listen for
   * @returns {boolean} whether the specified key is among those currently pressed
   */
  getKey(keyName) {
    // console.log(keyName);
    // console.log(this.pressed);
    if (typeof keyName == "string") {
      // console.log(keyName.charCodeAt(0));
      // let keyLower = keyName.toLowerCase();
      // console.log(keyName.charCodeAt(0));
      // console.log(keyLower.charCodeAt(0));
      return this.pressed[keyName.toUpperCase().charCodeAt(0)];
      // return this.pressed[keyLower.charCodeAt(0)];
    }
    return this.pressed[keyName];
  }

  /* getKeyDown(keyName){

	}
	getKeyUp(keyName){

	} */

  /* ************** a keycode reference *************


backspace	8
tab	9
enter	13
shift	16
ctrl	17
alt	18
pause/break	19
caps lock	20
escape	27
page up	33
Space	32
page down	34
end	35
home	36
arrow left	37
arrow up	38
arrow right	39
arrow down	40
print screen	44
insert	45
delete	46

... (letters) ...

left window key	91
right window key	92
select key	93
numpad 0	96
numpad 1	97
numpad 2	98
numpad 3	99
numpad 4	100
numpad 5	101
numpad 6	102
numpad 7	103
numpad 8	104
numpad 9	105
multiply	106
add	107
subtract	109
decimal point	110
divide	111
f1	112
f2	113
f3	114
f4	115
f5	116
f6	117
f7	118
f8	119
f9	120
f10	121
f11	122
f12	123
num lock	144
scroll lock	145
My Computer (multimedia keyboard)	182
My Calculator (multimedia keyboard)	183
semi-colon	186
equal sign	187
comma	188
dash	189
period	190
forward slash	191
open bracket	219
back slash	220
close braket	221
single quote	222
*/
}
