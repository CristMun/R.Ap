
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core'
const  { BarcodeScanner } = Plugins



@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  pageTitle = 'Escanear QR';
  isNotHome = true;

  constructor() {}

  ngOnInit() {
  }


  async startScanner(){
    const result = await BarcodeScanner.startScan();
    console.log(result);
    
  }

}
