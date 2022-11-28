import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Usuario } from 'src/app/models/models';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  loading: HTMLIonLoadingElement;

  datos : Usuario = {
    uid:        null,
    name:      null,
    lastname:  null,
    rut:       null,
    gender:    null,
    age:       null,
    email:     null,
    password:  null,
    direction: null,
    phone:     null,
    image:     null,
    rol:      'alumno',
  }

  constructor(private auth: AuthService,
              private firestore: FirestoreService,
              private alertCtrl: AlertController,
              private loadingController:LoadingController,
              private router: Router
    ) { }

  ngOnInit() {}

  async registrar(){
    this.cargarLoading('Registrando...')
    console.log('datos->', this.datos);
    const res = await this.auth.registrarUser(this.datos)

    if(res){
      console.log('consola: Exito al crear usuario')
      const path = 'Usuarios';
      const id =res.user.uid
      this.datos.uid = id;
      this.datos.password = null;
      await this.firestore.createDoc(this.datos, path, id)
      this.presentToast('Registrado con exito!', 'Bienvenido a RegistrApp!')
      this.router.navigate(['/home'])
      
    }
    else{
      this.presentToast('Error', 'Usuario ya registrado')
    }
    
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
  
  async presentToast(header:string,mesagge:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:mesagge,
      buttons:['OK'],
      
    });
    await alert.present();
  }
}
