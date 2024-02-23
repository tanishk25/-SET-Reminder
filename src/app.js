
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views" , template_path);
hbs.registerPartials(partials_path);

/*app.get("/", (req, res) => {
    res.render("index")
});
app.get("/register", (req, res) =>{
    res.render("register");
})
app.get("/about", (req, res) =>{
    res.render("about");
})
*/
app.get("/setreminders", (req, res) =>{
    res.render("setreminders");
})

app.get("/logout", (req, res) =>{
    res.render("login");
    
})

app.get("/dashboard", (req, res) =>{
    res.render("dashboard");
})

app.get("/update", (req, res) =>{
    res.render("update");
})


app.get("/delete", (req, res) =>{
    res.render("delete");
})

app.get("/", (req, res) =>{
    res.render("login");
})




/*app.post("/register", async (req, res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerStudent = new Register({
                firstname : req.body.firstname,
                age : req.body.age,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                password : password,
                confirmpassword : cpassword
            })

            const registered = await registerStudent.save();
            res.status(201).render("index");

        }else{
            res.send("password are not matching");
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})*/



app.post("/login", async (req, res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const email="tanishk25jaiswal@gmail.com";
        const mypassword="tanishk@@1234@@";
        if(username === email ){
            if(password ===mypassword){
                res.status(201).render("dashboard");
            }
            else{
                res.send("Incorrect password")
            }
        }else{
            res.send("Email are not matching");
        }
    }
    catch(error){
        res.status(400).send("invalid Email");
    }
})


app.post('/update',async(req,res)=>{
    try{
    const content=req.body;
    const data= await Register.findOne({email:req.body.email});
    if(data!=null){
        const updateData=await Register.updateOne({email:req.body.email},{$set:{'date':content.date,'subject':content.subject,'description':content.description,'email':content.email,'contactno':content.contactno,'smsno':content.smsno,'day7':content.day7},
    
    })
    res.status(201).render("updated");
}  }
catch(error){
    res.status(400).send(error);
}

})

app.post('/delete',async(req,res)=>{
    try{

       await Register.deleteOne({date:req.body.date,subject:req.body.subject});   
       res.render("deleted");
    }

catch(error){
    res.status(400).send(error);
}

})

app.post("/setreminders", async (req, res) =>{
    try{
    
            const registerStudent = new Register({
                
                date: req.body.date,
                subject : req.body.subject,
                description : req.body.description,
                email : req.body.email,
                contactno : req.body.contactno,
                smsno:req.body.smsno ,
                days7 : req.body.days7
            })

            const registered = await registerStudent.save();
            res.status(201).render("summit");

        
    }
    catch(error){
        res.status(400).send(error);
    }
})

app.get("/viewreminder", async(req, res) =>{
    const data= await Register.find();
    res.send(data);
})
        


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});
