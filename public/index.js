


var codeArea = $("#code")[0];
var inputArea = $("#input")[0];
var outputArea = $("#output")[0];

// console.log(myTextArea);
var codeMirror = CodeMirror.fromTextArea(codeArea, {
    lineNumbers: true,
    mode: "text/x-c++src", //text/x-c++src
    styleActiveLine: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    keyMap: "sublime",
    theme: "monokai",
    smartIndent: true,
    indentUnit: 4,
});

var inputMirror = CodeMirror.fromTextArea(inputArea, {
    mode: "text/xml",
    styleActiveLine: true,
    theme: "monokai",
});

var outputMirror = CodeMirror.fromTextArea(outputArea, {
    mode: "text/xml",
    styleActiveLine: true,
    theme: "monokai",
});

var map = { "Ctrl-Enter": runCode };
codeMirror.addKeyMap(map);
inputMirror.addKeyMap(map);
outputMirror.addKeyMap(map);

if (localStorage.getItem('code') != null) {
    codeMirror.setValue(localStorage.getItem('code'));
}

codeMirror.setSize(null, 500);
inputMirror.setSize(null, 250);
outputMirror.setSize(null, 250);

function selectTheme() {
    var input = document.getElementById("select");
    var theme = input.options[input.selectedIndex].textContent;
    codeMirror.setOption("theme", theme);
    inputMirror.setOption("theme", theme);
    outputMirror.setOption("theme", theme);
    // location.hash = "#" + theme;
}

function changeFont() {
    var font = document.getElementById("fontsize");
    // console.log(font);
    var size = font.options[font.selectedIndex].text;

    $(".CodeMirror").css("fontSize", size);

}

function changeTmp() {
    localStorage.setItem('code', codeMirror.getValue());
}

function changeTabWidth() {
    var tab = document.getElementById("tabWidth");
    var tabsize = tab.options[tab.selectedIndex].textContent;
    codeMirror.setOption("tabSize", tabsize);
    // codeMirror.setOption("indentUnit", tabsize);

}
// ------------------------- running part---------------------


$(document).keypress(function (e) {
    // console.log(e.ctrlKey);
    // console.log(e.keyCode);
    if (e.ctrlKey && e.keyCode == 10) {
        console.log("ctrl+enter");
        runCode();
    }
});


$('#run').click(runCode);

function runCode() {
    var inputValue = String(inputMirror.getValue());
    var codeData = String(codeMirror.getValue());
    outputMirror.setValue("Running...");
    var lange = document.getElementById("lang");
    var langauge = String(lange.options[lange.selectedIndex].textContent);


    var send = {
        input: inputValue,
        code: codeData,
        lang: langauge,
        status: "OK"
    }
    // console.log(send);
    // send = JSON.stringify(send);

    $.ajax({
        type: 'POST',
        url: 'compiler',
        data: send,
        success: function (data) {
            console.log(data.body.output);
            outputMirror.setValue(data.body.output);
            document.getElementById("time").innerHTML ="Time: "+ data.body.cpuTime + "s   ";
            document.getElementById("memory").innerHTML = "Memory: " +data.body.memory + "kb";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}