import Spinner from 'spin.js'

export let Loading = refreshLoading();

function refreshLoading(userOptions) {
  let running = 0;
  const options = Object.create({
            lines: 13 // The number of lines to draw
          , length: 28 // The length of each line
          , width: 14 // The line thickness
          , radius: 42 // The radius of the inner circle
          , scale: 1 // Scales overall size of the spinner
          , corners: 1 // Corner roundness (0..1)
          , color: '#000' // #rgb or #rrggbb or array of colors
          , opacity: 0.25 // Opacity of the lines
          , rotate: 0 // The rotation offset
          , direction: 1 // 1: clockwise, -1: counterclockwise
          , speed: 1 // Rounds per second
          , trail: 60 // Afterglow percentage
          , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
          , zIndex: 2e9 // The z-index (defaults to 2000000000)
          , className: 'spinner'  // The CSS class to assign to the spinner
          , top: '50%' // Top position relative to parent
          , left: '50%' // Left position relative to parent
          , shadow: false // Whether to render a shadow
          , hwaccel: false // Whether to use hardware acceleration
          , position: 'absolute' // Element positioning

          // options specific to this package:
          , elementSelector: 'body' // A selector for the target of
        });

  _.extend(options, userOptions);

  return {
    options,

    // The spinner is only created at the invocation of `start`,
    // allowing the options to be modified before it is started.
    spinner: null,

    start () {
      running++; // `running` is a closure variable
      if (running > 1) return this;
      if (!this.spinner) {
        this.spinner = new Spinner(this.options).spin(
          document.querySelector(this.options.elementSelector)
        );
      }

      return this;
    },
    stop () {
      if (!this.spinner) return this;

      running--; // `running` is a closure variable
      if (running === 0) {
        this.halt();
      }
      return this;
    },
    wrapAsync (func, context) {
      const self = this;
      return function loadingWrapper(callback){
        self.start();
        return Meteor.wrapAsync(function meteorWrapped(toWrap){
          func.call(this, function stopLoading (...args) {
            self.stop();
            toWrap(...args);
          });
        }, context)(callback);
      };
    },
    halt () {
      if (this.spinner) this.spinner.stop();
      this.spinner = null;
      running = 0; // `running` is a closure variable

      return this;
    },
    refresh (keepOptions, newOptions, noOverrideGlobal) {
      let opts;

      if (keepOptions) {
        opts = _.clone(this.options);
      } else {
        opts = {};
      }
      _.extend(opts, newOptions);

      const newLoading = refreshLoading(opts);

      if (!noOverrideGlobal) {
        this.halt();

        Loading = newLoading;
      }
      return newLoading;
    },
    configure (opts) {
      _.extend(this.options, opts);
      return this;
    },
    clone (newOpts) {
      const opts = _.extend({ position: 'relative' }, newOpts);
      return this.refresh(true, opts, true);
    },
    call (...args) {
      const name = args[0],
            callback = args[args.length - 1],
            methodArgs = args.slice(1, -1);
      return this.apply(name, methodArgs, {}, callback);
    },
    apply (...args) {
      const callback = args.pop();
      return this.wrapAsync(Meteor.apply.bind(Meteor, ...args), Meteor)(callback);
    }
  };
};
