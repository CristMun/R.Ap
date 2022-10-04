import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegister: FormGroup;
  users = [];
  isSubmit = false;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController, private loadingController: LoadingController, private router: Router) {
   
  }
  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formularioRegister = this.fb.group({
      correo: ['',Validators.compose([Validators.maxLength(70),Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(duocuc|profesor.duoc).cl$'),Validators.required])],
      password:['',[Validators.required,Validators.minLength(5)]],
      tipouser:['',[Validators.required]],
    });
  }

  save(){
    this.isSubmit = true;
    if(!this.formularioRegister.valid){
      console.log('Datos invalidos');
      return false;
    }else{
      console.log(this.formularioRegister.value);
      console.log(typeof this.formularioRegister.value);
      this.users.push(this.formularioRegister.value);
      this.loadingRegister();
    }
  }
  async loadingRegister(){
    const loading = await this.loadingController.create({
      cssClass:'my-custom-class',
      message: 'Creando cuenta',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
    const {role,data} = await loading.onDidDismiss();
    console.log('Creacion exitosa');

    if(data==null){
      const navigation : NavigationExtras = {
        state: {
          users: this.users
        }
      };
      this.router.navigate(['login'],navigation)

    }
  }

  get controlerror(){
    return this.formularioRegister.controls;
  }


}