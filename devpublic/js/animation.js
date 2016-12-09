$(function(){
	$(".subcontent").mCustomScrollbar()

	var page = 0
	var firstpage = 0
	var lastpage = 1

	contentajax($(".main_container"))

	clearevent()

	function clearevent(){
		$(".navigator").unbind()
		$(".main_container .navigator_right").click(rightclick)
		$(".main_container .navigator_left").click(leftclick)
	}

	function rightclick(){
		page += 1

		var mainContainer = $(".main_container")
		TweenLite.to(mainContainer, 1, {
			left:"0%",
			marginLeft:"-900px", 
			ease:Back.easeOut,
			onComplete:function(){
				mainContainer.addClass("left_container")
				mainContainer.removeClass("main_container")
			}
		})

		var rightContainer = $(".right_container")
		TweenLite.to(rightContainer, 1, {
			left:"50%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				rightContainer.addClass("main_container")
				rightContainer.removeClass("right_container")
				contentajax(rightContainer)
				FirOrLas(rightContainer)
			}
		})

		var leftContainer = $(".left_container")
		TweenLite.to(leftContainer, 1, {
			left:"-50%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				leftContainer.addClass("hidden_container")
				leftContainer.removeClass("left_container")
			}
		})
	}

	function leftclick(){
		page -= 1

		var mainContainer = $(".main_container")
		TweenLite.to(mainContainer, 1, {
			left:"100%",
			marginLeft:"-100px", 
			ease:Back.easeOut,
			onComplete:function(){
				mainContainer.addClass("right_container")
				mainContainer.removeClass("main_container")
			}
		})

		var leftContainer = $(".left_container")
		TweenLite.to(leftContainer, 1, {
			left:"50%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				leftContainer.addClass("main_container")
				leftContainer.removeClass("left_container")
				contentajax(leftContainer)
				FirOrLas(leftContainer)
			}
		})

		var rightContainer = $(".right_container")
		TweenLite.to(rightContainer, 1, {
			left:"150%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				rightContainer.addClass("hidden_container")
				rightContainer.removeClass("right_container")
			}
		})
	}

	function contentajax(mainContainer){
		var obj = {
			index : page
		}

		$.ajax({
			url : "/getcontent",
			type : "POST",
			data : obj,
			dataType : "html",
			success : function(data, status){
				mainContainer.children(".subcontent").remove()
				mainContainer.children(".content").append(data)
			},
			complete : function(data){
				console.log(data)
			}
		})
	}

	function FirOrLas(mainContainer){
		if(page == firstpage)
		{
			var target = mainContainer.children(".navigator_left")
			target.addClass("navigator_none_left")
			target.removeClass("navigator_left")
		}
		else if(page == lastpage)
		{
			var target = mainContainer.children(".navigator_right")
			target.addClass("navigator_none_right")
			target.removeClass("navigator_right")
		}
		else
		{
			var right =  mainContainer.children().first()
			var left = mainContainer.children().last()

			right.removeClass("navigator_none_right")
			right.addClass("navigator_right")

			left.removeClass("navigator_none_left")
			left.addClass("navigator_left")
		}
		clearevent()
	}
})