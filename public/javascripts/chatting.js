var canvCounter = 0;
/*
 * I use the fucntion by this sysntax $(docu.....)
 * for the dynamic creation of the elements
 * see http://stackoverflow.com/questions/15090942/jquery-on-method-not-working-on-dynamic-content
 */
$(function() {
	$(document.body).on('click', ".chat-close", function() {
		$(this).parent().parent().hide(500);
	});
});
$(function() {
	$(document.body).on("mouseover", ".chat-close", function() {
		$(this).css("background-color", "#0078A3");
	});
});
$(function() {
	$(document.body).on("mouseleave", ".chat-close", function() {
		$(this).css("background-color", "#666666");
	});
});
$(function() {
	$(document.body).on("keypress", ".chatting", function(event) {
		if(event.which == 13)// For the enter
		{
			var content =  $(this).find("input").val();
			$(this).find(".chat-space").append("<p><span style='font: bolder; color: red'>Me: </span>" + content + "</p>");
			$(this).find("input").val("");
			$(this).find(".chat-space").scrollTop($(this).find(".chat-space")[0].scrollHeight);
			
			// Then for ajax to send message
			var to = $(this).attr("id").split("-").pop(); //last;
			$.post("/send_message", {'content':content, 'to':to})
		} else if(event.keyCode == 27) {
			$(this).hide(500);
			// event.which for escape will return 0
			// but it rerturn 0 for all not writable keys
		}
	});
});
$(function() {
	$(window).scroll(function(event) {
		changeCahtPos();
	});
});
function changeCahtPos() {
	$(".chatting").css({
		bottom : (-1 * $(document).scrollTop())
	});
	$(".cur-chat").css({
		bottom : (-1 * $(document).scrollTop())
	});
}

function creatChatCanvas(title, userId) {
	$(".chatting").hide();
	
	if($("#u-" + userId).length == 0)
	{
		var canv = $("<div id='canv-u-" + userId + "' class='chatting'/>");
		canv.append(
			$("<div class='title'>" + title + "</div>").append(
				$("<div class='chat-close ui-icon ui-icon-closethick' title='close'>")),
			$("<div class='chat-space'/>"), 
			$("<input type='text' style='float: bottom'/>")
		).appendTo("body");
	
		changeCahtPos();
	
		canvCounter++;
		
		// add the user to the chat users canvase
		addUserChatRec(title, userId);	
	}
	else
		$("#canv-u-"+userId+".chatting").show();	
}
function addUserChatRec(title, userId)
{
	$(".users-chat").append(
		$("<div class='user-chat-rec' id='u-"+ userId + "' title='open chat canvase'>" + title + "</div>")
	);
}
$(function() {
	$(document.body).on("click", "#cur-chat-id", function() {
		var canv = $(this).parent();
		if(canv.hasClass("cur-chat-closed"))
		{
			canv.addClass("cur-chat-open").removeClass("cur-chat-closed");
		}
		else
		{
		 	canv.addClass("cur-chat-closed").removeClass("cur-chat-open");
		}
	});
	$(document.body).on("click", ".user-chat-rec", function() {
		$(".chatting").hide();
		$("#canv-" + $(this).attr("id")).show("slide", {direction:"right"}, 500);
	});
});


// ajax for getting online messages for the current user  
$(function(){
	setInterval(function(){
		$.getJSON("/get_messages", {}, function(data){
			var messages = $.parseJSON(data.messages);
			// confirm(messages[0].message.from.username);
			for(var msg in messages)
			{
				if($("#mes-" + messages[msg].message.id).length == 0)  // not found
				{
					creatChatCanvas(messages[msg].message.from.username, messages[msg].message.from.id);
					addFromMessage(messages[msg].message.id, messages[msg].message.content, messages[msg].message.from.id, messages[msg].message.from.username);
					// confirm(messages[msg].message.id + " " + messages[msg].message.content + " " + messages[msg].message.from.id + " " + messages[msg].message.from.username);				
				}
			}
		});
	}
	, 10000);
});

function addFromMessage(msgId, msgCont, userId, userName)
{
	 $("#canv-u-" + userId).find(".chat-space").append("<p id='mes-" + msgId +"' ><span style='font: bolder; color: cyan'>"+ userName+": </span>" + msgCont + "</p>");
	 $("#canv-u-" + userId).find(".chat-space").scrollTop($("#canv-u-" + userId).find(".chat-space")[0].scrollHeight);
}
