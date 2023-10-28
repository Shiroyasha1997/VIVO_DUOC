import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class CorrectoPage implements OnInit {
  public usuario = new Usuario();
  public nombre: string;
  public password: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private activeroute: ActivatedRoute,
    private dataBaseService: DataBaseService

  ) {
    this.usuario = new Usuario();
    this.nombre = '';
    this.password = '';
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
          this.nombre = this.usuario.nombre;
          this.password = this.usuario.password;
        }
      }
    });
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