import mongoose from "mongoose";

export const Database = mongoose.connect(process.env.MONGI_URI,{dbName:"SocialApp"})
.then((c)=>{
    console.log(`👌 Database connected to. ${c.connection.host} 👌`);
}) .catch((error)=>{
    console.log(error);
})