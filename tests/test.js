  Tinytest.add('init', function (test) {
  noSpinner(test);
});

Tinytest.add('start and stop', function (test) {
  Loading.start();
  isSpinner(test);

  Loading.stop();
  noSpinner(test);
});

Tinytest.add('start and stop multiple times', function (test) {
  Loading.start();
  Loading.start();
  isSpinner(test);

  Loading.stop();
  isSpinner(test);

  Loading.stop();
  noSpinner(test);

  Loading.stop();
  noSpinner(test);
});

Tinytest.addAsync('wrap an async function', function (test, done) {
  const context = {}, result = "result";
  let callbackCalled = false;

  function asyncSomething(cb) {
    test.equal(this, context, "The right context should be passed");
    Meteor.setTimeout(()=> cb(null, result), 200);
  }

  noSpinner(test);

  const func = Loading.wrapAsync(asyncSomething, context);

  noSpinner(test);

  func(function callback(err, res) {
    test.isNull(err, "there should't be an error");
    test.equal(res, result, "The result should be correct");
    test.equal(this, context, "The right context should be passed");

    noSpinner(test);

    callbackCalled = true;
  });

  isSpinner(test);

  Meteor.setTimeout(function () {
    noSpinner(test);
    test.isTrue(callbackCalled, "The callback must be called when the function is done");
    done();
  }, 210);
});

Tinytest.addAsync('wrap a method', function (test, done) {
  let callbackCalled = false;

  noSpinner(test);

  Loading.call("addThreeNumbers", 1, 2, 3, function (err, res) {
    test.isFalse(!!err, "there should't be an error");
    test.equal(res, 6, "The result should be correct");

    noSpinner(test);

    callbackCalled = true;
  });
  
  isSpinner(test);

  Meteor.setTimeout(function () {
    noSpinner(test);
    test.isTrue(callbackCalled, "The callback must be called when the function is done");
    done();
  }, 110);
});


function noSpinner(test) {
  test.isNull(document.querySelector('div.spinner'), "spinner should not exist");
}

function isSpinner(test) {
  test.isNotNull(document.querySelector('div.spinner'), "spinner should exist");
}
