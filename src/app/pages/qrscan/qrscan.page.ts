import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  pageTitle = 'Escanear QR';
  isNotHome = true;

  constructor() { }

  ngOnInit() {
  }

}
