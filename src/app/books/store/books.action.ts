import { createAction, props } from "@ngrx/store";
import { Books } from "../model/books.model";

// retrieve
export const invokeBooksAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);

export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Books[] }>()
);

// create
export const invokeSaveNewBookAPI = createAction(
  '[Books API] Invoke save new book api',
  props<{ newBook: Books }>()
);

export const saveNewBookAPISuccess = createAction(
  '[Books API] save new book api success',
  props<{ newBook: Books }>()
);

// update
export const invokeUpdateBookAPI = createAction(
  '[Books API] Invoke update book api',
  props<{ updateBook: Books }>()
);

export const updateBookAPISuccess = createAction(
  '[Books API] update book api success',
  props<{ updateBook: Books }>()
);

// delete
export const invokeDeleteBookAPI = createAction(
  '[Books API] Invoke delete book api',
  props<{ id: number }>()
);

export const deleteBookAPISuccess = createAction(
  '[Books API] delete book api success',
  props<{ id: number }>()
);