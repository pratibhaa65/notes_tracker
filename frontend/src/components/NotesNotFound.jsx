import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
      <div className="text-center">
        <NotebookIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <h2 className="text-lg font-semibold">No Notes Found</h2>
        <p className="text-gray-500">Create your first note now!!!</p>
        <Link to="/create" className="btn btn-primary mt-4">
          Create Note
        </Link>
      </div>
   
  );
};

export default NotesNotFound;
