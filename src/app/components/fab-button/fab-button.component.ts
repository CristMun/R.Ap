import { AuthService } from './../../services/auth.service';
import { Component, OnInit,Input } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  @Input() pageTitle : string;
  @Input() isNotHome : boolean;


  constructor(private auth: AuthService,
              private loadingController:LoadingController,
              private router: Router, ) {}

  ngOnInit() {}

  logout(){
    this.auth.logout();
    this.cargarLoading('Cerrando sesion...');
    this.router.navigate(['/login'])
  }





  cargarLoading(message: string){
    
    this.presentLoading(message);

    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  }

  async presentLoading(message: string){
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }
  
}
