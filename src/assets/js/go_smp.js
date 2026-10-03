function gosmp() {
var url = window.location;
var path = url.href.split('/');
var file_name = path.pop();
document.write("<a href='mobile/" + file_name + "'>");
}

function gosmp2() {
var url = window.location;
var path = url.href.split('/');
var file_name = path.pop();
document.write("<a href='mobile/advice/" + file_name + "'>");
}
