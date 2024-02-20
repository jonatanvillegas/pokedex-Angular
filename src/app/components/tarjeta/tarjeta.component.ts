import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/interfacePokeApi';
import { pokemonSeleccionado } from 'src/app/interfaces/interfacePokemon';
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
  @Input() tarjetaSeleccionada: boolean = false;
  @Input() fullData?: pokemonSeleccionado;
  @Output() seleccionado = new EventEmitter<string>();
  id: string = "0"

  extraerID() {
    if (this.pokemon ) {
      this.id = this.pokemon.url.substring(34, this.pokemon.url.length - 1);
      this.data = this._pokemonService.getPokemonByID(this.id).subscribe(data => {
        this.imagen = data.sprites.front_default
        return
      }, error => {
        console.error('Error al obtener los datos del Pokémon:', error);
      });
    }
    if (this.fullData) {
      this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length - 1);
      this.imagen = this.fullData.sprites.front_default
      this.pokemon = {
        name: this.fullData.species.name,
        url: ''
      }
      console.log(this.id )
    }
  }

}
