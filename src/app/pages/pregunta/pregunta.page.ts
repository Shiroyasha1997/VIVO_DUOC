import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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
  public usuario = new Usuario();
  public correo: string;
  public respuesta: string;
  public preguntaSecreta: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private activeroute: ActivatedRoute,
    private dataBaseService: DataBaseService
    
  ) {
    this.usuario = new Usuario();
    this.correo = '';
    this.respuesta = 'gato';
    this.preguntaSecreta = '';
  }

  ngOnInit() {
    this.obtenerUsuario();
  }
  
  async obtenerUsuario() {
    this.activeroute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          this.preguntaSecreta = this.usuario.preguntaSecreta;
        }
      }
    });
  }
  
  async responderPregunta(): Promise<void> {
    const usuario = await this.dataBaseService.leerUsuarios();
    if (this.respuesta.trim() === this.usuario.respuestaSecreta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuario,
        },
      };
      // Respuesta correcta, redirigir a la página correcta
      this.router.navigate(['correcto'], { state: { usuario: this.usuario } });
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