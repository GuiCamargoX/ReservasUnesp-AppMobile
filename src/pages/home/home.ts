import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { User } from '../../Models/user';


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public infoUser : User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.infoUser = this.navParams.get('infoUser');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logout() {
    firebase.auth().signOut();
  }

  openReservar() {
  	this.navCtrl.push('ReservarPage');
  }

  openConsultar() {
  	this.navCtrl.push('ConsultarPage');
  }

  openMinhasReservas() {
  	this.navCtrl.push('MinhasReservasPage');
  }

  openAddRecurso() {
  	this.navCtrl.push('AddRecursoPage');
  }

  openSuporte() {
  	this.navCtrl.push('SuportePage');
  }

  openAjuda() {
  	this.navCtrl.push('AjudaPage');
  }




}
