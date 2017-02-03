$(function() {
	var sourceArray = [
		{
			'name': 'ActionScript', 
			'id': '1-xxx'
		},
		{
			'name': 'AppleScript', 
			'id': '2-xxx'
		},
		{
			'name': 'Asp', 
			'id': '3-xxx'
		},
		{
			'name': 'BASIC', 
			'id': '4-xxx'
		},
		{
			'name': 'C', 
			'id': '5-xxx'
		},
		{
			'name': 'Clojure', 
			'id': '6-xxx'
		},
		{
			'name': 'COBOL', 
			'id': '7-xxx'
		},
		{
			'name': 'ColdFusion', 
			'id': '8-xxx'
		},
		{
			'name': 'Erlang', 
			'id': '9-xxx'
		},
		{
			'name': 'Fortran', 
			'id': '10-xxx'
		},
		{
			'name': 'Groovy', 
			'id': '11-xxx'
		},
		{
			'name': 'Haskell', 
			'id': '12-xxx'
		},
		{
			'name': 'JavaScript', 
			'id': '13-xxx'
		},
		{
			'name': 'Lisp', 
			'id': '14-xxx'
		},
		{
			'name': 'Perl', 
			'id': '15-xxx'
		},
		{
			'name': 'PHP', 
			'id': '16-xxx'
		},
		{
			'name': 'Python', 
			'id': '17-xxx'
		},
		{
			'name': 'Ruby', 
			'id': '18-xxx'
		},
		{
			'name': 'Scala', 
			'id': '19-xxx'
		},
		{
			'name': 'Scheme', 
			'id': '20-xxx'
		}
	];

	$('.js-autocomplete').each(function(){
		var wrapper = $(this).closest('.js-autocomplete-wrapper'), input = $(this);

		input.autocomplete({
			minLength: 0,

			source: function( request, response ) {
				var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );

				response($.grep(sourceArray, function( item ){
					return matcher.test(item.name);
				}));
			},

			appendTo: wrapper,

			select: function( event, ui ) {

				console.log('select',  ui.item);
				
				input.val(ui.item.name);

				return false;
			}
		})
		.data('ui-autocomplete')._renderItem = function(ul, item, response) {
			var value = this.element.val();
			var regex = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi");
		    item.label = item.name.replace(regex, "<strong>$1</strong>");

			return $('<li>')
					.attr( "data-id", item.id )
					.attr( "data-name", item.name )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
		};
	});
});