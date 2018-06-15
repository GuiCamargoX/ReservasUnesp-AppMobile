import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(private sch:ScheduleProvider, public navCtrl: NavController, public navParams: NavParams) {
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

}
