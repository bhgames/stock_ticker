export default DS.Model.extend({
  symbol: DS.attr('string'),
  name: DS.attr('string'),
  histories: DS.hasMany('histories')
});