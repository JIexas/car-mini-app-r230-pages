/*-----------------------------------------------------------------------------
This page was generated on September-16-2004 10:00:00
Created by RLE International GmbH
Copyright 2004 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

var showTagTime = 0;
var blurTimer = 0;
var showTagBool = true;
var closeTimer = 0;
parent.menWin;
var browser = checkBrowser();
var enableSaveRegion = true; 	// in case of unloading a diagram save or save not coordinates
var currentPartHit = 0;			// nr of current zoomed part in case of multiple occurrences in diagram
var showInitialViewDone = false;

function initDiagram() {
	if ( !parent || !parent.opener ) return;
	
	// Initialisierung fuer den Ausdruck
	if ( opener && opener.parent && opener.parent.dwffooter ) {
		opener.parent.dwffooter.startPrint();
		return;
	}
	
	var messIdLow = parent.diagramId.toLowerCase();
	var messIdUp  = parent.diagramId.toUpperCase();
	if (message[messIdLow] && parent.opener.top.allowMessage) {
		msg = message[messIdLow];
		setTimeout("eval(alert(msg))", 1000);
		parent.opener.top.allowMessage = false;
	}
	if (message[messIdUp] && parent.opener.top.allowMessage) {
		alert(message[messIdUp]);
		parent.opener.top.allowMessage = false;
	}
	var diagramName = parent.diagramNr + "   " + parent.diagramTitle;
	// BR-Tags in diagramName unterdruecken:
	var re = /<BR>/i;
	if ( re.test(diagramName) ) {
		diagramName = diagramName.replace(re, " ");
	}
	var diagramFile = parent.diagramId + ".html";
	diagramFile = diagramFile.toLowerCase();
	parent.opener.top.aktDatCookie = diagramFile;
	if (browser == 'ie') {
		if (parent.dwffooter && parent.dwffooter.document.all.wirename)
			parent.dwffooter.document.all.wirename.innerText = '' + diagramName;
		if (!parent.menWin) clearPartName();
	}
	// manipulate diagram view depending on wanted situation
	if (document.location.search) {	
		// search for part and zoom it
		var partN = document.location.search;
		partN = partN.substr(1,partN.length);
		setTimeout('zoomPart("'+partN+'")',50);
	} else if ( parent.diagramCoord && parent.diagramCoord[parent.diagramId] ) {	
		// restore view with saved coordinates
		setTimeout('restoreRegion()',50);
	} else {			
		// fill out whole screen
		setTimeout('showInitialView()',50);
	}
	// Menueleiste im Header zuruecksetzen
	if ( parent.dwfheader ) {
		parent.dwfheader.sel = "diagram1";
		parent.dwfheader.resetButt();	
	}
	// Menueleiste im Footer zuruecksetzen
	if ( parent.dwffooter ) {
		parent.dwffooter.resetButt();	
	}
	return;
}

function showInitialView() {
	if ( showInitialViewDone ) return;
	showInitialViewDone = true;

	if ( document.all.diagdwf ) 
		document.all.diagdwf.DrawNamedView ("1");

	/*
	var cLeft = dwfObj.GetCurrentViewLeft();
	var cRight = dwfObj.GetCurrentViewRight();
	cLeft =  cLeft + (0.12 * (cRight - cLeft));
	cRight = cRight + (0.12 * (cRight - cLeft));
	var cBottom = dwfObj.GetCurrentViewBottom();
	var cTop = dwfObj.GetCurrentViewTop();
	dwfObj.DrawView(cLeft,cRight,cBottom,cTop);
	*/

	return;
}

