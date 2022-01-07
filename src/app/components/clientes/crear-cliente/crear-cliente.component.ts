import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styles: [
  ]
})
export class CrearClienteComponent implements OnInit {

  public cliente:Cliente = new Cliente();

  public titulo:String = "Crear cliente"

  constructor(private clienteService: ClienteService,
              private router:Router ) { }

  ngOnInit(): void {
  }

  public crearCliente(): void {
    console.log(this.cliente);
    this.clienteService.addCliente(this.cliente)
        .subscribe(resp =>{
            this.router.navigateByUrl('/clientes')
        })
  }

}
