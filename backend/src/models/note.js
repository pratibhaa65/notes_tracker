import mongoose from "mongoose"; 
// first we'll create a schema and then we create a model from that schema.

const noteSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},
{ timestamps:true } // This will automatically add createdAt and updatedAt fields   
);
const Note = mongoose.model("Note", noteSchema); // Creating a model named "Note" from the noteSchema
export default Note; // Exporting the Note model

