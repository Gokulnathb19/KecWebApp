const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var {ObjectId} = require('mongodb');

const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const fb=admin.firestore();

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());


app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));

router.route('/queries').get((req, res) => {
	MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log('MongoDB database connection established successfully!');
		var dbo = db.db("mydb");
  		dbo.collection("queries").find({}).toArray(function(err, result) {
        	if (err)
        	    console.log(err);
        	else{
        	    res.send(result);
        	}
    	});
	});
    
});

router.route('/bqueries').get((req, res) => {
	var data=[];
	var qdRef = fb.collection('QueryData');
	var allQueries = qdRef.get().then(snapshot => {
    	snapshot.forEach(doc => {
      		console.log(doc.id, '=>', doc.data());
      		data=data.concat(doc.data());
    	});
    	res.send(data);
  	}).catch(err => {
    	console.log('Error getting documents', err);
  		});
});

router.route('/backup').get((req, res) => {
	MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log('MongoDB database connection established successfully!');
		var dbo = db.db("mydb");
  		dbo.collection("queries").find({}).toArray(function(err, result) {
        	if (err)
        	    console.log(err);
        	else{
        		var bu='{"Backup Queries":"Success"}';
				res.send(JSON.parse(bu));
				result.forEach(r => {
					var rData = { name: r.name, email: r.email, phone: r.phone, query: r.query };  
					fb.collection('QueryData').doc(r.email).set(rData).then(() =>{
						console.log('New Query inserted/updated to cloud');
					})
				});
        	}
    	});
	});
    
});

router.route('/queries/add').post((req, res) => {
	MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log('MongoDB database connection established successfully!');
		q=req.body;
		var dbo = db.db("mydb");
		var myobj = { name: q.name, email: q.email, phone: q.phone, query: q.query };
		var qData = { name: q.name, email: q.email, phone: q.phone, query: q.query };  
  		dbo.collection("queries").insertOne(myobj, function(err, result) {
    		if (err){
				console.log("Data Not Stored");
    			er=err;
    			throw err;
    		}
    		console.log("Data Stored Successfully");
    		res.send(result);
		});
    });
});

router.route('/queries/delete/:id').get((req, res) => {
	MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log('MongoDB database connection established successfully!');
		var dbo = db.db("mydb");
  		var myobj = { _id: ObjectId(req.params.id.toString()) };
  		console.log(req.params.id);
  		dbo.collection("queries").deleteOne(myobj, function(err, result) {
    		if (err){
    			er=err;
    			throw err;
    			console.log("Data Not Stored");
    		}
    		console.log("Deleted Successfully");
    		res.send(result);
		});
    });
});

router.route('/').get((req, res) => {
	res.send('Hello World!');
});