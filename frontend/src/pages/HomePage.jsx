import { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RatelimitedUI from "../components/RatelimitedUI";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes= async () => {
      try{
        // const res= await fetch("http://localhost:5001/api/notes");
        // const data= await res.json();
        const res=await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRatelimited(false);

      }catch(error){
        console.log("Error fetching notes");
        console.log(error);
        if(error.response?.status==429){
          setIsRatelimited(true);
        }else{
          toast.error("Error fetching notes");
        }
      }
      finally {
        setLoading(false);
      }      
    }
  },[])

  return (
    <div className='min-h-screen'>
      <Navbar />
      { isRatelimited && <RatelimitedUI />} 
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-19 ">Loading...</div>}

        {notes.length > 0 && !isRatelimited (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note)=>(
              <NoteCard key={note.id} title={note.title} content={note.content} />
            ))}
          </div>
          
        )}


      </div>
    </div>
  )
}

export default HomePage