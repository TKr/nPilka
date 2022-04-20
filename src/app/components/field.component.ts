import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  template: `
<div class="game">
  <div class="field">
    <sector class="sector" *ngFor="let sector of field; let i = index"
      [sector]="sector" (sectorClicked)="click($event)">
    </sector>
  </div>
</div>
<button (click)="ball = ball + 1; refreshBall()">zmien</button>{{ ball }}
<pre>
  {{ clicked | json }}
</pre>
<pre>
  {{ field | json }}
</pre>
  `,
  selector: 'field',
  styles: [
`
  .game {
    background: url("assets/image/tlo.jpg") top left no-repeat;
    height: 640px;
    width: 360px;
  }

  .field {
    width: 360px;
    height: 640px;
    overflow: hidden;
    position: relative;
    background: url("assets/image/tlo_boisko.png") no-repeat top left;
   }
`
  ],
})
export class FieldComponent implements OnInit {

  @Input() field;
  @Input() ball = 50;
  @Output() fieldChange: EventEmitter<any> = new EventEmitter();
  @Output() ballChange: EventEmitter<any> = new EventEmitter();

  clicked;

  constructor() {
  }

  /// Sector, from which/to ball can not move
  SQ_EMPTY = [];

  /// Standard sector, with all moves available
  SQ_BASIC = [ 1, 8, 9, 10, -1, -8, -9, -10 ];

  /// Moves for sector in narrow of field
  SQ_BASIC_LT = [ 9, 10, 1, -8, -9, -10, -1];
  SQ_BASIC_RT = [ 1, -8, -9, -10, -1, 8, 9 ];
  SQ_BASIC_LD = [ -1, 8, 9, 10, 1, -8, -9 ];
  SQ_BASIC_RD = [ -9, -10, -1, 8, 9, 10, 1 ];

  /// Moves for sector in left side of field
  SQ_LEFT = [ 1, 10, -8 ];
  /// Moves for sector on right side of field
  SQ_RIGHT = [ 8, -1, -10 ];

  /// Moves for sector on top field (not in narrow)
  SQ_TOP = [ -8, -9, -10 ];
  /// a to dla naroznika górnej lewej bramki
  SQ_TOP_L = [ 1, 10, -8, -9, -10 ];
  /// a to dla naroznika górnej prawej bramki
  SQ_TOP_R = [ 8, -1, -8, -9, -10 ];

  /// Ruchy dla klocka u dołu planszy - nie w narożniku
  SQ_BOTTOM = [ 8, 9, 10];
  /// a to dla naroznika dolnej lewej bramki
  SQ_BOTTOM_L = [ 1, 8, 9, 10, -8 ];
  /// a to dla naroznika dolnej prawej bramki
  SQ_BOTTOM_R = [ 8, 9, 10, -1, -10 ];

  /// bramka top
  SQ_BRAMKA_TOP = [ -8, -9, -10];
  /// bramka bottom
  SQ_BRAMKA_BOTTOM = [ 8, 9, 10 ];

  line_top = [
    this.SQ_EMPTY, this.SQ_TOP, this.SQ_TOP, this.SQ_TOP_L, this.SQ_BASIC,
    this.SQ_TOP_R, this.SQ_TOP, this.SQ_TOP, this.SQ_EMPTY ];
  line_top_minus_1 = [
    this.SQ_LEFT, this.SQ_BASIC_LT, this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC,
    this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC_RT, this.SQ_RIGHT ];
  line = [
    this.SQ_LEFT, this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC,
    this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC, this.SQ_RIGHT ];
  line_bottom_plus_1 = [
    this.SQ_LEFT, this.SQ_BASIC_LD, this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC,
    this.SQ_BASIC, this.SQ_BASIC, this.SQ_BASIC_RD, this.SQ_RIGHT];
  line_bottom = [
    this.SQ_EMPTY, this.SQ_BOTTOM, this.SQ_BOTTOM, this.SQ_BOTTOM_L, this.SQ_BASIC,
    this.SQ_BOTTOM_R, this.SQ_BOTTOM, this.SQ_BOTTOM, this.SQ_EMPTY ];
  line_bramka_top = [ this.SQ_BRAMKA_TOP ];
  line_bramka_bottom = [ this.SQ_BRAMKA_BOTTOM ];

  ngOnInit() {
    this.field = new Array();
    this.addLine(1, 9, this.line_bottom, 'sector');
    this.addLine(10, 18, this.line_bottom_plus_1, 'sector');
    for (let i = 9; i <= 63; i += 9) {
      this.addLine((10 + i), (18 + i), this.line, 'sector');
    }
    this.addLine(82, 90, this.line_top_minus_1, 'sector');
    this.addLine(91, 99, this.line_top, 'sector');

    this.addLine(-4, -4, this.line_bramka_bottom, 'gate');
    this.addLine(104, 104, this.line_bramka_top, 'gate');

    this.refreshBall();
  }

  private addLine(start, stop, moves, type) {
    let m = 0;
    for (let i = start; i <= stop; i++) {
      this.field.push({
        type: type,
        index: i,
        moves: moves[m],
        ball: false,
      });
      m++;
    }
  }

  refreshBall() {
    let current = null;
    this.field.forEach(sector => {
      if (sector.ball) {
        current = sector;
      }
    });

    let render = null;
    this.field.forEach(sector => {
      if (sector.index === this.ball) {
        render = sector;
      }
    });

    if (current && current.index && current.index !== this.ball && render) {
      current.ball = false;
      render.ball = true;
    } else if (!current && render) {
      render.ball = true;
    }
  }

  click(data) {
    this.clicked = data;
    console.log('dalej klikasz');

  }
}
