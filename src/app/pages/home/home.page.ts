import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  pageTitle = 'home';
  isNotHome = false;
  currentUser: any;
  nombre: string;
  tipo: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.currentUser = this.router.getCurrentNavigation().extras.state.user;
        this.nombre = this.router.getCurrentNavigation().extras.state.user.correo.split('@')[0];
        this.nombre = this.capitalize(this.nombre);
        this.tipo = this.router.getCurrentNavigation().extras.state.user.tipouser;
      }
      console.log(this.nombre);
      console.log(this.tipo);
    });
   }

  ngOnInit() {
  }

  capitalize(email: string){
    return email[0].toUpperCase() + email.slice(1).toLowerCase();
  }


  
}
/*   convertidor(email:string){
    return email[0].toUpperCase() + email.slice(1).toLowerCase();
  } */


