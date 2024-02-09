import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/interfacePokeApi';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnChanges {

  data: any;
  imagen: string = ""
  constructor(private _pokemonService: PokemonService) { }

  ngOnChanges(): void {
    this.extraerID()
  }

  @Input() pokemon?: Pokemon;
  id: string = "0"

  extraerID() {
    if (this.pokemon) {
      this.id = this.pokemon.url.substring(34, this.pokemon.url.length - 1);
      this.data = this._pokemonService.getPokemonByID(this.id).subscribe(data => {
        this.imagen = data.sprites.front_default
      }, error => {
        console.error('Error al obtener los datos del Pokémon:', error);
      });
    }
  }
}
