var eth;

eth = null;

module.exports = {
  config: {
    display: {
      type: 'string',
      'default': 'right',
      'enum': ['left', 'right']
    },
    refresh: {
      type: 'integer',
      'default': 60
    }
  },
  activate: function() {
  },
  deactivate: function() {
    if (eth != null) {
      eth.destroy();
    }

    return eth = null;
  },
  consumeStatusBar: function(statusBar) {
    var EthereumStatusBarView;
    EthereumStatusBarView = require('./ethereum-status-bar-view');
    eth = new EthereumStatusBarView();
    eth.initialize(statusBar);
    return eth.attach();
  }
};
