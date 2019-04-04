import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentState } from '../state/reducers/document.reducer';

@Component({
  selector: 'app-document',
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit {
  constructor(private store: Store<DocumentState>) {}

  ngOnInit() {
    // this.store.dispatch(new)
  }
}
