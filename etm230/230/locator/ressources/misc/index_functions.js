/*-----------------------------------------------------------------------------
This page was generated on January-03-2005 12:00:00
Created by RLE International GmbH
Copyright 2005 Mercedes-Benz USA, LLC
-----------------------------------------------------------------------------*/

function loadSubPage(){
  if(document.partform.subpart.options[document.partform.subpart.selectedIndex].value != 'Sub_component'){
    parent.locatorContent.location.href="./ressources/" + document.partform.subpart.options[document.partform.subpart.selectedIndex].value + ".html";
  }else{
   parent.locatorContent.location.href="./ressources/" + document.partform.part.options[document.partform.part.selectedIndex].value + ".html";
  }
}

function printContent() {
  window.parent.locatorContent.focus();
  window.print();
}

function loadETM() {
  window.parent.location.href='../../../start.html';
}

function enter() {
  if (window.event.keyCode == 13) {
    searchFinderPart(document.partform.searchField);
    return false;
  }
}

function checkBrowser() {
  if (! document.layers && document.all) {
    return 'ie';
  } else if (! document.all && document.layers) {
    return 'ns';
  }
}

function getIdxInSelectBox(selBox, optVal) {
  var re = /^([^ ]*)[ ]?\(.*\)$/;
  var idx = 0;
  for (i=0; i<selBox.length; i++) {
    var boxVal = selBox.options[i].value.replace('_','/');
    if (re.test(boxVal)) {
      boxVal = RegExp.$1;
    }
    if (boxVal == optVal) {
      idx = i;
      break
    }
  }
  return idx;
}

function initLocator() {
  // Menueleiste im Header zuruecksetzen
  if ( parent.parent.dwfheader ) {
    parent.parent.dwfheader.sel = "locator1";
    parent.parent.dwfheader.resetButt();
  }
  // Menueleiste im Footer zuruecksetzen
  if ( parent.parent.dwffooter ) {
    parent.parent.dwffooter.resetButt();
  }
  locatorSearchPart='';
  updateFinderBodyFrame();
}

function updateFinderBodyFrame() {
  var curr=0;
  var idx=0;
  if( parent.parent && parent.parent.opener && parent.parent.opener.top.locatorPartCookie && parent.parent.opener.top.locatorPartCookie != '') {
    var firstPart = parent.parent.opener.top.locatorPartCookie;
  } else {
    var firstPart = "-";
  }
  var selIdx = getIdxInSelectBox(document.partform.searchlist, firstPart);
  document.partform.searchlist.selectedIndex = selIdx;
  firstPart = document.partform.searchlist.options[selIdx].value.replace('_','/');
  updateFinderPart(firstPart);
}

function updateFinderPart(partName) {
  var k = 0
  var searchHit = false
  if (checkBrowser() == "ie") {
    var selectElement = window.document.partform.searchlist
    var searchElement = partName
  } else if (checkBrowser() == "ns") {
    var selectElement = window.document.partform.searchlist
    var searchElement = partName
  }
  while (selectElement.options[k] != null && searchHit == false) {
    var listString = selectElement.options[k].text.toUpperCase()
    var idx = listString.indexOf("(");
    if ( idx > 0 ) listString = listString.substring(0,idx);
    var searchString = searchElement.toUpperCase()
    if (listString == searchString) {
      selectElement.options.selectedIndex = k
      searchHit = true
    } else {
      k++
    }
  }
  if (searchHit == true)	{
    parent.locatorContent.location.href='./ressources/' + partform.searchlist.options[partform.searchlist.selectedIndex].value + '.html'
    searchElement.value = selectElement.options[k].text
    for ( var i = 0; i < partform.part.options.length; i++ ){
       if(partform.searchlist.options[partform.searchlist.selectedIndex].value == partform.part.options[i].value){
           partform.part.options.selectedIndex = i;
       }
    }
  } else {
    alert("No picture of "+searchElement.value+" available!");
  }
  return false
}

function searchFinderPart(txtField) {
  var k = 0
  var searchHit = false
  if (checkBrowser() == "ie") {
    var selectElement = window.document.partform.searchlist
    var searchElement = txtField
  } else if (checkBrowser() == "ns") {
    var selectElement = window.document.partform.searchlist
    var searchElement = txtField
  }
  while (selectElement.options[k] != null && searchHit == false) {
    var listString = selectElement.options[k].text.toUpperCase()
    var idx = listString.indexOf("(");
    if ( idx > 0 ) listString = listString.substring(0,idx);
    var searchString = searchElement.value.toUpperCase()
    if (listString == searchString) {
      selectElement.options.selectedIndex = k
      searchHit = true
    } else {
      k++
    }
  }
  if (searchHit == true)	{
    parent.locatorContent.location.href='./ressources/' + partform.searchlist.options[partform.searchlist.selectedIndex].value + '.html'
    searchElement.value = selectElement.options[k].text
    for ( var i = 0; i < partform.part.options.length; i++ ){
       if(partform.searchlist.options[partform.searchlist.selectedIndex].value == partform.part.options[i].value){
           partform.part.options.selectedIndex = i;
       }
    }
  } else {
    alert("No picture of "+searchElement.value+" available!");
  }
  return false
}