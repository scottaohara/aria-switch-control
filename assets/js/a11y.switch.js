;(function ( w, doc ) {

  //enable strict mode
  'use strict';

  // Local object for method references
  var ARIAswitch = {};

  // Meta
  ARIAswitch.NS      = "ARIAswitch";
  ARIAswitch.AUTHOR  = "Scott O'Hara";
  ARIAswitch.VERION  = "0.1.0";
  ARIAswitch.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";

  var widget        = doc.querySelectorAll('[data-action="aria-switch"]');
  var widgetCount   = widget.length;



  // Create accordion instances
  ARIAswitch.create = function () {

    // setup / cache vars
    var doc = document;
    var self;
    var selfID;
    var i;

    var ariaLabelError = 'An attribute of "data-missing-label" has been added to a switch/switches that are missing aria-labelledby or aria-label attributes! Please add unique labels to the appropriate components!';


    // if widgets exist, loop through all instances
    // and set up appropriate attributes
    for ( i = 0; i < widgetCount; i++ ) {

      self = widget[i];

      // give each instance the role of switch if the role hasn't been set
      // or if it was set to something else in error
      if ( !self.hasAttribute('role') || self.getAttribute('role') !== 'switch' ) {
        self.setAttribute('role', 'switch');
      }

      // since these sorts of buttons just won't work if
      // JavaScript is disabled, (hopefully) a disabled
      // attribute is set to them by default. When JavaScript
      // is on, we should remove the disabled attributes EXCEPT
      // if a switch button is meant to be disabled by default,
      // in which case, look for the data-keep-disabled attribute
      // and DON'T remove that disabled attribute...
      if ( !self.hasAttribute('data-keep-disabled') ) {
        self.removeAttribute('disabled');
      }

      // if an instance doesn't have a set aria-checked attribute,
      // then it must not be checked, so populate an aria-checked='false'
      if ( !self.hasAttribute('aria-checked') ) {
        self.setAttribute('aria-checked', 'false');
      }

      // log an error if an aria-label or labelledby attribute
      // is not found on a switch
      if ( !self.hasAttribute('aria-label') && !self.hasAttribute('aria-labelledby') ) {
        console.log(ariaLabelError);
        self.setAttribute('data-missing-label', '');
      }

      self.addEventListener('click', ARIAswitch.toggleState);
    } // for(widgetCount)

  }; // ARIAswitch.create()



  ARIAswitch.toggleState = function ( e ) {

    e.preventDefault();

    if ( e.target.getAttribute('aria-checked') === 'true' ) {
      this.setAttribute('aria-checked', 'false');
    }
    else {
      this.setAttribute('aria-checked', 'true');
    }

  }; // ARIAswitch.events()



  ARIAswitch.init = function () {

    ARIAswitch.create();

  }; // ARIAswitch.init()

  ARIAswitch.init();

})( this, this.document );
