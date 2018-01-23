# ARIA Switch Button
Similar to a toggle button or checkbox, a switch button is meant to be used when its visual appearance most resembles an "on / off" toggle.  
Additionally, the expected user experience of a switch button is for an immediate action to take place. In contrast, when interacting with a checkbox, any change in UI state is typically expected to occur after a form submission.  [See related WCAG success criteria "on input"](https://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-unpredictable-change.html).

For more information about the Switch Role, please see:  
* [Switch Role Accessible Rich Internet Applications (WAI-ARIA) 1.1, Specification](https://www.w3.org/TR/wai-aria-1.1/#switch)  
* [Inclusive Components: Toggle Button Article](http://inclusive-components.club/toggle-button/)  


## How does it work?
The baseline for this component requires the following markup:

```html
<button type="button" 
  data-action="aria-switch"
  role="switch"
  aria-checked="false"
  aria-labelledby="ID_HERE"
  disabled>
  <!-- Meaningful label here -->
</button>
```

The ```data-action="aria-switch"``` is required for the switch component to work. All setup and functionality is based around this attribute.  

The reason for the button being disabled by default is that this component requires JavaScript to function. Without JavaScript, users should be aware there is a component that is currently unusable. When JavaScript is enabled, the `disabled` attribute will be removed from the switch, unless a `data-keep-disabled` attribute is present.

`role="switch" is required to accurately announce this component by screen readers that support the switch role. If this attribute is missing, or if it is set to another role, the JavaScript will update it to the appropriate switch value.  

An `aria-checked attribute should be set to announce the current state of the switch. If this attribute is not present, the script will default to setting an `aria-checked="false"`, but that's not helpful for users with blocked JavaScript. So again, remember to set this attribute.

Use the `aria-labelledby` to point to a text label that this switch will control the state of. If a visible label is not present (e.g. you're using an icon of some sort, or somehow it's visually apparent what this switch does without a visible label), be sure to use an `aria-label` instead to give context as to what this switch is toggling on/off. 

Currently there is no fall back for setting an appropriate label or labelledby value to this component, if one is not manually set. Instead a console error is purposefully left in the script to alert developers of this failure for when a switch is missing these attributes.


### License & Such
This script was written by [Scott O'Hara](https://twitter.com/scottohara).

It has an [MIT](https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md) license.

Do with it what you will :)
