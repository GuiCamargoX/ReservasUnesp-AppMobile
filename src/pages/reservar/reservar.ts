import { Book } from './../../Models/book';
import { ScheduleProvider } from './../../providers/schedule/schedule';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../Models/user';

/**
 * Generated class for the ReservarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservar',
  templateUrl: 'reservar.html',
})
export class ReservarPage {

  private infoUser : User;
  private form : Book = {
    date : '',
    ra : '',
    state : "pendente",
    place : null,
    inicio : null,
    termino : null,
  };
  private current_day = new Date();

  constructor(private sch:ScheduleProvider, public navCtrl: NavController, public navParams: NavParams , private alertCtrl: AlertController) {
    this.infoUser = this.navParams.get('info');
    console.log(this.infoUser.displayName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservarPage');
  }

  salvaReserva(){
    this.sch.save(this.infoUser, this.form ).then(
      () => this.presentAlert()
    );
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Solicitação enviada com sucesso!',
      subTitle: 'A solicitação foi enviada para aprovação, porfavor compareça a seção Tecnica para confirmar sua solicitação e aceitar os termos',
      buttons: ['Ok']
    });
    alert.present();
  }

}
