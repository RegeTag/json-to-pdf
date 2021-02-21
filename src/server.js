const express = require('express');
const ejs = require('ejs')//used to render on browser .ejs
const path = require('path') // needed to pass the file location
const pdf = require('html-pdf')//used to create .pdf
const app = express()

const passengers= [
    {
        "name": "Alberto",
        "flightNumber": "17",
        "time": "17h30"
    },
    {
        "name": "Alice",
        "flightNumber": "17",
        "time": "17h30"
    },
    {
        "name": "Jorje",
        "flightNumber": "17",
        "time": "17h30"
    },
]
    
app.get('/', (request,response)=>{//main route
    ejs.renderFile(
        path.join(__dirname, '/print.ejs'), { passengers },(err,html) =>{
            if(err) {
                return response.send('Erro na leitura do arquivo')
            }
            //if it gets any error, will return the message above

            const options = {
                height: "11.25in",
                width: "8.5in",
                header:{
                    height:"20mm"
                },
                footer:{
                    height: "20mm"
                }
            }
            
            //create .pdf
            pdf.create(html, options).toFile('report.pdf', (err, data)=>{
                if(err){
                    return response.send('Erro ao gerar PDF')
                }
                return response.send(html)
            })
            
    })

})

app.listen(3000)