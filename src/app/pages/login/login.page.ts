import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isNotHome=true;
  loading: HTMLIonLoadingElement;
  users = [];
  usuario: string;
  password: string;
  user: any;
  tipo: string

  constructor(private toastController: ToastController, private loadingController:LoadingController,  private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params=>{
      console.log('params: ',params);
      if(this.router.getCurrentNavigation().extras.state){
        this.users.push(this.router.getCurrentNavigation().extras.state.users[0]);
      }
    });
   }

   vistaLogin(){
    this.users.forEach(element=>{
      console.log(element.correo);
    });
   }

  cargarLoading(message: string){
    
    this.presentLoading(message);

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
  }
  async presentLoading(message: string){
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  ngOnInit(){
    this.cargarLoading('Bienvenido a RegistrApp!');
    console.log('ngOnInit');
  }

  login(){
    if(this.usuario && this.password){
      this.users.forEach(element=>{
        if(Object.values(element).includes(this.usuario)){
          if(element.password===this.password){
            console.log('Usuario logeado');
            this.user=element;
            this.tipo=element.tipouser;
            console.log(this.user);
            this.entrando();
          }else{
            this.noinfo();
          }
          console.log(element);
        }
      });
    }
  }

  async noinfo(){
    const cargando = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Datos incorrecto',
      duration: 2000,
      spinner: null
    });
    await cargando.present();
    const {role,data} = await cargando.onDidDismiss();
    console.log('Cargando datos')
  }

  async entrando(){
    const cargando = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesion...',
      duration: 2000,
      spinner: 'crescent'
    });
    await cargando.present();
    const {role,data} = await cargando.onDidDismiss();
    console.log('Cargando datos');
    if(data==null){
      const navegacion : NavigationExtras = {
        state:{
          users: this.user
        }
      }
      this.router.navigate(['home'],navegacion);
    }
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