function zoomPart(partN) {
	if ( showInitialViewDone ) return;
	showInitialViewDone = true;

	var dwfObj = document.all.diagdwf;
	var part = partN;
	var arrOfLinks = getArrOfLinks(part);
	var nrOfLinks = arrOfLinks.length;
	var cLink = "javascript:select('"+part+"');";

	if (nrOfLinks == 0) return;

	var count = 0;
	var status = dwfObj.BeginLinksSearch(cLink);

	//alert(arrOfLinks[currentPartHit][0]);
	if(status) {
		while(count < arrOfLinks[currentPartHit][0]) {
			status = dwfObj.FindNextLink();
			if (status) {
				if (dwfObj.GetLinkURL() == cLink) {
					count++;
				}
			} else break;
		}
	} else {
		return;
	}

	var eLeft = dwfObj.GetDrawingExtentsLeft();
	var eRight = dwfObj.GetDrawingExtentsRight();
	var eBottom = dwfObj.GetDrawingExtentsBottom();
	var eTop = dwfObj.GetDrawingExtentsTop();
	
	var lLeft = dwfObj.GetLinkLeft();
	var lRight = dwfObj.GetLinkRight();
	var lBottom = dwfObj.GetLinkBottom();
	var lTop = dwfObj.GetLinkTop();
	
	var eHeight = eTop - eBottom;
	var eWidth = eRight - eLeft;
	//alert("H: "+eHeight+" W: "+eWidth)
	var zHeight = eHeight * 0.65;
	zHeight -= lTop - lBottom;
	var zBottom = zHeight * -0.55;
	var zTop = zHeight * 0.45;
	
	// Heranzoomen:
	//var cBottom = dwfObj.GetLinkBottom() + zBottom;
	//var cTop = dwfObj.GetLinkTop() + zTop;
	
	// NamedView:
	dwfObj.BeginNamedViewSearch("1");
	var nBottom = dwfObj.GetNamedViewBottom();
	var nTop = dwfObj.GetNamedViewTop();
	dwfObj.DrawView(lLeft,lRight,nBottom,nTop);
	
	/* DrawingExtents:
	var cBottom = dwfObj.GetDrawingExtentsBottom();
	var cTop = dwfObj.GetDrawingExtentsTop();
	dwfObj.DrawView(cLeft,cRight,cBottom,cTop);
	*/
	
	// Hinweispfeil zeichnen:
	drawHintTriangle(lLeft, lBottom, eWidth, eHeight);  // geht nur bei nichtfarbigen DWF

	if (nrOfLinks > 1 && nrOfLinks >= arrOfLinks[currentPartHit][0]) {
		//var pLeft = ((lCoord[rigIdx] - cCoord[lefIdx]) / (cCoord[rigIdx] - cCoord[lefIdx]));
		//var pTop  = 1 - ((lCoord[topIdx] - cCoord[botIdx]) / (cCoord[topIdx] - cCoord[botIdx]));
		with(dwfObj) {
			var pLeft = ((GetLinkRight() - GetCurrentViewLeft()) / (GetCurrentViewRight() - GetCurrentViewLeft()))
			var pTop  = 1 - ((GetLinkTop() - GetCurrentViewBottom()) / (GetCurrentViewTop() - GetCurrentViewBottom()));
			var mHeight = offsetHeight;	// get screen height
			var mWidth  = offsetWidth;		// get screen width
		}
		
		var wCoord = new Array();							// left and top for new window
		wCoord[0] = Math.floor(pLeft * mWidth) + 70;
		wCoord[1]  = Math.floor(pTop * mHeight) + 10;		// offset of header frame width (50px)

		var winConf = 'titlebar=no,status=no,width=150,height=90,left='+wCoord[0]+',top='+wCoord[1];
		parent.menWin=window.open ('','fenster',winConf);

		with(parent.menWin.document) {
			var monthA = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
			var currDate = new Date();
			var currDay = currDate.getDate();
			var currMon = currDate.getMonth();
			currMon = monthA[currMon];
			var currYear = currDate.getYear();
			var currHour = currDate.getHours();
			var currMin = currDate.getMinutes();
			var currSec = currDate.getSeconds();

			open ();
			writeln('<!-----------------------------------------------------------------------------');
			writeln('This page was dynamically generated on '+currMon+'-'+currDay+'-'+currYear+' '+currHour+':'+currMin+':'+currSec);
			writeln('Created by RLE International GmbH');
			writeln('Copyright 2004 Mercedes-Benz USA, LLC');
			writeln('------------------------------------------------------------------------------>');
			
			writeln('<html><head><title>&nbsp;&nbsp;'+part+'&nbsp;'+partArr[part]+'&nbsp;&nbsp;&nbsp;&nbsp;');
			writeln('&nbsp;&nbsp;</title>');
			writeln("<style>");
			writeln("td {font-size:12px;font-family:Verdana,Arial,Helvetica,SansSerif;color:#cccccc}");
			writeln("td.title {font-size: 15px; font-family : Verdana,Arial,Helvetica,SansSerif; color:#444444; background-color:#cccccc}");
			writeln("ul li {list-style-image: url(../images/pfeil.gif)}");
			writeln("a:link { color:#cccccc;}");
			writeln("a:visited { color:#cccccc;}");
			writeln("a:active { color:yellow;}");
			writeln("a:hover { color:#fe9900;}");
			writeln("</style>");

			writeln('<script language="JavaScript">');
			writeln("function keepOnTop() {");
			writeln("	self.focus();");
			writeln("}");
			writeln("function getPreviousLink(partN) {");
			writeln("	var part = partN");
			writeln("	if (opener && opener.currentPartHit > 0) opener.currentPartHit--");
			writeln(" opener.showInitialViewDone = false");
			writeln("	opener.zoomPart(part)");
			writeln("	return false");
			writeln("}");

			writeln("function getNextLink(partN,nrOfLinks) {");
			writeln("	var part = partN");
			writeln("	if (opener && opener.currentPartHit < (nrOfLinks - 1)) opener.currentPartHit++");
			writeln(" opener.showInitialViewDone = false");
			writeln("	opener.zoomPart(part)");
			writeln("	return false");
			writeln("}");
			writeln("function closeWindow() {");
			writeln("	if (opener && opener.parent && opener.parent.dwfcontent && opener.parent.dwfcontent.document.all.diagdwf) {");
			//writeln("		opener.parent.dwfcontent.showTagBool=true");
			writeln("		opener.parent.dwfcontent.clearPartName()");
			writeln("	}");
			writeln("	self.close()");
			writeln("	return false");
			writeln("}");
			writeln("</script></head>");
			write('<body bgcolor="#444444" topmargin="4" margin-width="4" margin-height="4"');
			writeln(' onLoad="keepOnTop()"><center>');
			writeln('<table width="100%" border="0">');
			writeln('<tr><td align="center">Hit: '+(currentPartHit+1)+' of '+nrOfLinks+'</td></tr>');
			writeln('<tr><td align="center">');
			if (currentPartHit > 0) {
				writeln('<a href="#" onClick="return getPreviousLink(\''+part+'\');"><img src="../../images/pfeil_l.gif"');
				writeln(' width="18" height="27" border="0" vspace="5" alt="Previous Hit"></a>&nbsp;&nbsp;');
			} else {
				writeln('<img src="../../images/pfeildummy.gif"');
				writeln(' width="18" height="27" border="0" vspace="5" alt=""></a>&nbsp;&nbsp;');
			}
			if (currentPartHit < nrOfLinks-1) {
				writeln('<a href="#" onClick="return getNextLink(\''+part+'\',\''+nrOfLinks+'\');"><img ');
				writeln(' src="../../images/pfeil.gif" width="18" height="27" vspace="5" border="0" alt="Next Hit"></a>');
			} else {
				writeln('<img src="../../images/pfeildummy.gif"');
				writeln(' width="18" height="27" border="0" vspace="5" alt=""></a>&nbsp;&nbsp;');
			}
			writeln('</td></tr>');
			writeln('<tr><td align="center"><a href="#" onClick="return closeWindow()" style="text-decoration:none">');
			write('Close this window</a></td></tr></table>');
			writeln('</center>');
			writeln('<script>self.focus()</script>');
			writeln('</body></html>');
		}
	}

	return;
}

