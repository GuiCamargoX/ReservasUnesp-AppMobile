import { ScheduleProvider } from './../../providers/schedule/schedule';
import { DatePicker } from '@ionic-native/date-picker';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ConsultarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-consultar',
  templateUrl: 'consultar.html',
})
export class ConsultarPage {
  private date: any;
  private inf:any;

  constructor(private alertCtrl: AlertController, private sch:ScheduleProvider, public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
    
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ConsultarPage');
    //this.inf = this.sch.consultarDat('2018-01-01');
    
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {this.inf = this.sch.consultarDat( date.toJSON().substring(0,10) ) },
      err => console.log('Error occurred while getting date: ', err)
    );
    
  }

  
}
