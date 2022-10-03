import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  isNotHome=true;

  loading : HTMLIonLoadingElement;
  
  //modelo
  user : any = {
    email:'',
    password: ''
  }

  field : string = '';

  constructor(private toastController: ToastController, private loadingCtrl:LoadingController,  private router:Router) { }

  cargarLoading(message: string){
    
    this.presentLoading(message);

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
  }
  async presentLoading(message: string){
    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();
  }

  ngOnInit(){
    this.cargarLoading('Bienvenido a RegistrApp!');
    console.log('ngOnInit');
  }

  login(){
    if(this.validarModelo(this.user)){
      this.presentToast('Bienvenido! ' + this.user.email);
      this.router.navigate(['/']);
    }
    else{
      this.presentToast("Debes ingresar : " + this.field);
    }
  }

  validarModelo(model:any){
    for(var[key,value]  of Object.entries(model)){
      if(value == ''){
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(message: string, duration?:number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration?duration:2000,
      position: 'bottom'
    });
    await toast.present();
  }

}

