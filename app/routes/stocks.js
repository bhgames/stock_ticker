export default Ember.Route.extend({
  queryParams: {
    query: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.find('stock', { query: params.query })
  }
});