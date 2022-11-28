import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  pageTitle = 'GPS';
  isNotHome = true;

  mapa: Mapboxgl.Map;
  
  ngOnInit():void {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.61629794995609, -33.49985207501745], // starting position
      zoom: 16 // starting zoom
    });
    this.crearMarcador(-70.61629794995609, -33.49985207501745)

  }

  crearMarcador(lng: number,lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([lng,lat])
    .addTo(this.mapa);

    marker.on('drag', ()=>{
      console.log( marker.getLngLat() )
    })
  }
}
