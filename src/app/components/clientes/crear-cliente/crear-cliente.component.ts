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

  public crearCliente(): void {
    this.clienteService.addCliente(this.cliente)
        .subscribe(resp =>{
            this.router.navigateByUrl('/clientes')
            swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: `Cliente ${resp.nombre} agregado`
            })
        })
  }

  public obtenerCliente(): void{
    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.clienteService.getCliente(id))
        )
        .subscribe( cliente => {
          this.cliente = cliente
        });
  }

  public updateCliente(): void{
    this.clienteService.updateCliente(this.cliente)
         .subscribe( cliente => {
          this.router.navigateByUrl('/clientes')
          swal.fire({
            icon: 'success',
            title: 'Editado',
            text: `${cliente.nombre} editado con éxito`
          })
         })
      }

  }


