import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  habilitar:boolean = true;
  palabra:String = 'Ocultar';

  setHabilitar(): void{
    (this.habilitar)? this.habilitar = false: this.habilitar = true,
    (this.habilitar)? this.palabra = 'Ocultar' : this.palabra = 'Mostrar'
  }

  listaCurso: String[] = [
    'Typescript',
    'Spring boot',
    'Angular',
    'HTML',
    'Css',
    'JavaScript'
  ]

}
