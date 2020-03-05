import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionesComponent} from './inscripciones/inscripciones.component'
import { TemplateconsultinComponent } from './templateconsultin/templateconsultin.component';


const routes: Routes = [
  
  // { path : '' ,component : TemplateconsultinComponent },
  { path : '' ,component : InscripcionesComponent },
  { path : 'Inscripcion' ,component : InscripcionesComponent },
  { path : 'ListadoClientes' , component : ListadoClientesComponent },
  { path : 'AgregarCliente' , component : AgregarClienteComponent },
  { path : 'AgregarCliente/:Id' , component : AgregarClienteComponent },
  { path : 'Precios' , component : PreciosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
