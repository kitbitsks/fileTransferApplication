const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let fileTransferring = () =>{
rl.question('Enter the name of Directory? ->  ', (answer) => {

    fs.readdir(`${answer}`,'utf-8',(err,file)=>{
        if(err){
            console.log(`Directory doesn't exist ! Please create a directory first.`);
            rl.close();}
        else{
            if(file.length==0)
                {
                    console.log(`No files exist in the directory`);
                    process.exit();
                }
            else{
                console.log('Files in directory are :');
                let j=1;
                for(let i of file)// reading files from the specified directory
                    console.log((j++)+'. '+i);
                console.log(`Please enter the value in range 1 - ${file.length}`)
                rl.question('Enter the index of file to be copied : ',(answer1)=>{
                    if(answer1<1 || answer1>file.length)
                        {
                            console.log("Invalid index Value !");
                            process.exit();
                        }
                    console.log(`${file[answer1-1]} selected`);

                rl.question(`Enter the directory name where you want to copy the ${file[answer1-1]} file : `,(answer3)=>{
                    //creating directory if it does not exist
                    if (!fs.existsSync(answer3)){
                        console.log(`Hey folks ! Directory didn't exist. Cheers, we created it :)`)
                        fs.mkdirSync(answer3);
                    }
                    let readPath = path.join(answer,file[answer1-1]);   //path of reading
                    let writePath = path.join(answer3,file[answer1-1]); //path of writing
                    let readStream = fs.createReadStream(readPath);     //create readstream
                    let writeStream = fs.createWriteStream(writePath)   //create writestream
                    console.log('copying.........')
                    readStream.on('data',(chunk)=>{
                          //  console.log(chunk);  //chunk of stream being copied to file in other directory
                            writeStream.write(chunk)
                    });
                    readStream.on('end',()=>{
                            writeStream.end()
                            console.log(`File '${file[answer1-1]}' has been copied to '${answer3}' directory`);
                            console.log(`Hey ! If you want to see how chunks of data are being copied..`)
                            console.log(`Remove first comment sign '//' given on line no : 40 in 'fileTransfer.js'` )
                    });
                    rl.close();
                })
            })
        }
    
        }
    })
})
}
module.exports = {
    fileTransferring : fileTransferring
}