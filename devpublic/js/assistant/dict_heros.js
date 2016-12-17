var Heros = {
	"dict": {
		"batrider": ["Batrider", "蝙蝠骑士"],
		"chen": ["Chen", "陈"],
		"techies": ["Techies", "工程师"],
		"huskar": ["Huskar", "哈斯卡"],
		"shadow shaman": ["Shadow Shaman", "暗影萨满"],
		"nature's prophet": ["Nature's Prophet", "先知"],
		"brewmaster": ["Brewmaster", "酒仙"],
		"lone druid": ["Lone Druid", "德鲁伊"],
		"broodmother": ["Broodmother", "育母蜘蛛"],
		"medusa": ["Medusa", "美杜莎"],
		"meepo": ["Meepo", "米波"],
		"silencer": ["Silencer", "沉默术士"],
		"bloodseeker": ["Bloodseeker", "嗜血狂魔"],
		"alchemist": ["Alchemist", "炼金术士"],
		"tinker": ["Tinker", "修补匠"],
		"witch doctor": ["Witch Doctor", "巫医"],
		"winter wyvern": ["Winter Wyvern", "寒冬飞龙"],
		"clinkz": ["Clinkz", "克林克兹"],
		"crystal maiden": ["Crystal Maiden", "水晶室女"],
		"dazzle": ["Dazzle", "戴泽"],
		"pudge": ["Pudge", "帕吉"],
		"vengeful spirit": ["Vengeful Spirit", "复仇之魂"],
		"nyx assassin": ["Nyx Assassin", "司夜刺客"],
		"gyrocopter": ["Gyrocopter", "矮人直升机"],
		"beastmaster": ["Beastmaster", "兽王"],
		"skywrath mage": ["Skywrath Mage", "天怒法师"],
		"queen of pain": ["Queen of Pain", "痛苦女王"],
		"enigma": ["Enigma", "谜团"],
		"lina": ["Lina", "莉娜"],
		"faceless void": ["Faceless Void", "虚空假面"],
		"windranger": ["Windranger", "风行者"],
		"undying": ["Undying", "不朽尸王"],
		"ogre magi": ["Ogre Magi", "食人魔魔法师"],
		"terrorblade": ["Terrorblade", "恐怖利刃"],
		"troll warlord": ["Troll Warlord", "巨魔战将"],
		"naga siren": ["Naga Siren", "娜迦海妖"],
		"keeper of the light": ["Keeper of the Light", "光之守卫"],
		"phoenix": ["Phoenix", "凤凰"],
		"underlord": ["Underlord", "孽主"],
		"shadow demon": ["Shadow Demon", "暗影恶魔"],
		"doom": ["Doom", "末日使者"],
		"outworld devourer": ["Outworld Devourer", "殁境神蚀者"],
		"centaur warrunner": ["Centaur Warrunner", "半人马战行者"],
		"bane": ["Bane", "祸乱之源"],
		"sniper": ["Sniper", "狙击手"],
		"leshrac": ["Leshrac", "拉席克"],
		"slardar": ["Slardar", "斯拉达"],
		"death prophet": ["Death Prophet", "死亡先知"],
		"treant protector": ["Treant Protector", "树精卫士"],
		"bristleback": ["Bristleback", "钢背兽"],
		"dragon knight": ["Dragon Knight", "龙骑士"],
		"tusk": ["Tusk", "巨牙海民"],
		"elder titan": ["Elder Titan", "上古巨神"],
		"venomancer": ["Venomancer", "剧毒术士"],
		"ursa": ["Ursa", "熊战士"],
		"disruptor": ["Disruptor", "干扰者"],
		"juggernaut": ["Juggernaut", "主宰"],
		"mirana": ["Mirana", "米拉娜"],
		"earth spirit": ["Earth Spirit", "大地之灵"],
		"oracle": ["Oracle", "神谕者"],
		"pugna": ["Pugna", "帕格纳"],
		"lycan": ["Lycan", "狼人"],
		"jakiro": ["Jakiro", "杰奇洛"],
		"zeus": ["Zeus", "宙斯"],
		"shadow fiend": ["Shadow Fiend", "影魔"],
		"arc warden": ["Arc Warden", "天穹守望者"],
		"phantom lancer": ["Phantom Lancer", "幻影长矛手"],
		"storm spirit": ["Storm Spirit", "风暴之灵"],
		"lion": ["Lion", "莱恩"],
		"sven": ["Sven", "斯温"],
		"wraith king": ["Wraith King", "冥魂大帝"],
		"templar assassin": ["Templar Assassin", "圣堂刺客"],
		"legion commander": ["Legion Commander", "军团指挥官"],
		"riki": ["Riki", "力丸"],
		"viper": ["Viper", "冥界亚龙"],
		"night stalker": ["Night Stalker", "暗夜魔王"],
		"earthshaker": ["Earthshaker", "撼地者"],
		"timbersaw": ["Timbersaw", "伐木机"],
		"clockwerk": ["Clockwerk", "发条技师"],
		"tiny": ["Tiny", "小小"],
		"invoker": ["Invoker", "祈求者"],
		"warlock": ["Warlock", "术士"],
		"phantom assassin": ["Phantom Assassin", "幻影刺客"],
		"monkey king": ["Monkey King", "齐天大圣"],
		"io": ["Io", "艾欧"],
		"enchantress": ["Enchantress", "魅惑魔女"],
		"lifestealer": ["Lifestealer", "噬魂鬼"],
		"kunkka": ["Kunkka", "昆卡"],
		"slark": ["Slark", "斯拉克"],
		"lich": ["Lich", "巫妖"],
		"spirit breaker": ["Spirit Breaker", "裂魂人"],
		"puck": ["Puck", "帕克"],
		"bounty hunter": ["Bounty Hunter", "赏金猎人"],
		"omniknight": ["Omniknight", "全能骑士"],
		"razor": ["Razor", "剃刀"],
		"visage": ["Visage", "维萨吉"],
		"ember spirit": ["Ember Spirit", "灰烬之灵"],
		"spectre": ["Spectre", "幽鬼"],
		"dark seer": ["Dark Seer", "黑暗贤者"],
		"drow ranger": ["Drow Ranger", "卓尔游侠"],
		"tidehunter": ["Tidehunter", "潮汐猎人"],
		"ancient apparition": ["Ancient Apparition", "远古冰魄"],
		"axe": ["Axe", "斧王"],
		"chaos knight": ["Chaos Knight", "混沌骑士"],
		"sand king": ["Sand King", "沙王"],
		"abaddon": ["Abaddon", "亚巴顿"],
		"anti-mage": ["Anti-Mage", "敌法师"],
		"rubick": ["Rubick", "拉比克"],
		"luna": ["Luna", "露娜"],
		"necrophos": ["Necrophos", "瘟疫法师"],
		"morphling": ["Morphling", "变体精灵"],
		"magnus": ["Magnus", "马格纳斯"],
		"weaver": ["Weaver", "编织者"]
	},
	buildDict: function(text) {
		text = text.toLowerCase()

		var array = null
		var result = []

		//[[Luna]]形式
		var heroText = text.match(/^\[\[([^\]]+)\]\]$/)
		if (heroText != null) {
			heroText = heroText[1]
			if (heroText in this.dict) {
				array = this.dict[heroText]
			}
		}

		//直接获取
		if (text in this.dict) {
			array = this.dict[text]
		}

		//构筑数组
		if (array != null) {
			var OriginName = array[0]
			var ChineseName = array[1]

			result = result.concat([
				ChineseName,
				"[[" + OriginName + "/zh-hans|" + ChineseName + "]]",
				"{{H|" + OriginName + "}}"
			])
		}

		//返回结果
		return result
	}
}