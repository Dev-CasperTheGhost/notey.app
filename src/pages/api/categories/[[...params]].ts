import {
  createHandler,
  Post,
  BadRequestException,
  NotFoundException,
  Body,
  Req,
  Delete,
  Get,
  Put,
  Param,
  HttpException,
} from "@storyofams/next-api-decorators";
import "@lib/database";
import NoteModel, { NoteDoc } from "@models/Note.model";
import { IRequest } from "types/IRequest";
import CategoryModel from "@models/Category.model";
import { isTrue } from "@lib/utils";
import { ObjectId } from "mongoose";
// import { AuthGuard } from "@lib/middlewares";

class CategoriesApiManager {
  private _getUserCategories(userId: ObjectId) {
    return CategoryModel.find({ user_id: userId });
  }

  @Get()
  // @AuthGuard()
  async getUserCategories(@Req() req: IRequest) {
    const categories = await this._getUserCategories(req.userId);

    return {
      categories,
      status: "success",
    };
  }

  @Post()
  // @AuthGuard()
  async createCategory(@Body() body: IRequest["body"], @Req() req: IRequest) {
    const { name } = body;

    if (!name) {
      throw new BadRequestException("Please fill in all fields");
    }

    if (name.length > 20) {
      throw new BadRequestException("Category name has a limit of 20 characters.");
    }

    const category = new CategoryModel({
      user_id: req.userId,
      name,
    });

    await category.save();

    const categories = await this._getUserCategories(req.userId);
    return {
      categories,
      status: "success",
    };
  }

  @Put("/:id")
  // @AuthGuard()
  async updateCategory(
    @Body() body: IRequest["body"],
    @Param("id") id: string,
    @Req() req: IRequest,
  ) {
    const { name, folded } = body;

    if (!name) {
      throw new BadRequestException("please fill in all fields");
    }

    if (name.length > 20) {
      throw new BadRequestException("category name has a limit of 20 characters.");
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException("category was not found");
    }

    if (folded !== undefined) {
      category.folded = isTrue(folded);
    }

    category.name = name;
    await category.save();

    const categories = await this._getUserCategories(req.userId);
    return {
      categories,
      status: "success",
    };
  }

  @Delete("/:id")
  // @AuthGuard()
  async deleteCategory(@Param("id") id: string, @Req() req: IRequest) {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException("category was not found");
    }

    if (req.userId.toString() !== category?.user_id?.toString()) {
      throw new HttpException(403, "permission denied");
    }

    const notes = await NoteModel.find({ category_id: id, user_id: req.userId });

    await Promise.all(
      notes.map(async (note: NoteDoc) => {
        note.category_id = "no_category";
        await note.save();
      }),
    );

    await CategoryModel.findByIdAndDelete(id);

    const categories = await this._getUserCategories(req.userId);
    const updatedNotes = await NoteModel.find({ user_id: req.userId });

    return {
      categories,
      notes: updatedNotes,
      status: "success",
    };
  }
}

export default createHandler(CategoriesApiManager);