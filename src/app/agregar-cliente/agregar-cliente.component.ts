import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage  } from '@angular/fire/storage';
import 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { MessageService } from '../Services/message.service';


@Component({
  selector: "app-agregar-cliente",
  templateUrl: "./agregar-cliente.component.html",
  styleUrls: ["./agregar-cliente.component.scss"]
})
export class AgregarClienteComponent implements OnInit {
  cargandoImagen: boolean = false;
  progresoporcentaje: number = 0;
  formCliente: FormGroup;
  _urlImg: string;
  _id : string;
  _editar : boolean = false;

  // @Input() Id: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private store: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private message : MessageService
  ) {}

  ngOnInit() {
    this.loadControl();
    this.loadData();
  }
  loadControl() {
    this.formCliente = this.fb.group({
      Nombre: ["", Validators.required],
      Apellido: ["", Validators.required],
      Correo: ["", Validators.compose([Validators.required, Validators.email])],
      Cedula: [""],
      FechaNacimiento: ["", Validators.required],
      Telefono: [""],
      ImgUrl: [""]
    });
  }

  loadData() {
    this._id = this.activeRoute.snapshot.params[0];
    if (this._id) {
      this.store
        .doc<any>("Clientes/" + this._id)
        .valueChanges()
        .subscribe(response => {
          console.log(response);
          this._urlImg = response.ImgUrl;
          this.formCliente.setValue({
            Nombre: response.Nombre,
            Apellido: response.Apellido,
            Correo: response.Correo,
            Cedula: response.Cedula,
            FechaNacimiento: response.FechaNacimiento,
            Telefono: response.Telefono,
            ImgUrl: ""
          });
          this._editar = true;
        });
    }
    else{
      this.formCliente.reset();
      this._editar = false;
    }
  }

  update() {
    this.formCliente.value.ImgUrl = this._urlImg;
    this.store
    .doc<any>("Clientes/" + this._id).update(this.formCliente.value).
      then((response)=>{
        this.message.messageSucces('Se edito correctamente')
      })
      .catch(error=>{
      });
  }

  agregar() {
    this.formCliente.value.ImgUrl = this._urlImg;
    this.formCliente.value.FechaNacimiento = new Date(
      this.formCliente.value.FechaNacimiento
    );
    this.store
      .collection("Clientes")
      .add(this.formCliente.value)
      .then(response => {
        this.message.messageSucces('Se agrego correctamente');
      }).catch(error=>{
        console.log(error)
        this.message.messageError('')
      });
  }

  subirImegen(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let time = new Date().getTime().toString();
      // let typeFile = file.name.toString().subString(10);
      // console.log(typeFile);
      let filePath = `Clientes/${time}${file.name}`;
      console.log(filePath);
      const refe = this.storage.ref(filePath);
      const task = refe.put(file);
      task.then(response => {
        console.log("Finally");
        refe.getDownloadURL().subscribe(response => {
          this._urlImg = response;
          console.log(this._urlImg);
        });
      });
      // console.log(task);

      task.percentageChanges().subscribe(response => {
        console.log(response);
        this.progresoporcentaje = parseInt(response.toString());
      });
    }
  }
}
