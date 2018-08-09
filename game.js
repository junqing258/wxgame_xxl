import "./weapp-adapter.js";
import "./libs/laya.core.js";
import "./libs/laya.wxmini.js";
import "./libs/laya.webgl.js";
import "./libs/laya.ani.js";
import "./libs/laya.filter.js";
import "./libs/laya.ui.js";

import Parser from "./libs/dom_parser";
import Main from './js/Main.js';

window.Parser = Parser;

new Main();