function drawHintTriangle(cLeft, cBottom, cWidth, cHeight) {
	// Funktion nur zweimal ausfuehren, ansonsten geraet die Anzeige wg.
	// des Load-Events in eine Endlosschleife:

	deleteLayer();
	
	//var triangleHeight = Math.floor(cHeight / 47.451);
	var triangleHeight = Math.floor(cHeight / 28.000);
	var triangleWidth = triangleHeight;
	//alert("W: "+triangleWidth+" H: "+triangleHeight);

	//var triangleOffsetX = Math.floor(1.6 * triangleWidth);
	//var triangleOffsetY = Math.floor(0.5 * triangleWidth);
	var triangleOffsetX = Math.floor(1.3 * triangleWidth);
	var triangleOffsetY = Math.floor(0.3 * triangleWidth);

	var cLeft = cLeft - triangleOffsetX;
	var cBottom = cBottom + triangleOffsetY;
	
	// Dreieck:
	var p1 = (cLeft + triangleWidth) + "," + cBottom;
	var p2 = (cLeft) + "," + (cBottom + Math.floor(triangleHeight / 2));
	var p3 = (cLeft) + "," + (cBottom - Math.floor(triangleHeight / 2));
	var p4 = (cLeft + triangleWidth) + "," + cBottom;
	var dwfTriangleStr = "P 4 " + p1 + " " + p2 + " " + p3 + " " + p4;

	// Rechteck:
	var p1 = (cLeft) + "," + (cBottom + Math.floor(triangleHeight / 6));
	var p2 = (cLeft - Math.floor(1.1 * triangleWidth)) + "," + (cBottom + Math.floor(triangleHeight / 6));
	var p3 = (cLeft - Math.floor(1.1 * triangleWidth)) + "," + (cBottom - Math.floor(triangleHeight / 6));
	var p4 = (cLeft) + "," + (cBottom - Math.floor(triangleHeight / 6));
	var dwfRectStr = "P 4 " + p1 + " " + p2 + " " + p3 + " " + p4;

	if ( document.all.diagdwf ) {
		//alert(dwfTriangleStr);
		var dwfObj = document.all.diagdwf;
		dwfObj.Add("(DWF V00.37)")
		dwfObj.Add("(Layer 999 TEMP)");
		dwfObj.Add("(Color 255,0,0,255)");  // Rot
		//dwfObj.Add("(Color 254,153,0,255)");  // Orange
		//dwfObj.Add("(Color 255,255,0,255)");  // Gelb
		//dwfObj.Add("(Color 255,255,255,255)");  // Weiss
		dwfObj.Add("(URL )");
		dwfObj.Add("V");
		dwfObj.Add("F");
		dwfObj.Add(dwfTriangleStr);
		dwfObj.Add(dwfRectStr);
		dwfObj.Add("(Layer 1)");
		dwfObj.Add("(EndOfDWF)");
	}
		
	return;
}

