import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the SuportePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-suporte',
  templateUrl: 'suporte.html',
})
export class SuportePage {
  subject='';
  body='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuportePage');
  }

  sendEmail(){
    let email= {
      to: 'gabrieltsferreira@hotmail.com',
      cc: [],
      bcc: [],
      attachments: [],
      subject: this.subject,
      body: this.body,
      isHtml: true
    }
    this.emailComposer.open(email);
  }

}
