/*
 * I use the fucntion by this sysntax $(docu.....)
 * for the dynamic creation of the elements
 * see http://stackoverflow.com/questions/15090942/jquery-on-method-not-working-on-dynamic-content
 */
$(function() {
	$(document.body).on('click', ".chat-close", function(){
		$(this).parent().parent().hide(500);
	});
});
$(function() {
	$(document.body).on( "mouseover", ".chat-close", function() {
		$(this).css("background-color", "#0078A3");
	});
});
$(function() {
	$(document.body).on( "mouseleave", ".chat-close", function() {
		$(this).css("background-color", "#666666");
	});
});
$(function() {
	$(document.body).on("keypress", ".chatting", function(event) {
		if(event.which == 13)// For the enter
		{
			$(this).find(".chat-space").append("<p><span style='font: bolder; color: red'>Me: </span>" + $(this).find("input").val() + "</p>");
			$(this).find("input").val("");
			$(this).find(".chat-space").scrollTop($(this).find(".chat-space")[0].scrollHeight);
		} else if(event.keyCode == 27) {
			$(this).hide(500);
			// event.which for escape will return 0 
			// but it rerturn 0 for all not writable keys
		}
	});
});

$(function(){
	$(window).scroll(function(event){
		var b = ($(document.body)[0].scrollHeight - $(document).scrollTop() - $(".chatting").height());
		$("title").text($(document).scrollTop() + " t>>" + $(document).height() + " < " + $(document.body)[0].scrollHeight + " < " + b);
		 // var a = 45 * ($(document.body)[0].scrollHeight - $(document).scrollTop() - $(".chatting").height()) / 100;
		 // a += "%";
	 	 // $(".chatting").css({top: a});
	});
}); 


function creatChatCanvas()
{
	$("<div class='chatting'/>").append(
		$("<div class='title'>Title</div>").append(
			$("<div class='chat-close ui-icon ui-icon-closethick' title='close'>")
		),
		$("<div class='chat-space'/>"),
		$("<input type='text' style='float: bottom'/>")
	).appendTo("body");
	// confirm( $(document).scrollTop());
}
