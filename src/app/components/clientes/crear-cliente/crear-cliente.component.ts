import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';

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
              private router:Router,
              private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.obtenerCliente()
  }

  crearCliente(): void {
    this.clienteService.addCliente(this.cliente)
        .subscribe((resp:any) =>{
            this.router.navigateByUrl('/clientes')
            swal.fire({
              icon: 'success',
              title: `${resp.mensaje}`,
              text: `Cliente ${resp.cliente.nombre} agregado`
            })
        })
  }

  obtenerCliente(): void{
    this.activatedRoute.params
          .subscribe(params => {
            let id = params['id']
            if(id){
              this.clienteService.getCliente(id)
                 .subscribe(cliente => {
                   this.cliente = cliente;
                 })
            }
          })
  }

  updateCliente(): void{
    this.clienteService.updateCliente(this.cliente)
         .subscribe( (resp:any) => {
          swal.fire({
            icon: 'success',
            title: `${resp.mensaje}`,
            text: `${resp.cliente.nombre} actualizado`
          })
          this.router.navigateByUrl('/clientes')
         })
      }

  }


