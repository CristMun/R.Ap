import { RecpaswordComponent } from './recpasword/recpasword.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { FabButtonComponent } from "./fab-button/fab-button.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations : [
        HeaderComponent,
        FooterComponent,
        FabButtonComponent,
        RecpaswordComponent
    ],
    imports : [
        CommonModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports : [
        HeaderComponent,
        FabButtonComponent
    ]
})

export class ComponentsModule {}