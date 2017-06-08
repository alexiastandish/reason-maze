// Generated by BUCKLESCRIPT VERSION 1.7.4, PLEASE EDIT WITH CARE
'use strict';

var Show            = require("./show.js");
var Curry           = require("bs-platform/lib/js/curry.js");
var Canvas          = require("./FFI/canvas.js");
var Random          = require("bs-platform/lib/js/random.js");
var Presenter       = require("./presenter.js");
var PaintingManager = require("./paintingManager.js");

function iof(prim) {
  return prim | 0;
}

function F(Board) {
  return function (Gen) {
    var Man = PaintingManager.F(Board)(Gen);
    var Presenter$1 = Presenter.F(Board)(Gen);
    var Show$prime = Show.F(Board)(Gen);
    var show_paint = function (ctx, param, _) {
      ctx.lineWidth = 1.0;
      ctx.lineCap = "round";
      ctx.clearRect(0.0, 0.0, param[0], param[1]);
      return /* () */0;
    };
    var listen_to_canvas = (function(canvas, fn) {
    canvas.addEventListener('mousemove', evt => {
      if (evt.button === 0 && evt.buttons === 1) {
        fn([evt.clientX, evt.clientY])
      }
    })
  });
    var make_button = (function(text, fn) {
    var button = document.createElement('button')
    button.textContent = text;
    document.body.appendChild(button)
    button.addEventListener('click', fn)
  });
    var paint = function (options) {
      Random.self_init(/* () */0);
      var match = options[/* canvas_size */0];
      var height = match[1];
      var width = match[0];
      var min_margin = options[/* min_margin */1];
      var canvas = Curry._2(Canvas.createOnBody, width | 0, height | 0);
      var ctx = canvas.getContext("2d");
      var with_margins_000 = width - min_margin;
      var with_margins_001 = height - min_margin;
      var with_margins = /* tuple */[
        with_margins_000,
        with_margins_001
      ];
      var paint_state = Curry._2(Man[/* paint_init */13], with_margins, options[/* size_hint */2]);
      show_paint(ctx, options[/* canvas_size */0], paint_state);
      var match$1 = paint_state[/* outsize */2];
      var xm = (width - match$1[0]) / 2.0;
      var ym = (height - match$1[1]) / 2.0;
      var pstate = [paint_state];
      Curry._2(listen_to_canvas, canvas, function (param) {
            pstate[0] = Curry._2(Man[/* toggle_point */15], pstate[0], /* tuple */[
                  param[0] - xm,
                  param[1] - ym
                ]);
            return show_paint(ctx, options[/* canvas_size */0], pstate[0]);
          });
      return Curry._2(make_button, "Go", function () {
                  var state = Curry._1(Man[/* realize_state */16], pstate[0]);
                  return Curry._4(Show$prime[/* animate */5], ctx, 5, options, state);
                });
    };
    return /* module */[
            /* Man */Man,
            /* Presenter */Presenter$1,
            /* Show' */Show$prime,
            /* show_paint */show_paint,
            /* listen_to_canvas */listen_to_canvas,
            /* make_button */make_button,
            /* paint */paint
          ];
  };
}

exports.iof = iof;
exports.F   = F;
/* Show Not a pure module */