function deleteLayer() {
	if ( document.all.diagdwf ) document.all.diagdwf.DeleteLayer("TEMP")
	return;
}

function getArrOfLinks(partN) {
	var dwfObj = (document.layers) ? document.diagdwf : document.all.diagdwf;
	var part = partN;
	var cLink = "javascript:select('"+part+"');";
	var count = 0;
	var arrOfLinks = new Array();
	var status = dwfObj.BeginLinksSearch(cLink);
	if(status) {
		arrOfLinks[count] = new Array(count, dwfObj.GetLinkLeft());
		count++;
		while(true) {
			status = dwfObj.FindNextLink();
			if (status) {
				var lText = dwfObj.GetLinkURL();
				if (lText == cLink) {
					arrOfLinks[count] = new Array(count, dwfObj.GetLinkLeft());
					count++;
				} 
			} else {
				break;
			}
		}
	}
	arrOfLinks.sort(byLeftCoord);
	return arrOfLinks;
}

function byLeftCoord(a,b) {
	return a[1] - b[1]
}

function showDiagram(fileString)
{
	var linkRe = new RegExp("PE| |-U-|-|\\\.", "g")
	var diagLink = fileString
	if( linkRe.test(diagLink) ) {
		diagLink = diagLink.replace(linkRe, "")
	}
	//alert(diagLink)
	var foundDiagArr = searchDiagramInArray(diagLink)
	//alert(foundDiagArr.length)
	if (foundDiagArr.length == 1 ) {
		// Diese Anweisung ist nach Umstellung auf die Schaltplaninitialisierung
		// durch den StreamLoaded-Event fuer die Funktionalitaet erforderlich:
		parent.dwfheader.focus();
		var cLink = foundDiagArr[0]
		cLink = getUrlPath(location.href) + 'w' + cLink + '.html'
		parent.dwfcontent.location.href =  cLink
	} else {
		//var c1100CookieVal = 'PE' + diagLink.substr(0,2) + diagLink.substr(3,2)
		var c1100CookieVal = 'PE' + diagLink
		//alert(c1100CookieVal)
		//top.prevDatCookie[top.prevDatCookie.length] = top.aktDatCookie
		var cLink = getUrlPath(location.href)+'../web1100/diagsearch.html?'+c1100CookieVal
		location.href = cLink
	}
	window.status = ''
	return;
}

