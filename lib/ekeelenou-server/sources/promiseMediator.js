var q = require("q");

exports.query = function query(queryString) {
    var deferred = q.defer();
    var response = q.defer();
    q.delay(3000).then(function firstPromise() {
        response.resolve('LUBADUS 1');
    });
    response.promise.then(function(data){
       if(data === 'POLE LUBADUS 1') {
          deferred.resolve('esimene läks hästi!');
       } else {
           var response2 = q.defer();
           q.delay(3000).then(function secondPromise() {
               response2.resolve('LUBADUS 2');
               deferred.resolve(response2.promise);
           });
       }
    });
    return deferred.promise;
};

exports.name = 'lubadusega mediaator';
exports.id = 'promiseMediator';
exports.abbr = 'promed';