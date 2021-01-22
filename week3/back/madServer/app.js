require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer')
var path = require('path');
var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://192.249.18.249:27017/config";


const app = express();
const port = process.env.PORT || 3000;
var User = require('./models/User');
var Photo = require('./models/Photo');
var Music = require('./models/Music');
var Food = require('./models/Food');
var Aewol = require('./models/Aewol');
var Hanlim = require('./models/Hanlim');
var Jeju = require('./models/Jeju');
var Jocheon = require('./models/Jocheon');
var Pyosun = require('./models/Pyosun');
var Seoguipo = require('./models/Seoguipo');
var Weoljung = require('./models/Weoljung');
var Woodo = require('./models/Woodo');
var Region = require('./models/Region');
var photo_id = 0;
var db_name = 'config'
var mongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;


app.listen(port, () => console.log(`Server listening on port ${port}`));
const ServerUrl = "mongodb://192.249.18.249:27017/config";
mongoose.connect(ServerUrl);
var db = mongoose.connection;


db.on('error', function(){
    console.log('Connection Failed!');
});

db.once('open', function() {
    console.log('Connected!');
});

storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
      return crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
      });
    }
  });



  app.post("/upload",
    multer({
      storage: storage
    }).single('upload'), function(req, res) {
     const path = req.file.path;
     const file_name = req.file.filename;
     console.log(req.body);
     const obj = JSON.parse(req.body.upload);
     var newphoto = new Photo({userList: obj.userList, server_place: req.file.path, time : obj.time, explain: obj.explain, id: photo_id});
     photo_id++;
      console.log(photo_id);
      res.redirect("/uploads/" + req.file.filename);
      console.log(newphoto);
    newphoto.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log('Saved!')
        }
    });  
    console.log(obj.userList);
    User.updateMany({ "name" : {$in: obj.userList}},{$push: {"posting_list":req.file.path}}, function(err){
      if(err) return res.status(400)
    });
    console.log(req.file.path);
    // User.updateMany({'name':obj.userList}, {"$set":{}});
    //   return res.status(200).end();
   });
    
    app.get('/uploads/:upload', function (req, res){
        file = req.params.upload;
        
        var img = fs.readFileSync(__dirname + "/uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/png' });
        MongoClient.connect(url, function(err, db){
          if(err) throw err;
          var dbo = db.db("test");
          dbo.collection("photos").findOne({}, function(err, result) {
            if (err) throw err;
            db.close();
          });
        });
        res.end(img, 'binary');
      
      });
    

    app.get("/getphoto/", function(req, res){
        Photo.find({}, function(err, photo){
            if(err) return res.status(500).json({error: err});
            if(!photo) return res.status(400).json({error: 'not found'}); 
            console.log("getphoto");
            res.json(photo);
        })
    });
    
    app.get("/userphoto/", function(req, res){
      console.log(req.body.name);
      Photo.find({userList : req.body.name}, function(err, photo){
          if(err) return res.status(500).json({error: err});
          if(!photo) return res.status(400).json({error: 'not found'}); 
          console.log("userphoto");
          res.json(photo);
      })
  });


    app.get("/getfirstphoto/", function(req, res){
      // Photo.find({}, function(err, photo){
      //     if(err) return res.status(500).json({error: err});
      //     if(!photo) return res.status(400).json({error: 'not found'}); 
      //     console.log("getfirstphoto");
      //     res.json(photo);
      // });
      Photo.findOne({}, {}, { sort: { time : -1 } }, function(err, last) {
       res.json(last);
      });
  });




//---------------------user-------------------

    app.get("/getuser/", function(req, res){
        User.find({}, function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(400).json({error: 'not found'}); 
            console.log("getusers");
            res.json(user);
        })
    });

    app.post("/adduser/", function(req, res){
        console.log(req.body);
        var newUser = new User({name : req.body.name, phone : req.body.phone, email : req.body.email, profile : req.body.profile, profile_photo : req.body.server_place, posting_list : req.body.posting_list });
        newUser.save(function(err){
            if(err){
                console.error(err);
                return;
            }
            res.json({result:1});
        });
    });

    app.post("/changeuser/", function(req, res){
       console.log("changeuser");
       console.log(req.body);
      User.updateOne({name: req.body.name},{ $set:{ profile : req.body.profile, profile_photo : req.body.profile_photo, phone : req.body.phoneNumber, email : req.body.email}}, function(err,result){
        if(err) res.send(err);
        console.log(result);
      });
      

    });
    
    //----------music---------------


    app.post("/addmusic/", function(req, res){
        console.log(req.body);
        var newMusic = new Music({key : req.body.key, user : req.body.user, explain : req.body.explain, time : req.body.time});
        newMusic.save(function(err){
          if(err){
            console.error(err);
            return;
          }
          res.json({result:1});
        });

    });

    app.get("/getmusic/", function(req, res){
      Music.find({}, function(err, user){
        if(err) return res.status(500).json({error: err});
        if(!user) return res.status(400).json({error: 'not found'}); 
        console.log("getmusic");
        res.json(user);
    });
 });


