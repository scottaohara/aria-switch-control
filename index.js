// add utilities
const util = {
  generateID: function ( base ) {
    return base + Math.floor(Math.random() * 999);
  }
};


(function ( w, doc, undefined ) {
  /**
   * A11Y ARIA Switch
   *
   * Author: Scott O'Hara
   * Version: 2.0.1
   * License: https://github.com/scottaohara/aria-switch-control/blob/main/LICENSE
   */
  let ARIAswitchOptions = {
    baseID: 'aria_switch',
    defaultStateSelector: 'data-switch',
    showLabels: 'data-switch-labels',
    dataKeepDisabled: 'data-keep-disabled'
  };


  const ARIAswitch = function ( inst, options ) {
    const _options = Object.assign(ARIAswitchOptions, options);
    const el = inst;
    let elID;
    let keepDisabledState;
    let initState;
    let isCheckbox;


    /**
     * Initialize the switch instance.
     * Create unique IDs and generate
     * a markup pattern if necessary.
     */
    const init = function () {
      elID = el.id || util.generateID(_options.baseID);

      keepDisabledState = el.hasAttribute(_options.dataKeepDisabled);
      initState = el.getAttribute(_options.defaultStateSelector);

      setupBaseWidget()
      setupCheckedState();
      generateToggleUI();
      addEvents();
    };


    /**
     * Setup the baseline semantics of the widget,
     * ensuring that switches become/stay enabled/disabled,
     * and that only elements that need it get an appropriate
     * tabindex attribute.
     */
    const setupBaseWidget = function () {
      el.setAttribute('role', 'switch');

      // did this start off as a link?
      if ( el.href ) el.removeAttribute('href');

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
    const setupCheckedState = function () {
      if ( initState  && (el || {}).type !== 'checkbox' ) {
        el.setAttribute('aria-checked', 'true');
      }
      else if ( !initState  && (el || {}).type !== 'checkbox' ) {
        el.setAttribute('aria-checked', 'false');
      }

      if ( initState && (el || {}).type === 'checkbox' ) {
        el.checked = true;
      }
    };


    /**
     * Add click and keypress events to elements
     */
    const addEvents = function () {
      el.addEventListener('click', toggleState, false);

      if ( el.tagName !== 'BUTTON' ) {
        el.addEventListener('keypress', keyToggle, false);
      }
    };


    /**
     * Generate the element to serve as the toggle
     * slider, or whatever version of the UI people
     * want to visually create.
     */
    const generateToggleUI = function () {
      const ui = doc.createElement('span');
      const hasLabels = el.hasAttribute(_options.showLabels);

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
    };


    /**
     * Toggle between the on and off state of the switch.
     * Ignore switches that are baseline checkboxes. Checkboxes
     * can update their checked state natively and do not need
     * aria-checked.
     */
    const toggleState = function ( e ) {
      if ( !el.hasAttribute('aria-disabled') ) {
        if ( (el || {}).type !== 'checkbox' ) {
          e.preventDefault();
          el.setAttribute('aria-checked', el.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
        }
      }
    };


    /**
     * Handle keyboard events for the switch.
     */
    const keyToggle = function ( e ) {
      const keyCode = e.keyCode || e.which;

      switch ( keyCode ) {
        case 32:
        case 13:
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
          case 13:
            e.preventDefault();
            this.checked = this.checked == true ? false : true;
            break;

          default:
            break;
        }
      }
    }


    init.call( this );
    return this;
  }; // ARIAswitch()

  w.ARIAswitch = ARIAswitch;
})( window, document );
