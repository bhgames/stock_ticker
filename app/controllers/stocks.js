export default Ember.Controller.extend({
  // the initial value of the `search` property
  queryParams: ['query'],
  query: '',
  currentStock: null,

  actions: {
    draw: function(stock){
      this.set('currentStock', stock);
      var that = this;
      this.store.find('history', { id: stock.id }).then(function(data) {
        that.set('currentHistory', data);
      });
    }
  }
});