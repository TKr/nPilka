/* Sztuczna "Inteligencja" */


pnode = function(p,id) {
//  this.parent = p; /// pointer to parent
    this.id = id; /// numer id na planszy
    this.value = 0; /// tu będzie wpisana wartość z dolnych gałęzi (chyba że alfa-beta przerwie liczenie)
    this.mode_type = 0; /// 0 = my gramy, 1 = gra przeciwnik
}



bot = function(color) {
    this.name = 'Johny'; /// co to za inteligencja, co nie ma imienia ? szkoda że padło na "głupiego jasia" :p :P
    this.parent = {};
    this.move_priorytet = [9,8,10,1,-1,-10,-8,-9]; /// fix: priorytety ruchu, z cyklu "cały czas do przodu"

    this.weight = [ /// fixit
    [0,0,0,0,5,0,0,0,0], /// bramka
    [0,1,2,3,4,3,2,1,0],
    [1,0,1,2,3,2,1,0,1],
    [0,0,0,1,2,1,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0], ///środek boiska

    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,1,2,1,0,0,0],
    [1,0,1,2,3,2,1,0,1],
    [0,1,2,3,4,3,2,1,0],
    [0,0,0,0,5,0,0,0,0] /// bramka
    ];

    this.depth = 1;
}


bot.prototype = {

    sortfx: function (a,b) {
        var a = this.move_priorytet.indexOf(a);
        var b = this.move_priorytet.indexOf(b);
        if (this.parent.plansza.color == 'blue') {
            return b-a;
        } else {
            return a-b;
        }
    },

    find_move: function () {
        var poz_pilki = this.parent.plansza.ball;
        var valid_moves = this.parent.plansza.poz[poz_pilki].v.slice(0);
        var zajete = this.parent.plansza.poz[poz_pilki].c.slice(0);
        if (zajete.length > 0) {
            //alert(zajete);
            for (var x=0; x < zajete.length; x++) {
                var m = valid_moves.indexOf(zajete[x]);
                if (m != -1) {
                    valid_moves.splice(m,1);
                }
            }
        }

        var lets_move = 0;
        var priorytet = 0;

        if (valid_moves.length <= 0) return poz_pilki;


        for (var x= 0; x < valid_moves.length; x++) {
            if (this.move_priorytet.indexOf(valid_moves[x]) != -1) {
                var p = this.move_priorytet.indexOf(valid_moves[x]);

                if (this.parent.plansza.color == 'blue') p = 8 - p;

                if (p > priorytet) {
                    priorytet = p;
                    lets_move = valid_moves[x];
                }
            }
        }


        var ret =  (poz_pilki + lets_move);
        return ret;

    },

    addchilds: function(node) {
        var id = node.id;
        if (!this.parent.plansza.poz[id]) {
            node.child = new Array();
            return node;
        }
        var valid_moves = this.parent.plansza.poz[id].v.slice(0);
        var zajete = this.parent.plansza.poz[id].c.slice(0);
        if (zajete.length > 0) {
            for (var x=0; x < zajete.length; x++) {
                var m = valid_moves.indexOf(zajete[x]);
                if (m != -1) {
                    valid_moves.splice(m,1);
                }
            }
        }

        if (valid_moves.length > 0) {
            /// a tu zrobimy sortowanie valid_move wg priorytetów.
            var _this = this;
            valid_moves.sort(function(a,b){return _this.sortfx(a,b)});

            node.child = new Array();
            for (var x=0; x < valid_moves.length; x++) {
                var place = id + valid_moves[x];
                node.child.push(new pnode(node,place));

                var check = new Array(2,3,4,5,6,7,8,92,93,94,95,96,97,98); /// ściany i inne pola od którym można się odbić
                if ( ((this.parent.plansza.poz[place]) && (this.parent.plansza.poz[place].c.length > 0)) || (place % 9 == 0) || ((place+8) % 9 == 0) || (check.indexOf(place) != -1)) {
                    node.child[x].mode_type = node.mode_type; /// jeszcze jeden ruch
                } else {
                    node.child[x].mode_type = (node.mode_type == 0) ? 1 : 0; /// zamiana ról
                }
            }
        }
        return node;
    },

    heurystyka: function(node) {
        console.log(1);
        console.log(node);
        var rez = Math.floor((Math.random()*100)+1);
        var a = Math.floor((Math.random()*100)+1);
        var c = 1;
        if (a > 50) c = -1;
        rez = rez * c;
        node.value = rez * c;
//        console.log('heur: ' + rez);
        return  rez;
    },

    alfabeta: function(node, depth, alfa, beta) {  // alfa-beta minmax implementation.
        if (depth == 0) {
            node.value = this.heurystyka(node);
            return node.value;
        }

        /// w tym utwórz potomków węzła, i posortuj wg. wagi ruchów (do przodu)
        this.addchilds(node);

        if (!node.child) {
            node.value = this.heurystyka(node);
            return node.value;
        }

        if (node.mode_type == 0) { //// jeżeli to jest nasz ruch (MAX)
            for (var x=0; x < node.child.length; x++) {
                alfa = Math.max(alfa,this.alfabeta(node.child[x], (depth - 1), alfa, beta) );
                if (alfa >= beta) {
                    node.value = beta;
                    return beta;
                }
            }
            node.value = alfa;
            return alfa;
        }
        else { /// jeżeli to jest ruch przeciwnika (MIN)
            for (var x=0; x < node.child.length; x++) {
                beta = Math.min(beta, this.alfabeta(node.child[x],(depth - 1), alfa, beta) );
                if (alfa >= beta) {
                    node.value = alfa;
                    return alfa;
                }
            }
            node.value = beta;
            return beta;
        }
    },

    find_move2: function() { // with minmax
        var node = new pnode(0,this.parent.plansza.ball);
        var a = this.alfabeta(node,1,-1000,1000);
//        console.log('alfabeta :' + a);
        //alert(JSON.stringify(node));
        var ruch = this.parent.plansza.ball; /// this.find_move();
        if (!node.child) return ruch;
        for (var x = 0; x < node.child.length; x++) {
            if (node.child[x].value == a) {
//                console.log(x);
                ruch = node.child[x].id;
            }
        }

        return ruch;

    }


}
