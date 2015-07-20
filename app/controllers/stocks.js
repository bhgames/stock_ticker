export default Ember.Controller.extend({
  // the initial value of the `search` property
  queryParams: ['query'],
  query: '',
  currentStock: null,

  actions: {
    draw: function(stock){
      this.set('currentStock', stock);
      var that = this;
      this.store.query('history', { stock_id: stock.get('id') }).then(function(data) {
        stock.set('histories', data);
        that.set('currentHistory', data);
      });
    }
  }
});