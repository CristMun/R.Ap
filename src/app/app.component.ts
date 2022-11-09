import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Asistencia', url: '/asistencia', icon: 'calendar' },
    { title: 'Clima', url: '/clima', icon: 'sunny' },
    { title: 'Mapa', url: '/mapa', icon: 'map' },
    { title: 'Coversor', url: '/coversor', icon: 'hammer' },
    { title: 'About', url: '/about', icon: 'alert' },
    

    

  ];
 
  constructor() {}
}
