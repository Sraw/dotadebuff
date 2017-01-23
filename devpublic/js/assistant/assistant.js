/*global $, Quill, Heros, Items, Systems, Abilities, buildDict*/
$(function() {
	var youdaoUrl = "http://fanyi.youdao.com/openapi.do?keyfrom=Translateapp80&key=2011563925&type=data&doctype=jsonp&version=1.1&q=";

	var quill = new Quill('#editor', {
		modules: {
			toolbar: []
		},
		theme: 'snow'
	});

	function getMaxLength(dict) {
		var maxLength = 0;

		$.each(Object.keys(dict), function(i, item) {
			maxLength = Math.max(maxLength, item.length);
		});

		return maxLength
	}

	var dictionary = {
		"Heros": {
			"dict": Heros,
			"maxLength": getMaxLength(Heros)
		},
		"Items": {
			"dict": Items,
			"maxLength": getMaxLength(Items)
		},
		"Systems": {
			"dict": Systems,
			"maxLength": getMaxLength(Systems)
		},
		"Abilities": {
			"dict": Abilities,
			"maxLength": getMaxLength(Abilities)
		}
	}

	var globalMaxLength = Math.max(
		dictionary["Heros"]["maxLength"],
		dictionary["Items"]["maxLength"],
		dictionary["Systems"]["maxLength"],
		dictionary["Abilities"]["maxLength"]
	);


	quill.on('editor-change', getWord);
	var quill_e = document.querySelector('#editor');
	quill_e.addEventListener('keydown', ReplaceFromDict);
	quill_e.addEventListener('keydown', QueryForTrans);

	var dicts = [];
	var indicateMax = 0;

	function getWord() {
		var range = quill.getSelection();
		var cursor = null;
		var td = $(".indicate");
		td.text("");

		if (range) {
			if (range.length == 0) {
				cursor = range.index;
			}
		}

		dicts = [];
		let tmpSet = new Set();
		for (let i = 0; i < globalMaxLength + 1; i++) {
			let index = Math.max(cursor - i, 0);
			for (let j = Math.max(i, 1); j < globalMaxLength + 1; j++) {
				let tmp = quill.getText(index, j);
				if (!tmpSet.has(tmp)) {
					let tmp_dict = null;
					tmp_dict = buildDict(tmp);
					for (let _index in tmp_dict) {
						dicts.push({
							"content": tmp_dict[_index],
							"start": index,
							"end_length": j
						});
					}
					tmpSet.add(tmp);
				}
			}
		}
		let sum = 0;
		console.log(dicts)
		for (let index in dicts) {
			$(td[sum]).text(dicts[index]["content"]);
			sum += 1;
		}
		indicateMax = sum;
	}

	function ReplaceFromDict(e) {
		var selectedCode = e.keyCode - 49;

		if (e.altKey) {
			if (selectedCode >= 0 && selectedCode < indicateMax && indicateMax != 0) {
				let selectedElement = dicts[selectedCode];
				let value = selectedElement["content"];
				let start = selectedElement["start"];
				let end_length = selectedElement["end_length"];
				console.log(value);
				quill.deleteText(start, end_length);
				quill.insertText(start, value);
				quill.setSelection(start + value.length);
			}
		}
	}

	function QueryForTrans(e) {
		if (e.altKey && e.keyCode == 81) {
			var range = quill.getSelection();
			var text = quill.getText(range.index, range.length)
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
								}
								else {
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
			else {
				$("#trans").text("")
				$("#dictionary").val("")
			}
		}
	}
})
