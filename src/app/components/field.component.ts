import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  template: `
<div class="game">
  <div class="field">
    <div class="box" *ngFor="let sector of field; let i = index"
      [style.top]="getTop(sector)" [style.left]="getLeft(sector)">

    </div>
  </div>
</div>
  `,
  selector: 'field',
  styles: [
`
  .game {
    background: url("./assets/image/tlo.jpg") top left no-repeat;
    height: 640px;
    width: 360px;
  }

  .field {
    width: 360px;
    height: 640px;
    overflow: hidden;
    position: relative;
    background: url("./assets/image/tlo_boisko.png") no-repeat top left;
   }

  .box {
    width: 5px;
    height: 5px;
    position: absolute;
    background-color: green;
  }

`
  ],
})
export class FieldComponent implements OnInit {

  @Input() field;
  @Output() fieldChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.field = new Array();
    for (let i = 0; i < 99; i++) {
      this.field.push({
        type: 'sector',
        index: i,
      });
    }
    this.field.push({
      type: 'gate',
      index: 104,
    });

    this.field.push({
      type: 'gate',
      index: -4,
    });
  }

  getTop(sector) {
    let y = 0;
    if (sector.type === 'sector') {
      y = (545 - (45 * Math.floor(sector.index / 9))) - 2;
    } else if (sector.type === 'gate') {
      if (sector.index === -4) {
        y = 588;
      } else if (sector.index === 104) {
        y = 48;
      }
    }

    return y + 'px';
  }

  getLeft(sector) {
    let x = 0;
    if (sector.type === 'sector') {
      x = (45 * (sector.index % 9)) - 2;
    } else if (sector.type === 'gate') {
      x = 178;
    }

    return x + 'px';
  }
}
