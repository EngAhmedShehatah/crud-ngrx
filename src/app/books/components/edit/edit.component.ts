import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/store/app.action';
import { selectAppState } from 'src/app/store/app.selector';
import { Appstate } from 'src/app/store/appstate';
import { Book } from '../../model/book.model';
import { invokeUpdateBookAPI } from '../../store/books.action';
import { selectBookById } from '../../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  book: Book;
  editForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    author: new FormControl<string>(''),
    cost: new FormControl<number | null>(null)
  });

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
        this.book = data;
        this.editForm.setValue({ ...this.book });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    let data = {
      id: this.book.id,
      name: this.editForm.value.name,
      author: this.editForm.value.author,
      cost: this.editForm.value.cost
    }
    this.store.dispatch(
      invokeUpdateBookAPI({
        updateBook: data
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
