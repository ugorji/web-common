//the aCustomstr should be scoped to the application

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
  return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
  return this.replace(/\s+$/,"");
}

oxy_message_to_box = '';

function oxy_alert(s) {
  oxy_message_to_box = oxy_message_to_box + s  + '<br/>\n'; 
}
function oxy_alert_update() {
  document.getElementById('pre_oxy_message_to_box').innerHTML = oxy_message_to_box;
}

function oxy_select_tab(aIdx, aCustomstr) {
  aStr0 = 'oxy-tabpane' + aCustomstr + '-tab-';
  aStr = aStr0 + aIdx;
  aObjs = document.getElementsByTagName('td');
  for(var i = 0; i < aObjs.length; i++) {
    if(aObjs[i].id && aObjs[i].id.indexOf(aStr0) == 0) {
      if(aObjs[i].id == aStr) {
        aObjs[i].className = 'oxy-tabpane-tab-active';
        //alert('making it active: ' + aStr);
      } else {
        aObjs[i].className = 'oxy-tabpane-tab-inactive';
      }
    }
  }
  //return;
  aStr0 = 'oxy-tabpane' + aCustomstr + '-div-' ;
  aStr = aStr0 + aIdx;
  aObjs = document.getElementsByTagName('div');
  for(var i = 0; i < aObjs.length; i++) {
    if(aObjs[i].id && aObjs[i].id.indexOf(aStr0) == 0) {
      if(aObjs[i].id == aStr) {
        aObjs[i].style.display = 'block';
        //alert('making it visible: ' + aStr);
      } else {
        aObjs[i].style.display = 'none';
      }
    }
  }
}

function oxywiki_toggle_visibility_for_id(aId) {
  //alert("sucker");
  aObj = document.getElementById(aId);
  oxywiki_toggle_visibility_for_obj(aObj);
}

function oxywiki_toggle_visibility_for_id_prefix(aIdPrefix) {
  //alert("help");
  aObjs = document.getElementsByTagName('div');
  for(var i = 0; i < aObjs.length; i++) {
    if(aObjs[i].id && aObjs[i].id.indexOf(aIdPrefix) == 0) {
      oxywiki_toggle_visibility_for_obj(aObjs[i]);
    }
  }
}

function oxywiki_toggle_visibility_for_tag(aTagName, aIdPrefix) {
  //alert("help");
  aObjs = document.getElementsByTagName(aTagName);
  for(var i = 0; i < aObjs.length; i++) {
    if(aIdPrefix) {
      if(aObjs[i].id && aObjs[i].id.indexOf(aIdPrefix) == 0) {
        oxywiki_toggle_visibility_for_obj(aObjs[i]);
      } 
    } else {
      oxywiki_toggle_visibility_for_obj(aObjs[i]);
    }
  }
}

function oxywiki_toggle_visibility_for_obj(aObj) {
  if(aObj.style.display == "block") {
    aObj.style.display = "none";
  } else {
    aObj.style.display = "block";
  } 
}

function oxy_confirm_and_go(promptMsg, urlToGo) {
  if(confirm(promptMsg)) { 
    location.href = urlToGo; 
  }
}

function oxy_get_cookie(c_name)
{
  if (document.cookie.length>0) {
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1) { 
      c_start=c_start + c_name.length+1 
      c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
  return null;
}

function oxy_set_cookie(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function oxy_get_named_anchor() {
  var s = location.href;
  var a = null;
  var i = s.lastIndexOf('#');
  if(i != -1) { 
    a = s.substring(i + 1, s.length);
    if(a.trim().length == 0) {
      a = null;
    }
  }
  return a;
}

function oxy_autoselect_tab(arr0, cookie0, prefix0) {
  var tabseldone = false;
  if(tabseldone == false && arr0 != null) {
    var anch = oxy_get_named_anchor();
    if(anch != null) {
      for(var i = 0; i < arr0.length; i++) {
        if(anch == arr0[i]) {
          oxy_select_tab(i + 1, prefix0);
          tabseldone = true;
        }
      }
    }
  }
  if(tabseldone == false && cookie0 != null && prefix0 != null) {
    var i = oxy_get_cookie(cookie0);
    if(i != null) {
      oxy_select_tab(i, prefix0);
      tabseldone = true;
    }
  }
}

function oxy_get_selected_radio(r1) {
  var r1checked = null;
  for(var i = 0; i < r1.length; i++) {
    if(r1[i].checked) {
      r1checked = i;
      break;
    }
  }
  return r1checked;
}

function oxy_get_selected_radio_value(r1) {
  var r1checked = oxy_get_selected_radio(r1);
  if(r1checked != null) {
    return r1[r1checked].value;
  }
  return null;
}


//oxy_alert('  styleSheet: ' + styleSheet.href + ' media: ' + styleSheet.media);
//if(cssRule && cssRule.selectorText) { oxy_alert('    cssRule.selectorText: ' + cssRule.selectorText); }
//oxy_alert('found rule: stylesheet: ' + styleSheet + ' rule: ' + cssRule);
function oxy_get_last_css_rule(ruleName) {
  ruleName=ruleName.toLowerCase();
  if (document.styleSheets) {
    for (var i=document.styleSheets.length - 1; i >= 0; i--) {
      var styleSheet=document.styleSheets[i];
      var therules = styleSheet.rules;
      if (styleSheet.cssRules) {
        therules = styleSheet.cssRules;
      }
      for(var ii = therules.length - 1; ii >= 0; ii--) {
        if (therules[ii] && therules[ii].selectorText && therules[ii].selectorText.toLowerCase()==ruleName) {
          return therules[ii];
        }
      }
    }
  }
  return null;
}

