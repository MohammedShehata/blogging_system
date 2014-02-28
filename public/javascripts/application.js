// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(function() {
	$(".auto").autocomplete({
		source : function(request, response) {
			var term = request.term;
			lastXhr = $.getJSON("/usernames.json", request, function(data, status, xhr) {
				response(data);
			});
		}
	});
});
$(function() {
	$("#dialog").dialog({
		autoOpen : false,
		show : {
			// effect : "blind",
			effect : "clip",
			direction : "up"
//			duration : 1000
		},
		hide : {
			effect : "explode",
			duration : 1000
		},
		title : "This Post Liked By",
		buttons : [{
			text : "Close",
			click : function() {
				$(this).dialog("close");
			}
		}],
		maxHeight: 350,
		modal : true,
		backgroundColor: "red" 
	});
	$("#opener").click(function() {
		$("#dialog").dialog("open");
	});
});

$(function() {
	$(".chatting").dialog({
		autoOpen : false,
		show : {
			effect : "blind"
		},
		hide : {
			effect : "highlight",
			duration: 1000
		},
		title : "Chat",
		maxHeight: 350,
		modal : false,
		backgroundColor: "red", 
		position: { 
			my: "left top",
			at: "right bottom", 
			of: window 
		},
		resizable : false
	});
	$(".chat").click(function() {
		$(".chatting").dialog("open");
	});
});
