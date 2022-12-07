import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/store/app.action';
import { selectAppState } from 'src/app/store/app.selector';
import { Appstate } from 'src/app/store/appstate';
import { Book } from '../../model/book.model';
import { invokeSaveNewBookAPI } from '../../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.store.dispatch(invokeSaveNewBookAPI({ newBook: form.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe(appState => {
      if (appState.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiResponseMessage: '',
            apiStatus: ''
          }
        }));
        this.router.navigate(['/']);
      }
    })
  }

}
