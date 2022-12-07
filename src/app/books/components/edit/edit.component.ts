import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/store/app.action';
import { selectAppState } from 'src/app/store/app.selector';
import { Appstate } from 'src/app/store/appstate';
import { Books } from '../../model/books.model';
import { invokeUpdateBookAPI } from '../../store/books.action';
import { selectBookById } from '../../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap(params => {
        var id = Number(params.get('id'))
        return this.store.pipe(select(selectBookById(id)));
      })
    );
    fetchData$.subscribe(data => {
      if (data) {
        this.bookForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateBookAPI({
        updateBook: { ...this.bookForm }
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: {
              apiResponseMessage: '',
              apiStatus: ''
            }
          })
        );
        this.router.navigate(['/']);
      }
    })
  }

}
