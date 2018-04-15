import { Component } from '@angular/core';

@Component({
  selector: 'ball',
  template: `<div class="ball"></div>`,
  styles: [`
  .ball {
    position: absolute; z-index: 90;
    width: 25px; height: 25px;
    margin-top: -10px;
    margin-left: -10px;
    background: url("./assets/image/ball.png") no-repeat top left;
  }
`],
})
export class BallComponent {

  constructor() {
  }
}
