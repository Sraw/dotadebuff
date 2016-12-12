$(function(){

	var start = 0
	var end = 0

	var indicateMax = 0

	var ue = UE.getEditor('editor');

	ue.addListener('keydown', keyPress)

	ue.addListener('selectionchange', selectionChange)

 	function selectionChange(type) {
 		var text = ue.selection.getText()
     	console.log(text)

     	var td = $(".indicate")

     	td.text("")

     	var dict = []

     	dict = dict.concat(Abilities.buildDict(text))
     	dict = dict.concat(Items.buildDict(text))		

		indicateMax = dict.length
		for(var i = 0; i < indicateMax; i++)
		{
			$(td[i]).text(dict[i])
		}
 	}

	function keyPress(type, e) {

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
})
