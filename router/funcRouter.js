export default function(app) {
	let privateDict = {}
	try {
		privateDict = require(process.cwd() + '/public/privateDict/dict.json')
	} catch (e) {
		console.log(e)
		privateDict = {}
	}
	console.log(privateDict)

	app.post('/download_pd', function(req, res) {
		if (privateDict == null) {
			res.status(500).json({
				message: 'no privateDict'
			})
		} else {
			res.status(200).json(privateDict)
		}
	})

	app.post('/upload_pd', function(req, res) {
		let fs = require('fs')
		console.log(req.body)
		Object.assign(privateDict, req.body)
		let jsonfilepath = process.cwd() + '/public/privateDict/dict.json'

		try {
			fs.writeFile(jsonfilepath, JSON.stringify(privateDict, null, 2), 'utf8');
			res.status(200).json({
				message: "successfully update the privateDict"
			})
		} catch (e) {
			res.status(500).json({
				message: e
			});
		}
	})

	app.post('/gitpull', function(req, res) {
		var token = req.body.token
		console.log("token:" + token)
		if (token == "dota_how_to_play") {
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
}