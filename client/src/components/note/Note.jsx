import React, { useEffect } from "react";
import { NoteStyle, NoteTextArea } from "../../styles/Notes";

const Note = ({ note, editing, noteBody, setNoteBody }) => {
  // TODO: change to markdown area

  useEffect(() => {
    setNoteBody(note && note.body); 
  }, [setNoteBody, note]);

  return (
    <NoteStyle>
      <NoteTextArea
        onChange={(e) => setNoteBody(e.target.value)}
        disabled={!editing}
        value={noteBody ? noteBody : ""}
        id="note-text-area"
      ></NoteTextArea>
    </NoteStyle>
  );
};

export default Note;
