$(".chat-close").click(function(event) {
	$(this).parent().parent().hide("blind", {
		direction : "right"
	});
});
$(".chat-close").mouseover(function() {
	$(this).css("background-color", "#0078A3");
});
$(".chat-close").mouseleave(function() {
	$(this).css("background-color", "#666666");
});
$(".chatting").keypress(function(event) {
	if(event.which == 13)// For the enter
	{
		$(this).find(".chat-space").append("<p><span style='font: bolder; color: red'>Me: </span>" + $(this).find("input").val() + "</p>");
		$(this).find("input").val("");
		$(this).find(".chat-space").scrollTop($(this).find(".chat-space")[0].scrollHeight);
	}
});
