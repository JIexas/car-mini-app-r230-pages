/*-----------------------------------------------------------------------------
This page was generated on Nov-3-2003 10:00:00
Created by RLE International GmbH
Copyright 2003 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

// ==========================================================================
// content.html initialisieren
// ==========================================================================
function initContent() {
	//alert(typeof top.diagCallerInfo);
	//alert(top.diagCallerInfo);
	// Ggf. Suchbegriffe eintragen:
	if ( top.diagCallerType == top.CALLER_SEARCH && typeof top.diagCallerInfo == "string" ) {
		document.forms[0].search.value = top.diagCallerInfo;
		document.forms[0].search.focus();
	} else if ( top.diagCallerType == top.CALLER_A6 && typeof top.diagCallerInfo == "string" ) {
		document.forms[1].search.value = top.diagCallerInfo
		document.forms[1].search.focus();
	}
	// Daten fuer den Ruecksprung vom Schaltplan zuruecksetzen:
	top.diagCallerType = top.CALLER_ZERO;
	top.diagCallerInfo = "";
	// Back-Button ausschalten:
	if ( parent && parent.dwfheader && parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "hidden";
	// backHistorA zuruecksetzen:
	if ( top.backHistoryA )
		top.backHistoryA.length = 0;
}
// ==========================================================================
// Search Link realisieren:
// ==========================================================================
function goQuickSearch() {
	// Daten fuer den Ruecksprung vom Schaltplan speichern:
	top.diagCallerType = top.CALLER_SEARCH;
	top.diagCallerInfo = document.forms[0].search.value;
	// Back-Button einschalten:
	if ( parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "visible";
	// HistoryArray fuer den Back-Button fuellen:
	top.backHistoryA[top.backHistoryA.length] = location.href;
	// Search-Seite anzeigen:
	location.href="./web1100/dynamicsearch.html";
	return false;
}
// ==========================================================================
// Advanced Search Link realisieren:
// ==========================================================================
function goAdvancedSearch_can_be_deleted() {
	// Daten fuer den Ruecksprung vom Schaltplan speichern, diagCallerInfo
	// wird spaeter gespeichert:
	top.diagCallerType = top.CALLER_ADV;
	top.diagCallerInfo = "";
	// Back-Button einschalten:
	if ( parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "visible";
	// HistoryArray fuer den Back-Button fuellen:
	top.backHistoryA[top.backHistoryA.length] = location.href;
	// Advanced Search-Seite anzeigen:
	location.href="./web1100/advanced.html";
	return false;
}
// ==========================================================================
// ComponentList Link realisieren:
// ==========================================================================
function goComponentList() {
	// Back-Button einschalten:
	if ( parent && parent.dwfheader && parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "visible";
	// HistoryArray fuer den Back-Button fuellen:
	if ( top.backHistoryA )
		top.backHistoryA[top.backHistoryA.length] = location.href;
	// Advanced Search-Seite anzeigen:
	location.href="./a6/componentlist1.html";
	return false;
}
// ==========================================================================
// A6 Link realisieren:
// ==========================================================================
function goA6() {
	// Daten fuer den Ruecksprung vom Schaltplan speichern:
	top.diagCallerType = top.CALLER_A6;
	top.diagCallerInfo = document.forms[1].search.value;
	// Back-Button einschalten:
	if ( parent && parent.dwfheader && parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "visible";
	// HistoryArray fuer den Back-Button fuellen:
	if ( top.backHistoryA )
		top.backHistoryA[top.backHistoryA.length] = location.href;
	// Wenn keine Eingabe gemacht wurde, wird die Buchstabenauswahlseite
	// angezeigt, ansonsten direkt die Seite des Anfangsbuchstabens:
	var request = "./a6/";
	var partHash = "";
	var firstLetter = "";
	var secondLetter = "";
	if ( top.diagCallerInfo != "" ) {
		partHash = "#" + top.diagCallerInfo;
		firstLetter = top.diagCallerInfo.substr(0,1).toLowerCase();
		secondLetter = top.diagCallerInfo.substr(1,1);
	}	
	var re1 = new RegExp("[0-9]");
	var re2 = new RegExp("[a-zA-Z]");
	
	if ( firstLetter == "" ) {	
		request += "letterselect.html";
	}
	else {
		request += "a6search.html";
	}
	
	location.href = request;
	return false;
}
// ==========================================================================
// 1100'er Link realisieren:
// ==========================================================================
function go1100(curr1100) {
	// Statuszeile zuruecksezten:
	window.status = "";
	// Daten fuer den Ruecksprung vom Schaltplan speichern:
	top.diagCallerType = top.CALLER_1100;
	top.diagCallerInfo = curr1100;
	// Back-Button einschalten:
	if ( parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "visible";
	// HistoryArray fuer den Back-Button fuellen:
	top.backHistoryA[top.backHistoryA.length] = location.href;
	// Gewaehlte 1100'er Seite anzeigen:
	location.href = "./web1100/" + curr1100;
}

// ============================================================================
// Leertext in der Statuszeile anzeigen:
// ============================================================================
function noStatus() {
	window.status = "";
	return true;
}
