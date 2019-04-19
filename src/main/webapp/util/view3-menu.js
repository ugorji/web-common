//ensure this is added to the onload
function oxywiki_view3_menu_startList() {
  if (document.all&&document.getElementById) {
    navRoot = document.getElementById("oxywiki_view3nav");
    for (i=0; i<navRoot.childNodes.length; i++) {
      node = navRoot.childNodes[i];
      if (node.nodeName=="LI") {
        node.onmouseover=function() {
          this.className+=" over";
        }
        node.onmouseout=function() {
          this.className=this.className.replace(" over", "");
        }
      }
    }
  }
}
function hideSelect() {if (document.all){document.all.hideme.style.visibility="hidden";}}
function unhideSelect() {if (document.all){document.all.hideme.style.visibility="visible";}}
