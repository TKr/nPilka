/* Inicjowanie planszy */


/// Klocek który nie może przyjąć żadnego ruchu
var SQ_EMPTY = [];

/// Ruchy dozwolene dla zwykłego klocka w środku planszy
var SQ_BASIC = [1, 8, 9, 10, -1, -8, -9 ,-10];

/// Ruchy dla klocków z którego można się ruszać w narożniku boiska
var SQ_BASIC_LT = [ 9, 10, 1, -8, -9, -10, -1];
var SQ_BASIC_RT = [ 1, -8, -9, -10, -1, 8, 9 ];
var SQ_BASIC_LD = [ -1, 8 ,9 ,10, 1 ,-8, -9 ];
var SQ_BASIC_RD = [ -9, -10, -1, 8, 9 ,10, 1 ];

/// Klocek który nie może przyjąć żadnego ruchu
var SQ_EMPTY = [];

/// Ruchy dla klocka z lewej strony boiska
var SQ_LEFT = [ 1, 10, -8 ];
/// Ruchy dla klocka z prawej strony boiska
var SQ_RIGHT = [ 8, -1, -10 ];

/// Ruchy dla klocka u góry planszy - nie w narożniku
var SQ_TOP = [-8, -9, -10];
/// a to dla naroznika górnej lewej bramki
var SQ_TOP_L = [1, 10, -8, -9, -10]
/// a to dla naroznika górnej prawej bramki
var SQ_TOP_R = [8, -1, -8, -9, -10]

/// Ruchy dla klocka u dołu planszy - nie w narożniku
var SQ_BOTTOM = [ 8, 9, 10];
/// a to dla naroznika dolnej lewej bramki
var SQ_BOTTOM_L = [ 1, 8 ,9 ,10, -8];
/// a to dla naroznika dolnej prawej bramki
var SQ_BOTTOM_R = [ 8, 9, 10, -1, -10 ];

/// bramka top
var SQ_BRAMKA_TOP = [ -8, -9, -10];
/// bramka bottom
var SQ_BRAMKA_BOTTOM = [ 8, 9, 10 ];

var line_top = [ SQ_EMPTY, SQ_TOP, SQ_TOP, SQ_TOP_L, SQ_BASIC, SQ_TOP_R, SQ_TOP, SQ_TOP, SQ_EMPTY ];
var line_top_minus_1 = [ SQ_LEFT, SQ_BASIC_LT, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC_RT, SQ_RIGHT ];
var line = [SQ_LEFT, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_RIGHT ];
var line_bottom_plus_1 = [ SQ_LEFT, SQ_BASIC_LD, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC, SQ_BASIC_RD, SQ_RIGHT];
var line_bottom = [ SQ_EMPTY, SQ_BOTTOM, SQ_BOTTOM, SQ_BOTTOM_L, SQ_BASIC, SQ_BOTTOM_R, SQ_BOTTOM, SQ_BOTTOM, SQ_EMPTY ];
var line_bramka_top = [SQ_BRAMKA_TOP];
var line_bramka_bottom = [SQ_BRAMKA_BOTTOM];

function new_child(element, childtag){
    var child = document.createElement(childtag);
    element.appendChild(child);
    return child;
}

board = function() {
    this.poz = {};
    this.ball = 50; /// gdzie jest piłka ? aktualnie centrum boiska
    this.color = 'red'; /// other player option is blue
}

kwadrat = function() {
    this.c = new Array();
}

kwadrat.prototype = {
    v: {},
}

