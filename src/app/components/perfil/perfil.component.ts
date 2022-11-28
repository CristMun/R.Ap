import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/models';
import { FirestoreService } from './../../services/firestore.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

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
  

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService,
              private alertController: AlertController,
              private toastController: ToastController,
              private loadingController: LoadingController) {
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



  async editAtributo(name: string,) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar ' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingresa tu '+ name,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Aceptar',
          handler: (ev) => {
            console.log('Aceptado', ev);
            this.saveAtributo(name, ev[name]);
          },
        },
      ],
    });
    


    await alert.present();
  }

  async editGender(gender: string,) {
    const alert = await this.alertController.create({
      header: 'Editar Genero',
      inputs: [
        {
          label: 'Masculino',
          type: 'radio',
          value: 'masculino',
        },
        {
          label: 'Femenino',
          type: 'radio',
          value: 'femenino',
        },
        {
          label: 'No Binario',
          type: 'radio',
          value: 'nobi',
        },
        
      ],
      
      buttons: [
        {
          text: 'Aceptar',
          handler: (ev) => {
            
            console.log('Aceptado', ev);
            this.saveGender(ev.gender)
          },
        },
      ],
    });

    await alert.present();
  }


  saveAtributo(name: string, input: any){
    this.updatingLoading('Actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
    };
    updateDoc[name] = input;
    
    this.firestoreService.updateDoc(path, id, updateDoc).then( () => {
    this.updateToast()
    } )
  }

  saveGender( genderInput: string){
    this.updatingLoading('Actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
        gender: genderInput
    };
    
    this.firestoreService.updateDoc(path, id, updateDoc).then( () => {
    this.updateToast()
    } )
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

}
