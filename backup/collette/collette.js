var colors = ["#13A4AE","#A3A948","#89686a","#395B5E","#ffc300","#46a28d","#ff6633", "#46a28d","#B3DEA6","#EF4E4E","#FBFBFB","#F6F6F6","#2dbdba","#181818","#1abc9c","#2ecc71","#3498db","#21b8c3","#9d5cb7","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#c0392b","#f1c40f","#e67e22","#e74c3c","#f39c12","d9534f","#6acaf4","#f66d25","#ff3c50","#93E76E","#EB666E","#00e7b4","#d6d6d6","#01b1be","#f2918a","#84729c","#565656","#c1edf3","#f58065","#00979c","#e34c00","#68ad94","#00979C","#f1cc20","#6f5499","#feead5","#f36a5e","#5c6982","#e0e6e7","#77c7ac","#FF4351","#FF667A","#ED4694","#394e63","#DB49D8","#F668CA","#DCD4F9","#7B72E9","#1B9AF7","#55DAE1","#B6F9B2","#49E845","#A5DE37","#FFEB94","#FFE93B","#FEAE1B","#FE9949","#FD6631","#FC880F", "#50c3af"];
function getContrast(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}
function displayColor(color){
  if(color[0] == "#")
    var color = color.substring(1);
  var fullcolor = "#"+color;
  //document.getElementById("color-text-1").innerHTML = "#"+color;
  var colorli =  document.createElement("li");
  //browser.innerHTML = get_browser();
  //browser.setAttribute('class', 'browser-version'); 
  document.getElementById("color-list").appendChild(colorli);
  var colordiv = document.createElement("div");
  colordiv.setAttribute("class","color-circle");
  colordiv.setAttribute("style","background-color:"+fullcolor);
  var colortext = document.createElement("span");
  colortext.setAttribute("class","color-text");
  var a = "color:" + getContrast(color);
  console.log(a);
  colortext.setAttribute("style",a );
  colortext.innerHTML = "#"+color;
  colordiv.appendChild(colortext);
  colorli.appendChild(colordiv);
  
}
function send(event){  
    /* do what you want with the form */
    var color = document.getElementById("color-input").value;
    if (color && color.length == 6){
      console.log(color); 
      displayColor(color);
    }

    // You must return false to prevent the default form behavior
   event.preventDefault();
}
function checkEnter(e){
 e = e || event;
 var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
 return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

document.querySelector('form').onkeypress = checkEnter;
document.querySelector("form").addEventListener('submit', send, true);
//use http://bgrins.github.io/TinyColor/ to validate colours
window.onload = function () {  
  for(i=0; i< colors.length; i++){
    console.log("on laod");
    displayColor(colors[i]);
  }
  
};function getContrast(e){var t=parseInt(e.substr(0,2),16);var n=parseInt(e.substr(2,2),16);var r=parseInt(e.substr(4,2),16);var i=(t*299+n*587+r*114)/1e3;return i>=128?"black":"white"}function displayColor(e){if(e[0]=="#")var e=e.substring(1);var t="#"+e;var n=document.createElement("li");document.getElementById("color-list").appendChild(n);var r=document.createElement("div");r.setAttribute("class","color-circle");r.setAttribute("style","background-color:"+t);var i=document.createElement("span");i.setAttribute("class","color-text");var s="color:"+getContrast(e);console.log(s);i.setAttribute("style",s);i.innerHTML="#"+e;r.appendChild(i);n.appendChild(r)}function processForm(){var e=document.getElementById("color-input").value;if(e&&e.length==6){console.log(e);displayColor(e)}return false}function checkEnter(e){e=e||event;var t=/textarea/i.test((e.target||e.srcElement).tagName);return t||(e.keyCode||e.which||e.charCode||0)!==13}var colors=["#13A4AE","#A3A948","#395B5E","#ffc300","#46a28d","#ff6633","#46a28d","#B3DEA6","#EF4E4E","#FBFBFB","#F6F6F6","#2dbdba","#181818","#1abc9c","#2ecc71","#3498db","#9d5cb7","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#c0392b","#f1c40f","#e67e22","#e74c3c","#f39c12","d9534f","#6acaf4","#f66d25","#ff3c50"];document.getElementById("submit-color").addEventListener("click",processForm);document.querySelector("form").onkeypress=checkEnter;window.onload=function(){for(i=0;i<colors.length;i++){console.log("on laod");displayColor(colors[i])}}
