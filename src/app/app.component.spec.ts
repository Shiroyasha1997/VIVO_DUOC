import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { activeAnimations } from '@ionic/core/dist/types/utils/overlays';
import { AppComponent } from './app.component';

describe('Probar al comiezo de la aplicacion', () => {

  function suma(x: number, y:number) {
    return x + y;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  
    it('Se deberia crear la aplicacion', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it('Probar que el titulo de la aplicacion sea "Asistencia DUOC"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('Asistencia DUOC');
    });

    it('Probar la funcion suma donde 10+20=30', () => {
      expect(suma(10, 20)).toEqual(30);
    });
});