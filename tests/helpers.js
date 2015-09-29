Meteor.methods({
  addThreeNumbers: function(x, y, z) {
    return Meteor.wrapAsync(addAsync)(x, y, z);
  }
});

function addAsync(x, y, z, callback){
  Meteor.setTimeout(function() {
    callback(null, x + y + z);
  }, 50);
}
