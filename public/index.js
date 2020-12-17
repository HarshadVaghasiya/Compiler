
var myTextArea = $("#code")[0];
console.log(myTextArea);
var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
    lineNumbers: true,
    mode: "text/xml", //text/x-c++src
    styleActiveLine: true,
    matchBrackets: true
});

myCodeMirror.setSize(null, 500);
var input = document.getElementById("select");
function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    myCodeMirror.setOption("theme", theme);
    // location.hash = "#" + theme;
}

