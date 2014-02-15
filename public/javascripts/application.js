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
