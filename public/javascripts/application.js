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
