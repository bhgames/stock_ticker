export default DS.Model.extend({
  average: DS.attr(),
  symbol: DS.attr('string'),
  date: DS.attr('string'),
  stock: DS.belongsTo('stock')
});