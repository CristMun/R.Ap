import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegister: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController) {
   
  }

  ngOnInit() {
  }
  /* async guardar(){
    var f = this.formularioRegister.value;
    
    if(this.formularioRegister.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      
      await alert.present();
      return;
      
    }

    var usuario = {
      email: f.email,
      password: f.password
    }

    const nombre="cristobal"


    console.log(nombre)
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }*/

    //modelo
    user : any = {
      nombre:'',
      email:'',
      password: ''
    }
  registrar(){
    this.formularioRegister = this.fb.group({
      
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }
  getUser(){
    
  } as 

}