/*global $, pluralize*/
$(function() {
	$("#submit").click(submit)

	$(".input").bind("input", function() {
		console.log("changed.")
	})
	
	function onInput() {
		
	}

	function submit() {
		var Pattern = $("#Pattern").val()
		var OriginalName = $("#OriginalName").val()
		var ChineseName = $("#ChineseName").val()
		var Type = $("#Type").val()
		var Father = $("#Father").val()
		var pluredOriginName = pluralize.singular(OriginalName.toLowerCase())

		var target = {}
		var json = {}

		if (check(OriginalName)){
			json["OriginalName"] = OriginalName
			$("#indicateON").text("")
		}
		else {
			$("#indicateON").text("源名不许为空！")
			return
		}

		if (check(ChineseName)) {
			json["ChineseName"] = ChineseName
			$("#indicateCN").text("")
		}
		else {
			$("#indicateCN").text("中文名不许为空！")
			return
		}

		

		if (Pattern == "N") {
			target[pluredOriginName] = json

			if (Type != "N") {
				json["Type"] = Type
			}
			if (check(Father)) {
				json["Father"] = Father
			}
		} else{
			target[OriginalName] = json
			json["Pattern"] = Pattern
		}
			



		$.ajax({
			url: "/upload_pd",
			type: "post",
			dataType: "html",
			data: target,
			success: function(data) {
				
			},
			complete: function(data) {
				console.log(data)
			},
			error: function(data) {
				alert(data)
			}
		})

	}

	function check(content) {
		if (content == null || content.match(/^\s*$/))
			return false
		return true
	}
})