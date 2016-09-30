# Urutora.js

[![License](http://img.shields.io/:license-MIT-blue.svg)](http://doge.mit-license.org)

Urutora.js is a small Javascript Library (5.2 KB minified) to "energize" html tables, it features:

* Pagination support
* Search support
* Optional styling

These are the only files needed:

```html
<link rel="stylesheet" type="text/css" href="urutora/css/urutora.css">
<script type="text/javascript" src="urutora/js/urutora.js"></script>
```

As an example, let's create a table with a lot of rows:

[![table1.png](https://s14.postimg.org/5skbjuo0x/table1.png)](https://postimg.org/image/n5ulypjbx/)

after calling:

```javascript
ut.init("table-id");
```

The result would be this:

[![table2.png](https://s21.postimg.org/cej6ou15j/table2.png)](https://postimg.org/image/pior1it77/)

Also, some options can be sent, here's a table with a Spanish setup, case sensitive search and a bigger page size. The result would be as follows: 

```javascript
ut.init("t2¡able-id", {
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

[![table3.png](https://s10.postimg.org/brcgztnyx/table3.png)](https://postimg.org/image/ey70jg8et/)
