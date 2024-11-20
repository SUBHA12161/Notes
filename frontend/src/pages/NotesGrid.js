import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
import { toast, Bounce } from "react-toastify";
import CreateNote from "./CreateNote";
import moment from "moment";
import Loader from "../Components/Loader";

const NotesGrid = () => {
    const [isCreateNoteOpen, setCreateNoteOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editNotesData, setEditNotesData] = useState({});

    const toggleCreateNote = () => {
        setCreateNoteOpen(!isCreateNoteOpen);
    };

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/notes/get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data.data)) {
                setNotes(data.data);
            } else {
                console.error("Failed to get the notes");
                toast.error(data.message || "Failed to fetch notes.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error fetching the notes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const editNotes = async (data) => {

        console.log("data ==", data);
    }

    return (
        <div className="notes-grid">
            {isLoading ? (
                <Loader />
            ) : notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                <div className="grid-container">
                    {notes.map((note, index) => {
                        const bodyText = note.body
                            .replace(/<[^>]*>/g, "")
                            .split(" ")
                            .slice(0, 30)
                            .join(" ") + (note.body.split(" ").length > 30 ? "..." : "");

                        return (
                            <div
                                className="grid-item"
                                key={index}
                                style={{ backgroundColor: note.color }}
                                onClick={() => {
                                    editNotes(note)
                                }}
                            >
                                <div className="grid-header">
                                    <small className="created-date">
                                        {moment(note.createdAt).format("DD MMM YYYY")}
                                    </small>
                                </div>
                                <div className="grid-body">
                                    <h3 className="note-title">{note.title}</h3>
                                    <p className="note-body">{bodyText}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
            }

            {/* Floating "+" Icon */}
            <Button
                className="floating-btn"
                color="primary"
                onClick={toggleCreateNote}
            >
                <FaPlus size={20} />
            </Button>

            {/* Create Note Modal */}
            <CreateNote isOpen={isCreateNoteOpen} toggle={toggleCreateNote} />
        </div >
    );
};

export default NotesGrid;