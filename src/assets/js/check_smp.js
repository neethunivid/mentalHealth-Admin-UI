/* スマートフォンへ */

window.onload = function(){
function gosmpbnr(){
if(navigator.userAgent.indexOf("iPhone",0) >= 0){
document.getElementById("gosmpbnr").style.display = 'block';
}
if((navigator.userAgent.indexOf("Android",0) >= 0) && (navigator.userAgent.indexOf("Mobile",0) >= 0)){
document.getElementById("gosmpbnr").style.display = 'block';
}
if(navigator.userAgent.indexOf("BlackBerry",0) >= 0){
document.getElementById("gosmpbnr").style.display = 'block';
}
if(navigator.userAgent.indexOf("iPod",0) >= 0){
document.getElementById("gosmpbnr").style.display = 'block';
}
}

gosmpbnr()
}