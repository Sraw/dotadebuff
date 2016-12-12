import express from 'express'
import loghelper from './logHelper'
import bodyParser from 'body-parser'
import path from 'path'
import pug from 'pug'

let port = 3000

require('gulp/bin/gulp')

if(process.env.NODE_ENV != "production")
{
	console.log("Using development mode, call the gulp to build resource.")
}
else
{
	port = 80
	console.log("Using production mode, please make sure that every resource has been prepared.")
}

let app = express()

app.use(loghelper)
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get('/',function(req, res){
	res.render('index',{
		title:"Dota怎么玩"
	})
})

app.post('/getcontent',function(req, res){
	console.log(req.body)
	var index = req.body.index
	res.send(pug.compileFile(__dirname + '/views/content/page' + index + '.pug')({
		updateTime:"2016/10/23"
	}))
})

app.get('/assistant',function(req, res){
	res.render('assistant',{
		title:"翻译助手"
	})
})

app.post('/gitpull',function(req, res){
	var token = req.body.token
	if(token == "dota_how_to_play")
	{
		run_cmd('sh', ['./deploy.sh'], function(text){ console.log(text) });
		res.send("pull success.")
	}
})

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
 
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

app.listen(port,function(){
	console.log("server started")
})