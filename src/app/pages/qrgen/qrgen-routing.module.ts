import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrgenPage } from './qrgen.page';

const routes: Routes = [
  {
    path: '',
    component: QrgenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrgenPageRoutingModule {}
