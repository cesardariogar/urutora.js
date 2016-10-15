# Urutora.js

[![License](http://img.shields.io/:license-MIT-blue.svg)](http://doge.mit-license.org)
[![Version](http://img.shields.io/:version-0.0.4-green.svg)]()

Urutora.js is a small JavaScript Library (6.5 kB minified) to energize html tables, it features:

* Pagination support
* Search support
* Styling

These are the files needed:

```html
<link rel="stylesheet" type="text/css" href="urutora/urutora.css">
<script type="text/javascript" src="urutora/urutora.js"></script>
```

As an example, let's create a table with a lot of rows:

[![tabla1.png](https://s11.postimg.org/tgqyes54j/tabla1.png)](https://postimg.org/image/kyhiafylr/)

After calling:

```javascript
ut.init("table-id");
```

The result wil be this:

[![tabla2.png](https://s17.postimg.org/620tt8zin/tabla2.png)](https://postimg.org/image/8w3z6p1or/)

Also, some options can be sent, here's a table with a Spanish setup, case sensitive search and a bigger page size:

```javascript
ut.init("table-id", {
    disableSearch: false,// Default value
    caseSensitive: true,// For searching
    tableStyling: true,// Default value, use false if you're using your own style
    pageSize: 9,// Default = 5
    tags: {
        firstPage: "<< Primera",
        prevPage: "< Anterior",
        nextPage: "Siguiente >",
        lastPage: "&Uacute;ltima >>",
        searchPlaceHolder: "Buscar...",
        noResults: "No hay resultados :(",
        pageIndicator: "P&aacute;gina {current} de {total}"
    }
});
```

[![tabla3.png](https://s12.postimg.org/q8xctral9/tabla3.png)](https://postimg.org/image/wmmfx0fh5/)
