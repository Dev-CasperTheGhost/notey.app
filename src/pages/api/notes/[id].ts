import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";
import useAuth from "@hooks/useAuth";
import { errorObj, isTrue, parseLockedNotes } from "@lib/utils";
import NoteModel, { INote } from "@models/Note.model";
import "@lib/database";
import useMarkdown from "@hooks/useMarkdown";
import { isValidObjectId } from "mongoose";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await useAuth(req, res);
  } catch (e) {
    return res.json({
      error: e,
      status: "error",
    });
  }

  switch (method) {
    case "GET": {
      try {
        if (!isValidObjectId(query.id)) {
          const note = await NoteModel.find({ user_id: req.userId }).limit(1);

          return res.json({
            status: "success",
            note: note?.[0] ?? {},
          });
        }

        const note: INote = await NoteModel.findById(query.id);

        if (!note) {
          return res.status(404).json(errorObj("not was not found"));
        }

        if (note?.locked) {
          return res.status(404).json(errorObj("not was not found"));
        }

        if (!note.shared && note?.user_id?.toString() !== req.userId?.toString()) {
          return res.status(404).json(errorObj("note was not found"));
        }

        return res.json({
          note,
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }
    case "PUT": {
      try {
        const { category_id, title, body, locked, shared } = req.body;

        if (!category_id || !title || !body) {
          return res.status(400).json(errorObj("Please fill in all fields"));
        }

        const note: INote = await NoteModel.findById(query.id);
        const markdown = useMarkdown(body);

        if (!note) {
          return res.json(errorObj("not was not found"));
        }

        if (note.user_id.toString() !== req.userId.toString()) {
          return res.status(401).json(errorObj("Permission denied"));
        }

        await NoteModel.findByIdAndUpdate(note._id, {
          title,
          category_id,
          body,
          markdown,
          locked: isTrue(locked),
          shared: isTrue(shared),
        });

        const updated = await NoteModel.findById(query.id);
        const notes = await NoteModel.find({ user_id: req.userId });

        return res.json({
          notes: parseLockedNotes(notes),
          note: updated,
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }
    case "DELETE": {
      try {
        const note: INote = await NoteModel.findById(query.id);

        if (!note) {
          return res.json(errorObj("note was not found"));
        }

        if (note.user_id.toString() !== req.userId.toString()) {
          return res.status(401).json(errorObj("Permission denied"));
        }

        await NoteModel.findByIdAndDelete(note._id);
        const notes = await NoteModel.find({ user_id: req.userId });

        return res.json({
          notes: parseLockedNotes(notes),
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }

    default: {
      return res.status(405).json({
        msg: "Method not allowed",
        error: true,
      });
    }
  }
}
