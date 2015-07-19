export default Ember.Controller.extend({
  // the initial value of the `search` property
  queryParams: ['query'],
  query: '',

  filteredStocks: function() {
    var query = this.get('query');
    var stocks = this.get('model');

    if (stocks) {

      if (!query) {
        return []; // no results;
      }
      
      var regex = new RegExp(query);
      console.log("fuck " + query);
      return stocks.filter(function(stock) {
        return regex.exec(stock.symbol);
      });
    } else {
      return [];
    }
  }.property('query', 'model')
});