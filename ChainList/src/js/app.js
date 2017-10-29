App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      
      
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
