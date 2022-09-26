import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrgen',
  templateUrl: './qrgen.page.html',
  styleUrls: ['./qrgen.page.scss'],
})
export class QrgenPage implements OnInit {

  pageTitle = 'Generar QR';
  isNotHome = true;

  constructor() { }

  ngOnInit() {
  }

}
