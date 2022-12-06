import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books";

export const selectBooks = createFeatureSelector<Books[]>('mybooks');

export const selectBookById = (bookId: number) => createSelector(selectBooks, (books: Books[]) => {
  var bookbyId = books.filter(item => item.id === bookId);
  if (bookbyId.length == 0) {
    return null;
  }
  return bookbyId[0];
});