import React from "react";

const Actions = ({ mode, setMode }) => {
    const entry = {
        title: "",
        description: "",
        year: "",
        image: "",
        photos: [],
    };
    const handleAddEntry = () => {
        setMode("saved");
    };
    
    const handleSaveEntry = () => {
        // save entry to firestore
        console.log("Saving entry: ", entry);
        setMode("edit");
    };
    
    return (
        <div>
        {mode === "saved" && (
            <button onClick={handleAddEntry}>Edit</button>
        )}
        {mode === "new" && (
            <button onClick={handleSaveEntry}>Save</button>
        )}
        </div>
    );
    }

export default Actions;