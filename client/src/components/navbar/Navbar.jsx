import React, { useEffect } from "react";
import SelectCategory from "../SelectCategory";
import { MenuIcon, CloseIcon, OptionsIcon } from "../icons";
import { SrOnly, Column, Row, Button } from "../../styles/Global";
import { openSidebar, closeSidebar } from "../../utils/functions";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
  OpenSidebar,
  NavTitleInput,
  OpenRightSidebar,
} from "./navbar.style";
import {
  RightSidebarActive,
  RightSidebarStyle,
  RightSidebarContent,
  CloseRightSidebar,
} from "./right-sidebar.style";

const Navbar = ({
  note,
  deleteNote,
  editNote,
  editing,
  noteTitle,
  setNoteTitle,
  categoryId,
  setCategoryId,
  categories,
}) => {
  useEffect(() => {
    document.title = note ? `Notey.app - ${note.title}` : "Notey.app";

    setNoteTitle(note && note.title);
    setCategoryId(note && note.category_id);
  }, [note, setNoteTitle, setCategoryId]);

  return (
    <NavbarContainer>
      <NavbarStyle>
        <NavTitle>
          <OpenSidebar onClick={() => openSidebar("sidebar")}>
            <MenuIcon />
          </OpenSidebar>
          <>
            <SrOnly htmlFor="activeNoteTitle">
              Title
            </SrOnly>
            {note && note.title ? (
              editing ? (
                <>
                  <EditingTitleNote
                    setNoteTitle={setNoteTitle}
                    noteTitle={noteTitle}
                  />
                </>
              ) : (
                <h4 readOnly>{noteTitle}</h4>
              )
            ) : (
              "No notes found"
            )}
          </>
        </NavTitle>
        <NavLinks>
          {note && note._id ? (
            <Row>
              <OpenRightSidebar onClick={() => openSidebar("right-sidebar")}>
                <OptionsIcon></OptionsIcon>
              </OpenRightSidebar>
              <Row>
                {editing ? (
                  <SelectCategory
                    className="is-in-nav"
                    id="activeNoteTitle"
                    categoryId={categoryId}
                    categories={categories}
                    setCategoryId={setCategoryId}
                  />
                ) : null}
                <Button navBtn danger onClick={() => deleteNote(note._id)}>
                  Delete
                </Button>
                <Button
                  navBtn
                  className="ml"
                  success
                  onClick={() => editNote(editing ? "save" : null, note._id)}
                >
                  {editing ? "Save" : "Edit"}
                </Button>
              </Row>
            </Row>
          ) : null}
        </NavLinks>
      </NavbarStyle>
      <RightSidebar
        note={note}
        deleteNote={deleteNote}
        editing={editing}
        editNote={editNote}
        categories={categories}
        setCategoryId={setCategoryId}
        categoryId={categoryId}
      />
    </NavbarContainer>
  );
};

const EditingTitleNote = ({ setNoteTitle, noteTitle }) => {
  return (
    <NavTitleInput
      id="activeNoteTitle"
      value={noteTitle}
      onChange={(e) => setNoteTitle(e.target.value)}
    />
  );
};

// For smaller screen
const RightSidebar = ({
  note,
  deleteNote,
  editing,
  editNote,
  categories,
  categoryId,
  setCategoryId,
}) => {
  const deleteNote_ = () => {
    closeSidebar("right-sidebar");
    deleteNote(note && note._id);
  };

  const editNote_ = () => {
    editNote(editing ? "save" : null, note._id);
  };

  return (
    <>
      <RightSidebarActive
        onClick={() => closeSidebar("right-sidebar")}
        id="right-sidebarActive"
      ></RightSidebarActive>
      <RightSidebarStyle id="right-sidebar">
        <RightSidebarContent>
          <Column>
            <CloseRightSidebar
              onClick={() => closeSidebar("right-sidebar")}
              title="Options"
            >
              <SrOnly>Options</SrOnly>
              <CloseIcon />
            </CloseRightSidebar>
            <Button
              style={{ marginBottom: "10px" }}
              success
              onClick={editNote_}
            >
              {editing ? "Save" : "Edit"}
            </Button>
            {editing ? (
              <div style={{ marginBottom: "10px" }}>
                <SelectCategory
                  categoryId={categoryId}
                  categories={categories}
                  setCategoryId={setCategoryId}
                />
              </div>
            ) : null}
            <Button danger onClick={deleteNote_}>
              Delete
            </Button>
          </Column>
        </RightSidebarContent>
      </RightSidebarStyle>
    </>
  );
};

export default Navbar;
