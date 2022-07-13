/* * ** *** ***** ******** ************* *********************
Product:	Web help plug-in for DITA OT
Module:		shell.js
Func:		Main JS file of a web help
* * ** *** ***** ******** ************* *********************/

function getPageTocAreaDiv() {
	return document.getElementById("tocdiv");
}

var GLOBAL_App = null;

function initWebhelp() {
	
	GLOBAL_App = new App();
	
	GLOBAL_App.start(); 
}


