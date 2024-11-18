import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, } from "reactstrap";
import { toast, Bounce } from 'react-toastify';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNote = ({ isOpen, toggle }) => {
    const predefinedColors = [
        { name: "Light Red", code: "#ff9999" },
        { name: "Light Yellow", code: "#ffe699" },
        { name: "Light Green", code: "#99ff99" },
        { name: "Light Blue", code: "#99ccff" },
        { name: "Light Pink", code: "#ffccff" },
    ];

    const [colors] = useState(predefinedColors);
    const [selectedColor, setSelectedColor] = useState(predefinedColors[0].code);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const noteData = {
            title,
            body,
            color: selectedColor,
        };

        try {
            const response = await fetch("/api/notes/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(noteData),
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log("Note saved successfully");
                toggle();

                toast.success('Note saved successfully.', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce,
                });
            } else {
                console.error("Failed to save the note");
                toast.error(data.message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error saving the note:", error);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} backdrop={true} centered={true}>
                <ModalHeader toggle={toggle}>Create Note</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="noteColor">Note Color</Label>
                            <div className="color-picker-container">
                                {colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="color-circle"
                                        style={{
                                            backgroundColor: color.code,
                                            border: selectedColor === color.code ? "1px solid #000" : "none",
                                        }}
                                        onClick={() => setSelectedColor(color.code)}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <Label for="noteTitle">Title</Label>
                            <Input
                                id="noteTitle"
                                name="title"
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="noteBody">Body</Label>
                            <ReactQuill
                                id="noteBody"
                                theme="snow"
                                value={body}
                                onChange={setBody}
                                placeholder="Write your note here..."
                            />
                        </FormGroup>

                        <div className="d-flex justify-content-end">
                            <Button color="primary" type="submit" className="me-2">
                                Save
                            </Button>
                            <Button color="secondary" type="button" onClick={toggle}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Add some styles for color circles */}
            <style>
                {`
          
        `}
            </style>
        </>
    );
};

export default CreateNote;