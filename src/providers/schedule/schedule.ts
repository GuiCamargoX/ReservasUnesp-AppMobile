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

  public async consultar( date:string ){
    var request = new Array();

    const wordsSnapshot = await this.db.database.ref( this.DatePath + date + '/userId' ).once('value');
    
    var file = wordsSnapshot.val();

      if(file){
        for(let item of file){
          let inf = {
            email : '',
            profile_picture : '',
            name :'',
            reserv : null
          };
        let snap= await this.db.database.ref('Users/' + item).once('value');
        let req = snap.val();

        inf.email = req.email;
        inf.profile_picture = req.profile_picture;
        inf.name = req.username;
        inf.reserv = req.reservas[date].info;

        request.push(inf);
        
        }

      }else
        request = null;

    //console.log(request);
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
       //console.log(request);

    return request;
  }


  save(user: User, res: Book){
    var ph = this.db.database;
    var savepath = this.saveDatePath;

    return new Promise(async (resolve, reject) => {
    
        this.db.object(this.UserPath + user.uid).update({
          username: user.displayName,
          email: user.email,
          profile_picture : user.photoURL,
        })

        var test = await this.consultar(res.date);
        let error:boolean = false;
        for(let dados of test){
          if(dados.reserv.place === res.place){
            if( (Date.parse('01/01/2011 '+res.inicio) >= Date.parse('01/01/2011 '+ dados.reserv.inicio)) &&  (Date.parse('01/01/2011 '+dados.reserv.termino) >=Date.parse('01/01/2011 '+res.termino)) ){
              reject("Conflito! Já existe uma reserva solicitada para este local no determinado horario.")
              error=true;
            }

          }
          
        }
        
    if( !error ){
        this.db.database.ref( this.DatePath + res.date + '/userId' ).once('value').then(function(snapshot) {
          var file = snapshot.val();
          var id = new Set(file);
          
          if( id.has(user.uid) ){
            reject('Proibido ter mais do que duas reservas para o mesmo dia, independente do espaço ou horário solicitado.');
          }else{
 
           let d = res.date.split('-');
           ph.ref('Users/' + user.uid + '/reservas/' + res.date).set({
             info : {
               date : d[2] + '/' + d[1] + '/' + d[0],
               ra : res.ra,
               state : res.state,
               place : res.place,
               inicio : res.inicio,
               termino : res.termino
             }
           });
   
           savepath(user, res, ph);
   
           resolve(); 
          }

        });   
      } 

    })

  }


 private saveDatePath(user: User, res: Book , datb) {
  var pathSchedDate = datb.ref('Date/' + res.date );
    
  datb.ref('Date/' + res.date + '/userId').once('value').then(function(snapshot) {
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