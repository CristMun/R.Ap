import { Router } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { UsuarioservService } from './../../services/usuarioserv.service';

import { Usuario } from './../../models/models';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() uid: string = '';
  usuario: Usuario = null;

  newImage = '';
  newFile = '';
  

  constructor(private usuarioservService: UsuarioservService,
              private modalCtrl: ModalController,
              private toastCtrl:ToastController,
              private firestorageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    this.usuarioservService.getUsuarioById(this.uid).subscribe(respuesta => {
      this.usuario = respuesta;
    });
  }

  async updateUsuario(){
    const path = 'Fotos';
    const name = this.usuario.name;
    const res = await this.firestorageService.uploadImage(this.newFile, path, name);
    this.usuario.image = res;

    this.usuarioservService.updateUsuario(this.usuario)
    this.toastPresent('Usuario Actualizado!');
    this.modalCtrl.dismiss();

    
  }
  
  async deleteUsuario() {
    this.usuarioservService.deleteUsuario(this.usuario);
    this.modalCtrl.dismiss();
    this.toastPresent('Usuario Eliminado!');
  }


  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    })
    toast.present();
  }


  async newImageUpload(event: any){
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0]
      const reader =new FileReader();
      reader.onload = ((image) =>{
        this.newImage = image.target.result as string;


      });
      reader.readAsDataURL(event.target.files[0]);
    }


    

  }
}
