import express from 'express'
import loghelper from './logHelper'
import bodyParser from 'body-parser'
import path from 'path'
import pug from 'pug'
import compress from "compression"

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

app.use(compress())
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
		updateTime:"2016/12/15"
	}))
})

app.get('/assistant',function(req, res){
	res.render('assistant',{
		title:"翻译助手"
	})
})

app.post('/gitpull',function(req, res){
	var token = req.body.token
	console.log("token:" + token)
	if(token == "dota_how_to_play")
	{
		console.log("start pulling")

		var commands = 'cd /root/dota_how_to_play && git pull'

		var cp = require('child_process');
		
		cp.exec(commands, function(err, out, code) {
			if (err instanceof Error) {
				res.status(500)
				res.send('Server Internal Error.')
				throw err
			}
			//process.stderr.write(err)
			//process.stdout.write(out)
			res.status(200)
			res.send('Deploy Done.')
			console.log("pulling OK")

			cp.exec('pm2 reload 0')
		})
	}
})

app.listen(port,function(){
	console.log("server started")
})