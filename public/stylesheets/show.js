$(".list-group-item").click(function(){
	$(".toggle_own").css("display","none");
	$(".toggle_own:nth-of-type("+($(this).index()+2)+")").fadeIn();
});

$(".new-comment").click(function(){
	$(".add-new-comment").css("display","block")
});

$(".edit-btn").click(function(){
	$(this).siblings(".edit-comment").css("display","block")
	$(".add-new-comment").css("display","none")
});