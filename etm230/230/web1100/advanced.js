/*-----------------------------------------------------------------------------
This page was generated on September-10-2003 10:00:00
Created by RLE International GmbH
Copyright 2003 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

// ============================================================================
// Initialisierung der advanced.html
// ============================================================================
function initAdv() {
	var form = document.forms[0];
	var diagCallerType = top.diagCallerType;
	var diagCallerInfo = top.diagCallerInfo;

	// Hier ggf. Werte aus top.diagCallerInfo zuordnen
	if ( diagCallerType == top.CALLER_ADV && typeof diagCallerInfo == "object" ) {
		// search1:
		if ( form.search1 && diagCallerInfo.search1Term && typeof diagCallerInfo.search1Term == "string" ) {
			form.search1.value = diagCallerInfo.search1Term;
		}
		// search2:
		if ( form.search2 && diagCallerInfo.search2Term && typeof diagCallerInfo.search2Term == "string" ) {
			form.search2.value = diagCallerInfo.search2Term;
		}
		// modelyear:
		if ( form.modelyear && diagCallerInfo.modelyear ) {
			setSelectedModelYear(top.diagCallerInfo.modelyear);
		}
		// engine:
		if ( form.engine && diagCallerInfo.engine ) {
			setSelectedEngine(top.diagCallerInfo.engine);
		}
	}	

	if (form.search1) form.search1.focus();
	return;
}
// ============================================================================
// Suchbegriffe sichern und Suche starten
// ============================================================================
function goSearch() {
	// HistoryArray fuer den Back-Button fuellen:
	top.backHistoryA[top.backHistoryA.length] = location.href;
	// Suchbegriffe festhalten und Ergebnisseite anzeigen:
	var form = document.forms[0];
	var search1Term = form.search1.value;
	var search2Term = form.search2.value;
	var modelYear = new Array();
	var engine = new Array();
	modelYear = getSelectedModelYear();
	engine = getSelectedEngine();
	// Suchbegriffe im Objekt AdvancedSearchItem speichern:
	top.diagCallerInfo = new AdvancedSearchItem(search1Term, search2Term, modelYear, engine);
	advSearch();
}
// ============================================================================
// Konstruktor fuer das diagCallerInfo-Objekt
// ============================================================================
function AdvancedSearchItem(Search1Term, Search2Term, Modelyear, Engine) {
	this.search1Term = Search1Term;
	this.search2Term = Search2Term;
	this.modelyear = Modelyear;
	this.engine = Engine;
}
// ============================================================================
// Suche in search.js durchfuehren und Ergebnis anzeigen
// ============================================================================
function advSearch()
{
	// Abbruch, falls nicht das Objekt AdvancedSearchItem in top.DiagCallerInfo
	// gespeichert wurde:
	if ( typeof top.diagCallerInfo != "object" ) {
		return;
	}
	var search1Term = top.diagCallerInfo.search1Term;
	var search2Term = top.diagCallerInfo.search2Term;
	var modelYear = top.diagCallerInfo.modelyear;
	var engine = top.diagCallerInfo.engine;
	
	var hitArray = new Array();
	var hitCount = 0;
	
	var search1Re = new RegExp(search1Term, "i");
	var search2Re = new RegExp(search2Term, "i");
	
	for (var groupId in groupA)
	{
		if( search1Re.test(groupA[groupId].description) &&
			search2Re.test(groupA[groupId].description) 
		) {
			// since term is included in group description, only modelyear and engine will be tested
			for (var diagramId in groupA[groupId].diagramA) {
				var description = groupA[groupId].diagramA[diagramId].description;
				var annotations = groupA[groupId].diagramA[diagramId].annotations;
				var tModelYear	= groupA[groupId].diagramA[diagramId].modelyear;
				var tEngine		= groupA[groupId].diagramA[diagramId].engine;
				
				tModelYear = getFullModelYearStr(diagramId, tModelYear);
				
				var emptyRe = /^[ ]*$/;
				
				if (( modelYear.length == 0 || modelYear[0] == 'All') &&
					( engine.length == 0 || engine[0] == 'All') ) 
				{
					hitArray[hitCount++] = diagramId;
				}
				else if ( ( modelYear.length > 0 && modelYear[0] != 'All') &&
						  ( engine.length == 0 || engine[0] == 'All') ) 
				{
					var tReExp = modelYear.join('|');
					var modelYearRe = new RegExp(tReExp, "i");
					if ( modelYearRe.test(tModelYear) ) {
						hitArray[hitCount++] = diagramId;
					}
				}
				else if ( ( modelYear.length == 0 || modelYear[0] == 'All') &&
					( engine.length > 0 && engine[0] != 'All') ) 
				{
					var tReExp = engine.join('|');
					var engineRe = new RegExp(tReExp, "i");
					if ( engineRe.test(tEngine) ) hitArray[hitCount++] = diagramId;
				}
				else if ( ( modelYear.length > 0 && modelYear[0] != 'All') &&
					( engine.length > 0 && engine[0] != 'All') ) 
				{
					var tReExp;
					tReExp = modelYear.join('|');
					var modelYearRe = new RegExp(tReExp, "i");
					tReExp = engine.join('|');
					var engineRe = new RegExp(tReExp, "i");
					if ( ( modelYearRe.test(tModelYear) ) &&
						 ( engineRe.test(tEngine) ) ) hitArray[hitCount++] = diagramId;
				}
			}	
		} else {
			// each diagrams will be tested individually
			for (var diagramId in groupA[groupId].diagramA)
			{
				var description = groupA[groupId].diagramA[diagramId].description;
				var annotations = groupA[groupId].diagramA[diagramId].annotations;
				var tModelYear	= groupA[groupId].diagramA[diagramId].modelyear;
				var tEngine		= groupA[groupId].diagramA[diagramId].engine;
				
				tModelYear = getFullModelYearStr(diagramId, tModelYear);
				
				var emptyRe = /^[ ]*$/;
				
				if (( modelYear.length == 0 || modelYear[0] == 'All') &&
					( engine.length == 0 || engine[0] == 'All')
				) {
					if ( (search1Re.test(description) || search1Re.test(annotations) ) &&
						 (search2Re.test(description) || search2Re.test(annotations) )
					) {
						hitArray[hitCount++] = diagramId;
					}
				}
				else if ( ( modelYear.length > 0 && modelYear[0] != 'All') &&
					( engine.length == 0 || engine[0] == 'All')
				) {
					var tReExp = modelYear.join('|');
					var modelYearRe = new RegExp(tReExp, "i");
					if (( search1Re.test(description) || search1Re.test(annotations) ) &&
						 (search2Re.test(description) || search2Re.test(annotations) ) &&
						( modelYearRe.test(tModelYear) )
					) {
						hitArray[hitCount++] = diagramId;
					}
				}
				else if ( ( modelYear.length == 0 || modelYear[0] == 'All') &&
					( engine.length > 0 && engine[0] != 'All')
				) {
					var tReExp = engine.join('|');
					var engineRe = new RegExp(tReExp, "i");
					if (( search1Re.test(description) || search1Re.test(annotations) ) &&
						 (search2Re.test(description) || search2Re.test(annotations) ) &&
						( engineRe.test(tEngine) )
					) {
						hitArray[hitCount++] = diagramId;
					}
				}
				else if ( ( modelYear.length > 0 && modelYear[0] != 'All') &&
					( engine.length > 0 && engine[0] != 'All')
				) {
					var tReExp;
					tReExp = modelYear.join('|');
					var modelYearRe = new RegExp(tReExp, "i");
					tReExp = engine.join('|');
					var engineRe = new RegExp(tReExp, "i");
					if (( search1Re.test(description) || search1Re.test(annotations) ) &&
						 (search2Re.test(description) || search2Re.test(annotations) ) &&
						( modelYearRe.test(tModelYear) ) &&
						( engineRe.test(tEngine) )
					) {
						hitArray[hitCount++] = diagramId;
					}
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
			linkRe = new RegExp("PE", "g");
			if(linkRe.test(diagramId)) diagramId = diagramId.replace(linkRe, "");
			linkRe = new RegExp("-U-", "g");
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
			hits += '<tr><td height="3" colspan="4" bgcolor="#333333"></td></tr>';
			hits += '<tr><td width="190" valign="top">';
			hits += '<img src="../../images/pfeil.gif" width="6" height="9" border="0" alt="">&nbsp;&nbsp;';
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
// ============================================================================
// Hilfsfunktion fuer die optionale Modelljahrangabe in search.js
// ============================================================================
function getFullModelYearStr(diagramId, dbModelYear) {
	// translates eg. '<2002' into '1998,1999,2000,2001,2002'
	// translates '2001<' into '2001,2002,2003,2004,...'
	var yearArr = new Array('1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020');
	if ( ( dbModelYear.substr(0,1) == '<' ) && ( dbModelYear.length == 5 ) ) {
		var sliceYearArr = new Array()
		var count = 0
		for (var i=0; i<yearArr.length; i++) {
			sliceYearArr[count++] = yearArr[i]
			if ( yearArr[i] == dbModelYear.substr(1,4) ) break;
		}
		var retVal = sliceYearArr.join(',')
		return retVal
	}
	else if ( (dbModelYear.substr(4,1) == '<' ) && ( dbModelYear.length == 5 ) ) {
		var sliceYearArr = new Array()
		var count = 0
		yearFound = false
		for (var i=0; i<yearArr.length; i++) {
			if ( (yearArr[i] == dbModelYear.substr(0,4)) || yearFound) {
				sliceYearArr[count++] = yearArr[i]
				yearFound = true
			}
		}
		var retVal = sliceYearArr.join(',')
		return retVal
	} 
	else if ( ( dbModelYear == '' ) || ( dbModelYear == 'All' ) ) {
		var retVal = yearArr.join(',')
		return retVal
	}
	else {
		var retVal = dbModelYear
		return dbModelYear
	}
}
// ============================================================================
// Hilfsfunktion fuer die Ermittlung des aktuell gewaehlten modelYear-Arrays
// ============================================================================
function getSelectedModelYear() {
	var form = document.forms[0];
	var modelYearA = new Array();
	var count = 0;
	for (var i=0; i<form.modelyear.length; i++) {
		if (form.modelyear.options[i].selected)
			modelYearA[count++] = form.modelyear.options[i].text;
	}
	
	return modelYearA;
}
// ============================================================================
// Hilfsfunktion fuer das Setzen des modelYear-Arrays
// ============================================================================
function setSelectedModelYear(modelYearA) {
	var form = document.forms[0];
	form.modelyear.options[0].selected = false;
	for ( var i=0; i < modelYearA.length; i++ ) {
		var cModelYear = modelYearA[i];
		for (var k=0; i<form.modelyear.length; k++) {
			if (form.modelyear.options[k].text == cModelYear) {
				form.modelyear.options[k].selected = true;
				break;
			}
		}
	}
	return;	
}
// ============================================================================
// Hilfsfunktion fuer die Ermittlung des aktuell gewaehlten engine-Arrays
// ============================================================================
function getSelectedEngine() {
	var form = document.forms[0];
	var engineA = new Array();
	var count = 0;
	for (var i=0; i<form.engine.length; i++) {
		if (form.engine.options[i].selected)
			engineA[count++] = form.engine.options[i].text;
	}
	
	return engineA;
}
// ============================================================================
// Hilfsfunktion fuer das Setzen des engine-Arrays
// ============================================================================
function setSelectedEngine(engineA) {
	var form = document.forms[0];
	form.engine.options[0].selected = false;
	for ( var i=0; i < engineA.length; i++ ) {
		var cEngine = engineA[i];
		for (var k=0; i<form.modelyear.length; k++) {
			if (form.engine.options[k].text == cEngine) {
				form.engine.options[k].selected = true;
				break;
			}
		}
	}
	return;	
}
// ============================================================================
// Ausgabe des Suchergebnisses in HTML
// ============================================================================
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
	str += '<script src="web1100.js"></script><script src="search.js"></script>\n';
	str += '</head>\n<body bgcolor="#444444"><center>\n';
	str += '<table width=770 border="0" cellspacing="5" cellpadding="3" bgcolor=#444444>\n';


	str += '<tr>\n';
	str += '<td colspan="4">';
	str += '<table width="100%" border="0"><tr><td>';
	str += '<font style="font-size:16px">';
	str += '<b>Advanced Search: ';
	if ( top.diagCallerInfo.search1Term && top.diagCallerInfo.search1Term != "" )
		str += '"' + top.diagCallerInfo.search1Term + '" ';
	if ( top.diagCallerInfo.search2Term && top.diagCallerInfo.search2Term != "" )
	str += '"' + top.diagCallerInfo.search2Term + '"';
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
// ============================================================================
// Leertext in der Statuszeile anzeigen:
// ============================================================================
function noStatus() {
	window.status = "";
	return true;
}

