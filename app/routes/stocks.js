export default Ember.Route.extend({
  model: function(params) {
    // the server returns `{ slug: 'foo-post' }`
    var stocks = [
      {"symbol":"YHOO","name":"Yahoo! Inc.","exch":"NMS","type":"S","exchDisp":"NASDAQ","typeDisp":"Equity"},{"symbol":"YHOO.MX","name":"Yahoo! Inc.","exch":"MEX","type":"S","exchDisp":"Mexico","typeDisp":"Equity"},{"symbol":"YAHOY","name":"Yahoo Japan Corporation","exch":"PNK","type":"S","exchDisp":"OTC Markets","typeDisp":"Equity"},{"symbol":"YAHOF","name":"Yahoo Japan Corporation","exch":"PNK","type":"S","exchDisp":"OTC Markets","typeDisp":"Equity"},{"symbol":"YOJ.SG","name":"YAHOO JAPAN","exch":"STU","type":"S","exchDisp":"Stuttgart","typeDisp":"Equity"},{"symbol":"YHO.BE","name":"YAHOO","exch":"BER","type":"S","exchDisp":"Berlin","typeDisp":"Equity"},{"symbol":"YHOO.SW","name":"YAHOO","exch":"EBS","type":"S","exchDisp":"Swiss","typeDisp":"Equity"},{"symbol":"YHO.HM","name":"YAHOO","exch":"HAM","type":"S","exchDisp":"Hamburg","typeDisp":"Equity"},{"symbol":"YHO.DU","name":"YAHOO","exch":"DUS","type":"S","exchDisp":"Dusseldorf Stock Exchange ","typeDisp":"Equity"},{"symbol":"YHOF.EX","name":"YAHOO","exch":"EUX","type":"S","exchDisp":"EUREX Futures and Options Exchange ","typeDisp":"Equity"}
    ]

    return stocks;
  }
});