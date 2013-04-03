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
    Backbone.original_sync(method, model, options)

  }
})(jQuery);
