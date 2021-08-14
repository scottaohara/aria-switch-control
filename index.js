// add utilities
var util = {
  keyCodes: {
    ENTER: 13,
    SPACE: 32
  },

  generateID: function ( base ) {
    return base + Math.floor(Math.random() * 999);
  }
};


(function ( w, doc, undefined ) {
  /**
   * A11Y ARIA Switch
   *
   * Author: Scott O'Hara
   * Version: 2.0.0
   * License: https://github.com/scottaohara/aria-switch-control/blob/main/LICENSE
   */
  var ARIAswitchOptions = {
    baseID: 'aria_switch',
    defaultStateSelector: 'data-switch',
    showLabels: 'data-switch-labels',
    dataKeepDisabled: 'data-keep-disabled'
  };


  var ARIAswitch = function ( inst, options ) {
    var _options = Object.assign(ARIAswitchOptions, options);
    var el = inst;
    var elID;
    var keepDisabledState;
    var initState;
    var isCheckbox;


    /**
     * Initialize the switch instance.
     * Create unique IDs and generate
     * a markup pattern if necessary.
     */
    var init = function () {
      elID = el.id || util.generateID(_options.baseID);

      keepDisabledState = el.hasAttribute(_options.dataKeepDisabled);
      initState = el.getAttribute(_options.defaultStateSelector);

      setupBaseWidget()
      setupCheckedState();
      generateToggleUI();
      addEvents();
    }; // init()


    /**
     * Setup the baseline semantics of the widget,
     * ensuring that switches become/stay enabled/disabled,
     * and that only elements that need it get an appropriate
     * tabindex attribute.
     */
    var setupBaseWidget = function () {
      // update the role
      el.setAttribute('role', 'switch');

      // did this start off as a link?
      if ( el.hasAttribute('href') ) {
        el.removeAttribute('href');
      }

      if ( !keepDisabledState ) {
        el.hidden = false;
        el.disabled = false;
        el.removeAttribute('aria-disabled');
      }

      if ( el.hasAttribute('aria-disabled') ) {
        el.tabIndex = -1;
      }
      else {
        // if not a BUTTON or INPUT since those are focusable
        // by default
        if ( el.tagName !== 'BUTTON' && el.tagName !== 'INPUT' ) {
          el.tabIndex = 0;
        }
      }
    };


    /**
     * Setup state depending on the type of starter element.
     */
    var setupCheckedState = function () {
      if ( initState  && (el || {}).type !== 'checkbox' ) {
        el.setAttribute('aria-checked', 'true');
      }
      else if ( !initState  && (el || {}).type !== 'checkbox' ) {
        el.setAttribute('aria-checked', 'false');
      }

      if ( initState && (el || {}).type === 'checkbox' ) {
        el.checked = true;
      }
    }; // setupCheckedState()


    /**
     * Add click and keypress events to elements
     */
    var addEvents = function () {
      el.addEventListener('click', toggleState, false);

      if ( el.tagName !== 'BUTTON' ) {
        el.addEventListener('keypress', keyToggle, false);
      }
    }; // addEvents()


    /**
     * Generate the element to serve as the toggle
     * slider, or whatever version of the UI people
     * want to visually create.
     */
    var generateToggleUI = function () {
      var ui = doc.createElement('span');
      var hasLabels = el.hasAttribute(_options.showLabels);

      ui.setAttribute('aria-hidden', 'true');

      if ( hasLabels ) ui.classList.add('show-labels');

      // if a checkbox, append the UI as a sibling.
      // otherwise, as a child of the element.
      if ( (el || {}).type === 'checkbox' ) {
        el.parentNode.appendChild(ui);
      }
      else {
        el.appendChild(ui);
      }
    }; // generateToggleUI()


    /**
     * Toggle between the on and off state of the switch.
     * Ignore switches that are baseline checkboxes. Checkboxes
     * can update their checked state natively and do not need
     * aria-checked.
     */
    var toggleState = function ( e ) {
      if ( !el.hasAttribute('aria-disabled') ) {
        if ( (el || {}).type !== 'checkbox' ) {
          e.preventDefault();
          el.setAttribute('aria-checked', el.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
        }
      }
    }; // toggleState()


    /**
     * Handle keyboard events for the switch.
     */
    var keyToggle = function ( e ) {
      var keyCode = e.keyCode || e.which;

      switch ( keyCode ) {
        case util.keyCodes.SPACE:
        case util.keyCodes.ENTER:
          e.preventDefault();
          toggleState(e);
          break;

        default:
          break;
      }

      /**
       * Checkboxes don't allow for Enter key to activate
       * by default. However, "switches" do have this
       * expectation, especially since they can be announced
       * as toggle buttons with some screen reader / browser pairings.
       */
      if ( (el || {}).type === 'checkbox' ) {
        switch ( keyCode ) {
          case util.keyCodes.ENTER:
            e.preventDefault();
            this.click()
            break;

          default:
            break;
        }
      }
    } // keyToggle()

    init.call( this );
    return this;
  }; // ARIAswitch()

  w.ARIAswitch = ARIAswitch;

})( window, document );
