import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  template: `
<div class="sector"
  [style.top]="getTop(sector)" [style.left]="getLeft(sector)" (click)="click(sector)">
    <div class="dot"></div>
    <ball *ngIf="sector.ball"></ball>
</div>

  `,
  selector: 'sector',
  styles: [
`
  .sector {
    width: 5px;
    height: 5px;
    padding: 10px;
    position: absolute;
  }

  .dot {
    width: 5px;
    height: 5px;
    background-color: green;
  }
`
  ]
})
export class SectorComponent {

  @Input() sector;
  @Output() sectorClicked: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  getTop(sector) {
    let y = 0;
    if (sector.type === 'sector') {
      y = (545 - (45 * Math.floor((sector.index - 1) / 9))) - 2;
    } else if (sector.type === 'gate') {
      if (sector.index === -4) {
        y = 588;
      } else if (sector.index === 104) {
        y = 48;
      }
    }

    return (y-10) + 'px';
  }

  getLeft(sector) {
    let x = 0;
    if (sector.type === 'sector') {
      x = (45 * ((sector.index - 1) % 9)) - 2;
    } else if (sector.type === 'gate') {
      x = 178;
    }

    return (x-10) + 'px';
  }

  click(sector) {
    this.sectorClicked.emit(sector);
  }
}
