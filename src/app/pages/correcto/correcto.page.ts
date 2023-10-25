import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: 'correcto.page.html',
  styleUrls: ['correcto.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class CorrectoPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {

  }

  volver(): void {
    this.router.navigate(['/correo']);
  }

}
