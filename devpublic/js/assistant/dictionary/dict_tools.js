/*global pluralize, Heros, Items, Systems, Abilities*/

function buildDict(word) {
    function buildHerosDict(word) {
        var array = null
        var result = []

        word = word.toLowerCase()

        if (word in Heros) {
            array = Heros[word]
        }

        if (array != null) {
            var ChineseName = array["ChineseName"]

            result = result.concat(ChineseName);

            ChineseName.forEach(function(e) {
                result = result.concat([
                    "[[" + e + "]]"
                ])
            })

            if ("Type" in array) {
                var type = array["Type"]
                result = result.concat([
                    "{{" + type + "|" + ChineseName[0] + "}}"
                ])
            }
        }
        return result
    }

    function buildItemsDict(word) {
        var array = null
        var result = []

        word = word.toLowerCase()
        word = pluralize.singular(word)

        if (word in Items) {
            array = Items[word]
        }

        if (array != null) {
            var ChineseName = array["ChineseName"];

            result = result.concat(ChineseName);

            ChineseName.forEach(function(e) {
                result = result.concat([
                    "[[" + e + "]]"
                ])
            })

            if ("Type" in array) {
                var type = array["Type"]
                result = result.concat([
                    "{{" + type + "|" + ChineseName[0] + "}}"
                ])
            }
        }
        return result;
    }

    function buildSystemsDict(word) {
        var array = null
        var result = []

        word = word.toLowerCase()
        word = pluralize.singular(word)

        if (word in Systems) {
            array = Systems[word]
        }

        if (array != null) {
            var ChineseName = array["ChineseName"]

            result = result.concat(ChineseName);

            ChineseName.forEach(function(e) {
                result = result.concat([
                    "[[" + e + "]]"
                ])
            })

            if ("Type" in array) {
                var type = array["Type"]
                result = result.concat([
                    "{{" + type + "|" + ChineseName[0] + "}}"
                ])
            }
        }
        return result
    }

    function buildAbilitiesDict(word) {
        var array = null
        var result = []

        word = word.toLowerCase()

        if (word in Abilities) {
            array = Abilities[word]
        }

        if (array != null) {
            var ChineseName = array["ChineseName"]

            result = result.concat(ChineseName);

            ChineseName.forEach(function(e) {
                result = result.concat([
                    "[[" + e + "]]"
                ])
            })

            if ("Type" in array) {
                var type = array["Type"]
                result = result.concat([
                    "{{" + type + "|" + ChineseName[0] + "}}"
                ])
            }
        }
        return result
    }

    var results = [];
    results = results.concat(buildHerosDict(word));
    results = results.concat(buildItemsDict(word));
    results = results.concat(buildSystemsDict(word));
    results = results.concat(buildAbilitiesDict(word));

    return results
}
