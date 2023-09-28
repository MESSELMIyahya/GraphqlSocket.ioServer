import express from 'express';
import multer from 'multer'
import fs from 'fs';
import {v4} from 'uuid';
const app = express.Router();


const Storge = multer.diskStorage({
    destination:(_,__,cu)=>{
        cu(null,'./upload')
    },
    filename:(_,file,cb)=>{
        cb(null,`graphqlserver--${v4()}--${file.originalname}`);
    }
});

const mu = multer({storage:Storge});


app.post('/',mu.single('file'),(req,res)=>{
    res.redirect(`/images/${req.file.filename}`);
})

app.get('/',(req,res)=>{

    const images = [];

    const ims = fs.readdirSync('./upload');
    if(ims) ims.forEach(e=>images.push(e));

    console.log(images);

    let textRes = '';
    images.forEach(e=>textRes += `<h3 style="margin:10px 0;"><a target="_blank" href="/images/${e}">${e.split('--')[2]}</a></h3>`);
    res.send(textRes);
})

export default app ;