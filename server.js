const { json } = require("express");
const express=require("express");
const app=express();
const fs=require("fs");

app.use(express.json());
app.get('/',(req,res) =>{
    res.send('hello DAvid');      
});


//get all data from todos file =V
//must chek get with title
app.get("/todos",(req,res)=>{
    const { title } =req.query;
    fs.readFile("todos.json","utf8",(err,resFile)=> {
        const todosArr=JSON.parse(resFile);
        if (title){
            const todosfilter=todosArr.filter((todo)=>
            todo.title.includes(title)
            );
            res.send(todosfilter?todosfilter:"No Found");
        }
        else{
            res.send(todosArr);
        }
    });
});
//get all data from todos with id  =V
app.get("/todos/:id",(req,res)=>{
    fs.readFile("todos.json","utf8",(err,todos)=> {
        const todosArr=JSON.parse(todos);
        const todo=todosArr.find((item)=> item.id===+req.params.id);
        if (todo)
            {res.send(todo);}
        else {
            res.status(404);
            res.send();
        }
    });
});
app.post("/todos",(req,res)=> {
        fs.readFile("todos.json","utf8",(err,todos)=> {
       const todosArr=JSON.parse(todos);
    //    console.log(req.body);
       todosArr.push({
        userId: 1,
        id: todosArr.length+1,
        title: req.body.title,
        completed: false
       });
     //fs.writeFile("todos.json",JSON.stringify(updateTodosArr),(err)=>{
       fs.writeFile("todos.json",JSON.stringify(todosArr),(err)=>{
        //    console.log(err);
           res.send("Succsess");
    });
    });
});

//delete by id - V
app.delete ("/todos/:id", (req,res)=>{
    fs.readFile("todos.json","utf8",(err,todos)=>{
        const todosArr = JSON.parse(todos);
        const updateTodosArr =todosArr.filter(
            (todo)=>todo.id !== +req.params.id
            );
        fs.writeFile("todos.json",JSON.stringify(updateTodosArr),(err)=>{
            console.log(err);
            res.send("Succsess");
        }           );        });
});

app.put("/todos/:id",(req,res)=>{
fs.readFile("todos.json","utf8",(err,todos)=>{
    const todosArr = JSON.parse(todos);
    const { title, completed = false } = req.body;
    const {id}=req.params;
    const updateTodosArr=
    todosArr.map((todo)=>
        { if(todo.id===+id){
          return {
              ... todo,
              title,
              completed,
          }    ;
        }else  {return todo;}
});      
    fs.writeFile("todos.json",JSON.stringify(updateTodosArr),(err)=>{
        // console.log(err);
        res.send("Succsess");
    });
});
});

app.listen(8080);