function searchDiagramInArray(diagLink) {
	var foundDiagArr = new Array();
	var count = 0;
	
	for (var groupId in groupA)
	{
		for (var diagramId in groupA[groupId].diagramA) {
			var cDiag = diagramId;
			cDiag = cDiag.replace('-U-','-');
			cDiag = cDiag.replace('.','');
			cDiag = cDiag.replace('-','');
			//alert(cDiag+' '+diagLink);
			var re = new RegExp(diagLink,"i");
			if (re.test(cDiag)) {
				var re = /^PE(.*)$/;
				re.test(cDiag);
				cDiag = RegExp.$1;
				//alert("Treffer "+cDiag);
				cDiag = cDiag.replace('-','');
				cDiag = cDiag.replace('.','');
				cDiag = cDiag.toLowerCase();
				foundDiagArr[count++] = cDiag;
			}
		}	
	}
	
	return foundDiagArr;
}

function getUrlPath(longUrl)
{
	var url = longUrl;
	if (url.lastIndexOf("?") > 0)
		url = url.substring(0, url.lastIndexOf("?") + 1)
	return url.substring(0, url.lastIndexOf("/") + 1);
}

function select(wert)
{
	if ( !parent || !parent.opener ) return;
	if (parent.menWin) parent.menWin.close();
	
	if (showTagTime > 0) clearTimeout(showTagTime);
	//showTagBool = false;
	var bauteil = wert
	var diagramFile = parent.diagramId + ".html"
	var dwfObj = document.all.diagdwf;

	parent.opener.top.partCookie= bauteil;
	var linkCount = 1;
	
	// assignmentLink
	var assignmentLink = false;
	var assignmentFile = '';
	var assignmentListEnd = parent.assignmentArray.length - 1;
	for(var i=0; i<= assignmentListEnd; i++) {
		if(bauteil == parent.assignmentArray[i])	{
			assignmentLink = true;
			linkCount++;
			break;
		}
	}

	// diagnosisLink	
	var diagnosisLink = false;
	var diagnosListEnd = parent.diagnosisArray.length - 1;
	for(var i=0; i<= diagnosListEnd; i++) {
		if(bauteil == parent.diagnosisArray[i])	{
			diagnosisLink = true;
			linkCount++;
			break;
		}
	}
	
	// connectorLink
	var connectorLink = false;
	var connectorFile = '';
	var connectListEnd = parent.connectorArray.length - 1
	for(var i=0; i<= connectListEnd; i++) {
		if(bauteil==parent.connectorArray[i]) {
			var stringEnd = diagramFile.lastIndexOf(".");
			connectorFile = diagramFile.substring(0,stringEnd);
			connectorFile = "../connector/c" + connectorFile + ".html?"+wert
			connectorLink = true;
			linkCount++;
			break;
		}
	}
	
	// cLocatorLink
    var locPart = bauteil;
    parent.opener.top.locatorPartCookie = locPart;
    var locatorLink = false;
    for(var i=0; i<parent.locatorArray.length; i++) {
		if(locPart == parent.locatorArray[i]) {
			locatorLink = true;
			linkCount++;
			break;
		}
	}
	
	// Anzeigeposition des Fensters:
	var topPos = mouseY;
	var leftPos = mouseX;
	var leftPos = mouseX + 9;
	var topPos = mouseY + 73;
	var newWinWidth = 150; 
	var newWinHeight = 98 + linkCount * 18;
	var maxNewWinTop = topPos + newWinHeight - 19;
	var winTop = dwfObj.GetWindowExtentsTop();

	if ( maxNewWinTop > winTop ) 
		topPos -= (maxNewWinTop - winTop);

	var maxNewWinRight = leftPos + newWinWidth;
	var winRight = dwfObj.GetWindowExtentsRight();
	if ( maxNewWinRight > winRight ) 
		leftPos -= (maxNewWinRight - winRight + 10);
	
	var winConf = 'titlebar=no,status=no,width='+newWinWidth+',height='+newWinHeight+',left='+leftPos+',top='+topPos;

	parent.menWin=window.open ('','fenster',winConf);
	with ( parent.menWin.document ) {
		var monthA = new Array("January","February","March","April","May","June","July","August","September","October","November","December")
		var currDate = new Date();
		var currDay = currDate.getDate();
		var currMon = currDate.getMonth();
		currMon = monthA[currMon];
		var currYear = currDate.getYear();
		var currHour = currDate.getHours();
		var currMin = currDate.getMinutes();
		var currSec = currDate.getSeconds();

		open ();
		writeln('<!-----------------------------------------------------------------------------');
		writeln('This page was dynamically generated on '+currMon+'-'+currDay+'-'+currYear+' '+currHour+':'+currMin+':'+currSec);
		writeln('Created by RLE International GmbH');
		writeln('Copyright 2004 Mercedes-Benz USA, LLC');
		writeln('------------------------------------------------------------------------------>');

    writeln("<html><head><title>&nbsp;&nbsp;"+bauteil+"&nbsp;"+partArr[bauteil]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>");
		writeln("<style>");
		writeln("td {font-size:12px;font-family:Verdana,Arial,Helvetica,SansSerif;color:#cccccc}");
		writeln("td.title {font-size: 15px; font-family : Verdana,Arial,Helvetica,SansSerif; color:#444444; background-color:#cccccc}");
		writeln("ul li {list-style-image: url(../images/pfeil.gif)}");
		writeln("a:link { color:#cccccc;}");
		writeln("a:visited { color:#cccccc;}");
		writeln("a:active { color:yellow;}");
		writeln("a:hover { color:#fe9900;}");
		writeln("</style>");

		writeln('<script>');
		writeln("function keepOnTop() {");
		writeln(" self.focus();");
		writeln("}");
		writeln("function linkToLegend(diagramFile) {");
		writeln(" if (!opener || !opener.parent || !opener.parent.dwfheader || !opener.parent.dwfcontent) return false;");
		writeln("	clearPartName();");
		writeln("	opener.parent.dwfheader.sel='legend1';");
		writeln("	opener.parent.dwfheader.resetButt();");
		writeln("	opener.parent.dwfcontent.location.assign('../legend/l' + diagramFile + '#"+bauteil+"');");
		writeln("	self.close();");
		writeln("	return false;");
		writeln("}");
		writeln("function linkToAssignment(partN) {");
		writeln(" if (!opener || !opener.parent || !opener.parent.dwfheader || !opener.parent.dwfcontent) return false;");
		writeln("	clearPartName();");
		writeln(" opener.parent.dwfheader.sel = '';");
		writeln("	opener.parent.dwfheader.resetButt();");
		writeln("	var assignmentFile = '" + relArr[bauteil] + ".html';");
		writeln("	opener.parent.dwfcontent.location.assign('../assignment/' + assignmentFile + '#"+bauteil+"');");
		writeln("	self.close();");
		writeln("	return false;");
		writeln("}");
		writeln("function linkToDiagnosis(diagnosisFile) {");
		writeln(" if (!opener || !opener.parent || !opener.parent.dwfheader || !opener.parent.dwfcontent) return false;");
		writeln("	clearPartName();");
		writeln("	opener.parent.dwfheader.sel='diagno1';");
		writeln("	opener.parent.dwfheader.resetButt();");
		writeln("	opener.parent.dwfcontent.location.assign('../diagnosis/d' + diagnosisFile + '#"+bauteil+"');");
		writeln("	self.close();");
		writeln("	return false;")
		writeln("}")
		writeln("function linkToConnector(connectorFile) {")
		writeln(" if (!opener || !opener.parent || !opener.parent.dwfheader || !opener.parent.dwfcontent) return false;");
		writeln("	clearPartName();");
		writeln("	opener.parent.dwfheader.sel='connector1';")
		writeln("	opener.parent.dwfheader.resetButt();")
		writeln("	opener.parent.dwfcontent.location.assign(connectorFile );")
		writeln("	self.close();");
		writeln("	return false;")
		writeln("}")
		writeln("function linkToLocator() {")
		writeln(" if (!opener || !opener.parent || !opener.parent.dwfheader || !opener.parent.dwfcontent) return false;");
		writeln("	clearPartName();");
		writeln("	opener.parent.dwfheader.sel='locator1';")
		writeln("	opener.parent.dwfheader.resetButt();")
		writeln("	opener.parent.dwfcontent.location.assign('../locator/locator.html');")
		writeln("	self.close();")
		writeln("	return false;")
		writeln("}")
		writeln("function closeWindow() {")
		writeln("	clearPartName();")
		writeln("	self.close();")
		writeln("	return false;")
		writeln("}")
		writeln("function clearPartName() {");
		writeln(" if (opener && opener.parent ) {");
		writeln("  if ( opener.parent.dwffooter && opener.parent.dwffooter.document.all.partname) {");
		writeln("   opener.parent.dwffooter.document.all.partname.innerText = '';");
		writeln("  }");
		writeln("  if ( opener.parent.dwfcontent )");
		writeln("   opener.parent.dwfcontent.showTagTime = 0;");
		writeln(" }");	
		writeln("}");	
		writeln('</script>')

		writeln("</head>")
		writeln('<body bgcolor="#444444" onLoad="keepOnTop()">')
    writeln("<center>")
    writeln("<table width=100%>")
    writeln("<tr><td class=title><center><b>"+bauteil+"</b></center></td></tr><tr><td>&nbsp;</td></tr>")
		writeln("<tr><td><img src='../../images/pfeil.gif' width='6' height='9' border='0'>&nbsp;&nbsp;");
		write("<a href='#' onClick='return linkToLegend(\""+diagramFile+"\")'");
		write(" style='text-decoration:none'>Legend</a></td></tr>");
		if (assignmentLink) {
			writeln("<tr><td><img src='../../images/pfeil.gif' width='6' height='9' border='0'>&nbsp;&nbsp;");
			write("<a href='#' onClick='return linkToAssignment(\""+bauteil+"\")'");
			write(" style='text-decoration:none'>Assignment</a></td></tr>");
		}
		if (diagnosisLink) {
			writeln("<tr><td><img src='../../images/pfeil.gif' width='6' height='9' border='0'>&nbsp;&nbsp;");
			write("<a href='#' onClick='return linkToDiagnosis(\""+diagramFile+"\")'");
			write(" style='text-decoration:none'>Diagnostics</a></td></tr>");
		}
		if (connectorLink) {
			writeln("<tr><td><img src='../../images/pfeil.gif' width='6' height='9' border='0'>&nbsp;&nbsp;");
			write("<a HREF='#' onClick='return linkToConnector(\""+connectorFile+"\")'");
			write(" style='text-decoration:none'>Connector</a></td></tr>");
		}
		if (locatorLink) {
			writeln("<tr> <td><img src='../../images/pfeil.gif' width='6' height='9' border='0'>&nbsp;&nbsp;");
			write("<a href='#' onClick='return linkToLocator()'");
			write(" style='text-decoration:none'>Star Finder</a></td></tr>");
		}
		writeln("<tr><td><br><a href='#' onClick='return closeWindow()' style='text-decoration:none'>");
		write("Close this window</a></td></tr></table>");
		writeln("</center>");
		writeln("<script>self.focus()</script>");
		writeln("</body></html>");
	}

	return;
}

function getMenuWindowCoord(partN) {
	var dwfObj = (document.layers) ? document.diagdwf : document.all.diagdwf;
	
	var lefIdx = 0;
	var rigIdx = 1;
	var botIdx = 2;
	var topIdx = 3;
	
	var cCoord = new Array();		// get current view coordinates
	cCoord[lefIdx] = dwfObj.GetCurrentViewLeft();
	cCoord[rigIdx] = dwfObj.GetCurrentViewRight();
	cCoord[botIdx] = dwfObj.GetCurrentViewBottom();
	cCoord[topIdx] = dwfObj.GetCurrentViewTop();
	
	var lCoord = new Array();		// get link coordinates
	var status = dwfObj.BeginLinksSearch("javascript:select('"+partN+"');");
	lCoord[lefIdx] = dwfObj.GetLinkLeft();
	lCoord[rigIdx] = dwfObj.GetLinkRight();
	lCoord[botIdx] = dwfObj.GetLinkBottom();
	lCoord[topIdx] = dwfObj.GetLinkTop();

	var pLeft = ((lCoord[rigIdx] - cCoord[lefIdx]) / (cCoord[rigIdx] - cCoord[lefIdx]));
	var pTop  = 1 - ((lCoord[topIdx] - cCoord[botIdx]) / (cCoord[topIdx] - cCoord[botIdx]));

	while (pLeft > 1) {
		var status = dwfObj.FindNextLink();
		var linkUrl = dwfObj.GetLinkURL();
		if (linkUrl != "javascript:select('"+partN+"');") continue;
		lCoord[lefIdx] = dwfObj.GetLinkLeft();
		lCoord[rigIdx] = dwfObj.GetLinkRight();
		lCoord[botIdx] = dwfObj.GetLinkBottom();
		lCoord[topIdx] = dwfObj.GetLinkTop();
	
		pLeft = ((lCoord[rigIdx] - cCoord[lefIdx]) / (cCoord[rigIdx] - cCoord[lefIdx]));
		pTop  = 1 - ((lCoord[topIdx] - cCoord[botIdx]) / (cCoord[topIdx] - cCoord[botIdx]));
	}
	
	if (pLeft > 0.8) pLeft = 0.8;
	
	var mHeight = document.all.diagdwf.offsetHeight;	// get screen height
	var mWidth  = document.all.diagdwf.offsetWidth;		// get screen width

	var wCoord = new Array();							// left and top for new window
	wCoord[0] = Math.floor(pLeft * mWidth) + 30;
	wCoord[1]  = Math.floor(pTop * mHeight) + 50;		// offset of header frame width (50px)
	
	return wCoord;		
}


function showTag(url) {
	var partItem = url;
	//if (!showTagBool) return;
	re = /\(\'(.*)\'\);$/;
	re.exec(partItem);
	partItem = RegExp.$1;
	var partName = '';
	for (var obj in partArr) {
		if (obj == partItem) {
			partName = partItem + '  ' + partArr[obj];
			break;
		}
	}
	if (parent && parent.dwffooter && parent.dwffooter.document.all.partname) {
		parent.dwffooter.document.all.partname.innerText = partName;
		if (showTagTime > 0) clearTimeout(showTagTime);
		showTagTime = setTimeout('clearPartName()',2000);
	}	
	return;
}

function clearPartName() {
	if (parent && parent.dwffooter && parent.dwffooter.document.all.partname) {
		parent.dwffooter.document.all.partname.innerText = '';
		showTagTime = 0;
	}	
	return;
}

// Saves coordinates of current view of dwf in case of blur
function saveRegion() {
	if (! enableSaveRegion) return;
	var diagramN = parent.diagramId;
	var cDocument = '';
	if (browser == "ie") {
		cDocument = "document.all"
	} else if (browser == "ns") {
		cDocument = "document"
	}
	var cDwf = eval(cDocument + ".diagdwf")
	if (cDwf && parent && parent.diagramCoord ) {
		if (! parent.diagramCoord[diagramN]) parent.diagramCoord[diagramN] = new CoordItem();
		parent.diagramCoord[diagramN].coordLeft = cDwf.GetCurrentViewLeft()
		parent.diagramCoord[diagramN].coordRight = cDwf.GetCurrentViewRight()
		parent.diagramCoord[diagramN].coordBottom = cDwf.GetCurrentViewBottom()
		parent.diagramCoord[diagramN].coordTop = cDwf.GetCurrentViewTop()
	}
}

function restoreRegion() {
	if ( !parent ) return;
	var diagramN = parent.diagramId;
	var cDocument = '';
	if (browser == "ie") {
		cDocument = "document.all"
	} else if (browser == "ns") {
		cDocument = "document"
	}
	var cDwf = eval(cDocument + ".diagdwf")
	if (cDwf) {
		var cLeft = parent.diagramCoord[diagramN].coordLeft;
		var cRight = parent.diagramCoord[diagramN].coordRight;
		var cBottom = parent.diagramCoord[diagramN].coordBottom;
		var cTop = parent.diagramCoord[diagramN].coordTop;
		cDwf.DrawView(cLeft, cRight, cBottom, cTop);
	}
	return;
}	

function CoordItem() {
	this.coordLeft = 0;
	this.coordRigth = 0;
	this.coordBottom = 0;
	this.coordTop = 0;
}

// functions for diagram menu
function closeMenuWindow() {
	if (parent && parent.menWin) parent.menWin.close();
	parent.menWin=0;
	//showTagBool=true;
	return;
}

// detect browser
function checkBrowser() {
	if ( !document.layers && document.all) {
		return 'ie';
	} else if (! document.all && document.layers) {
		return 'ns';
	}
}
