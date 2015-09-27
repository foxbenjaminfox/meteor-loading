if (Meteor.isClient) {
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
    });

    isSpinner(test);

    Meteor.setTimeout(function() {
      noSpinner(test);
      done();
    }, 210);
  });
}

function noSpinner(test) {
  test.isNull(document.querySelector('div.spinner'), "spinner should not exist");
}

function isSpinner(test) {
  test.isNotNull(document.querySelector('div.spinner'), "spinner should exist");
}
