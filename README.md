# [xyz:loading](https://atmospherejs.com/xyz/loading) ![Build Status](https://travis-ci.org/foxbenjaminfox/meteor-loading.svg?branch=master)

Much like [sacha:spin](https://atmospherejs.com/sacha/spin), this package is a wrapper for [Spin.js](https://github.com/fgnass/spin.js). While [sacha:spin](https://atmospherejs.com/sacha/spin) is useful in many contexts, the fact that it works throgh Blaze can be annoying. Having to add helpers to conditionally render the `spinner` template isn't so fun, plus if you use something like React instead of Blaze, you simply can't use [sacha:spin](https://atmospherejs.com/sacha/spin) at all.

One thing [sacha:spin](https://atmospherejs.com/sacha/spin) is particularly useful for is as a loading template for [iron:router](https://atmospherejs.com/iron/router) routes, and this package isn't meant to replace it in that context. However, in cases where you want a loading indicator while a method runs, or while waiting for some other asynchronous function to resolve, [xyz:loading](https://atmospherejs.com/xyz/loading) makes it super simple.

## Example
````javascript
// Let's assume that we have some asynchronous function called someAsyncFunction.

// Just like with Meteor.wrapAsync
let wrappedAsyncFunction = Loading.wrapAsync(someAsyncFunction);

// Now wrappedAsyncFunction behaves just like someAsyncFunction,
// except that it displays a spinner while it runs.
wrappedAsyncFunction(function (err, res) {
  // ...
});

// You can configure the spinner. The new options will take effect
// the next time the spinner starts.
Loading.configure({ speed: 0.5, lines: 8 });

// You can refresh the spinner, halting it and optionally reconfiguring it.
Loading.refresh(
  // Whether or not to keep the existing options the spinner has been configured with:
  true, 
  // New options:
  { lines: 17, color: '#234' },
  // If this is set to a truthy value, don't overide the global Loading object
  // with the newly refreshed loading spinner object. In either case, the refresh
  // function returns the new object.
  false
);

// You can manually start and stop the spinner, if you want.
Loading.start();
Loading.stop();

// You can chain most methods of the Loading object.
Loading.configure({ color: '#123', elementSelector: '#someId'}).start();

// If run multiple parallel asynchronous functions, or manually start it multiple
// times in parallel, the spinner will run until everything is finished.

// You can halt the spinner regardless of how many things are running in the
// background with the Loading.halt method.
Loading.halt();

// If you want the spinner to target a specific element rather than the page's body,
// you can pass a custom option (above and beyond the standard Spin.js options),
// called elementSelector, which is a css selector that targets the element
// you want to run the spinner over.
Loading.configure({ speed: 2, direction: -1, elementSelector: '#someId'});

// If you want to show multiple spinners on diffrent elements, use
// Loading.refresh with a truthy third argument to get a referance 
// to a new loading spinner that does not override the global spinner.
// In such a case you almost always want to configure the spinner
// with position: 'relative'.
const NewLoading = Loading.refresh(
  true, 
  { elementSelector: '#someId', position: 'relative' },
  true
);

// The Loading.clone method is an alias for this use-case. It sets the position: 'relative'
// option by default, though you can override it if you really want.
const NewLoading2 = Loading.clone({elementSelector: '#someId'});

// You can then use these new objects just like you would any other.
wrappedAsyncFunction = NewLoading.wrapAsync(someAsyncFunction);
````

## Tests
[xyz:loading](https://atmospherejs.com/xyz/loading) has a tinytest test suite. You can run your site's packages' tests using the `meteor test-packages` command.
