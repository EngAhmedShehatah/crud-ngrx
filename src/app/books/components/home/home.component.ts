import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/store/app.action';
import { selectAppState } from 'src/app/store/app.selector';
import { Appstate } from 'src/app/store/appstate';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../../store/books.action';
import { selectBooks } from '../../store/books.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deleteModal: any;
  idToDelete: number = 0;

  books$ = this.store.pipe(select(selectBooks));

  constructor(private store: Store, private appStore: Store<Appstate>) { }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(invokeDeleteBookAPI({ id: this.idToDelete }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe(appState => {
      if (appState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiResponseMessage: '',
            apiStatus: ''
          }
        }));
      }
    });
  }

}
