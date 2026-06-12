// ============================================================================
// 1100'er Dokument initialisieren
// ============================================================================
function init1100() {
	top.diagCallerType = top.CALLER_1100;
	// Back-Button einschalten:
	if ( parent && parent.dwfheader && parent.dwfheader.document.all.back_span ) 
		parent.dwfheader.document.all.back_span.style.visibility='visible';
	// Dokument zurueckscrollen:
	if(location.hash) 
		setTimeout('parent.dwfcontent.scrollBy(0,-15)',150);
	return;
}
// ============================================================================
// Ausgewaehlten Schaltplan anzeigen
// ============================================================================
function showDiagram(diagramString)
{
	// Link einfaerben, voher alle anderen Links zuruecksetzen:
	for ( var objId in document.all ) {
		if ( objId.substr(0,5) == "DIAG_" ) {
			var cObj = eval("document.all."+objId);
			cObj.style.removeAttribute("color");
		}
	}
	if ( eval("document.all.DIAG_"+diagramString) ) {
		var cDiagObj = eval("document.all.DIAG_"+diagramString);
		cDiagObj.style.color = "#fe9900";
	}
	
	var myDiagramString = diagramString.toLowerCase();
	top.startDatCookie = "w" + myDiagramString + ".html";
	top.aktDatCookie = myDiagramString + ".html";
	top.allowMessage = true;
	var request = getUrlPath(location.href) + "../d1index.html";
	//parent.location.href = request;

	// Fullscreen:
	var winConf = "titlebar=no,status=no,fullscreen=yes";
	//webEtmWin=window.open(request,'web_etm',winConf);

	// Rahmen
	var width = screen.availWidth - 10;
	var height = screen.availHeight - 31; // 31 50
	winConf = 'resizable=yes,titlebar=no,status=no,width='+width+',height='+height+',top=0,left=0';
	webEtmWin=window.open(request,'web_etm',winConf);
	webEtmWin.focus();

	return false;
}
// ============================================================================
// Anzeige eines Schaltplans nach Schaltplanauswahl in diagsearch.html
// ============================================================================
function showRetrievedDiagram(diagramString) {
	var myDiagramString = diagramString + ".html";
	myDiagramString = myDiagramString.toLowerCase();
	// Diese Anweisung ist nach Umstellung auf die Schaltplaninitialisierung
	// durch den StreamLoaded-Event fuer die Funktionalitaet erforderlich:
	parent.dwfheader.focus();
	var request = getUrlPath(location.href) + "../diagram/w"+myDiagramString;
	parent.dwfcontent.location.href = request;
	return false;
}
// ============================================================================
// Systeminformation anzeigen
// ============================================================================
function showSystemInfo(fileN) {
	var fileN = fileN.toLowerCase();
	var winLoc = '../systeminfo/docs/'+fileN+'.html';
	var winConf = 'status=no,toolbar=yes,locationbar=no,scrollbars=yes,width=900,height=600,left=50,top=30';
	//var winConf = 'status=yes,toolbar=no,locationbar=no,scrollbars=yes,width=900,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	setTimeout("newWin.focus();",100);
	return false;
}
// ============================================================================
// Den Pfad einer URL bestimmen, Beispiel: www.server.com/daten/index.html
// -> www.server.com/daten/
// ============================================================================
function getUrlPath(longUrl)
{
	var testEnd=longUrl.lastIndexOf("/");
	var longUrlPath = longUrl.substring(0,testEnd+1);
	return longUrlPath;
}
// ============================================================================
// Bei Wechsel der Selectbox die gewaehlte 1100'er Seite anzeigen:
// ============================================================================
function switchMainIndex() {
	var switchPath = document.f0.s0.options[document.f0.s0.selectedIndex].value;
	switchPath += '.html';
	// Daten fuer den Ruecksprung vom Schaltplan speichern:
	top.diagCallerType = top.CALLER_1100;
	top.diagCallerInfo = switchPath;
	// 1100 Main Index aufrufen:
	location.href = switchPath;
	return;
}
// ============================================================================
// Funktion zur Suche eines Suchbegriffs in den 1100'er Seiten
// ============================================================================
function initSimpleSearch(search1) {
	top.diagCallerInfo = search1;
	var str = "";
	var hitArray = new Array();
	var hitCount = 0;

	// Sonderzeichen im Suchstring schuetzen
	var search1ReStr = search1;

	// Sonderzeichen "\" unterdruecken
	search1ReStr = search1ReStr.replace(/\\/, "");
	
	// Sonstige Sonderzeichen schuetzen
	var specCharsRe = /([\*\.\+\?\[\]\(\)\/])/;
	if ( specCharsRe.test(search1) )
		search1ReStr = search1ReStr.replace(/[\*\.\+\?\[\]\(\)\/]/, "\\"+RegExp.$1);

	// Sonderzeichen "*" in ".*" umwandeln
	if ( search1 == "*" ) search1ReStr = ".*";
	
	var search1Re = new RegExp(search1ReStr, "i");
	var emptyRe = /^[ ]*$/;
	
	for (var groupId in groupA)
	{
		if( search1Re.test(groupA[groupId].description) ) {
			for (var diagramId in groupA[groupId].diagramA) {
				hitArray[hitCount++] = diagramId;
			}	
		} else {
			for (var diagramId in groupA[groupId].diagramA) {
				var description = groupA[groupId].diagramA[diagramId].description;
				var annotations = groupA[groupId].diagramA[diagramId].annotations;
				if( (search1Re.test(description) || search1Re.test(annotations) ) ) {
					hitArray[hitCount++] = diagramId;
				}
			}	
		}
	}

	var hits = "";
	for (var k=0; k<hitArray.length; k++) {
		var diagramId = hitArray[k];
		var lGroupId;
		if(diagramId != "") {
			var linkRe;
			linkRe = new RegExp("PE", "gi");
			if(linkRe.test(diagramId)) diagramId = diagramId.replace(linkRe, "");
			linkRe = new RegExp("-U-", "gi");
			if(linkRe.test(diagramId)) diagramId = diagramId.replace(linkRe, "");
			linkRe = new RegExp('\\.', "g");
			if(linkRe.test(diagramId)) diagramId = diagramId.replace(linkRe, "");
			var groupId = diagramId.substr(0,2);
			if ( groupId != lGroupId )
			{
				if (k > 0) {
					hits += '<tr><td height="3" colspan="4" bgcolor="#333333"></td></tr>';
					hits += '<tr><td colspan="4">&nbsp;</td></tr>';
				}
				hits += '<tr><td colspan="4">';
				hits += '<img src="../../images/pfeildummy.gif" width="6" height="9" border="0" alt="">';
				hits += '&nbsp;&nbsp;<font face="arial" size="2" color="#cccccc">';
				hits += groupA[groupId].description+'</font></td></tr>';
				lGroupId = groupId;
			}
			hits += '<tr><td height="3" colspan="4" bgcolor="#333333"></td></tr>\n';
			hits += '<tr><td width="190" valign="top">\n';
			hits += '<img src="../../images/pfeil.gif" width="6" height="9"';
			hits += ' border="0" alt="">&nbsp;&nbsp;\n';
			hits += '<a href="#" onMouseover="return noStatus()" onMouseout="';
			hits += 'return noStatus()" onClick="return showDiagram(\'';
			hits += diagramId+'\')" id="DIAG_'+diagramId+'">'+hitArray[k]+'</a></td>';
			hits += '<td width="265" valign="top">';
			hits += groupA[groupId].diagramA[hitArray[k]].description+'</td>\n';
			hits += '<td width="290" valign="top">';
			hits += groupA[groupId].diagramA[hitArray[k]].annotations+'</td>\n';
			hits += '<td width="25" valign="top">';
			hits += '<a href="#" onMouseover="return noStatus()" onMouseout="';
			hits += 'return noStatus()" onClick="scroll(0,0);return false;">';
			hits += '<img src="../../images/up.gif" border="0" alt="Top"></a>';
			hits += '</td>'+"\n";
			hits += '</tr>'+"\n";
		}
	}	
	
	printHtml(hitCount, hits);
	
	return;
}

