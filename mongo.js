var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var moment = require('moment');

var db, Rank;
var database = "dodge";

exports.connect = function() {
  mongoClient.connect('mongodb://localhost:27017/' + database, function(err, data) {
    if (err) throw err;
    db = data;
    Rank = db.collection("Rank");
    console.log('db connected');
  });
};

exports.findAllRank = function(callback) {
  Rank.find({}).limit(100).toArray(function(err, items) {
    if (err) console.log('err findallrank : ' + err);
    items.sort(function(a, b) {return a["point"] - b["point"];});
    callback(items);
  });
};

exports.insertRank = function(query, callback) {
  query.createdDate = new Date();
  Rank.insert(query, function(err, item) {
    if (err) console.log('err insert : ' + err);
    callback(item);
  });
};

exports.deleteRank = function(query, callback) {
  if (query._id) {
    query._id = ObjectID.createFromHexString(query._id);
    db.Rank.remove(query, function(err, removed) {
      if (err) console.log('err delete : ' + err);
      callback(removed);
    });
  }
};