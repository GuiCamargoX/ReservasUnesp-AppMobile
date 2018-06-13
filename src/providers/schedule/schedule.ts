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

  public remove( uid:string, date:string ){
    var path = this.db.database;

    this.db.database.ref(this.UserPath + uid +'/reservas/' + date).remove();
    
    this.db.database.ref(this.DatePath + date + '/userId').once('value').then(function(snapshot) {
      var file = snapshot.val();
      var ids:Set<any> = new Set();
        
      if( file ){
        ids = new Set(file);
      }
  
      ids.delete(uid);
  
      path.ref('Date/' + date ).update({
        userId : Array.from(ids)
      })
      
      });

  }

  public consultar( date:string ){
    var request = new Array();
    var path = this.db.database;

    this.db.database.ref( this.DatePath + date + '/userId' ).once('value').then(function(snapshot) {
      var file = snapshot.val();

      if(file){
        for(let item of file){
          let inf = {
            email : '',
            profile_picture : '',
            name :'',
            reserv : null
          };
          path.ref('Users/' + item).once('value').then(function(snapshot){
            let req = snapshot.val();

            inf.email = req.email;
            inf.profile_picture = req.profile_picture;
            inf.name = req.username;
            inf.reserv = req.reservas[date].info;

            request.push(inf);
          });
        }

      }else
        request = null;

      });

    console.log(request);
    return request;

  }

  public getMinhasReservas( uid: string ){
    var request = new Array();

    this.db.database.ref(this.UserPath + uid +'/reservas').once('value').then(function(snapshot) {
      var file = snapshot.val();
      
      if(file){
        for (var key in file) {
          if (file.hasOwnProperty(key)) {
              request.push(file[key]);
          }
        }
      }else
        request = null;

      });
       console.log(request);

    return request;
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
  var pathSchedDate = this.db.database.ref(this.DatePath + res.date );
    
  this.db.database.ref(this.DatePath + res.date + '/userId').once('value').then(function(snapshot) {
    var file = snapshot.val();
    var dias:Set<any> = new Set();
      
    if( file ){
      dias = new Set(file);
    }

    dias.add(user.uid);

    pathSchedDate.update({
      userId : Array.from(dias)
    })
    
    //console.log(dias);
    });
    
  }

}