function printHtml(hitCount, hitStr) {
	var monthA = new Array("January","February","March","April","May","June","July","August","September","October","November","December")
	var currDate = new Date();
	var currDay = currDate.getDate();
	var currMon = currDate.getMonth();
	currMon = monthA[currMon];
	var currYear = currDate.getYear();
	var currHour = currDate.getHours();
	var currMin = currDate.getMinutes();
	var currSec = currDate.getSeconds();
	
	var str = '';
	str += '<!-----------------------------------------------------------------------------\n';
	str += 'This page was dynamically generated on '+currMon+'-'+currDay+'-'+currYear+' '+currHour+':'+currMin+':'+currSec+'\n';
	str += 'Created by RLE International GmbH\n';
	str += 'Copyright 2003 Mercedes-Benz USA, LLC\n';
	str += '------------------------------------------------------------------------------>\n';

	str += '<html><head><style>\n';
	str += 'td {\n';
	str += '  font-size:13px;\n';
	str += '  font-family :Verdana,Arial,Helvetica,SansSerif;\n';
	str += '  color:#cccccc;\n';
	str += '}\n';
	str += 'a:link { color:#cccccc;}\n';
	str += 'a:visited { color:#cccccc;}\n';
	str += 'a:active { color:#cccccc;}\n';
	str += 'a:hover { color:#FE9900;}\n';
	str += '</style>\n';
	str += '<script src="web1100.js"></script>\n';
	str += '<script src="search.js"></script>\n';
	str += '</head>\n<body bgcolor="#444444">\n<center>\n';
	str += '<table width="770" border="0" cellspacing="5" cellpadding="3"';
	str += ' bgcolor="#444444">\n';
	str += '<tr>\n';
	str += '<td colspan="4">';
	str += '<table width="100%" border="0"><tr><td>';
	str += '<font style="font-size:16px">';
	str += '<b>Search for a Diagram by Diagrams Title:';
	//if ( top.diagCallerInfo != "" )
	str += ' "' + top.diagCallerInfo + '"';
	str += '</b></font></td><td align="right">';
	str += '<b>Hits: ' + hitCount + '</b>';
	str += '</td></tr></table>\n';
	str += '<hr /></td></tr>\n';

	if ( hitCount == 0 ) {
		str += '<td colspan="4" align="center"><font style="font-size:16px">';
		str += 'No Search Results</font></td>';
	} else {
		str += hitStr;
		str += '<tr><td height="3" colspan="4" bgcolor="#333333"></td></tr>';
	}

	str += '</table><br><br>\n';

	str += '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'+"\n";
	str += "</body></html>\n";
	
	document.open();
	document.clear();
	document.write(str);
	document.close();

	return;	
}

