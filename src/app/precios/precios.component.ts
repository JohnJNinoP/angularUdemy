import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formPrecio : FormGroup;
  items: any[] = new Array<any[]>();
  _editar : boolean = false;
  _id : string;
  constructor(
    private fb : FormBuilder,
    private firestore: AngularFirestore,
    private message : MessageService
  ) { }

  ngOnInit() {
    this.loadControl();
    this.loadData();
  }

  loadControl(){
    this.formPrecio = this.fb.group({
      nombre : ['',Validators.required],
      costo: ['',Validators.required],
      duracion:['',Validators.required],
      tipooperacion : ['', Validators.required]
    })
  }

  agregar(){
    console.log(this.formPrecio.value)
    this.firestore.collection("Precios").add(this.formPrecio.value).then(response=>{
      this.message.messageSucces("Se agrego de manera correcta");
      this.loadData();
    }).catch(error=>{
      this.message.messageError("Se presento un error");
    })
    this.formPrecio.reset();
  }

  loadData(){
    this.items.length = 0;
    this.firestore.collection('Precios').get({}).subscribe(
      (response) => {
        
        response.docs.forEach(element =>{
          let precio = element.data();
          precio.id = element.id;
          precio.ref = element.ref;
          this.items.push(precio);
        });
      } 
    )
  }

  EditarPrecio(precio : string){
    this._id = precio;
    if (precio) {
      this.firestore
        .doc<any>("Precios/" + precio)
        .valueChanges()
        .subscribe(response => {
          this.formPrecio.setValue({
            nombre : response.nombre,
            costo: response.costo,
            duracion: response.duracion,
            tipooperacion : response.tipooperacion
          });
          this._editar = true;
        });
    }
  }

  Editar(){
    this.firestore
        .doc<any>("Precios/" + this._id).update(this.formPrecio.value).then(
          response=> {
            this.message.messageSucces("Precio editado.")
            this.formPrecio.reset();
            this._editar = false;
          }
        ).catch(error=>{
          this.message.messageError("Error editando precio.")
        }) ;
  }

  newItem(){
    this.formPrecio.reset();
    this._editar = false;
  }

}
