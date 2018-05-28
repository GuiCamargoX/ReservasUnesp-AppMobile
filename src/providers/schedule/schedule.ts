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
  private Resource = 'Res/';

  constructor(private db: AngularFireDatabase) {
  }
  
  // Tests to see if /users/<userId> has any data. 
  private checkIfUserExists(userId) {
      let exists;

      this.db.database.ref(this.UserPath + userId).once('value', (snapshot) => {
      exists = (snapshot.val() !== null) });
        
      if (exists)
          return true;
        else 
          return false;
  }


  save(user: User, res: Book){
    return new Promise((resolve, reject) => {
      
      if ( this.checkIfUserExists( user.uid ) ) {
        
        this.db.object(this.UserPath + user.uid + '/' + res.date)//get
          .update({ reserve : res} )
          .then(() => resolve())
          .catch((e) => reject(e));

      } else {
        
        this.db.object(this.UserPath + user.uid).set({
          username: user.displayName,
          email: user.email,
          profile_picture : user.photoURL,
        })
        
        this.db.object(this.UserPath + user.uid + '/' + res.date).set({
          reserve : [res] 
        })
        resolve();
      
      }

      this.db.object(this.DatePath + res.date).set({//arrumar
        userId : user.uid //lista
      })

    })

  }

}
