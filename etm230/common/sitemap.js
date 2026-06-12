/*-----------------------------------------------------------------------------
This page was generated on September-10-2003 10:00:00
Created by RLE International GmbH
Copyright 2003 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

function load2000(model) {
	document.forms[0].ind2000.options.length = 0;
	tModel = model;
	opener.top.modelCookie = tModel;
	var tArr = eval('mainInd'+model);
	var lastI = tArr.length;
	var selBox = document.forms[0].ind2000;
	var newElem = document.createElement("OPTION");
	newElem.text = "Please select";
	newElem.value = "Please select";
	selBox.options.add(newElem);
	for (var i in tArr) {
		var newElem = document.createElement("OPTION");
		newElem.text = tArr[i];
		newElem.value = i;
		selBox.options.add(newElem);
	}
	// initialize Wiring Diagram pull down menu
	document.forms[0].ind1100.options.length = 0;
	/*var newElem = document.createElement("OPTION");
	newElem.text = "";
	newElem.value = "";
	document.forms[0].ind1100.options.add(newElem);*/
	return;
}
function load1100(c1100) {
	c1100 = c1100.toLowerCase()
	//opener.top.c1100Cookie = c1100;
	var searchTerm = c1100.substr(0,4);
	var str = "";
	var hits = "";
	var hitsBoolean = false;
	document.forms[0].ind1100.options.length = 0;
	
	var search1Re = new RegExp(searchTerm, "i");
	
	var newElem = document.createElement("OPTION");
	newElem.text = "Please select";
	newElem.value = "Please select";
	document.forms[0].ind1100.options.add(newElem);
	
	for (var cG in groupA) {
		for (var cI in groupA[cG].diagramA) {
			var idx = cI;
			if (idx == "") continue;
			var linkRe = new RegExp("[-U-]|[\.]", "gi");
			if(linkRe.test(idx)) {
			        idx = idx.replace(linkRe, "");
			}
			if( (search1Re.test(idx)) ) {
				var newElem = document.createElement("OPTION");
				newElem.text = cI+'  '+groupA[cG].diagramA[cI].description;
				newElem.value = idx.substring(2,idx.length);
				document.forms[0].ind1100.options.add(newElem);
				
				hitsBoolean = true
			}
		}
	}
}
// Schaltplan zur Anzeige bringen, dafuer wird die Funktion 
// showDiagramFromSitemap im Opener verwendet:
function showDiagram(diagramString) {
	opener.showDiagramFromSitemap(diagramString);
	self.close();
}
function showDisclaimer() {
	var request = "../common/disclaimer.html";
	location.href = request;
}
