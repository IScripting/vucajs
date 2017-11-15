/**!
 * By Binhth
 */
(function () {

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	var FormBuilder = window.FormBuilder = function (options) {
		// Config
		extend(this.options, options);

		// Init function
		this._init();
	};

	FormBuilder.prototype = {
		options: {
			el: "default",
			groupId: "default",
			className: "default",
			classPK: "default",
			dataPK: "default",
			data: {},
			schema: {},
			options: {},
			template: "default",
			bindings: "default",
			postRender: function(control) {}
		},

		view: {
			"parent": "bootstrap-edit",
			"layout": {
				"template": "default",
				"bindings": {}
			},
			"fields": {}
		},

		_init: function () {
			// Init function
			var optionsData = this.options.options;

			//builder schema
			var schemaBuilder = {};

			for (var key in optionsData) {

				var detailOption = optionsData[key];

				var fieldBuilder = {
					
					"type": "object",
					"required": false

				};

				if (optionsData.hasOwnProperty(key) && detailOption.hasOwnProperty("required")) {

					$.extend( true, fieldBuilder, { "required": detailOption["required"] } );

				}
				console.log();
				if (optionsData.hasOwnProperty(key) && detailOption.hasOwnProperty("name")) {
					
					schemaBuilder[key] = fieldBuilder;

				}
				
			}

			this.options.schema = schemaBuilder;

			//builder data
			var dataBuilder = this.options.data;

			this.options.data = dataBuilder;

			console.log(schemaBuilder);

		},

		_inputForm: function () {
			// generator input form
			var inputView = this.view;

			if ( this.options.template === "default" ) {
				delete inputView["layout"]; 
			}

			console.log(inputView);

			var alpacaForm = {};

			$.extend( alpacaForm, { "data" : this.options.data } );
			$.extend( alpacaForm, { "schema" : { "type": "object", "properties": this.options.schema } } );
			$.extend( alpacaForm, { "options" : { "fields": this.options.options } } );
			$.extend( alpacaForm, { "view" : inputView } );

			console.log( JSON.stringify(alpacaForm) );

			$("#" + this.options.el).alpaca(alpacaForm);

		},

		_viewForm: function () {
			// generator input form
			var inputView = this.view;
			
			if (this.options.template === "default") {
				$.extend(inputView, { "parent": "bootstrap-display", "layout": {} });
			}

			console.log(inputView);
		}

	};

}());