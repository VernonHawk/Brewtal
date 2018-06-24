import $ from 'jquery';

import showPreloader from './preloader';
import adjustGlassSize from './adjustGlassSize';
import { initialize, updateTable } from './main';

import 'materialize-css/dist/css/materialize.min.css';
import '../css/style.css';
import '../css/table.css';

window.onload = showPreloader;

$(window).on('resize load', adjustGlassSize);

$(document).ready(initialize);

$(window).resize(updateTable);