//--------------------------

 app.get("/getfood/", function(req, res){
  Food.find({}, function(err, food){
      if(err) return res.status(500).json({error: err});
      if(!food) return res.status(400).json({error: 'not found'}); 
      console.log("getfood");
      res.json(food)
  })
});


app.post("/addfood/", function(req, res){
  console.log(req.body);
  var newMusic = new Food({contentname : req.body.contentname, weekOpen : req.body.weekOpen, weekClose : req.body.weekClose, weekendOpen: req.body.weekendOpen, weekendClose : req.body.weekendClose});
  newMusic.save(function(err){
    if(err){
      console.error(err);
      return;
    }
    res.json({result:1});
  });

});

app.post("/addaewol/", function(req, res){
  console.log(req.body);
  var newMusic = new Aewol({content : req.body.content, contentname : req.body.contentname, address : req.body.address, latitude : req.body.latitude, longitude : req.body.longitude});
  newMusic.save(function(err){
    if(err){
      console.error(err);
      return;
    }
    res.json({result:1});
  });

});

app.get("/getaewol/", function(req, res){
  Aewol.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getaewol");
      res.json(aewol)
  })
});

app.get("/gethanlim/", function(req, res){
  Hanlim.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("gethanlim");
      res.json(aewol)
  })
});

app.get("/getjeju/", function(req, res){
  Jeju.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getjeju");
      res.json(aewol)
  })
});

app.get("/getjocheon/", function(req, res){
  Jocheon.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getjocheon");
      res.json(aewol)
  })
});

app.get("/getpyosun/", function(req, res){
  Pyosun.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getpyosun");
      res.json(aewol)
  })
});

app.get("/getseoguipo/", function(req, res){
  Seoguipo.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getseoguipo");
      res.json(aewol)
  })
});

app.get("/getweoljung/", function(req, res){
  Weoljung.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getweoljung");
      res.json(aewol)
  })
});

app.get("/getwoodo/", function(req, res){
  Woodo.find({}, function(err, aewol){
      if(err) return res.status(500).json({error: err});
      if(!aewol) return res.status(400).json({error: 'not found'}); 
      console.log("getwoodo");
      res.json(aewol)
  })
});

//-----------------from sliver ============================

