import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  field;
  constructor() {
//    var gra = new game(new board(), new bot());
//
//    gra.plansza.addline(1,9,line_bottom); /// zaczynamy od dołu
//    gra.plansza.addline(10,18,line_bottom_plus_1);
//    for (var i=9; i<=63; i+=9) {
//        gra.plansza.addline((10+i),(18+i),line);
//    }
//    gra.plansza.addline(82,90,line_top_minus_1);
//    gra.plansza.addline(91,99,line_top);
//    gra.plansza.addline(-4,-4,line_bramka_bottom);
//    gra.plansza.addline(104,104,line_bramka_top);
//    gra.plansza.render($('boisko'));
//    gra.next_move();

  }

  ngOnInit() {

  }
}
