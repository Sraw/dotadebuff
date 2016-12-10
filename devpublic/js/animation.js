$(function(){
	var page = 0
	var firstpage = 0
	var lastpage = 9

	var AniTime = 0.5

	contentajax($(".main_container"))

	clearevent($(".main_container"))

	function clearevent(mainContainer){
		$(".navigator").unbind()
		mainContainer.children('.navigator_right').click(rightclick)
		mainContainer.children('.navigator_left').click(leftclick)
	}

	function rightclick(){
		page += 1

		var mainContainer = $(".main_container")
		var rightContainer = $(".right_container")
		var leftContainer = $(".left_container")
		var hiddenContainer = $(".hidden_container").first()

		contentajax(rightContainer)
		FirOrLas(rightContainer)

		TweenLite.to(mainContainer, AniTime, {
			left:"0%",
			marginLeft:"-900px", 
			ease:Back.easeOut,
			onComplete:function(){
				mainContainer.addClass("left_container")
				mainContainer.removeClass("main_container")
				mainContainer.children(".content").empty()
			}
		})

		TweenLite.to(rightContainer, AniTime, {
			left:"50%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				rightContainer.addClass("main_container")
				rightContainer.removeClass("right_container")
				
			}
		})

		TweenLite.to(leftContainer, AniTime, {
			left:"-50%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				leftContainer.addClass("hidden_container")
				leftContainer.removeClass("left_container")
			}
		})

		if(page == firstpage)
		{

		}
		else if(page == lastpage)
		{

		}
		else
		{
			hiddenContainer.css({
				left:"150%",
				marginLeft:"-500px"
			})
			TweenLite.to(hiddenContainer, AniTime, {
			left:"100%",
			marginLeft:"-100px", 
			ease:Back.easeOut,
			onComplete:function(){
				hiddenContainer.addClass("right_container")
				hiddenContainer.removeClass("hidden_container")
			}
		})
		}
	}

	function leftclick(){
		page -= 1

		var mainContainer = $(".main_container")
		var leftContainer = $(".left_container")
		var rightContainer = $(".right_container")
		var hiddenContainer = $(".hidden_container").first()

		contentajax(leftContainer)
		FirOrLas(leftContainer)

		TweenLite.to(mainContainer, AniTime, {
			left:"100%",
			marginLeft:"-100px", 
			ease:Back.easeOut,
			onComplete:function(){
				mainContainer.addClass("right_container")
				mainContainer.removeClass("main_container")
				mainContainer.children(".content").empty()
			}
		})

		TweenLite.to(leftContainer, AniTime, {
			left:"50%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				leftContainer.addClass("main_container")
				leftContainer.removeClass("left_container")
			}
		})

		TweenLite.to(rightContainer, AniTime, {
			left:"150%",
			marginLeft:"-500px", 
			ease:Back.easeOut,
			onComplete:function(){
				rightContainer.addClass("hidden_container")
				rightContainer.removeClass("right_container")
			}
		})

		if(page == firstpage)
		{

		}
		else if(page == lastpage)
		{

		}
		else
		{
			hiddenContainer.css({
				left:"-50%",
				marginLeft:"-500px"
			})
			TweenLite.to(hiddenContainer, AniTime, {
			left:"0%",
			marginLeft:"-900px", 
			ease:Back.easeOut,
			onComplete:function(){
				hiddenContainer.addClass("left_container")
				hiddenContainer.removeClass("hidden_container")
			}
		})
		}
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
				$(".subcontent").mCustomScrollbar()
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
			var right =  mainContainer.children().last()
			var left = mainContainer.children().first()

			right.removeClass("navigator_none_right")
			right.addClass("navigator_right")

			left.removeClass("navigator_none_left")
			left.addClass("navigator_left")
		}
		clearevent(mainContainer)
	}
})