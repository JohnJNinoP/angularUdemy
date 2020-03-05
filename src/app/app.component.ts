import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoCursoAngularUDEMY';
  usuario :User;
  cargando : boolean = true;
  constructor(public authFa: AngularFireAuth) {
    this.authFa.user.subscribe(response => {
      setTimeout(()=>{
        this.usuario = response;
        this.cargando  = false;
        // console.log(response);  
      },1000);

    })
    
  }

  login() {
    // this.authFa.signInWithPopup(new auth.GoogleAuthProvider());
    this.authFa.signInWithEmailAndPassword("johnjninop.inter@gmail.com","123456789")
    // this.authFa.signInWithEmailAndPassword("","") 
  }
  logout() {
    this.authFa.signOut();
  }

}
