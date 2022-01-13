import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
  }

  addCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/save`, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  updateCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id_cliente}`, cliente, {headers: this.httpHeaders});
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeaders});
  }

}
