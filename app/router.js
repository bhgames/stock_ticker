import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('stocks', function() {
    this.route('show', { path: '/stocks/:symbol' })
  });
});

export default Router;
