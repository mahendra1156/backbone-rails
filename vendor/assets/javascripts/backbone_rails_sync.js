(function($) {
  Backbone.original_sync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    if (!options) { options = {} }
    if (!options.noCSRF) {
      options = _.extend({
        beforeSend: function( xhr ) {
          if (!options.noCSRF) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);  
          }
          model.trigger('sync:start');
        }
      }, options);
    }


    // Serialize data, optionally using paramRoot
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      options.contentType = 'application/json';
      data = JSON.stringify(options.attrs || model.toJSON(options));

      if (model.paramRoot) {
        data = {};
        data[model.paramRoot] = model.toJSON(options);
      } else {
        data = model.toJSON();
      }
      options.data = JSON.stringify(data);
    }

    Backbone.original_sync(method, model, options)

  }
})(jQuery);
