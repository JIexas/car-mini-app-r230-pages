/*-----------------------------------------------------------------------------
This page was generated on Nov-3-2003 10:00:00
Created by RLE International GmbH
Copyright 2005 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/
var lastColoredId = "";
// ============================================================================
// Anzeige des ausgewaehlten Schaltplans
// ============================================================================
function showDiagram(diagramName, partName) {
	// Alle Links zuruecksetzen:
	var cObjStr = "";
	var cDiagObj;
	var count = 1;
	for ( var cObjId in document.all ) {
		if ( cObjId.substr(0,5) == "DIAG_" ) {
			cObjStr = "document.all." + cObjId;
			cDiagObj = eval(cObjStr);
			if ( cDiagObj ) {
				if ( cDiagObj.style ) 
					cDiagObj.style.removeAttribute("color");
			}
		}
	}
	// Link einfaerben:
	var cPartName = partName;
	cPartName = cPartName.toUpperCase();
	var cRegExp = new RegExp("[^0-9a-zA-Z]", "g")
	cPartName = cPartName.replace(cRegExp,"_");
	cObjStr = "document.all.DIAG_"+diagramName + "_" + cPartName;
	cDiagObj = eval(cObjStr);
	if ( cDiagObj ) {
		if ( cDiagObj.style )
			cDiagObj.style.color = "#fe9900";
	}

	top.diagCallerType = top.CALLER_A6;
	
	var diagramName = diagramName.toLowerCase();
	top.startDatCookie = "w" + diagramName + ".html?" + partName;
	top.aktDatCookie = diagramName + ".html";
	top.allowMessage = true;
	var request = "../d1index.html";
	// Rahmen
	var width = screen.availWidth - 10;
	var height = screen.availHeight - 31;
	winConf = 'resizable=yes,titlebar=no,status=no,width='+width+',height='+height+',top=0,left=0';
	
	//return;
	
	webEtmWin=window.open(request,'web_etm',winConf);
	webEtmWin.focus();
	return false;
}
// ============================================================================
// Anzeige des ausgewaehlten Schaltplans (aufgerufen von ComponentList).
// Der Funktionsname ist so kurz, damit die Datei der ComponentList möglischst
// klein bleibt.
// ============================================================================
function sD(diagramName, partName) {
	// Alle Links zuruecksetzen:
	var cObjStr = "";
	var cDiagObj;

	if ( lastColoredId != "" ) {
		cObjStr = "document.all." + lastColoredId;
		cDiagObj = eval(cObjStr);
		if ( cDiagObj && cDiagObj.style ) 
			cDiagObj.style.removeAttribute("color");
		lastColoredId = "";
	}
	
	// Link einfaerben:
	var cPartName = partName;
	cPartName = cPartName.toUpperCase();
	var cRegExp = new RegExp("[^0-9a-zA-Z]", "g")
	cPartName = cPartName.replace(cRegExp,"_");
	currId = "_"+diagramName + "_" + cPartName;
	cObjStr = "document.all." + currId;
	//alert(cObjStr);
	cDiagObj = eval(cObjStr);
	if ( cDiagObj ) {
		//alert("ok");
		if ( cDiagObj.style ) {
			cDiagObj.style.color = "#fe9900";
			lastColoredId = currId;
		}
	}

	var diagramName = diagramName.toLowerCase();
	top.startDatCookie = "w" + diagramName + ".html?" + partName;
	top.aktDatCookie = diagramName + ".html";
	top.allowMessage = true;
	var request = "../d1index.html";
	// Rahmen
	var width = screen.availWidth - 10;
	var height = screen.availHeight - 31;
	winConf = 'resizable=yes,titlebar=no,status=no,width='+width+',height='+height+',top=0,left=0';
	
	//return;
	
	webEtmWin=window.open(request,'web_etm',winConf);
	webEtmWin.focus();
	return false;
}
// ============================================================================
// Initialisierung der Letterselect-Seite
// ============================================================================
function initLetterSelect() {
	// Back-Button einschalten:
	if ( parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility = "visible";
	// Bei Ruecksprung zur Letterselect-Seite SelectBox vorbelegen mit Wert:
	if ( top.diagCallerInfo != "" && top.diagCallerInfo.length > 1 ) {
		setSelectBox();
	}
	// diagCallerInfo zuruecksetzen:
	top.diagCallerInfo = "";
}
// ============================================================================
// Anzeige der Seite des ausgewaehlten Buchstabens
// ============================================================================
function selectLetter(letter) {
	window.status = "";
	// HistoryArray fuer den Back-Button fuellen:
	top.backHistoryA[top.backHistoryA.length] = location.href;
	// Seite des Buchstabens anzeigen:
	top.diagCallerInfo = letter.toUpperCase();
	location.href = "a6search.html";
	return false;
}
// ============================================================================
// Anzeige der Seite des ausgewaehlten Bauteils
// ============================================================================
function selectPart(partName) {
	window.status = "";
	// HistoryArray fuer den Back-Button fuellen:
	top.backHistoryA[top.backHistoryA.length] = location.href;
	// Seite des Buchstabens anzeigen:
	top.diagCallerInfo = partName;
	location.href = "a6search.html";
	return false;
}
// ============================================================================
// Leertext in der Statuszeile anzeigen:
// ============================================================================
function noStatus() {
	window.status = "";
	return true;
}
// ============================================================================
// Textsuche starten:
// ============================================================================
function initDesignationSearch(SearchPartId, IsWithSubComponents) {
	top.diagCallerInfo = SearchPartId;
	var isWithSubComponents = IsWithSubComponents;
	var searchDiagId = top.a6SearchDiagId;
	var noOfDiags = 0;
	var noOfHits = 0;
	
	// Fall behandeln, dass dem Bauteil nur ein Schaltplan zugewiesen ist
	if ( !isWithSubComponents ) {
		//alert("not isWithSubComps");
		
		var searchDiagIdA = getDiagramIdA(SearchPartId);
		if ( searchDiagIdA.length == 1 ) {
			isWithSubComponents = true;
			searchDiagId = searchDiagIdA[0];
		}
		// Falls keine Unterbaugruppen gesucht werden, bestimmt die Anzahl 
		// der Schaltpläne die Trefferanzahl
		noOfDiags = searchDiagIdA.length;
	}
	
	var hitRows = "";
	var partIdHitsA = getPartIdHitsA(SearchPartId, searchDiagId, isWithSubComponents);
	var partIdHitsALen = partIdHitsA.length;
	for ( var i=0; i<partIdHitsALen; i++ ) {
		currPartId = partIdHitsA[i];
		//alert(currPartId);
		hitRows += getHitRowString(currPartId, searchDiagId, partIdHitsALen, isWithSubComponents);
		//hitRows += "\n";
		//alert(hitRows);
	} 
	
	// Falls Unterbaugruppen gesucht werden, bestimmt die Anzahl der gefundenen 
	// Bauteile die Trefferanzahl
	noOfHits = noOfDiags;
	if ( isWithSubComponents || ( noOfDiags == 0 && partIdHitsALen > 0 ) )
		noOfHits = partIdHitsALen;

	writeHitRowLines(SearchPartId, noOfDiags, noOfHits, hitRows);
	
	return;
}
// ============================================================================
// HTML-Zeilen mit Treffern erstellen und als String zurückliefern
// ============================================================================
function getHitRowString(PartId, SearchDiagId, PartIdHitsALength, IsWithSubComponents) {
	if ( !a6A[PartId] ) return "";
	//alert(PartId + " " + SearchDiagId + " " + PartIdHitsALength);
	var hitRows = "";
	var partId = PartId;
	var designation = a6A[partId].designation;
	var diagramIdA = a6A[partId].diagramIdA;
	var diagramIdALen = diagramIdA.length;

	for (var i=0; i<diagramIdALen; i++) {	
		var diagramId = diagramIdA[i];
		// diagramTitle aus der search.js und dem Array groupA ermitteln
		var diagDescription = "";
		var diagAnnotations = "";
		var groupId = getGroupId(diagramId);
		var diagKey = "PE"+diagramId;
		if ( groupA && groupA[groupId] && groupA[groupId].diagramA && groupA[groupId].diagramA[diagKey] ) {
			diagDescription = groupA[groupId].diagramA[diagKey].description;
			diagAnnotations = groupA[groupId].diagramA[diagKey].annotations;
		}
		
		var convDiagId = getShortDiagId(diagramId);
		var convPartId = getConvertedPartId(partId);
		var idDiag = convDiagId + "_" + convPartId;
		
		// Bei SubComponent-Suche nur Bauteile zulassen, die die gleiche DiagId besitzen
		//alert(IsWithSubComponents + " " + diagramId + " * " + SearchDiagId);
		if ( IsWithSubComponents && diagramId != SearchDiagId ) {
			continue;
		}
					
		hitRows += '<tr><td height="3" colspan="4" bgcolor="#333333"></td></tr>';
		hitRows += '<tr valign="middle">';
		hitRows += '<td valign="top" align="left" rowspan="2"><a name="'+partId+'">'+partId+'</a>';
		
		// Falls noch keine SubComponents angezeigt werden, Link erstellen für SubComponents
		var noOfSubComps = getNoOfSubComponents(partId, diagramId);
		//alert(noOfSubComps);
		
		//if ( !IsWithSubComponents && PartIdHitsALength > 1 ) {
		// Link für SubComponents nur anzeigen, falls noch keine SubComponents
		// angezeigt werden und es SubComponents gibt
		// Ausserdem erfolgt keine Anzeige, falls nur nach einem Buchstaben
		// gesucht wird, z.B. "f" (top.diagCallerInfo.length == 1)
		if ( !IsWithSubComponents && diagramIdALen > 1 && noOfSubComps > 0 && top.diagCallerInfo.length > 1 ) {
			hitRows += '<br><img src="../../images/pfeil.gif" width="6" height="9" border="0" alt="">';
			//hitRows += '&nbsp;<a href="javascript:a6SearchSubComponents(\''+convDiagId+'\')">';
			hitRows += '&nbsp;<a href="javascript:a6SearchSubComponents(\''+diagramId+'\')">';
			//hitRows += '&nbsp;<a href="a6searchsubs.html?'+convDiagId+'" onClick="top.a6SearchDiagId=\''+;convDiagId+'\'>';
			hitRows += '<font size="-2">SubComp.</font></a>';
		}
					
		hitRows += '</td>';
		hitRows += '<td valign="top" align="left">'+designation;
		hitRows += '</td>';
		hitRows += '<td valign="top" align="left"><img src="../../images/pfeil.gif"';
		hitRows += ' width="6" height="9" border="0" alt="">&nbsp;&nbsp;';
		//html += '<a href="javascript:showDiagram(\''+convDiagId+'\',\''+partId+'\')"';
		//html += ' id="DIAG_'+idDiag+'">'+diagramId+'</a></td>';
	
		hitRows += '<a href="#" ';
		hitRows += ' onMouseover="return noStatus()"';
		hitRows += ' onMouseout="return noStatus()"';
		hitRows += ' onClick="return showDiagram(\''+convDiagId+'\',\''+partId+'\')"';
		hitRows += ' id="DIAG_'+idDiag+'">'+diagramId+'</a></td>';
	
		hitRows += '<td valign="top" align="left">'+diagDescription+'</td></tr>\n';
		
		// Zusaetzliche Zeile für die annotations
		hitRows += '<td>&nbsp;</td><td>&nbsp;</td>\n';
		hitRows += '<td>'+diagAnnotations+'</td></tr>\n';
		
	}
	
	return hitRows;	
}
// ============================================================================
// HTML-Zeilen mit Treffern ausgeben
// ============================================================================
function writeHitRowLines(ComponentName, NoOfDiags, NoOfHits, HitRowLines) {
	document.writeln('<tr><td colspan="4">');
	document.writeln('<table width="100%" border="0"><tr><td>');
	document.writeln('<font style="font-size:16px">');
	document.write('<b>Search for a Diagram by Components Name or Number: "'+ComponentName);
	document.writeln('"</b></font></td><td align="right">');
	document.writeln('<b>Hits: ' + NoOfHits + '</b></td></tr></table>');
	
	if ( NoOfDiags > 1 ) {
		document.writeln('<br />Hits for component "' + ComponentName);
		document.writeln('" occur in more than one diagram');
	}
	
	document.writeln('<hr /></td></tr>');

	// Html-Ausgabe:
	if ( NoOfHits > 0 ) {
		document.writeln('<tr valign="middle">');
		document.writeln('<td width="10%" valign="top" align="left"><b>Component</b></td>');
		document.writeln('<td width="38%" valign="top" align="left">&nbsp;</td>');
		document.writeln('<td width="22%" valign="top" align="left"><b>Diagram</b></td>');
		document.writeln('<td width="30%" valign="top" align="left">&nbsp;</td>');
		document.writeln('</tr>');

		document.writeln(HitRowLines);
	}
	else {
		document.writeln('<tr><td colspan="4" align="center">');
		document.writeln('<font style="font-size:16px">No Search Results</font>');
		document.writeln('</td></tr>');
	}
	return;		
}
// ============================================================================
// SelectBox in letterselect vorbelegen:
// ============================================================================
function setSelectBox() {
	var selBox = document.forms[0].s0;
	var setPart = top.diagCallerInfo;
	for ( var i=0;i<selBox.options.length;i++) {
		var currPart = selBox.options[i].text;
		if ( currPart == setPart ) 
			selBox.options[i].selected = true;
	}
	return;
}
// ============================================================================
// Suche nach Subcomponents
// ============================================================================
function a6SearchSubComponents(DiagId) {
	// HistoryArray fuer den Back-Button fuellen:
	if ( top.backHistoryA )
		top.backHistoryA[top.backHistoryA.length] = location.href;

	// Die gesuchte DiagId an die globale Variable a6SubCompDiagId übergeben
	top.a6SearchDiagId = DiagId;

	location.href = "a6searchsubs.html";
}

// löschen...
function a6SearchSubComponents_can_be_deleted() {
	document.writeln('<html><head><title>Search</title>');
	document.writeln('<style>td {font-size:13px;');
	document.writeln('font-family :Verdana,Arial,Helvetica,SansSerif;');
	document.writeln('color:#cccccc;}');
	document.writeln('a:link { color:#cccccc;}');
	document.writeln('a:visited { color:#cccccc;}');
	document.writeln('a:active { color:#cccccc;}');
	document.writeln('a:hover { color:#FE9900;}');
	document.writeln('</style>');
	document.writeln('<script src="a6.js"></script>');
	document.writeln('<script src=a6search.js></script>');
	document.writeln('</head>');
	document.writeln('<body bgcolor="#444444"><center>');
	document.writeln('<table cellspacing="0" cellpadding="4" width="860" border="0">');

	initDesignationSearch(top.diagCallerInfo, true);

	document.writeln('</table></center><p>&nbsp;<br>&nbsp;</p>');
	document.writeln('<p>&nbsp;<br>&nbsp;</p>');
	document.writeln('<p>&nbsp;<br>&nbsp;</p>');
	document.writeln('<p>&nbsp;<br>&nbsp;</p>');
	document.writeln('<p>&nbsp;<br>&nbsp;</p>');
	document.writeln('<p>&nbsp;<br>&nbsp;</p>');

	document.writeln('</body></html>');
}
// ============================================================================
// Ein Array für das Suchergebnis
// ============================================================================
function getPartIdHitsA(SearchPart, SearchDiagId, IsWithSubComps) {
	var currHitsA = new Array();

	// 1. Schritt: Suchtyp festlegen
	// Es kann nach dem ersten Buchstaben, der Bauteil-Benennung oder nach
	// der Bauteil-Kurzbezeichnung gesucht werden
	var firstLetter = "";
	var secondLetter = "";
	if ( SearchPart.length >= 1 )
		firstLetter = SearchPart.substr(0,1).toLowerCase();
	if ( SearchPart.length >= 2 )
		secondLetter = SearchPart.substr(1,1);

	var re1 = new RegExp("[0-9]");
	var re2 = new RegExp("[a-zA-Z]");

	var searchType = "FIRST_LETTER";
	// Wenn 1.Zeichen eine Ziffer oder 2.Zeichen ein Buchstabe -> 
	// Suche nach Part Designation:
	if ( re1.test(firstLetter) || re2.test(secondLetter) ) {
		searchType = "DESIGNATION_SEARCH";
	}
	// Wenn SearchPart an der 2.Stelle eine Ziffer besitzt -> Suche nach Bauteilkurzbezeichnung
	else if ( re1.test(secondLetter) ) {
		searchType = "PARTID_SEARCH";
	}
	
	var hits = "";
	var hitCount = 0;

	var re1 = new RegExp(SearchPart, "i");
	var emptyRe = /^[ ]*$/;
	var re2 = new RegExp("[a-z]");
	
	var hitRows = "";
	for (var partId in a6A)
	{
		var inspectTerm = "";

		var isHit = false;
		
		if ( searchType == "DESIGNATION_SEARCH" && re1.test(a6A[partId].designation) )
			isHit = true;		
		else if ( searchType == "PARTID_SEARCH" ) {
			// Gesuchtes Bauteil und ggf. Unterbaugruppen des gesuchten Bauteils anzeigen
			if ( partId.toLowerCase() == SearchPart.toLowerCase() ) {
				isHit = true;
			}
			// Unterbaugruppen besitzen einen Kleinbuchstaben hinter dem gesuchten 
			// Bauteilnamen, z.B. A1 -> A1e2
			else if ( IsWithSubComps && re1.test(partId) && re2.test(partId.substr(SearchPart.length,1)) ) {
				isHit = true;
			}
			// Varianten berücksichtigen, falls ein Bauteil mehrere Vorkommen im A6-Dokument hat
			else if ( re1.test(partId) && partId.substr(SearchPart.length,1) == "_" ) {
				isHit = true;
			}
		} 
		else if ( searchType == "FIRST_LETTER" ) {
			if ( partId.substr(0,1).toLowerCase() == firstLetter ) {
				isHit = true;
			}
		}	
		
		// Prüfen, ob die gesuchte DiagId im diagramIdA des aktuellen Bauteils vorhanden ist. 
		// Falls ja, wird das Bauteil aufgenommen, andernfalls wird es übergangen.
		if ( IsWithSubComps ) {
			if ( a6A[partId] && !isInArray(SearchDiagId, a6A[partId].diagramIdA) ) 
				isHit = false;
		}
					
		if( isHit ) {
			currHitsA.push(partId);
		} 
	}
	
	// Sonderfall: Suche auch nach Unterbaugruppen bei Fuses, Connectors, Grounds und Splices.
	// Dafuer erfolgt ein zweiter Schleifendurchlauf, Treffer mit gleichem 
	// Anfangsbuchstaben werden übersprungen
	if ( searchType == "FIRST_LETTER" && (firstLetter == "f" || firstLetter == "x" || firstLetter == "w" || firstLetter == "z") ) {
		for (var partId in a6A)
		{
			if ( partId.substr(0,1).toLowerCase() != firstLetter && partId.indexOf(firstLetter) > 0 )
				currHitsA.push(partId);
		}		
	}
	
	return currHitsA;
}
// ============================================================================
// DiagramId von PE54.30-U-2000EA in 54302000EA umwandeln
// ============================================================================
function getShortDiagId(DiagramId) {
	var diagId = DiagramId;
	var re = new RegExp("PE| |-U-|\\\.", "g");
	if( re.test(diagId) )
		diagId = diagId.replace(re, "");
	return diagId;
}
// ============================================================================
// PartId von A47/5 in A45_5 umwandeln
// ============================================================================
function getConvertedPartId(PartId) {
	var partId = PartId;
	re = new RegExp("[^0-9a-zA-Z]", "g");
	if( re.test(partId) )
		partId = partId.replace(re, "_");
	partId = partId.toUpperCase();
	return partId;
}
// ============================================================================
// GroupId 54 von PE54.30-U-2000EA herausfiltern
// ============================================================================
function getGroupId(DiagramId) {
	var groupId = DiagramId;
	var re = new RegExp("^P?E?([0-9][0-9])\.");
	if( re.test(groupId) )
		groupId = RegExp.$1;
	return groupId;
}
// ============================================================================
// Prüffunktion, ob SearchStr in ArrayToSearch vorhanden ist
// ============================================================================
function isInArray(SearchStr, SearchArray) {
	var isInArray = false;
	for ( var i=0; i<SearchArray.length; i++ ) {
		var currStr = SearchArray[i];
		//alert("vergleiche " + currStr + " mit " + SearchStr);
		if ( currStr == SearchStr ) {
			isInArray = true;
			break;
		}
	}
	return isInArray;
}
// ============================================================================
// Prüfen, ob PartId mit dieser DiagramId SubComponents in a6A besitzt
// ============================================================================
function getNoOfSubComponents(CheckPartId, CheckDiagId) {
	//var checkPartIdLen = CheckPartId.length;
	var noOfSubComps = 0;
	if ( !a6A ) return noOfSubComps;

	var re = new RegExp(CheckPartId + "[a-z]");

	for (var currPartId in a6A)
	{
		// Testen, ob es sich um eine Unterbaugruppe handelt
		/*if ( currPartId.length > checkPartIdLen &&
				 currPartId.substr(0,checkPartIdLen) == CheckPartId ) {
			var currDiagramIdA = a6A[currPartId].diagramIdA;
			if ( currDiagramIdA && isInArray(CheckDiagId, currDiagramIdA) )
				noOfSubComps++;
		}*/
		if ( re.test(currPartId) ) {
			var currDiagramIdA = a6A[currPartId].diagramIdA;
			if ( currDiagramIdA && isInArray(CheckDiagId, currDiagramIdA) )
				noOfSubComps++;
		}
	}	
	return noOfSubComps;
}
// ============================================================================
// Die Anzahl der Schaltpläne zurückgeben, die einem Bauteil zugeordnet sind
// ============================================================================
function getDiagramIdA(PartId) {
	var partId = PartId;
	// Ersten Buchstaben immer in Großschreibweise
	if ( partId.length > 1 )
		partId = partId.substr(0,1).toUpperCase() + partId.substring(1,partId.length);
	var diagIdA = new Array();
	if ( a6A && a6A[partId] && a6A[partId].diagramIdA ) {
		diagIdA = a6A[partId].diagramIdA;
	}
	return diagIdA;
}
