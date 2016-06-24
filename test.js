var ssrsClient = require('./index');

ssrsClient.execCommand(
  require('./test-options'),
  function (err, res) {
    if(!!err){
      console.log('Error: %s', err);
      return;
    };

    console.log(res);
  }
)
