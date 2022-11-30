import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Usuario } from 'src/app/models/models';
import { UsuarioservService } from 'src/app/services/usuarioserv.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage{
   pageTitle = 'Admin';
  isNotHome = true;

  listadoPersona: Usuario[] = [];

  constructor(private usuarioservService: UsuarioservService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController, 
              private alertCtrl: AlertController) {
    this.getUsuarios();
   }



   getUsuarios(): void {
    this.usuarioservService.getUsuarios().subscribe(respuesta => {
      console.log(respuesta);
      this.listadoPersona = respuesta;
    })
  }

  async openDetailUsuario(usuario:Usuario) {  
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { uid: usuario.uid },
      breakpoints: [0,0.5,0.8],
      initialBreakpoint:0.5
    });
    modal.present();
    console.log();
    
  }
// Añadir nuevo usuario
  async addUsuario() {
    const alert = await this.alertCtrl.create({
      header:'Añadir Usuario',
      inputs: [
        {
          name:'name',
          type:'text',
          placeholder:'Nombre'
        },
        {
          name:'lastname',
          type:'text',
          placeholder:'Apellido',
        },
        {
          name:'rut',
          type:'text',
          placeholder:'Rut'
        },
        {
          name:'age',
          type:'text',
          placeholder:'Edad'
        },
        {
          name:'gender',
          type:'text',
          placeholder:'Genero'
        },
        {
          name:'direction',
          type:'text',
          placeholder:'Direccion'
        },
        {
          name:'phone',
          type:'number',
          placeholder:'Telefono'
        },

        {
          name:'email',
          type:'email',
          placeholder:'correo@correo.com'
        },
        {
          name:'password',
          type:'password',
          placeholder:'Contraseña'
        },

        {
          name:'image',
          type:'url',
          placeholder:'link web image'
        },
        {
          name:'rol',
          type:'text',
          placeholder:'rol'
        },
      ],
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
        },
        {
          text:'Save',
          role:'confirm',
          handler: (data) => {
            this.usuarioservService.addUsuario(data);
            this.toastPresent('Usuario añadido!'); 
          }
        }
      ]
      });
      await alert.present();
    }
  // Añadir nuevo usuario

    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:1000,
      })
      toast.present();
    }
}
