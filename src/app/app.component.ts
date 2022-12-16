import { Usuario } from 'src/app/models/models';
import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login: boolean = false;
  loading: HTMLIonLoadingElement;
  rol: 'alumno' | 'profesor' | 'admin' = null

  public appPages = [
    { title: 'Home',       url: '/home',        icon: 'home'     },
    { title: 'Mi Perfil',  url: '/perfil',      icon: 'person'   },
    { title: 'Asistencia', url: '/asistencia',  icon: 'calendar' },
    { title: 'Clima',      url: '/clima',       icon: 'sunny'    },
    { title: 'Mapa',       url: '/map',         icon: 'map'      },
    { title: 'Conversor',  url: '/coversor',    icon: 'cash'     },
    { title: 'About',      url: '/about',       icon: 'alert'    },

  ];
 
  constructor(private firestore: FirestoreService,
              private auth: AuthService,
              private loadingController:LoadingController,
              private router: Router,) {

      this.auth.stateUser().subscribe( res => {
        if(res) {
          
          this.login = true;
          this.getDatosUser(res.uid);
          
        } else {
          console.log('no esta logeado');
          this.login = false 
        }
    })
  }

  getDatosUser(uid:string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<Usuario>(path, id).subscribe ( res => {
      if(res){
        this.rol = res.rol
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
