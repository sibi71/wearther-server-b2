const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const https =require("https")
const port = 4000;

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/index.html")
})

app.post("/",(req,res)=>{
    const city = req.body.cityname 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3a419ab7ab02bcafdccf93381e74575`

    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherdata = JSON.parse(data)
            res.render("result",{
                name:weatherdata.name,
                temp:weatherdata.main.temp
            })
        })
    })
})

app.listen(port,(req,res)=>{
console.log(`server is up running on port ${port}`);

})