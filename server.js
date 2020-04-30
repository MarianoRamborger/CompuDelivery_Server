const express = require('express')
const app = express()
let port = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
let nodemailer = require('nodemailer')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.post ('/newsletter', (req, res) => {

  
  console.log(req.body) 
  res.send(req.body)

  if (req.body.name != null && req.body.email != null) { 

    let sender = nodemailer.createTransport({

        host: "smtp.gmail.com",
        auth: {
            type: "login", // default
            user: "laptopsdelivery@gmail.com",
            pass: "pagolargo1738"
         
        }
    })

    let mailOptions = {
        from: 'laptopsdelivery@gmail.com',
        to: 'laptopsdelivery@gmail.com',
        subject: "Nuevo suscriptor a la newsLetter",
        text: `El suscriptor se llama ${req.body.name} y su mail es ${req.body.email}`

    }

    sender.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }

    });

  }
} )




app.get('/', (req, res) => res.send('Hello World2222!'))


if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))