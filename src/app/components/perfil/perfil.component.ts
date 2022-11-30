import { ModalComponent } from './../modal/modal.component';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/models';
import { FirestoreService } from './../../services/firestore.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { UsuarioservService } from 'src/app/services/usuarioserv.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @Input() pageTitle : string;
  @Input() isNotHome : boolean;


  loading: any;
  uid: string = null;
  info: Usuario = null;
  listadoPersona: Usuario[] = [];
  

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService,
              private alertController: AlertController,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private usuarioservService: UsuarioservService,
              private modalCtrl: ModalController,) {
    this.pageTitle = 'Mi Perfil';
    
               }

 async ngOnInit() {
    
    this.authService.stateUser().subscribe(res =>{
      console.log('En perfil - Estado autenticacion', res);
      this.getUid();
      
    })
    this.getUid();
  }

  async getUid(){
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfoUser();
    } else {
      console.log('No existe uid');
    }    
  }

  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.getDoc<Usuario>(path, id).subscribe( res =>{
      if(res){
        this.info = res;
      }
      console.log('datos son ->', res);
      
    })
  }






  //Modal Edit
  

  async openDetailUsuario(usuario:Usuario) {  
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { uid: this.info.uid },
      breakpoints: [0,0.5,1],
      initialBreakpoint:0.5
    });
    modal.present();
    console.log(usuario);
    
  }
  
    async toastPresent(message:string){
      const toast = await this.toastCtrl.create({
        message:message,
        duration:1000,
      })
      toast.present();
    }


  //Boton info
  btnInfo(){
    this.presentToast('Infomacion: ','Los datos mostrados en esta página solo los verás tú, no es un perfil público.')
  }
  //Mensaje check
  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Actualizado!',
      duration: 1500,
      icon: 'checkmark'
    });

    await toast.present();
  }

  //Mensaje "Actualizando..."
  updatingLoading(message: string){
    
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
