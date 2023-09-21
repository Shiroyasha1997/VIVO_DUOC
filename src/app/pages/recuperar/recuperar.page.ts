import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  public usuario: Usuario;
  
  constructor(private router: Router, private toastController: ToastController, private alertController: AlertController) {
    this.usuario = new Usuario('', '', '', '', '','')
    this.usuario.correo = ''
    // Puedes descomentar cualquiera de los siguientes usuarios, para 
    // hacer tus pruebas y así no tener que digitarlos a cada rato

    // this.usuario.setUsuario('sin.datos@duocuc.cl', '1234');
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
    // this.usuario.setUsuario('jperez@duocuc.cl', '5678');
    // this.usuario.setUsuario('cmujica@duocuc.cl', '0987');
    // this.usuario.setUsuario('usuario.inexistente@duocuc.cl', '1234');
    // this.usuario.setUsuario('atorres@duocuc.cl', 'password mala');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999999999999');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999');
    // this.usuario.setUsuario('correo.malo', '0987');
    // this.usuario.setUsuario('correo.malo@', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc.', '0987');
  }

  public ngOnInit(): void {

    // Puedes descomentar la siguiente línea si quieres que la aplicación navegue directamente
    // a la página Home, así te ahorras de estar apretando el botón "Ingresar" a cada rato
    
    //if (this.usuario.correo !== '') this.ingresar();
  }
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  public ingresar(): void {
    
    if (this.usuario) {


      
      // Validamos el usuario y si hay error no navegaremos a la página Home
      const mensajeError = this.usuario.validarCorreo();
      if (mensajeError) {
        this.mostrarMensaje(`Ingrese un correo`);
        return;
      }
      

      // Como la página sólo permite ingresar el correo y la password, vamos a buscar el usuario para completar sus datos
      const usu: Usuario | undefined = this.usuario.recuperarContra(this.usuario.correo);
      
      if (usu) {
        // NavigationExtras sirve para pasarle parámetros a la página Home. Los parámetros se agregan al objeto "state"
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.mostrarMensaje(`¡Por favor responda la pregunta ${usu.nombre} ${usu.apellido}!`);
        this.router.navigate(['/pregunta'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
      }
      
    }
    
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion ? duracion : 2000,
        cssClass: 'custom-toast-class' // Clase personalizada para ajustar la posición vertical
    });
    toast.present();
  }

  public recuperar() : void{
    this.router.navigate(['/recuperar'])
  }
  public login() : void{
    this.router.navigate(['/login'])
  }

}
