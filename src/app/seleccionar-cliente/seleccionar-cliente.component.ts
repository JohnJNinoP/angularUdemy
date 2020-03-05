import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  items : any[] = new Array<any>();
  itemsView : any[] = new Array<any>();

  @Input('nombre') nombre = undefined;
  @Output('customerSelect') customerSelect  = new EventEmitter ;
  @Output('cancelCliente') cancelCliente = new EventEmitter ;

  constructor(
    private  firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.firestore.collection("Clientes").get({}).subscribe(response=>{
      response.forEach(element =>{
        let cliente = element.data();
        cliente.id = element.id;
        cliente.ref = element.ref;
        this.items.push(cliente);
      });
      this.itemsView = this.items;
    })
  }

  filterCustomer(value : string ) { 
    console.log(value)
    this.itemsView = this.items.filter(item => item.Nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1);
 } 

 SeleccionarCliente(data){

 }

}
