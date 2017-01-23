import express from "express"
import loghelper from "./logHelper"
import bodyParser from "body-parser"
import path from "path"
import pug from "pug"
import compress from "compression"
import Router from "./router"

let port = 8080

require("gulp/bin/gulp")

if (process.env.NODE_ENV != "production") {
	console.log("Using development mode.")
}
else {
	port = 80
	console.log("Using production mode.")
}

let app = express()

app.use(compress())
app.use(loghelper)
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

Router(app)

app.listen(port, function(){
	console.log("server started at", port)
})
