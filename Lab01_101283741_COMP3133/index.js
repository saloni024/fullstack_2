var fs = require("fs")
var csv = require("csv-parser")

//part-a
fs.unlink("canada.txt",(err)=>{
    if(err){
        console.log("Delete error: " + err)
    }
    console.log("canada.txt deleted successfully!")
})

fs.unlink("usa.txt",(err)=>{
    if(err){
        console.log("Delete error: " + err)
    }
    console.log("usa.txt deleted successfully!")
})

//part-b and part-c
fs.createReadStream("input_countries.csv")
    .pipe(csv())
    .on('data', (row)=>{
        if(row['country'] == "Canada"){
            var x = row['country'] + "," + row['year'] + "," + row['population'] + "\n"
            fs.appendFile("canada.txt",x,(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
        if(row['country'] == "United States"){
            var x = row['country'] + "," + row['year'] + "," + row['population'] + "\n"
            fs.appendFile("usa.txt",x,(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
    })
    .on('end', ()=>{
        console.log("CSV file successfully processed!")
    })