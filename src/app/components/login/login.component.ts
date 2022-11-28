import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  credenciales = {
    email: null,
    password : null
  }
  loading: HTMLIonLoadingElement;
  constructor(private auth: AuthService,
              private alertCtrl: AlertController,
              private loadingController:LoadingController,
              private router: Router,
    
) { }

  ngOnInit() {
  }

  async login(){
    console.log('credenciales ->', this.credenciales);
    const res = await this.auth.login(this.credenciales.email, this.credenciales.password)
    if(res){
      console.log('res-> ', res);
      this.router.navigateByUrl('/home',{replaceUrl:true});
      this.presentToast('Ingresado con exito','Bienvenido RegistrApp!!');
      this.router.navigate(['/home'])
    }
    else{
      this.presentToast('Login fallido','Datos ingresados incorrectos.');
    }
  }


  async presentToast(header:string,mesagge:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:mesagge,
      buttons:['OK'],
    });
    await alert.present();
  }
// MENSAJE DE INICIO 
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

//
}
