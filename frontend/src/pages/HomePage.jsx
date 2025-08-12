import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RatelimitedUI.jsx";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false); // Start as false
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRatelimited(true);
        } else {
          toast.error("Error fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />} {/* Use correct component name */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-19">Loading...</div>
        )}

        {notes.length === 0 && !loading && !isRatelimited && <NotesNotFound />}      

        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id }
                title={note.title}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
