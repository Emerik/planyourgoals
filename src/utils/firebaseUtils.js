import * as firebase from 'firebase';


/*************************** AUTH FUNCTIONS ******************************/
export const signIn = (email, password, callback) => {
  //Control of email and password
  if (!email) return;
  if (!password) return;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      //console.log(error);
      if (errorCode === 'auth/wrong-password') {
        return callback ? callback(errorCode+':'+'Wrong password') : -1;
      } else {
        return callback ? callback(errorCode+':'+errorMessage) : -1;
      }

    });

  if(callback) return callback(null, true);
  else return true;
};

// TODO
export const signOut = (callback) => {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  })
    .then( () => {
      return callback(null, true);
    })
    .catch(function(error) {
      // An error happened.
      return callback(error);
    });
};

//TODO
export const setUpPersistance = (email, password) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode+' : '+errorMessage);
    });
};



/******************************* DATA FUNCTIONS ****************************/

/*
* This handle get request to gel all activities from the database
*/
export const getAllActivity = (callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/activities/').once('value')
    .then(function(snapshot) {

      let activities = [];

      snapshot.forEach(function(childSnapshot) {
        activities.push({
          id : childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return (callback ? callback(null, activities) : true);
    })
    .catch(
      (error) => {
        console.log('Error :', error);
        return callback ? callback(error) : false;
      }
    );


};

/*
* This handle request to get a specific activity from the database
*/
export const getActivityById = (activityId, callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/activities/'+activityId).once('value')
    .then(function(snapshot) {
      return callback(null, {
        activity:{
          id: activityId,
          ...snapshot.val()}
      });
    })
    .catch(
      (reason) => {
        console.log('Error :', reason);
        return callback(reason);
      }
    );
};

/*
* This handle request to add an activity to the database
*/
export const addAnActivity = (activityToAdd, callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/activities/').push(activityToAdd)
    .then( (snapshot) => {

      activityToAdd.id = snapshot.key;

      return callback(null, activityToAdd);
    }
    )
    .catch(
      (reason) => {
        console.log('Error :', reason);
        return callback(reason);
      }
    );
};

/*
* This handle request to remove a specific activity from the database
*/
export const deleteActivity = (activity, callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/activities/'+activity.id).remove()
    .then(function() {
      return callback(null, true);
    })
    .catch(
      (reason) => {
        console.log('Error :', reason);
        return callback(reason);
      }
    );
};

/*
* This handle request to update a specific activity from the database
*/
export const updateActivity = (activityToUp, callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  let update = {};
  update['/'+activityToUp.id] = activityToUp;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/activities/').update(update)
    .then(function() {
      return callback(null, true);
    })
    .catch(
      (reason) => {
        console.log('Error :', reason);
        return callback(reason);
      }
    );
};


/*******************************  GOAL ******************************/

/*
* This handle get request to gel all goals from the database
*/
export const getAllGoal = (callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/goals/').once('value')
    .then(function(snapshot) {

      let goals = [];

      snapshot.forEach(function(childSnapshot) {
        goals.push(childSnapshot.val());
      });
      return (callback ? callback(null, goals) : 0);
    })
    .catch(
      (error) => {
        console.log('Error :', error);
        return callback ? callback(error) : -1;
      }
    );
};


/*
* This handle request to add a goal to the database
*/
export const addAGoal = (goalToAdd, callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/goals/').push(goalToAdd)
    .then( (snapshot) => {
      return callback(null, {
        id: snapshot.key,
        ...goalToAdd
      });
    }
    )
    .catch(
      (reason) => {
        console.log('Error :', reason);
        return callback(reason);
      }
    );
};

/*
* This handle request to remove a specific goal from the database
*/
export const deleteGoal = (goal, callback) => {

  if( !firebase.auth().currentUser ) return callback ? callback('No user authenticated') : false;

  firebase.database().ref('/profils/'+firebase.auth().currentUser.uid+'/goals/'+goal.id).remove()
    .then(function() {
      return callback(null, true);
    })
    .catch(
      (reason) => {
        console.log('Error :', reason);
        return callback(reason);
      }
    );
};



/*******************************  GOALTYPE ******************************/

/*
* This handle get request to gel all goaltypes from the database
*/
export const getAllGoaltype = (callback) => {

  firebase.database().ref('/goaltypes/').once('value')
    .then(function(snapshot) {

      let goaltypes = [];

      snapshot.forEach(function(childSnapshot) {
        goaltypes.push(childSnapshot.val());
      });
      return (callback ? callback(null, goaltypes) : 0);
    })
    .catch(
      (error) => {
        console.log('Error :', error);
        return callback ? callback(error) : -1;
      }
    );
};



/*******************************  SPORT ******************************/

/*
* This handle get request to gel all sports from the database
*/
export const getAllSport = (callback) => {

  firebase.database().ref('/sports/').once('value')
    .then(function(snapshot) {

      let sports = [];

      snapshot.forEach(function(childSnapshot) {
        sports.push(childSnapshot.val());
      });
      return (callback ? callback(null, sports) : 0);
    })
    .catch(
      (error) => {
        console.log('Error :', error);
        return callback ? callback(error) : -1;
      }
    );
};
