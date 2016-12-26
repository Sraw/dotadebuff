$(function() {
	var youdaoUrl = "http://fanyi.youdao.com/openapi.do?keyfrom=Translateapp80&key=2011563925&type=data&doctype=jsonp&version=1.1&q="

	var start = 0
	var end = 0

	var indicateMax = 0

	//console.log(privateDict)

	var ue = UE.getEditor('editor');

	ue.addListener('keydown', ReplaceFromDict)
	ue.addListener('keydown', QueryForTrans)

	ue.addListener('selectionchange', selectionChange)

	$("#submit").click(function() {
		var Pattern = $("#Pattern").val()
		var OriginalName = $("#OriginalName").val()
		var ChineseName = $("#ChineseName").val()
		var Type = $("#Type").val()
		var Father = $("#Father").val()
		var index = pluralize.singular(OriginalName.toLowerCase())

		var target = {}
		var json = {}

		if (check(ChineseName))
			json["ChineseName"] = ChineseName
		else {
			console.log("中文名不许为空！")
			return
		}

		json["Pattern"] = Pattern

		if (Pattern == "N") {
			target[index] = json
			if (check(OriginalName))
				json["OriginalName"] = OriginalName
			else {
				console.log("源名不许为空！")
				return
			}
			if (Type != "N") {
				json["Type"] = Type
			}
			if (check(Father)) {
				json["Father"] = Father
			}
		} else
			target[OriginalName] = json



		$.ajax({
			url: "/upload_pd",
			type: "post",
			dataType: "html",
			data: target,
			success: function(data) {
				alert(data)
			},
			complete: function(data) {
				console.log(data)
			},
			error: function() {
				alert(data)
			}
		})
	})

	function check(content) {
		if (content == null || content == "")
			return false
		if (content.match(/^\s*$/))
			return false
		return true
	}

	function selectionChange(type) {
		var text = ue.selection.getText()
		var td = $(".indicate")

		td.text("")

		var dict = []

		dict = BuildDict(text)

		indicateMax = dict.length
		for (var i = 0; i < indicateMax; i++) {
			$(td[i]).text(dict[i])
		}
	}

	function ReplaceFromDict(type, e) {
		var selectedCode = e.keyCode - 49

		if (e.altKey) {
			if (selectedCode >= 0 && selectedCode < indicateMax && indicateMax != 0) {
				var value = $($(".indicate")[selectedCode]).text()
				ue.execCommand('insertHtml', value)
				indicateMax = 0
			}
		}
	}

	function QueryForTrans(type, e) {
		if (e.altKey && e.keyCode == 81) {
			var text = ue.selection.getText()
			console.log(text)

			if (!text.match(/^[\u4e00-\u9fa5]+$/)) {
				$.ajax({
					url: youdaoUrl + encodeURI(text),
					type: "GET",
					dataType: "jsonp",
					jsonpCallback: "show",
					success: function(json) {
						switch (json.errorCode) {
							case 0:
								$("#trans").text(json["translation"][0])
								if ("basic" in json) {
									var value = ""
									for (var i = 0; i < json.basic.explains.length; i++) {
										value += json.basic.explains[i] + '\n'
										$("#dictionary").val(value)
									}
								} else {
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
			} else {
				$("#trans").text("")
				$("#dictionary").val("")
			}
		}
	}

	function BuildDict(text) {
		var array = null
		var result = []

		text = text.toLowerCase()
		text = pluralize.singular(text)



		var textForm1 = text.match(/^\[\[([^\]]+)\]\]$/)

		if (textForm1 != null) {
			textForm1 = textForm1[1]
			if (textForm1 in Heros) {
				array = Heros[textForm1]
			}
			if (textForm1 in Items) {
				array = Items[textForm1]
			}
			if (textForm1 in Systems) {
				array = Systems[textForm1]
			}
			if (textForm1 in Abilities) {
				array = Abilities[textForm1]
			}
		}


		if (text in Heros) {
			array = Heros[text]
		}
		if (text in Items) {
			array = Items[text]
		}
		if (text in Systems) {
			array = Systems[text]
		}
		if (text in Abilities) {
			array = Abilities[text]
		}

		if (array != null) {
			var OriginalName = array["OriginalName"]
			var ChineseName = array["ChineseName"]

			result = result.concat([
				ChineseName
			])

			ChineseName.forEach(function(e) {
				result = result.concat([
					"[[" + OriginalName + "/zh-hans|" + e + "]]"
				])
			})

			if ("Type" in array) {
				var type = array["Type"]
				result = result.concat([
					"{{" + type + "|" + OriginalName + "}}"
				])
			}
		}
		return result

		function makeArray(text) {
			if (textForm1 != null) {
				textForm1 = textForm1[1]
				if (textForm1 in Heros) {
					array = Heros[textForm1]
				}
				if (textForm1 in Items) {
					array = Items[textForm1]
				}
				if (textForm1 in Systems) {
					array = Systems[textForm1]
				}
				if (textForm1 in Abilities) {
					array = Abilities[textForm1]
				}
			}
		}
	}
})