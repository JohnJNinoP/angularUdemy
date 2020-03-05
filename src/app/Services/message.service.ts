import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  messageError(error : string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      footer: '<a href>Why do I have this issue?</a>'
    })
  }

  messageSucces(error : string){
    Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text: error,
      footer: '<a href>Why do I have this issue?</a>'
    })
  }

  messageWarning(error : string){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: error,
      footer: '<a href>Why do I have this issue?</a>'
    })
  }


}
