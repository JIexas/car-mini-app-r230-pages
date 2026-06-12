/*-----------------------------------------------------------------------------
This page was generated on October-15-2003 10:00:00
Created by RLE International GmbH
Copyright 2003 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/


// ============================================================================
// Funktion fuer das automatische Anzeigen der richtigen Seite beim Rueck-
// sprung aus dem Schaltplan
// ============================================================================
function loadDwfContent() {
	if ( !top.modelCookie ) 
		parent.location.href = 'start.html';
	var diagCallerType = top.diagCallerType;
	var diagCallerInfo = top.diagCallerInfo;
	parent.dwfcontent.location.href = "content.html";
	sel="";
	return;	
}

function loadDwfContent_can_be_deleted() {
	if (! top.modelCookie ) parent.location.href = 'start.html';
	var diagCallerType = top.diagCallerType;
	var diagCallerInfo = top.diagCallerInfo;
	//alert("diagCallerType: " + diagCallerType);
	if ( diagCallerType == top.CALLER_ZERO ) {
		// Anzeige ohne vorherige Auswahl:
		parent.dwfcontent.location.href = "content.html";
	} else if ( diagCallerType == top.CALLER_1100 ) {
		// Anzeige nach Auswahl eines Schaltplans aus 1100er Dokument:
		if ( diagCallerInfo != "" ) {
			var diagTerm = '';
			if (top.startDatCookie) {
				var regex3 = /^w(.*)\.html$/;
				regex3.test(top.startDatCookie);
				diagTerm = RegExp.$1;
				diagTerm = diagTerm.toUpperCase();
			}
			var request = './web1100/' + diagCallerInfo + '#'+diagTerm;
			parent.dwfcontent.location.href = request;
		}
	} else if ( diagCallerType == top.CALLER_A6 ) {
		// Anzeige des A6-Dokumentes:
		var request = './a6/';

		var partHash = "";
		var firstLetter = "";
		if ( diagCallerInfo != "" ) {
			partHash = "#" + diagCallerInfo;
			firstLetter = diagCallerInfo.substr(0,1).toLowerCase();
		}	
		if ( firstLetter == "" || firstLetter == "d" || firstLetter == "i" || firstLetter == "j" || firstLetter == "p" || firstLetter == "q" ) 
			request += "letterselect.html";
		else
			request += "a6_" + firstLetter + ".html" + partHash;

		parent.dwfcontent.location.href = request;

	} else if ( diagCallerType == top.CALLER_SEARCH ) {
		// Anzeige des Such-Dokumentes mit Treffern:
			parent.dwfcontent.location.href = './web1100/dynamicsearch.html';
	} else if ( diagCallerType == top.CALLER_ADV ) {
		if ( diagCallerInfo ) {
			parent.dwfcontent.location.href = './web1100/dynamicadv.html';
		}
	}
	
	sel="";
	return;
}
// ============================================================================
// Funktion fuer den Backbutton im Header
// ============================================================================
function goBack() {
	var request = top.backHistoryA[top.backHistoryA.length-1];
	parent.dwfcontent.location.href = request;
	top.backHistoryA.length = top.backHistoryA.length-1;
	return false;
}
// ============================================================================
// Funktion fuer das Zuruecksetzen aller Buttons
// ============================================================================
function resetButt()
{
	parent.dwfheader.document.diagno1.src="../images/diagno_n.gif";
	parent.dwfheader.document.diagram1.src="../images/diagramm_n.gif";
	parent.dwfheader.document.legend1.src="../images/legend_n.gif";
	parent.dwfheader.document.connector1.src="../images/connector_n.gif";
	parent.dwfheader.document.locator1.src="../images/locator_n.gif";
	return;
}
// ============================================================================
// Funktion fuer das Oeffnen der Kontaktseite
// ============================================================================
function openContactWindow() {
	window.focus();
	var winLoc = '../common/contact.html';
	var winConf = 'status=no,toolbar=no,locationbar=no,scrollbars=yes,';
	winConf += 'width=535,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	return false;
}
// ============================================================================
// Funktion fuer das Oeffnen der Sitemap
// ============================================================================
function openSitemapWindow() {
	window.focus();
	var winLoc = '../common/sitemap.html';
	var winConf = 'status=no,toolbar=no,locationbar=no,scrollbars=yes,';
	winConf += 'width=535,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	return false;
}
// ============================================================================
// Funktion fuer das Oeffnen der Hilfsseite
// ============================================================================
function openHelpWindow() {
	window.focus();
	var winLoc = '../common/help.html';
	var winConf = 'status=no,toolbar=no,locationbar=no,scrollbars=yes,';
	winConf += 'width=535,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	return false;
}
// ============================================================================
// Funktion fuer das Oeffnen eines Schaltplanes von der Sitemap aus
// ============================================================================
function showDiagramFromSitemap(diagramString) {
	// Daten fuer den Ruecksprung vom Schaltplan zuruecksetzen:
	top.diagCallerType = top.CALLER_ZERO;
	top.diagCallerInfo = "";
	var myDiagramString = diagramString + ".html";
	myDiagramString = myDiagramString.toLowerCase();
	top.startDatCookie = "w" + myDiagramString;
	top.aktDatCookie = myDiagramString;
	top.allowMessage = true;
	var request = "../" + top.modelCookie + "/d1index.html";
	// Rahmen
	var width = screen.availWidth - 10;
	//var height = screen.availHeight - 58;
	var height = screen.availHeight - 31;
	var winConf = 'resizable=yes,titlebar=no,status=no,width='+width+',height='+height+',top=0,left=0';
	//var winConf = "titlebar=no,status=no,fullscreen=yes";
	webEtmWin=window.open(request,'web_etm',winConf);
	webEtmWin.focus();
	return;	
}
