import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  items: any[] = new Array<any[]>() ;

  constructor(
    firestore: AngularFirestore
    ) 
  {
    //  this.items = firestore.collection('Clientes').valueChanges();
    this.items.length = 0;
    firestore.collection('Clientes').get({}).subscribe(
      (response) => {
        // console.log(response.docs);
        response.docs.forEach(element =>{
          // console.log(element.id);
          // console.log(element.data());
          // console.log(element.ref);
          let cliente = element.data();
          cliente.id = element.id;
          cliente.ref = element.ref;
          this.items.push(cliente);
        });
      } 
    )
    // firestore.collection('Clientes').valueChanges()
    // .subscribe((response)=>{
    //   this.items = response;
    //   console.log(response)
    // });

   }
  
  ngOnInit() {
  }

}
