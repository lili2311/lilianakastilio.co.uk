/** Find out the browser version and  name by  lili2311 (Liliana Kastilio) **/
function get_browser(){
  var N=navigator.appName, ua=navigator.userAgent, tem;
  var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
  return M[0];
}

function get_browser_version(){
  var N=navigator.appName, ua=navigator.userAgent, tem;
  var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
  return M[1];
}
// Browser
var browser = document.createElement("div");
browser.innerHTML = get_browser();
browser.setAttribute('class', 'browser-version'); 
document.getElementById("container").appendChild(browser);
// text
var text = document.createElement("div");
text.innerHTML = "version";
text.setAttribute('class', 'text'); 
document.getElementById("container").appendChild(text);
// Version
var version = document.createElement("div");
version.innerHTML = get_browser_version();
version.setAttribute('class', 'browser-version'); 
document.getElementById("container").appendChild(version);