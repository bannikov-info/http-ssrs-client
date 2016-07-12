process.bin = process.title = 'ssrs-client';

var ssrsClient = require('../http-ssrs-client');
var util = require('util');
var optimist = require('optimist');

var argv = optimist.alias('u', 'username')
                   .alias('p', 'password')
                   .alias('d', 'domain')
                   .alias('rs-url', 'rsUrl')
                   .alias('item-path', 'itemPath')
                   .argv;
var options = {}
    ,credentials = {}
    ,params = {};
Object.keys(argv).forEach(function (key) {
    switch (true) {
        case (/^username|password|domain$/).test(key):
            credentials[key] = argv[key];
        break;
        case (/^url\b|rsUrl\b|itemPath\b$/).test(key):
            options[key] = argv[key];
        break
        case !(/^_\b|^\$.*\b|^u\b|^p$|^d\b|^item-path\b|^rs-url\b/).test(key):
            params[key] = argv[key];
        break;
    };
});

if(util.isNullOrUndefined(options.url)
   && !util.isNullOrUndefined(argv._[0])){
       options.url = argv._[0];
   }
options.credentials = credentials;
options.params = params;

ssrsClient.execCommand(options, function (err, res) {
    if(!!err){
        // util.log(err);
        process.stderr.write(err);
        return;
    };

    if(res.statusCode === 200){
        process.stdout.write(res.body);
    }else{
        // process.stderr.write(util.inspect(res));
        // util.log(res.body.toString());
        // util.log(options);
        process.stderr.write(util.inspect(options));
        process.stderr.write(res.body.toString());
    }
    // util.log(res);
});
