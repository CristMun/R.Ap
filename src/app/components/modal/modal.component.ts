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

  constructor(private usuarioservService: UsuarioservService,
              private modalCtrl: ModalController,
              private toastCtrl:ToastController) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    this.usuarioservService.getUsuarioById(this.uid).subscribe(respuesta => {
      this.usuario = respuesta;
    });
  }

  async updateUsuario(){
    this.usuarioservService.updateUsuario(this.usuario);
    this.modalCtrl.dismiss();
    this.toastPresent('Usuario Actualizado!!!!');
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
}
