import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,empty } from 'rxjs';
import { Data } from '../interfaces/interfacePokeApi';
import { pokemonSeleccionado } from '../interfaces/interfacePokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

 getAllPokemon(page: number): Observable<Data> {
  if (page> 5) return empty();;
    const limit: number = 40
    const offset = limit*(page-1);
    const data = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<Data>(data);
  }

  getPokemonByID(id: string): Observable<pokemonSeleccionado> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getDescription(id:string | number) {
    return this.http.get<any>(`${this.apiUrl}-species/${id}`)
  }
}
