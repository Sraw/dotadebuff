import pug from "pug"

export default function(app) {


	app.get('/', function(req, res) {
		res.render('index', {
			title: "Dota怎么玩"
		})
	})

	app.post('/getcontent', function(req, res) {
		console.log(req.body)
		var index = req.body.index
		res.send(pug.compileFile(process.cwd() + '/views/content/page' + index + '.pug')({
			updateTime: "2016/12/15"
		}))
	})

	app.get('/assistant', function(req, res) {
		res.render('assistant', {
			title: "翻译助手"
		})
	})

	app.get('/privateDict', function(req, res) {
		res.render('privateDict', {
			title: "自定义词典"
		})
	})
}