import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "../model/book.model";

export const selectBooks = createFeatureSelector<Book[]>('mybooks');

export const selectBookById = (bookId: number) => createSelector(selectBooks, (books: Book[]) => {
  var bookbyId = books.filter(item => item.id === bookId);
  if (bookbyId.length == 0) {
    return null;
  }
  return bookbyId[0];
});