board.prototype = {
    /* todo */
    addline: function(start,endd,argm) {
        var m = 0;
        for (var i=start; i<=endd; i++) {
            this.poz[i] = new kwadrat;
            this.poz[i].v=argm[m]
            m++;
        }
    },

    render_ball: function() {
        /// first remove ball element from dom
        if ($('pilka')) $('pilka').parentNode.removeChild($('pilka'));
        /// then find current position, and add new ball element
        var bp = (this.ball > 0) ? this.ball : 'm'+Math.abs(this.ball);
        if ($('boxcnt'+bp)) {
            var b = new_child($('boxcnt'+bp),'div');
            b.setAttribute('id','pilka');
        }
    },


    render: function(kontener) {
        /* kontener - DOM element, mający zawierać planszę */
        var insert = '';
        var current = 0;
        for (var y=545; y>=95; y=y-45){
            for (var x=0; x<=360; x=x+45){
                current++;
                px = x - 2;
                py = y - 2;
                var addd = '';
                insert += '<div class="box" style="top: '+py+'px; left: '+px+'px;"><div id="boxcnt'+current+'" class="boxp"><div class="box-click" onclick="clicktevent('+current+')"></div>'+addd+'</div></div>';
            }
        }
        insert += '<div class="box" style="top: 48px; left: 178px;"><div id="boxcnt'+104+'" class="boxp"><div class="box-click" onclick="clicktevent(104)"></div>'+addd+'</div></div>';
        insert += '<div class="box" style="top: 588px; left: 178px;"><div id="boxcntm'+4+'" class="boxp"><div class="box-click" onclick="clicktevent(-4)"></div>'+addd+'</div></div>';
        kontener.innerHTML = insert;
        this.render_ball();
    },

    isvalid: function(target) {
        if (this.parent.winner != 0) return false;
        if ((target == -40) || (target == 1040)) {
            /// czy strzał na bramkę jest możliwy ?


        } else {
            var diff = target - this.ball;
            if (this.poz[this.ball].v.indexOf(diff) != -1) {
                if (this.poz[this.ball].c.length > 0) {
                    if (this.poz[this.ball].c.indexOf(diff) == -1) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
            return false;
        }
    },

    listvalidmoves: function() {
        var lista = new Array();
        for (var x in this.poz[this.ball].v) {
            if (this.poz[this.ball].c.indexOf(this.poz[this.ball].v[x]) == -1) {
                lista.push(this.poz[this.ball].v[x]);
            }
        }
        return lista;

    },

    render_line: function(main,dir) {
        main = (main > 0) ? main : 'm'+Math.abs(main);
        if ($('boxcnt'+main)) {
            var line = new_child($('boxcnt'+main),'div');
            var pm = (dir > 0) ? 'p' : 'm';
            line.className = this.color+pm+Math.abs(dir);
            return true;
        } else {
            return false;
        }
    },

    move: function(target) {
        if (this.parent.winner != 0) return false;
        var diff_start = target - this.ball;
        var diff_target = this.ball - target;

        var check = new Array(2,3,4,5,6,7,8,92,93,94,95,96,97,98); /// ściany i inne pola od którym można się odbić
        if ((this.poz[target].c.length > 0) || (target % 9 == 0) || ((target+8) % 9 == 0) || (check.indexOf(target) != -1)) {
            var move_again = true;
        } else {
            var move_again = false;
        }

        this.render_line(target,diff_target);

        this.poz[this.ball].c.push(diff_start);
        this.poz[target].c.push(diff_target);
        this.ball = target;
        if (this.ball == -4) this.parent.winner = 1;
        if (this.ball == 104) this.parent.winner = 2;
        this.render_ball();
        if (!move_again) this.color = (this.color == 'red') ? 'blue' : 'red'; ///change color for next player
        return move_again;
    }

}

function clicktevent(m) {
    if (((gra.plansza.color == 'red') && ( gra.player_red == 'human')) || ((gra.plansza.color == 'blue') && ( gra.player_blue == 'human'))) {
        var b = gra.plansza.isvalid(m);
        ///alert(gra.plansza.listvalidmoves());
        if (b) {
            var a = gra.plansza.move(m);
            gra.next_move();
        }
    }
}

game = function (p,b) { /// constructor. p = new plansza() , b = new bot()
    this.plansza = p;
    this.plansza.parent = this;

    this.bot = b;
    this.bot.parent = this;
    this.moves = 0;

//    this.player_red = 'computer'; /// posible values are human, or computer
//    this.player_blue = 'computer';
    this.player_red = 'human'; /// posible values are human, or computer
    this.player_blue = 'human';


    this.bot_level = 1; /// 1 - easy; 2 - medium; 3 - hard; 4 - hell
    this.winner = 0; /// 0 - normal play, 1 - wineer red, 2 - winner blue;
    ///this.bot = {}; /// bot object;
}

game.prototype = {


    _computermove: function() {
        this.plansza.move(this.bot.find_move());
        this.next_move();
    },


    next_move: function () {
        this.moves++;
        if (this.moves > 3) {
//            return false;
        }
        if (this.winner != 0) return false;

        var vm = this.plansza.listvalidmoves();
        if (vm.length <= 0) {
             alert('stop '+this.plansza.color);
             return false;
         }

        switch(this.plansza.color) {
            case 'red':
                if (this.player_red == 'computer') {
                    /// call bot library to find new move
                    var tthis = this;
                    window.setTimeout( function() { tthis._computermove(); },10);
                } else {
                    /// human player i moving so we wait
                }
                break;
            case 'blue':
            default:
                if (this.player_blue == 'computer') {
                    /// call bot library to find new move
                    var tthis = this;

                    window.setTimeout( function () { tthis._computermove(); } ,10);

                } else {
                    /// human player i moving so we wait
                }
                break;
        }
    }
}



