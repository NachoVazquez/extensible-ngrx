import { DocumentComponent } from './containers/document.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { getTypeName } from 'src/app/shared/state/base-crud.actions';
import { DocumentModel } from 'src/app/core/models/document.model';
import * as fromDocument from './state/reducers/document.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './state/effects/document.effects';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    StoreModule.forFeature('DocumentModel', {
      document: fromDocument.reducer
    }),
    EffectsModule.forFeature([DocumentEffects]),
    DocumentRoutingModule
  ],
  exports: [],
  declarations: [DocumentComponent],
  providers: []
})
export class DocumentModule {}
