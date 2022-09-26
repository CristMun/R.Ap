import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrgenPageRoutingModule } from './qrgen-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { QrgenPage } from './qrgen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrgenPageRoutingModule,
    ComponentsModule
    
  ],
  declarations: [QrgenPage]
})
export class QrgenPageModule {}
