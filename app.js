const express = require('express')
const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost/mapdb'

const app = express()
const client = new MongoClient(url);

client.connect();
   
app.listen(9000, () => {
        console.log('Server started')
    })
    


const router =express.Router();

app.use('/api',router)



/*function findplace(datab,collection1,res){
    client.db(datab).collection(collection1).find(
        { 
            "geometry" : {
                        "type" : "Point",
                        "coordinates" : [
                                -101.8387236,
                                35.1917304
                        ]
                }
        }).toArray((err,docs) => {
            if(err) throw err;
            res.json(docs);
        })
}*/
function findplace(datab,collection1,req,res){
    client.db(datab).collection(collection1).find(
        { 
            "geometry" : {
                        "type" : "Point",
                        "coordinates" : [
                                parseFloat(req.query.lng),
                                parseFloat(req.query.lat)
                        ]
                }
        }).toArray((err,docs) => {
            if(err) throw err;
            res.json(docs);
        })
}
/*

function findplace(datab,collection1,req,res){
    client.db(datab).collection(collection1).find(
        { 
            geometry : {
                $near:
                    {
                        $geometry:{
                        type : "Point",
                        coordinates : [
                                parseFloat(req.query.lng),
                                parseFloat(req.query.lat)
                        ]
                        },
                        $minDistance: 1000,
                        $maxDistance: 5000
                    }
                
            }
        }).toArray((err,docs) => {
            if(err) throw err;
            res.json(docs);
        })
}*/

router.get('/map',(req,res,next) => {
    findplace("mapdb","osm",req,res);
})



