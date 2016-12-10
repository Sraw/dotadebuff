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
			if(selectedCode >= 0 && selectedCode < max && max != 0)
			{
				var input = $('#input').val()
				var td = $("table tr td")
				var res = input.substring(0, start) + $(td[selectedCode]).text() + input.substring(end, input.length)
				$('#input').val(res)
				td.text("")
				max = 0
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
		if(dict.length == 2)
		{
			var heroname = dict[0]
			var ChineseName = dict[1]
			return [
				ChineseName,
				"{{A|" + OriginName + "|" + heroname + "}}",
				"[[#" + ChineseName + "|" + ChineseName + "]]",
				"[[" + OriginName + "/zh-hans|" + ChineseName + "]]",
				"[[" + heroname + "/zh-hans#" + ChineseName + "|" + ChineseName + "]]",
			]
		}
		else if(dict.length == 3)
		{
			var heroname = dict[0]
			var heroname2 = dict[1]
			var ChineseName = dict[2]
			return [
				ChineseName,
				"{{A|" + OriginName + "|" + heroname + "}}",
				"{{A|" + OriginName + "|" + heroname2 + "}}",
				"[[#" + ChineseName + "|" + ChineseName + "]]",
				"[[" + OriginName + "/zh-hans|" + ChineseName + "]]",
				"[[" + heroname + "/zh-hans#" + ChineseName + "|" + ChineseName + "]]",
			]
		}

		
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
			max = dict.length
			for(var i = 0; i < max; i++)
			{
				$(td[i]).text(dict[i])
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
		],
		"Storm Hammer" : [
			"Sven",
			"风暴之拳"
		],
		"Great Cleave" : [
			"Sven",
			"巨力挥舞"
		],
		"Warcry" : [
			"Sven",
			"战吼"
		],
		"God's Strength" : [
			"Sven",
			"神之力量"
		],
		"Avalanche" : [
			"Tiny",
			"山崩"
		],
		"Toss" : [
			"Tiny",
			"投掷"
		],
		"Craggy Exterior" : [
			"Tiny",
			"崎岖外表"
		],
		"Grow" : [
			"Tiny",
			"长大"
		],
		"Torrent" : [
			"Kunkka",
			"洪流"
		],
		"Tidebringer" : [
			"Kunkka",
			"潮汐使者"
		],
		"X Marks the Spot" : [
			"Kunkka",
			"X标记"
		],
		"Return" : [
			"Kunkka",
			"召回"
		],
		"Ghostship" : [
			"Kunkka",
			"幽灵船"
		],
		"Wild Axes" : [
			"Beastmaster",
			"野性之斧"
		],
		"Call of the Wild: Hawk" : [
			"Beastmaster",
			"野性呼唤:战鹰"
		],
		"Call of the Wild: Boar" : [
			"Beastmaster",
			"野性呼唤:豪猪"
		],
		"Inner Beast" : [
			"Beastmaster",
			"野性之心"
		],
		"Primal Roar" : [
			"Beastmaster",
			"原始咆哮"
		],
		"Breathe Fire" : [
			"Dragon Knight",
			"火焰气息"
		],
		"Dragon Tail" : [
			"Dragon Knight",
			"神龙摆尾"
		],
		"Dragon Blood" : [
			"Dragon Knight",
			"龙族血统"
		],
		"Elder Dragon Form" : [
			"Dragon Knight",
			"古龙形态"
		],
		"Battery Assault" : [
			"Clockwerk",
			"弹幕冲击"
		],
		"Power Cogs" : [
			"Clockwerk",
			"能量齿轮"
		],
		"Rocket Flare" : [
			"Clockwerk",
			"照明火箭"
		],
		"Hookshot" : [
			"Clockwerk",
			"发射钩爪"
		],
		"Purification" : [
			"Omniknight",
			"洗礼"
		],
		"Repel" : [
			"Omniknight",
			"驱逐"
		],
		"Degen Aura" : [
			"Omniknight",
			"退化光环"
		],
		"Guardian Angel" : [
			"Omniknight",
			"守护天使"
		],
		"Inner Vitality" : [
			"Huskar",
			"活血术"
		],
		"Burning Spear" : [
			"Huskar",
			"沸血之矛"
		],
		"Berserker's Blood" : [
			"Huskar",
			"狂战士之血"
		],
		"Life Break" : [
			"Huskar",
			"牺牲"
		],
		"Acid Spray" : [
			"Alchemist",
			"酸性喷雾"
		],
		"Unstable Concoction" : [
			"Alchemist",
			"不稳定化合物"
		],
		"Unstable Concoction Throw" : [
			"Alchemist",
			"投掷不稳定化合物"
		],
		"Greevil's Greed" : [
			"Alchemist",
			"贪魔的贪婪"
		],
		"Chemical Rage" : [
			"Alchemist",
			"化学狂暴"
		],
		"Thunder Clap" : [
			"Brewmaster",
			"Earth",
			"雷霆一击"
		],
		"Drunken Haze" : [
			"Brewmaster",
			"Storm",
			"醉酒云雾"
		],
		"Drunken Brawler" : [
			"Brewmaster",
			"Fire",
			"醉拳"
		],
		"Primal Split" : [
			"Brewmaster",
			"元素分离"
		],
		"Hurl Boulder" : [
			"Earth",
			"投掷巨石"
		],
		"Spell Immunity" : [
			"Earth",
			"技能免疫"
		],
		"Demolish" : [
			"Earth",
			"粉碎击"
		],
		"Dispel Magic" : [
			"Storm",
			"驱散魔法"
		],
		"Cyclone" : [
			"Storm",
			"龙卷风"
		],
		"Wind Walk" : [
			"Storm",
			"疾风步"
		],
		"Permanent Immolation" : [
			"Fire",
			"永久献祭"
		]
	}
})
