var httpntlm = require('httpntlm');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

module.exports.execCommand = execCommand;

function execCommand(options, cb){
  var options = options || {};
  var credentials = options.credentials || {};
  try {
    var reqUrl = options.url || url.format(buildCommandURL(options));
    debugger;

    httpntlm.get({
        url: reqUrl,
        username: credentials.username,
        password: credentials.password,
        domain:   credentials.domain,
        workstation: credentials.workstation,
      },
      callback
    )

  } catch (e) {
    callback(e);
  }

  function callback(err, res) {
    if(!util.isFunction(cb)){
      return;
    };

    cb(err, res);
  };
}

function buildCommandURL(options){
  var reqUrl = url.parse(options.rsUrl, false);
  var itemPath = options.itemPath;
  if(!util.isString(itemPath)){
    throw new TypeError(util.format('Parameter options.itemPath must be string, not %s', itemPath));
  }

  var searchStr = [
                   querystring.escape(itemPath),
                   querystring.stringify(options.params)
                 ].join('&');
  reqUrl.search = '?'+searchStr;

  // debugger;
  return reqUrl;
}
