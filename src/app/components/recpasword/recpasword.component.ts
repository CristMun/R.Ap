import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recpasword',
  templateUrl: './recpasword.component.html',
  styleUrls: ['./recpasword.component.scss'],
  providers:[AuthService]
})
export class RecpaswordComponent implements OnInit {

  userEmail = new FormControl('')

  constructor(private authService:AuthService, private router: Router, private toastCtrl:ToastController,) { }

  ngOnInit() {}

  async onReset(){
    try{
      const email = this.userEmail.value;
      this.toastPresent('Correo enviado!');
      await this.authService.resetPassword(email);
      this.router.navigate(['/login'])
    }catch(error){
      this.toastPresent('El Email no existe');
    console.log(error);
    }
  }
  async toastPresent(message:string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:1000,
    })
    toast.present();
  }
}
