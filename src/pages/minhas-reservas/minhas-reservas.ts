import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ScheduleProvider } from './../../providers/schedule/schedule';
import { User } from '../../Models/user';

/**
 * Generated class for the MinhasReservasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-minhas-reservas',
  templateUrl: 'minhas-reservas.html',
})
export class MinhasReservasPage {

  private infoUser : User;
  private myreserv;

  constructor(private alertCtrl: AlertController, private sch:ScheduleProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.infoUser = this.navParams.get('info');
  }

  ionViewDidLoad() {
    this.myreserv = this.sch.getMinhasReservas( this.infoUser.uid );
  }

  public chosePhoto(item){
    let photoPlace:String = null;

    if(item.info.place === 'LEPEC')
      photoPlace= 'assets/img/lepec.jpg';

    if(item.info.place === "Guilhermão")
      photoPlace= 'assets/img/gg.jpeg';
  
    return photoPlace;
  }

  public remove(item){
    
    let alert = this.alertCtrl.create({
      title: 'Excluir Solicitação Pendente',
      message: 'Deseja remover sua solicitação?'+
      ' dia: ' + item.info.date +
      ' local: '+ item.info.place +
      ' horário: '+ item.info.inicio + '-' + item.info.termino +
      ' do RA: ' + item.info.ra,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let d = item.info.date.split('/');
            this.sch.remove(this.infoUser.uid, d[2] +'-'+ d[1]+'-'+d[0]);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();

  }

}
