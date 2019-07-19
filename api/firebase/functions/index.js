const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');
const express = require('express');

const app = express();

var admin = require("firebase-admin");

var serviceAccount = require("./config");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rentme-52af4.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'rentme-52af4',
    keyFilename: 'config.json'
});




exports.onFileChange = functions.storage.object().onFinalize(event => {

    const bucket = event.bucket;
    const contentType = event.contentType;
    const filePath = event.name;
    console.log('File change detected, function execution started');


    let property_image_url = event.name;
    let numeric_property_id = property_image_url.split(" ")[0];
    let property_id = numeric_property_id + "";

    
    

    // console.log('need to delete' + path.basename(filePath));

    
    

    storage
        .bucket('rentme-52af4.appspot.com')
        .getFiles()
        .then(results => {

            

            const files = results[0];
            
            let oldFileDeleter = [];
            let newfileDeleter = [];

            let file1 = null;
            let file2 = null;
            
            return files.forEach(file => {
                    
                oldFileDeleter.push(file);
                
                newfileDeleter = oldFileDeleter.filter(files => path.basename(files).startsWith(property_id));

                

            }).then(() => {
                if(newfileDeleter.length === 0){

                    newfileDeleter = [];
                    return;

                } else if (newfileDeleter.length === 1) {

                    file1 = newfileDeleter[0];
                    file2 = newfileDeleter[1];


                    newfileDeleter = []

                    console.log(file1);
                    console.log(file2);

                    return;
                }

                return;
            })
            
        }).catch(err => {
            return err;
        })

    
});


app.get('/file/:name', (req, res) => {

    let fileName = req.params.name;
    console.log(fileName);
    // res.send('working')
    cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(500).json({
                message: 'Not Allowed'
            });
        }

        
        

        storage
            .bucket('rentme-52af4.appspot.com')
            .getFiles()
            .then(results => {
                const files = results[0];
                console.log('Files:');
                return files.forEach(file => {
                    if (file.name === fileName){
                        console.log(file.name)

                        return file.getSignedUrl({
                            action: 'read',
                            expires: '03-09-2491'
                        }).then(signedUrl => {

                            console.log(signedUrl);

                            let url = signedUrl[0];

                            console.log('url ' + url);
                            console.log(typeof(url))
                            
                            
                            return res.status(200).json(
                                url
                            );
                            
                        })
                    }
        
                })
            
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })

    })
})



exports.getfile = functions.https.onRequest(app);
    



exports.uploadFile = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not Allowed'
            });
        }
        const busboy = new Busboy({ headers: req.headers });

        let uploadData = null;

    
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filePath = path.join(os.tmpdir(), filename);
            uploadData = { file: filePath, type: mimetype };
            file.pipe(fs.createWriteStream(filePath));
        });

        busboy.on('finish', () => {
            const bucket = storage.bucket('rentme-52af4.appspot.com');
            bucket.upload(uploadData.file, {
                uploadType: 'media',
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }


            }).then(() => {

                return res.status(200).json({
                    message: 'it worked'
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
        });
        busboy.end(req.rawBody);
    });

});