app.post('/connect_mongodb'),function(request, response){
  console.log('connect mongodb...');
  connect_mongodb(response);
}
function connect_mongodb(response){
  async.waterfall([
      function(callback){
          MongoClient.connect(url,function(error,db){
              assert.equal(null,err);
              console.log('Connected correctly to server');
              db.close();
              callback(null,'connect mongodb');
          });
      }
  ],
  function(callback,message)
  {
      response.send(message);
      console.log('--------------------------');
  });
}
// app.listen(3000, function(){
//   console.log("Express server listening on port 3000");
// });
app.get('/surveyresult', function(req, res, next) {
  console.log("surveyresultget")
  collection_name = 'surveyresult'        
  mongoClient.connect('mongodb://localhost/', function(error, client){
      if (error) {
          console.log(error);
      } else {
          console.log("connected: " + db_name);
          mydb = client.db(db_name);
          collection = mydb.collection(collection_name);
          collection.find({}).toArray(function(err, results){
              res.status(200).json({mySurveyresult : results[0]});
              console.log(results[0]);
              console.log("get survey result");
            });
          //////////// For DEBUG //////
          var cursor = mydb.collection(collection_name).find();
          cursor.each(function (err, doc) {
              if (err) {
                  console.log(err);
              }
              else {
                  if (doc != null) {
                      console.log(doc);
                  }
                  else {
                      console.log("END");
                  }
              }
          });
          /////////////////////////////
      } 
  });
});
app.post('/surveyresult',function(req,res,next){
  collection_name = 'surveyresult'  
  console.log("enter to post");
  mongoClient.connect('mongodb://localhost/', function(error, client){
      if (error) {
          console.log(error);
      } else {
          console.log("connected: " + db_name);
          mydb = client.db(db_name);
          collection = mydb.collection(collection_name);
          collection.find({}).toArray(function(err, results){
              res.status(200).json({'myCollection' : results});
              console.log(results);
            });
          //collection.insert({"name":req.body.name, "phone":req.body.phone, "email":req.body.email});
          if(Object.keys(req.body).length !== 0)
              collection.insert(req.body);
          ////////////// For DEBUG ////////////////////
          var cursor = mydb.collection(collection_name).find();
          cursor.each(function (err, doc) {
              if (err) {
                  console.log(err);
              }
              else {
                  if (doc != null) {
                      console.log(doc);
                  }
                  else {
                      console.log("END");
                  }
              }
          });
        /////////////////////////////////////////////  
      } 
  });
});
app.delete('/surveyresult',function(req,res,next){
  collection_name = 'surveyresult'  
  console.log("enter to delete");
  mongoClient.connect('mongodb://localhost/', function(error, client){
      if (error) {
          console.log(error);
      } else {
          console.log("connected: " + db_name);
          mydb = client.db(db_name);
          collection = mydb.collection(collection_name);
          collection.find({}).toArray(function(err, results){
              res.status(200).json({'myCollection' : results});
            });
          collection.deleteMany({});
          ////////////// For DEBUG ////////////////////
          var cursor = mydb.collection(collection_name).find();
          cursor.each(function (err, doc) {
              if (err) {
                  console.log(err);
              }
              else {
                  if (doc != null) {
                      console.log(doc);
                  }
                  else {
                      console.log("END");
                  }
              }
          });
        /////////////////////////////////////////////  
      } 
  });
});

app.post('/region',function(req,res,next){
  collection_name = 'regions'  
  console.log("enter to post region");
  mongoClient.connect('mongodb://localhost/', function(error, client){
      if (error) {
          console.log(error);
      } else {
          console.log("connected: " + db_name);
          mydb = client.db(db_name);
          collection = mydb.collection(collection_name);
          collection.find({}).toArray(function(err, results){
              res.status(200).json({'myCollection' : results});
              console.log(results);
            });
          //collection.insert({"name":req.body.name, "phone":req.body.phone, "email":req.body.email});
          if(Object.keys(req.body).length !== 0)
              collection.insert(req.body);
          ////////////// For DEBUG ////////////////////
          var cursor = mydb.collection(collection_name).find();
          cursor.each(function (err, doc) {
              if (err) {
                  console.log(err);
              }
              else {
                  if (doc != null) {
                      console.log(doc);
                  }
                  else {
                      console.log("END");
                  }
              }
          });
        /////////////////////////////////////////////  
      } 
  });
});


app.get('/getregion', function(req, res){
  Region.findOne({}, function(err, reg){
      if(err) return res.status(500).json({error: err});
      if(!reg) return res.status(400).json({error: 'not found'}); 
      console.log("getregion");
      res.json(reg)
  })
});


app.delete('/region',function(req,res,next){
  collection_name = 'regions'  
  console.log("enter to delete region");
  mongoClient.connect('mongodb://localhost/', function(error, client){
      if (error) {
          console.log(error);
      } else {
          console.log("connected: " + db_name);
          mydb = client.db(db_name);

          collection = mydb.collection(collection_name);
          collection.find({}).toArray(function(err, results){
              res.status(200).json({'myCollection' : results});
            });
          
          collection.deleteMany({});
          ////////////// For DEBUG ////////////////////
          var cursor = mydb.collection(collection_name).find();
          cursor.each(function (err, doc) {
              if (err) {
                  console.log(err);
              }
              else {
                  if (doc != null) {
                      console.log(doc);
                  }
                  else {
                      console.log("END");
                  }
              }
          });
        /////////////////////////////////////////////  
      } 
  });
});