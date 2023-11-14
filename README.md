# iptools-utils

IPTools Utilities bundle for media query detection and event namespacing

## Media query detection

### 1. `@use` SCSS package with your project-specific media queries
```scss
@use 'iptools-utils' with ($breakpoints: $my-media-queries);
```
***Note:*** `$my-breakpoints` MUST be an SCSS map with key-value pairs, where the key is the name of the breakpoint and the value is the actual media query, i.e. what you would write after `@media` in CSS.

Alternatively, you can use the default media queries like this:
```scss
@use 'iptools-utils';
```
or by using the supplied `iptools-utils.default.css`.

### 2. import media detection
```javascript
import { media } from 'iptools-utils';
```

### 3. Use media query detection
* `media.isMediaQuery('tablet');` true/false
* `media.getMediaQueries();`
  ```json
    {
      "phone": false,
      "tablet": true,
      "desktop": false
    }
    ```
  
## Event namespacing

### 1. import event namespacing
```javascript
import { getNamespacedEvents } from 'iptools-utils';
```

### 2. Use namespacing function
```javascript
getNamespacedEvents('eventName', 'myNamespace');
getNamespacedEvents(['eventName1, eventName2', 'eventName3'], 'myNamespace');
```
