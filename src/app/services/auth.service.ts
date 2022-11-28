import { Usuario } from 'src/app/models/models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase:AngularFireAuth) { }

  login(email: string, password: string) {
    return this.authfirebase.signInWithEmailAndPassword(email, password)
  }

  logout(){
    this.authfirebase.signOut();
  }

  //Crear usuario en Firebase Authentication
  registrarUser(datos: Usuario){
    return this.authfirebase.createUserWithEmailAndPassword(datos.email, datos.password)
  }

  stateUser(){
    return this.authfirebase.authState
  }

  async getUid(){
    const user = await this.authfirebase.currentUser;
    if(user){
      return user.uid
    } else {
      return null;
    }
    
  }
}
