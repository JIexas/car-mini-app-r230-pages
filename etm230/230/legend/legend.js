/*-----------------------------------------------------------------------------
This page was generated on September-10-2003 10:00:00
Created by RLE International GmbH
Copyright 2003 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

function checkHash()
{
	// Menueleiste im Header zuruecksetzen
	if ( parent.parent.dwfheader ) {
		parent.parent.dwfheader.sel = "legend1";
		parent.parent.dwfheader.resetButt();	
	} else if ( parent.dwfheader ) {
		parent.dwfheader.sel = "legend1";
		parent.dwfheader.resetButt();	
	}	else {
		return;
	}
	// Menueleiste im Footer zuruecksetzen
	if (parent.parent.dwffooter ) {
		parent.parent.dwffooter.resetButt();
	} else if ( parent.dwffooter ) {
		parent.dwffooter.resetButt();
	}
	var cOpener;
	if (parent.parent.dwfheader) 
		cOpener = parent.parent.opener;
	else if (parent.dwfheader)
		cOpener = parent.opener;

	if(cOpener.top.partCookie)
	{
		var rowColor = "black";
		var zielAnk = cOpener.top.partCookie;
		var fullPathName = "";
		var legTableEnd = document.all.legtable.rows.length;
		for(var i=0; i< legTableEnd; i++) 
		{
			var cId = document.all.legtable.rows(i).id;
			if (cId == zielAnk) {
				rowColor = "blue";
				document.all.legtable.rows(i).style.color = rowColor;
				var spanAnk = zielAnk;
				spanAnk = spanAnk.replace('/','_');
				spanAnk = spanAnk.replace('-','_');
				if (eval('document.all.'+spanAnk+'_id')) {
					var cObj = eval('document.all.'+spanAnk+'_id')
					cObj.style.color = rowColor;
				}
				var charArr = new Array('1','2','3','A','B','C','D','E');
				for (var cChar in charArr)
				{
					if (eval('document.all.'+spanAnk+'_'+charArr[cChar]+'_id')) {
						var cObj = eval('document.all.'+spanAnk+'_'+charArr[cChar]+'_id')
						cObj.style.color = rowColor;
					}
				}
			} else {
				rowColor = "black";
				document.all.legtable.rows(i).style.color = rowColor;
			}
		}
		if ( parent.dwfcontent ) 
			setTimeout("parent.dwfcontent.scrollBy(0,-7)",100);
	}
	//self.focus();
}

function view(letter)
{
	self.focus();
	var hashRequest = letter
	hashRequest = hashRequest.toUpperCase() 
	var rowColor = "black"
	var anchorBoolean = false
	var legTableEnd = parent.hmid.document.all.legtable.rows.length
	var idFirstLetter = ""
	var anchorArrayItem = ""
	var fullPathName = ""

	for(var i=1; i< legTableEnd; i++) 
	{
		idFirstLetter = parent.hmid.document.all.legtable.rows(i).id;
		idFirstLetter = idFirstLetter.substr(0, 1);
		idFirstLetter = idFirstLetter.toUpperCase();
		if(idFirstLetter == hashRequest)
		{
			rowColor = "blue";
		}
		else
		{
			rowColor = "#111111";
		}
		parent.hmid.document.all.legtable.rows(i).style.color = rowColor;
	}

	for (var i=0; i<parent.hmid.spanIdArr.length; i++)
	{
		var cSpanId = parent.hmid.spanIdArr[i];
		var cFirstLetter = cSpanId.substr(0,1);
		cFirstLetter = cFirstLetter.toLowerCase();

		if (eval('parent.hmid.document.all.'+cSpanId)) {
			var cSpanObj = eval('parent.hmid.document.all.'+cSpanId);
			if (cFirstLetter == letter) {
				cSpanObj.style.color = 'blue';
			} else {
				cSpanObj.style.color = 'black';
			}
		}
	}
	
	anchorArrayEnd = parent.hmid.document.anchors.length
	for(i=1; i< anchorArrayEnd; i++)
	{
		anchorArrayItem = parent.hmid.document.anchors[i].name
		if((anchorArrayItem == hashRequest) && (hashRequest != "D"))
		{
			anchorBoolean = true
		}
	}
	if(anchorBoolean == true)
	{
		fullPathName = getPureFileName(parent.hmid.location.href)
		fullPathName = fullPathName + "#" + hashRequest
	}
	else
	{
		fullPathName = getPureFileName(parent.hmid.location.href)
		fullPathName = fullPathName + "#legend"
	}
	parent.hmid.location.href = fullPathName
	setTimeout("parent.hmid.scrollBy(0,-4)",100);
}

function getPureFileName(longUrl)
{
	var longUrlPath = longUrl
	var testEnd=longUrlPath.lastIndexOf("#")
	if(testEnd>0)
	{	
	    longUrlPath = longUrlPath.substring(0,testEnd)
	}
	return longUrlPath
}

function zoomPart(partN) 
{
	var cDwfHeader;
	var cLocation;
	var cOpener;
	if (parent.dwfheader) {
		cDwfHeader = parent.dwfheader;
		cLocation = location;
		cOpener = parent.opener;
	} else if (parent.parent.dwfheader) {
		cDwfHeader = parent.parent.dwfheader;
		cLocation = parent.location;
		cOpener = parent.parent.opener;
	} else {
		return;
	}
	cDwfHeader.sel='diagram1';
	cDwfHeader.document.legend1.src='../images/legend_n.gif';
	cDwfHeader.document.diagram1.src='../images/diagramm_s.gif';
	var request = '../diagram/w' + cOpener.top.aktDatCookie + '?' + partN;
	// Diese Anweisung ist nach Umstellung auf die Schaltplaninitialisierung
	// durch den StreamLoaded-Event fuer die Funktionalitaet erforderlich:
	cDwfHeader.focus();
	cLocation.href = request;
	return false;
}

function closeMenuWindow() {
	if (parent.menWin) {
		parent.menWin.close();
		parent.menWin=0;
	} else if ( parent.parent.menWin ) {
		parent.parent.menWin.close();
		parent.parent.menWin=0;
	}
	showTagBool=true;
	return;
}
// ============================================================================
// Leertext in der Statuszeile anzeigen:
// ============================================================================
function noStatus() {
	window.status = "";
	return true;
}

