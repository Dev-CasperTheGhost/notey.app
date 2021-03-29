import * as React from "react";
import { connect } from "react-redux";
import Note from "types/Note";
import State from "types/State";
import { closeSidebar, openModal } from "@lib/utils";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  CloseSidebarBtn,
} from "./styles";
import { SrOnly, Divider } from "@styles/Global";
import SidebarSearch from "./SidebarSearch";
import CloseIcon from "@icons/CloseIcon";
import DeleteIcon from "@icons/DeleteIcon";
import Category from "types/Category";
import { CategoryDiv, CategoryTitle, DeleteCategory } from "../../styles/Category";
import { useRouter } from "next/router";

interface Props {
  notes: Note[];
  activeNote: Note | null;
  categories: Category[];
}

const noCategory = {
  name: "No Category",
  _id: "no_category",
};

const Sidebar: React.FC<Props> = ({ notes, categories, activeNote }) => {
  const [filteredNotes, setFilteredNotes] = React.useState(notes);
  const router = useRouter();

  React.useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const setActiveNote = (id: string) => {
    router.push({
      href: "/app",
      query: {
        noteId: id,
      },
    });
  };

  const filterNotes = (filter: string) => {
    if (filter === "") return setFilteredNotes(notes);
    setFilteredNotes(
      notes &&
        notes.filter((note) => {
          const title = note.title.toLowerCase();
          return title.includes(filter);
        }),
    );
  };

  return (
    <>
      <SidebarStyle id="sidebar">
        <SidebarHeader>
          <SidebarSearch filterNotes={filterNotes} />
          <CloseSidebarBtn onClick={() => closeSidebar("sidebar")}>
            <SrOnly>Close Menu</SrOnly>
            <CloseIcon />
          </CloseSidebarBtn>
        </SidebarHeader>

        <SidebarBody>
          <>
            {[...categories, noCategory].map((cat, ci) => {
              const category = cat.name;
              const categoryNotes = filteredNotes?.filter((note) => {
                return note.category_id === cat._id;
              });
              if (categoryNotes && categoryNotes.length <= 0) return null;

              return (
                <CategoryDiv id={`category-${cat._id}`} key={ci}>
                  <div style={{ display: "flex" }}>
                    {/* onClick={() => setFoldState(cat._id)} */}
                    <CategoryTitle title="Click to fold">{category}</CategoryTitle>
                    <div>
                      {/* onClick={() => deleteCategory(cat._id)} */}
                      <DeleteCategory>
                        <SrOnly>Delete</SrOnly>
                        <DeleteIcon></DeleteIcon>
                      </DeleteCategory>
                    </div>
                  </div>
                  <div className="items">
                    {categoryNotes?.map((note, i) => {
                      if (note.category_id === cat._id) {
                        const isActiveNote = isActive(activeNote ? activeNote : notes?.[0], note);

                        return (
                          <SidebarNote
                            onClick={() => {
                              if (isActiveNote) return;
                              setActiveNote(note._id);
                              closeSidebar("sidebar");
                            }}
                            key={i}
                            title={note.title}
                            className={isActiveNote ? "active" : ""}
                          >
                            {note.title}
                          </SidebarNote>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </CategoryDiv>
              );
            })}

            {/* don't show divider when no notes are found */}
            {notes && !notes[0] ? null : <Divider id="divider" />}

            <SidebarNote onClick={() => openModal("createNoteModal")}>Create new Note</SidebarNote>
            <SidebarNote onClick={() => openModal("createCategoryModal")}>
              Create new Category
            </SidebarNote>
            <SidebarNote onClick={() => openModal("optionsModal")}>Options</SidebarNote>
          </>
        </SidebarBody>
      </SidebarStyle>

      <SidebarActive onClick={() => closeSidebar("sidebar")} id="sidebarActive"></SidebarActive>
    </>
  );
};

function isActive(activeNote: Note | undefined, note: Note) {
  return activeNote?._id === note?._id;
}

const mapToProps = (state: State) => ({
  notes: state.notes.notes,
  categories: state.categories.categories,
  activeNote: state.notes.note,
});

export default connect(mapToProps)(Sidebar);

export interface Options {
  token: string;
  prefix: string;
  owners?: string;
}
