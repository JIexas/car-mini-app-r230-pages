/*-----------------------------------------------------------------------------
This page was generated on July-26-2005 10:00:00
Created by RLE International GmbH
Copyright 2005 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

// ============================================================================
// Variablen
// ============================================================================

var sel="diagram1";

// ============================================================================
// Bilder vorladen
// ============================================================================

first_n = new Image();
first_n.src = "../images/firstpage_n.gif";
first_o = new Image();
first_o.src = "../images/firstpage_o.gif";

one_n = new Image();
one_n.src = "../images/onepage_n.gif";
one_o = new Image();
one_o.src = "../images/onepage_o.gif";

diagram_n = new Image();
diagram_n.src = "../images/diagramm_n.gif";
diagram_o = new Image();
diagram_o.src = "../images/diagramm_o.gif";
diagram_s = new Image();
diagram_s.src = "../images/diagramm_s.gif";

connector_n = new Image();
connector_n.src = "../images/connector_n.gif";
connector1=new Image();
connector1.src = "../images/connector_o.gif";
connector_s = new Image();
connector_s.src = "../images/connector_s.gif";

locator_n = new Image();
locator_n.src = "../images/locator_n.gif";
locator_o = new Image();
locator_o.src = "../images/locator_o.gif";
locator_s = new Image();
locator_s.src = "../images/locator_s.gif";

legend_n = new Image();
legend_n.src = "../images/legend_n.gif";
legend_o = new Image();
legend_o.src = "../images/legend_o.gif";
legend_s = new Image();
legend_s.src = "../images/legend_s.gif";

diagno_n = new Image();
diagno_n.src = "../images/diagno_n.gif";
diagno_o = new Image();
diagno_o.src = "../images/diagno_o.gif";
diagno_s = new Image();
diagno_s.src = "../images/diagno_s.gif";

contact_n = new Image();
contact_n.src = "../images/contact_n.gif";
contact_o = new Image();
contact_o.src = "../images/contact_o.gif";

sitemap_n = new Image();
sitemap_n.src = "../images/sitemap_n.gif";
sitemap_o = new Image();
sitemap_o.src = "../images/sitemap_o.gif";

help_n = new Image();
help_n.src = "../images/help_n.gif";
help_o = new Image();
help_o.src = "../images/help_o.gif";


// ============================================================================
// functions
// ============================================================================

function resetButt() {
	with(parent.dwfheader.document) {
		diagram1.src = (sel == "diagram1") ? diagram_s.src : diagram_n.src;
		diagno1.src= (sel == "diagno1") ? diagno_s.src : diagno_n.src;
		legend1.src= (sel == "legend1") ? legend_s.src : legend_n.src;
		connector1.src= (sel == "connector1") ? connector_s.src : connector_n.src;
		locator1.src= (sel == "locator1") ? locator_s.src : locator_n.src;
	}

	// Bei lokaler Anwendung ist diese Anweisung notwendig, damit ein DWF den 
	// Event diagdwf_StreamLoaded ausloest:
	if ( location.href.substr(0, 4) == "file" ) {
		window.focus();
	}
}

function initDwfHeader()
{
	var html = '<html><head></head><body bgcolor="#000000">';
	html += '<div id=wirename name=wirename style=\"position:absolute;top:3;';
	html += 'left:55;font-family:Arial,Helvetica;font-size:9pt;font-weight:bold;';
	html += 'color:white;\">&nbsp;</div></body></html>';
	
	return html;
}

// ============================================================================
// Cut off the hash and the filename of an URL and return the path
// ============================================================================
function getUrlPath(longUrl)
{
	var longUrlPath = longUrl;
	// Cut off hash
	var idx=longUrlPath.lastIndexOf("?");
	if ( idx != -1 ) longUrlPath = longUrlPath.substring(0,idx);
	// Cut off filename
	idx=longUrlPath.lastIndexOf("/");
	if ( idx != -1 ) longUrlPath = longUrlPath.substring(0,idx+1);
	return longUrlPath;
}

// ============================================================================
// Funktionen der Menueleiste
// ============================================================================

function goHome() {
	if (parent.menWin) parent.menWin.close();

	parent.opener.top.diagCallerInfo='';
	parent.opener.top.location.href = "../modelsel.html";
	parent.opener.focus();
	parent.close();
	return false;
}

function goBack() {
	if (parent.menWin) parent.menWin.close();

	parent.opener.focus();
	parent.close();
	return false;
}

function firstdiagram()
{
	if (parent.menWin) parent.menWin.close();

	if (! parent.opener.top.startDatCookie) {		// global variables are lost
		parent.location.href = "./start.html";
		return;
	}
	var request = parent.opener.top.startDatCookie;
	var re = /^(.*)(\?.*)$/;
	if ( re.test(request) ) request = RegExp.$1;
	
	re = /^w(.*)\.html$/;
	re.test(request);
	var cDiagramId = RegExp.$1;
	if (parent.diagramCoord[cDiagramId]) {
		delete(parent.diagramCoord[cDiagramId]);	// delete saved coordinates
	}
	parent.dwfcontent.enableSaveRegion = false; // prevent coordinates from saving
	request = getUrlPath(location.href) + "diagram/" + request;
	parent.dwfcontent.location.href = request;
}

function goOnePageBack()
{
	if (parent.menWin) parent.menWin.close();
	if ( !parent || !parent.dwfcontent ) return false;

	var testpfad=parent.dwfcontent.location.href;
	//alert("testpfad: "+testpfad);
	var idx = testpfad.lastIndexOf("?");
	if ( idx != -1 ) testpfad = testpfad.substring(0, idx);
	idx = testpfad.lastIndexOf("#");
	if ( idx != -1 ) testpfad = testpfad.substring(0, idx);

	var testbegin=testpfad.lastIndexOf("/");
	testbegin+=1;
	var testend=testpfad.lastIndexOf(".");
	var testdat = testpfad.substring(testbegin,testend);
	//alert("testdat: "+testdat);
	testdat = testdat + ".html";
	testdat = testdat.toLowerCase();
	// Zurueck zu start.html, falls startDatCookie nicht mehr existiert
	if (! parent.opener.top.startDatCookie) {	
		parent.location.href = "./start.html";
		return false;
	}
	var testcook = parent.opener.top.startDatCookie;
	testcook = testcook.toLowerCase();

	idx = testcook.lastIndexOf("?");
	if ( idx != -1 ) testcook = testcook.substring(0, idx);

	if (testdat != testcook) {
		parent.dwfcontent.history.back();
	}
	return false;
}

function mousefunction()
{
	alert("Click with right mouse button on diagram for \n\n\- moving\t(Arrow keys)\n\- zooming\t(PageUp/Dn)\n\- printing\n\nwith whip!");
}

function viewDiagram()
{
	if (parent.menWin) parent.menWin.close();

	if (! parent.opener.top.startDatCookie) {		// global variables are lost
		parent.location.href = "./start.html"
		return;
	}
	var diagramDat = parent.opener.top.aktDatCookie
	var testpfad=parent.dwfcontent.location.href
	var testbegin=testpfad.lastIndexOf("/")
	testbegin += 1
	var testend=testpfad.lastIndexOf(".")
	var testdat = testpfad.substring(testbegin,testend)
	testdat = testdat + ".html"
	testdat = testdat.toLowerCase()
	var testcook = parent.opener.top.startDatCookie
	testcook = testcook.toLowerCase()
	if (testdat != testcook) {
		var request = getUrlPath(location.href) + "diagram/w" + diagramDat
		parent.dwfcontent.location.href = request
	}
}

function viewLegend()
{
	if (parent.menWin) parent.menWin.close();

	parent.opener.top.partCookie = '';
	if (! parent.opener.top.aktDatCookie) {		// global variables are lost
		parent.location.href = "./start.html";
		return;
	}
	var legdat = parent.opener.top.aktDatCookie;
	//alert('./legend/l'+legdat)

	with(parent.dwfcontent.document) {
		clear();
		open();
		writeln('<html><head><title>Legend</title>');
		writeln('</head>');
		writeln('<frameset rows="50,*" frameborder="no" border="0" framespacing="0">');
		writeln('<frame name="htop" src="leghead.html" scrolling="no" border="0">');
		write('<frame name="hmid" src="./legend/l');
		write(legdat);
		write('" border="0">');
		writeln('</frameset>');
		writeln('</html>');
		close();
	}
}

function viewDiagnosis()
{
	if (parent.menWin) parent.menWin.close();

	parent.opener.top.partCookie = '';
	if (! parent.opener.top.startDatCookie) {		// global variables are lost
		parent.location.href = "./start.html";
		return;
	}
	var cDiagnosisFile = parent.opener.top.aktDatCookie;

	if(parent.diagnosisArray.length == 0) {
		with(parent.dwfcontent.document) {
			clear();
			open();
			writeln('<html>');
			write('<style>.info{font-size: 12px;font-family:Verdana,Arial,');
			writeln('Helvetica,SansSerif;color:#cccccc;}</style>');
			writeln('<script language="Javascript">');
			writeln('function initDoc() {');
			writeln(' if (parent.dwffooter) parent.dwffooter.resetButt();');
			writeln(' if (parent.dwfheader) {');
			writeln('   parent.dwfheader.sel = "diagno1";');
			writeln('   parent.dwfheader.resetButt();');
			writeln(' }');
			writeln('}');
			writeln('</script>');
			writeln('<body bgcolor="#444444" onLoad="initDoc()"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
			writeln('<span class="info">No information about diagnosis</span>');
			writeln('</body></html>');
			close();
		}
	} else {
		with(parent.dwfcontent.document) {
			clear()
			open()
			writeln('<html><head><title>Diagnostics</title></head>');
			writeln('<frameset rows="50,*" frameborder="no" border="0" framespacing="0">');
			write('<frame name="htop" SRC="./diagnosis/h');
			write(cDiagnosisFile);
			writeln('" scrolling=no border=0>');
			write('<frame name="hmid" src="./diagnosis/d');
			write(cDiagnosisFile);
			writeln('" border="0">');
			writeln('</frameset></html>');
			close();
		}
	}
}

function viewConnector() {
	if (parent.menWin) parent.menWin.close();

	parent.opener.top.partCookie = '';

	if (! parent.opener.top.aktDatCookie) {		// global variables are lost
		parent.location.href = "./start.html";
		return;
	}
	var cConnectorFile = parent.opener.top.aktDatCookie;
	var stringEnd = cConnectorFile.lastIndexOf(".")
	cConnectorFile = cConnectorFile.substring(0,stringEnd)
	
	if(parent.connectorArray.length == 0) {
		with(parent.dwfcontent.document) {
			clear()
			open()
			writeln('<html>');
			write('<style>.info{font-size: 12px;font-family:Verdana,Arial,');
			writeln('Helvetica,SansSerif;color:#cccccc;}</style>');
			writeln('<script language="Javascript">');
			writeln('function initDoc() {');
			writeln(' if (parent.dwffooter) parent.dwffooter.resetButt();');
			writeln(' if (parent.dwfheader) {');
			writeln('   parent.dwfheader.sel = "connector1";');
			writeln('   parent.dwfheader.resetButt();');
			writeln(' }');
			writeln('}');
			writeln('</script>');
			writeln('<body bgcolor="#444444" onLoad="initDoc()"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
			writeln('<span class="info">No connector file provided</span>');
			writeln('</body></html>');
			close();
		}
	} else {
		cConnectorFile = getUrlPath(location.href) + "connector/c" + cConnectorFile + ".html";
		parent.dwfcontent.location.href = cConnectorFile;
	}
}

function viewLocator() {
	if (parent.menWin) parent.menWin.close();

	parent.opener.top.finderPartCookie = '-';
	var winConf = "width=940,height=610,left=5,top=5,status=no,toolbar=no,location=no,resizable=yes"
	newWin = window.open("./locator/locator.html","locator",winConf);
	newWin.focus();
}

function initFmenu()
{
	if (parent.dwfcontent.nameit)
		parent.dwfcontent.nameit()
	else
		setTimeout("if(parent.dwfcontent.nameit){parent.dwfcontent.nameit()}",3000)
}

function openHelpWindow() {
	if (parent.menWin) parent.menWin.close();

	window.focus();
	var winLoc = '../common/help.html';
	var winConf = 'status=no,toolbar=no,locationbar=no,scrollbars=yes,';
	winConf += 'width=535,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	return false;
}

function openAbbreviationWindow() {
	if (parent.menWin) parent.menWin.close();

	window.focus();
	var winLoc = 'abbindex.html';
	var winConf = 'status=no,toolbar=no,locationbar=no,scrollbars=yes,';
	winConf += 'width=900,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	return false;
}

function openContactWindow() {
	if (parent.menWin) parent.menWin.close();

	window.focus();
	var winLoc = '../common/contact.html';
	var winConf = 'status=no,toolbar=no,locationbar=no,scrollbars=yes,';
	winConf += 'width=535,height=600,left=50,top=30';
	newWin = window.open(winLoc, 'n', winConf);
	newWin.focus();
	return false;
}

function openSitemapWindow() {
	if (parent.menWin) parent.menWin.close();

	window.focus();
	var winLoc = '../common/sitemap.html';
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
	parent.opener.top.diagCallerType = parent.opener.top.CALLER_ZERO;
	parent.opener.top.diagCallerInfo = "";
	var myDiagramString = diagramString + ".html";
	myDiagramString = myDiagramString.toLowerCase();
	parent.opener.top.startDatCookie = "w" + myDiagramString;
	parent.opener.top.aktDatCookie = myDiagramString;
	parent.opener.top.allowMessage = true;
	var request = "../" + parent.opener.top.modelCookie + "/d1index.html";
	parent.location.href = request;
	return;	
}
