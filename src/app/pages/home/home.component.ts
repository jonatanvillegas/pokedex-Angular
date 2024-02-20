import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/interfacePokeApi';
import { PokemonService } from 'src/app/services/pokemon.service';
import { pokemonSeleccionado } from 'src/app/interfaces/interfacePokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('tarjetas') tarjetasElemet!: ElementRef

  pokemons: Pokemon[] = [];
  page: number = 1;
  cargando: boolean = false;
  pokemonSeleccionado?:pokemonSeleccionado;
  imagen?:string;
  detalle:Boolean=false;

  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }
  obtenerDatos() {
    this.cargando = true;
    this._pokemonService.getAllPokemon(this.page).subscribe(data => {
      this.pokemons = data.results;
      this.cargando = false;
      this.page++;
    }, error => {
      console.log("Error al obtener los datos de la API")
    })
  }

  Scroll(e: any) {
    if (this.cargando) return;
    const target = e.target || window;
    const targetElement = target instanceof Window ? document.documentElement : target as HTMLElement;
    if (Math.round(this.tarjetasElemet.nativeElement.clientHeight + this.tarjetasElemet.nativeElement.scrollTop)
      === e.srcElement.scrollHeight) {
      this.obtenerDatos()
      targetElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  tarjetaSeleccionada(id:string){
     this._pokemonService.getPokemonByID(id).subscribe(data => {
      this.pokemonSeleccionado = data
      this.imagen = data.sprites.front_default
      console.log(this.pokemonSeleccionado)
    })
  }

  cambiarEstadoDetalle(){
    if (this.pokemonSeleccionado) {
      this.detalle = !this.detalle;
    }
  }
}
