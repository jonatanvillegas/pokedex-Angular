import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pokemonSeleccionado } from 'src/app/interfaces/interfacePokemon';

@Component({
  selector: 'app-foto-pokemon',
  templateUrl: './foto-pokemon.component.html',
  styleUrls: ['./foto-pokemon.component.css']
})
export class FotoPokemonComponent {


  @Input() pokemon?: pokemonSeleccionado;


}
