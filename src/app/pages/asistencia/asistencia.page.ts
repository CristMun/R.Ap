import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {

  pageTitle = 'Asistencia';
  isNotHome = true;

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }


  qrScanBtn(){
    this.presentToast('Error','Pagina en mantenimiento');
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
