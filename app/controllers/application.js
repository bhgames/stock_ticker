export default Ember.Controller.extend({
  // the initial value of the `search` property

    redirect: function(){
      this.transitionTo('stocks');
    }
});