import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
/* import { Camera } from '@awesome-cordova-plugins/camera'; */

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  pageTitle = 'Escanear QR';
  isNotHome = true;
  code: any;

  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
  }
/* 
  scanQR(){
    Camera.getPicture()
    .then((data) => console.log('Took a picture!', data))
    .catch((e) => console.log('Error occurred while taking a picture', e));
  } */

}
