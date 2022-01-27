import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = []
  paginador:any

  constructor(private clienteService:ClienteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe( params => {
    let page:number = +params.get('page');
    if(!page){
      page = 0
    }
    this.clienteService.getClientes(page).subscribe((data:any) => {
      this.clientes = data.content as Cliente[]
      this.paginador = data;
    });

  })

  }

  public deleteCliente(cliente: Cliente): void{

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!' ,
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente.id_cliente)
            .subscribe( response => {
              this.clientes = this.clientes.filter(cli => cli !== cliente)
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                `El cliente ${cliente.nombre} se eliminó con éxito`,
                'success'
              )
            })
      } 
    })

  }

}
