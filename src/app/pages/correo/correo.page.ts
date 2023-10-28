import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage {
  public usuario: Usuario;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private dataBaseService: DataBaseService
  ) {
    this.usuario = new Usuario();
    this.usuario.correo = 'atorres@duocuc.cl'; // Valor por defecto para el correo para modo prueba
  }

  async ingresar(): Promise<void> {
    if (this.usuario.correo) {
      // Validar el correo antes de continuar
      let mensajeError = '';
      const usu = await this.dataBaseService.leerUsuario(this.usuario.correo);
      if (!usu) {
        mensajeError = 'El correo ingresado no existe en la base de datos';
      }
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      }

      // Realizar la validación del correo en la base de datos utilizando el servicio DataBaseService
      await this.dataBaseService.leerUsuarios();
      const usuario = this.dataBaseService.listaUsuarios.value.find(
        (u) => u.correo === this.usuario.correo
      );
      if (usuario) {
        // Si la validación es exitosa, navegar a la página de recuperación de contraseña
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usuario,
          },
        };
        this.router.navigate(['pregunta'], navigationExtras);
      } else {
        this.mostrarMensaje('El correo no está registrado en nuestra base de datos');
      }
    }
  }

  volver(): void {
    this.router.navigate(['ingreso']);
  }

  async mostrarMensaje(mensaje: string, duracion?: number): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      cssClass: 'custom-toast', // Clase personalizada para ajustar la posición vertical
    });
    toast.present();
  }
}