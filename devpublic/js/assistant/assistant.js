$(function(){
	var youdaoUrl = "http://fanyi.youdao.com/openapi.do?keyfrom=Translateapp80&key=2011563925&type=data&doctype=jsonp&version=1.1&q="
	
	var start = 0
	var end = 0

	var indicateMax = 0

	var ue = UE.getEditor('editor');

	ue.addListener('keydown', ReplaceFromDict)
	ue.addListener('keydown', QueryForTrans)

	ue.addListener('selectionchange', selectionChange)

 	function selectionChange(type) {
 		var text = ue.selection.getText()
 		var td = $(".indicate")

     	td.text("")

     	var dict = []

     	dict = dict.concat(Abilities.buildDict(text))
     	dict = dict.concat(Items.buildDict(text))
     	dict = dict.concat(Systems.buildDict((text)))
     	dict = dict.concat(Heros.buildDict((text)))

		indicateMax = dict.length
		for(var i = 0; i < indicateMax; i++)
		{
			$(td[i]).text(dict[i])
		}
 	}

	function ReplaceFromDict(type, e) {
		var selectedCode = e.keyCode - 49

		if(e.altKey)
		{
			if (selectedCode >= 0 && selectedCode < indicateMax && indicateMax != 0) {
				var value = $($(".indicate")[selectedCode]).text()
				ue.execCommand('insertHtml', value)
				indicateMax = 0
			}
		}
	}

	function QueryForTrans(type, e) {
		if(e.altKey && e.keyCode == 81)
		{
			var text = ue.selection.getText()
			console.log(text)

     		if(!text.match(/^[\u4e00-\u9fa5]+$/))
     		{
				$.ajax({
					url: youdaoUrl + encodeURI(text),
					type: "GET",
					dataType: "jsonp",
					jsonpCallback: "show",
					success: function(json) {
						switch(json.errorCode)
						{
							case 0:
								$("#trans").text(json["translation"][0])
								if("basic" in json)
								{
									var value = ""
									for(var i = 0; i < json.basic.explains.length;i++)
									{
										value += json.basic.explains[i] + '\n'
										$("#dictionary").val(value)
									}
								}
								else
								{
									$("#dictionary").val("")
								}
								break
							case 20:
								$("#trans").text("要翻译的文本过长")
								break
						}
						
					},
					complete: function(data) {
						console.log(data)
					},
					error: function() {
						$("#trans").text("出现错误，可能由于选中文本过长")
					}
				})
			}
			else
			{
				$("#trans").text("")
				$("#dictionary").val("")
			}
		}
	}
})
