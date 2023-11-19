const mongoose =require('mongoose') ;
//Set up default mongoose connection
const connect = async()=>{
    try{
        let MONGO_URI =  'mongodb+srv://nasanew:12345@cluster0.vu2xdd8.mongodb.net/';
        const connection = mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('connection success');
    }catch(error)
    {
        const {code} = error;
        if(error.code == 8000)
        {
            throw new Error("Wrong database' username or password");
        } else if(code == "ENOTFOUND")
        {
            throw new Error("Wrong connect name/connection string ")
        }
        console.log("connect fall");
        throw new Error("Can't connect to database")
    }
}
module.exports={
    connect
}

