import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrgenPageRoutingModule } from './qrgen-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { QrgenPage } from './qrgen.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrgenPageRoutingModule,
    ComponentsModule,
    NgxQRCodeModule
    
  ],
  declarations: [QrgenPage]
})
export class QrgenPageModule {}
