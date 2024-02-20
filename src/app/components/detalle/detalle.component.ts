import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { pokemonSeleccionado } from 'src/app/interfaces/interfacePokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnChanges {

  constructor(private _pokemonService: PokemonService) {

  }
  description: string = ""
  @Input() pokemon?: pokemonSeleccionado;
  @Input() abierto:Boolean = false;
  @Output()cambiarAbierto = new EventEmitter();

  ngOnChanges(): void {
    if (this.pokemon) {
      this._pokemonService.getDescription(this.pokemon?.id).subscribe(data => {
        const texto = data.flavor_text_entries
          .find((texto: any) => texto.language.name == "es")
        this.description = texto.flavor_text
      })
    }
  }
}