function peDiagramSearch()
{
	var searchTerm = document.location.search;
	searchTerm = searchTerm.substr(1,searchTerm.length);

	var re = new RegExp("^PE","i");
	if (! re.test(searchTerm) ) {		// Search for search term, not for PE document
		initSimpleSearch(searchTerm);
		return false;
	}
	var str = "";
	var hits = "";
	var hitCount = 0;

	var hitsBoolean = false;
	
	var search1Re = new RegExp(searchTerm, "i");

	for (var groupId in groupA)
	{
		for (var diagramId in groupA[groupId].diagramA) {
			var idx = diagramId;
			if (idx == "") continue;
			var linkRe = new RegExp("PE|-U-|[\.]", "g");
			if(linkRe.test(idx)) {
				idx = idx.replace(linkRe, "");
			}
			if( (search1Re.test('PE'+idx)) ) {
				if (hitCount > 0) {
					hits += '<tr><td height="3" colspan="4" bgcolor="#333333"></td></tr>';
				}
				var description = groupA[groupId].diagramA[diagramId].description;
				var annotations = groupA[groupId].diagramA[diagramId].annotations;

				hits += '<tr><td width="200" valign="top">\n';
				hits += '<img src="../../images/pfeil.gif" width="6" height="9"';
				hits += ' border="0" alt="">&nbsp;&nbsp;\n';
				hits += '<a href="#" onMouseover="return noStatus()"';
				hits += ' onMouseout="return noStatus()" onClick="';
				hits += 'return showRetrievedDiagram(\''+idx+'\')">'+diagramId+'</a>\n';
				hits += '</td>\n';
				hits += '<td width="279" valign="top">\n';
				hits += description + '\n</td>\n';
				hits += '<td width="279" valign="top">\n';
				hits += annotations + '\n</td>\n';
				hits += '<td width="12" valign="top">\n';
				hits += '<a href="#" onMouseover="return noStatus()" onMouseout="';
				hits += 'return noStatus()" onClick="scroll(0,0);return false;">';
				hits += '<img src="../../images/up.gif" border="0" alt="Top"></a>';
				hits += '</td></tr>\n';

				hitCount++;
				hitsBoolean = true
			}
		}	
	}

	str += '<table width="770" cellspacing="5" cellpadding="3" bgcolor="#444444">\n';

	if(hitsBoolean == true) {
		str += hits;
	} else {
		str += '<tr><td>No diagram found!</td></tr>\n';
	}
	
	document.write(str);
	
	return;
}
// ============================================================================
// Leertext in der Statuszeile anzeigen:
// ============================================================================
function noStatus() {
	window.status = "";
	return true;
}
// ============================================================================
// Anzeige der Seite des ausgewaehlten Buchstabens
// ============================================================================
function selectLetter(letter) {
	window.status = "";
	// HistoryArray fuer den Back-Button fuellen:
	if ( top.backHistoryA )
		top.backHistoryA[top.backHistoryA.length] = location.href;
	// Seite des Buchstabens anzeigen:
	top.diagCallerInfo = letter.toUpperCase();
	location.href = "../a6/a6search.html";
	return false;
}
