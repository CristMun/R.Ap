import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coversor',
  templateUrl: './coversor.page.html',
  styleUrls: ['./coversor.page.scss'],
})
export class CoversorPage implements OnInit {

  constructor() { }
  pageTitle = 'Conversor';
  isNotHome = true;
  ngOnInit() {
  }

  async consultarApi(){
        fetch('https://mindicador.cl/api').then(function(response) {
        return response.json();
    }).then(function(dailyIndicators) {
      document.getElementById("UF").innerHTML =     dailyIndicators.uf.valor      + ' ' +   dailyIndicators.uf.nombre;
      document.getElementById("UTM").innerHTML =    dailyIndicators.utm.valor     + ' ' +   dailyIndicators.utm.nombre;
      document.getElementById("Dolar").innerHTML = dailyIndicators.dolar.valor   + ' ' +   dailyIndicators.dolar.nombre;
      document.getElementById("Euro").innerHTML =   dailyIndicators.euro.valor    + ' ' +   dailyIndicators.euro.nombre;
      document.getElementById("bt").innerHTML =     dailyIndicators.bitcoin.valor + ' ' +   dailyIndicators.bitcoin.nombre;
  
    }).catch(function(error) {
        console.log('Requestfailed', error);
    });
  }


}
