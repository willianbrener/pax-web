'use strict';

app.service('FirebaseService', function () {
    this.init = function() {
        return firebase.initializeApp({
          apiKey: 'AIzaSyBUPtWSIjrJZaN8O',
          authDomain: 'realtime-chatapp.firebaseapp.com',
          databaseURL: 'https://realtime-chatapp.firebaseio.com',
          storageBucket: 'realtime-chatapp.appspot.com'
        });
      }
  
      this.SetDatabase = function(db){
          return firebase.database().ref(db);
      }
    
      this.SetDataIntoDB = function(db, obj) {
          db.push(obj);
      }
  
      this.ListenDb = function(db, evt, callback) {
          db.on(evt, function(dataSnapshot) {
              callback(dataSnapshot.val());
          })
      }

});