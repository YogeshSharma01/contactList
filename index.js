const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./modles/contact');
const app = express();
 


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Yogesh",
        phone: "11111111"
    },
    {
        name:"Tony stark",
        phone: "1111111"
    }
]

app.get("/",function(req,res){
    // console.log(__dirname);
    // res.send("Cool it is running ");
    Contact.find({}, function(err,contact){
        if(err){
            console.log('Error while fetching contact from db',err);
            return
        } else
        return res.render('index',{
            title:"Contactlist",
            contact_list:contact
    });

    
    });
});
app.get("/practice",function(req,res){
    return res.render('practice',{
        title: "Let us play"
    });
});
app.post("/contact-list", function(req,res){
    // return res.redirect("/practice");
    // console.log( req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);

        Contact.create({
            name: req.body.name,
            phone: req.body.phone
        }, function(err,newContact){
            if(err){
                console.log('error in creating contact',err);
                return
            }else {
                console.log('***********',newContact);
                return res.redirect('back');
            }
        });

    // return res.redirect("/");
});
app.get("/delete-contact/", function(req,res){

    let id = req.query.id;
    //  let contactIndex = contactList.findIndex( contact => contact.phone == phone);
    //  if(contactIndex != -1){
    //      contactList.splice(contactIndex,1);
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting the contact',err);
            return
        }
        return res.redirect("back");
    });
        
    
});


app.listen( port, function(err){
    if(err){
        console.log("Error while running the server",err);
    }
    else{
        console.log("Server is running on port number 8000");
    }
})