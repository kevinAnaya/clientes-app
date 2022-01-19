import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient,
               private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
  }

  addCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/save`, cliente, {headers: this.httpHeaders})
        .pipe(
          catchError(e => {
            console.error(e.error.error)
            swal.fire({
              icon: 'error',
              title: e.error.mensaje,
              text: 'Comuniquese con el admin del servidor'
            })
            return throwError(e);
          })
        )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`)
        .pipe(
          catchError(e => {
            this.router.navigateByUrl('/clientes')
            swal.fire({
              icon: 'error',
              title: 'Error al editar',
              text: e.error.mensaje
            })
            return throwError(e);
          })
        )
  }

  updateCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id_cliente}`, cliente, {headers: this.httpHeaders})
          .pipe(
            catchError(e => {
              console.error(e.error.error)
              swal.fire({
                icon: 'error',
                title: e.error.mensaje,
                text: 'Comuniquese con el admin del servidor'
              })
              return throwError(e);
            })
          )
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeaders})
            .pipe(
              catchError(e => {
                swal.fire({
                  icon: 'error',
                  title: e.error.mensaje,
                  text: 'Comuniquese con el admin del servidor'
                })
                return throwError(e);
              })
            )
  }

}
