import { Book } from './../../Models/book';
import { User } from './../../Models/user';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ScheduleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ScheduleProvider {
  private UserPath = 'Users/';
  private DatePath = 'Date/';
  //private Resource = 'Res/';

  constructor(private db: AngularFireDatabase) {
  }



  save(user: User, res: Book){
    return new Promise((resolve, reject) => {
      
    
        this.db.object(this.UserPath + user.uid).update({
          username: user.displayName,
          email: user.email,
          profile_picture : user.photoURL,
        })


        this.db.database.ref(this.UserPath + user.uid + '/reservas/' + res.date).set({
          info : res
        });

        this.saveDatePath(user, res);

        resolve();
      
    })

  }


 private saveDatePath(user: User, res: Book) { 
  
  this.db.database.ref(this.DatePath + res.date + '/userId').once('value').then(function(snapshot) {
    var file = snapshot.val();
    let dias = new Set();
      
    if( file )
      dias.add(file);

    dias.add(user.uid);

    console.log(dias);
  });
  
  this.db.object(this.DatePath + res.date ).set({//arrumar
      userId : dias
  })
    
}


}
