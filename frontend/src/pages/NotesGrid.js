import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { toast, Bounce } from "react-toastify";
import CreateNote from "./CreateNote";
import moment from "moment";
import Loader from "../Components/Loader";

const NotesGrid = () => {
    const [isCreateNoteOpen, setCreateNoteOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editNotesData, setEditNotesData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleCreateNote = () => {
        setCreateNoteOpen(!isCreateNoteOpen);
    };

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/notes/get?page=${currentPage}&size=${pageSize}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data.data)) {
                setNotes(data.data);
                setTotalPages(Math.ceil(data.total / pageSize));
            } else {
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
    }, [currentPage, pageSize]);

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
                <>
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

                    <div className="pagination-container row d-flex align-items-center">

                        <div className="d-flex align-items-center col-auto">
                            <span className="me-2 mb-0">Per Page:</span>
                        </div>

                        <div className="d-flex align-items-center col-auto">
                            <select
                                className="form-select form-select-sm"
                                aria-label="Items per page"
                                onChange={(e) => setPageSize(e.target.value)}
                                value={pageSize}
                            >
                                <option value={3}>3</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </div>

                        <div className="col-auto pt-2">
                            <Pagination aria-label="Page navigation" className="mb-0">
                                <PaginationItem disabled={currentPage === 1}>
                                    <PaginationLink
                                        previous
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem
                                        active={currentPage === index + 1}
                                        key={index}
                                    >
                                        <PaginationLink onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem disabled={currentPage === totalPages}>
                                    <PaginationLink
                                        next
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </div>

                </>
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