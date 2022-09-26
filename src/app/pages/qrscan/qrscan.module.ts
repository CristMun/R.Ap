import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrscanPageRoutingModule } from './qrscan-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { QrscanPage } from './qrscan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrscanPageRoutingModule,
    ComponentsModule
  ],
  declarations: [QrscanPage]
})
export class QrscanPageModule {}
