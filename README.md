# defaultjs-html-dropdown


## How to Install via NPM

```bash
npm install @default-js/defaultjs-html-dropdown@latest
```

```javascript
//main.js
import "@default-js/defaultjs-html-dropdown";
import "@default-js/defaultjs-html-dropdown/src/css/";
```

## How to Install via Script Tag

Include all files and folder of `dist/*` into your project and include `browser-defaultjs-html-dropdown.min.js` and `dropdown.css` into your html page. If you are using the `DropdownElement` at javascript code, be sure that the include is before your code executed.

```html
<html>
    <head>
        <link href="css/dropdown.css" rel="stylesheet">
        <script src="browser-defaultjs-html-dropdown.min.js" defer></script>
    </head>
</html>
```

## Usage

```html
<d-dropdown>
    <!-- your dropdown item title -->
    Menu 
    <d-dropdown-content>
        <!-- your dropdown content -->
        <div> menu entry</div>
        <div> menu entry</div>
        <div> menu entry</div>
    </d-dropdown-content>
</d-dropdown>
```

## Javascript API

### Class `DropdownElement`

Attribute | Description
----------|------------
mode      | `click` or `auto` -> if value `click`, it forces the dropdown menu to open on click event
active    | `boolean` -> true: open dropdown menu, false: close dropdown menu