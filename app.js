const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post("/compiler", function (req, res) {

    console.log("request has been sent");
    var program = {
        script: req.body.code,
        stdin: req.body.input,
        language: req.body.lang,
        versionIndex: "0",
        clientId: "c2d9bddf8e94a9808d7932573ba562a2",
        clientSecret: "ffbb735ad5e56970075eb34563189267f42231051820b956e2c59eafd2acfc74"
    };
    // console.log(program);
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
        function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            if (error == null) {
                var result = {
                    body: body,
                    status: "OK"
                }
                res.send(result);
            } else {
                var result = {
                    body: error,
                    status: "ERROR"
                }
                res.send(result);
            }

        });

});



app.listen(process.env.PORT || 3000, function () {
    console.log("server Started at 3000");
});
//------------------------ jDoodle--------------------

// clientID : c2d9bddf8e94a9808d7932573ba562a2
// clientSecret: ffbb735ad5e56970075eb34563189267f42231051820b956e2c59eafd2acfc74
//----------------------------------------------------------------------
//------------hackerearth------------------------
// client_secret:c48568e9292db1e1d3d3987306ab28f0da01c835

// const url = 'https://api.hackerearth.com/v3/code/run/';
//     const secret_key = 'c48568e9292db1e1d3d3987306ab28f0da01c835';

//     // console.log(req.body.code);
//     // console.log(req.body.input);

//     const data = {
//         'client_secret': secret_key,
//         'sourse': req.body.input,
//         'async': 0,
//         'lang': "C++14",
//         'time_limit': 5,
//         'memory_limit': 262144
//     }

//     const data1 = {
//         method: "POST",
//     }

//     var request = https.request(url, data1, function (response) {
//         response.setEncoding('utf8');
//         // console.log(response);
//         response.on("data", function (data) {
//             var put = JSON.parse(data);
//             console.log(put);
//             res.send(put);
//         });
//     });

//     request.write(JSON.stringify(data));
//     request.end();

//-----------------------------------------------------------------------

//-----------------------------------------------------------------------------
// const { c, cpp, node, python, java } = require('compile-run');
// const { json } = require("body-parser");
// const { setTimeout } = require("timers");

//-----------------------------------------------------------------------------
// https.createServer(function (req, res) {
//     var returnVal = req.on('data', async function (data) {
//         data = JSON.parse(data);
//         var inputData = String(data.input);
//         var codeData = String(data.code);
//         // console.log(codeData);
//         var answer = await runcode(codeData, inputData);

//         var result = {
//             output: answer,
//             status: "OK"
//         }
//         console.log(result.status);
//         result = JSON.stringify(result);

//         res.writeHead(200, {
//             'Content-Type': 'text/plain',
//             'Access-Control-Allow-Origin': '*' // implementation of CORS
//         });
//         res.write(result);
//         res.end();
//     });



// }).listen(4949);


// async function runcode(code, input) {
//     var output;
//     await fs.writeFile('tmp.cpp', code, 'utf-8', function (err) {
//         if (err) throw err;
//         // console.log('filelistAsync complete');
//     });
//     // fs.readFile('tmp.cpp', 'utf-8', function (err, data) {
//     //     if (err) throw err;
//     //     console.log(data);
//     // });

//     // console.log(input);
//     await cpp.runFile('tmp.cpp', { stdin: input }, (err, result) => {
//         if (err) {
//             console.log(err);
//             output = String(err.stderr);
//         }
//         else {
//             console.log(result);
//             output = String(result.stdout);
//             if (output == "") {
//                 output = String(result.stderr);
//             }
//         }
//     });

//     console.log(output);

//     return output;


// }
// app.post("/", function (req, res) {
// cpp.runFile('main.cpp', { stdin: '3\n2 ' }, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(result);
//         }
//         res.send(result.stdout);
// });
// });



