import { Component, Optional } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page {

  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController
  ) {}

  public volverAtras(): void {
    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.navCtrl.setDirection('back');
      this.routerOutlet.pop();
    } else {
      this.navCtrl.navigateBack('/home');
    }
  }
}
