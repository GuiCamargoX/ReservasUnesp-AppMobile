import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { FirebaseuiProvider } from '../providers/firebaseui/firebaseui';
import { ScheduleProvider } from '../providers/schedule/schedule';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDthzEdtrH3D2WMwybQFi4EUKxKuoIvhBg",
      authDomain: "reservasunesp.firebaseapp.com",
      databaseURL: "https://reservasunesp.firebaseio.com",
      projectId: "reservasunesp",
      storageBucket: "reservasunesp.appspot.com",
      messagingSenderId: "650512229396"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseuiProvider,
    ScheduleProvider
  ]
})
export class AppModule {}
