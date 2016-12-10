$(function(){
	var doc = document
	var content = ""
	

	var response = ""
	var start = 0
	var end = 0

	var max = 0

	$("#input").bind("keydown", function(e){
		if(e.altKey) {
			var selectedCode = e.keyCode - 49
			if(selectedCode >= 0 && selectedCode < max)
			{
				var input = $('#input').val()
				var td = $("table tr td")
				var res = input.substring(0, start) + $(td[selectedCode]).text() + input.substring(end, input.length)
				$('#input').val(res)
				td.text("")
			}
		}
	})

	$("#input").select(selectionChange)

	function getPositions() {
		var el = document.getElementById('input');
		var startPosition = 0;//所选文本的开始位置
		var endPosition = 0;//所选文本的结束位置
		if(document.selection) {
			//IE
			var range = document.selection.createRange();//创建范围对象
			var drange = range.duplicate();//克隆对象

			drange.moveToElementText(el);  //复制范围  
			drange.setEndPoint('EndToEnd', range);

			startPosition = drange.text.length - range.text.length;
			endPosition = startPosition + range.text.length;
		}
		else if(window.getSelection) {
			//Firefox,Chrome,Safari etc
			startPosition = el.selectionStart;
			endPosition = el.selectionEnd;
		}
		return {
			'start':startPosition,
			'end':endPosition
		}
	}

	function buildAbiliDict(OriginName, dict) {
		var heroname = dict[0]
		var ChineseName = dict[1]

		return [
			4,
			"{{A|" + OriginName + "|" + heroname + "}}",
			"[[#" + ChineseName + "|" + ChineseName,
			"[[" + OriginName + "/zh-hans|" + ChineseName + "]]",
			"[[" + heroname + "/zh-hans#" + ChineseName + "|" + ChineseName + "]]",
		]
	}

	function selectionChange() {
		var position = getPositions()

		start = position.start
		end = position.end

		var input = $('#input').val()
		var text = input.substr(start, (end - start))

		var td = $("table tr td")

		td.text("")

		if(text in Abilities)
		{
			var dict = buildAbiliDict(text, Abilities[text])
			max = dict[0]
			for(var i = 1; i <= max; i++)
			{
				$(td[i-1]).text(dict[i])
			}
		}
	}

	var Abilities = {
		"Fissure" : [
			"Earthshaker",
			"沟壑"
		],
		"Enchant Totem" : [
			"Earthshaker",
			"强化图腾"
		],
		"Aftershock" : [
			"Earthshaker",
			"余震"
		],
		"Echo Slam" : [
			"Earthshaker",
			"回音击"
		]
	}
})
