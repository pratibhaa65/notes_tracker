import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id)); //get rid of deleted one 
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
    >

    <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/50">
             {formatDate(new Date(note.createdAt)) }
            </span>
          <div className="flex-items-center gap-1" /> 
             <PenSquareIcon className="size-4"/>
             <button className="btn btn-ghost btn-xs text-error">
                <Trash2Icon className="size-4"/>
             </button>
        </div>
    </div>
  </Link>
  );
}

export default NoteCard