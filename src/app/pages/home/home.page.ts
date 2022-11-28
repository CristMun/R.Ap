import { AuthService } from './../../services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  login: boolean = false;
  loading: HTMLIonLoadingElement;

  pageTitle = 'Home';
  isNotHome = false;

  constructor(private auth: AuthService,
            private loadingController:LoadingController,
            private router: Router,) {

        this.auth.stateUser().subscribe( res => {
          if(res) {
            console.log('Esta logeado');
            this.login = true
            
          }else {
            console.log('no esta logeado');
            this.login = false
            
          }
        }) 
   }

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


