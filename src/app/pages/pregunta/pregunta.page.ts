import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  public correo: string;
  public respuesta: string;
  public preguntaSecreta: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private dataBaseService: DataBaseService
  ) {
    this.correo = '';
    this.respuesta = '';
    this.preguntaSecreta = '';
  }

  ngOnInit() {
    this.obtenerCorreoUsuario();
  }

  async obtenerCorreoUsuario() {
    const extras = this.router.getCurrentNavigation()?.extras;
    if (extras && extras.state && extras.state['correo']) {
      this.correo = extras.state['correo'];
      const usuario = await this.dataBaseService.leerUsuario(this.correo);
      if (!usuario) {
        this.mostrarMensaje('El correo no está registrado en nuestra base de datos');
        this.router.navigate(['correo']);
      } else {
        this.preguntaSecreta = usuario.preguntaSecreta;
      }
    }
  }

  async responderPregunta(): Promise<void> {
    const usuario = await this.dataBaseService.leerUsuario(this.correo);
    if (usuario && this.respuesta.trim() === usuario.respuestaSecreta) {
      // Respuesta correcta, redirigir a la página correcta
      this.router.navigate(['correcto']);
    } else {
      // Respuesta incorrecta o usuario no encontrado, redirigir a la página incorrecta
      this.router.navigate(['incorrecto']);
    }
  }

  volver(): void {
    this.router.navigate(['correo']);
  }

  async mostrarMensaje(mensaje: string, duracion?: number): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      cssClass: 'custom-toast' // Clase personalizada para ajustar la posición vertical
    });
    toast.present();
  }
}