# Urutora.js

[![License](http://img.shields.io/:license-MIT-blue.svg)](http://doge.mit-license.org)

Urutora.js is a small JavaScript Library (5.2 kB minified) to "energize" html tables, it features:

* Pagination support
* Search support
* Optional styling

These are the files needed:

```html
<link rel="stylesheet" type="text/css" href="urutora/css/urutora.css">
<script type="text/javascript" src="urutora/js/urutora.js"></script>
```

As an example, let's create a table with a lot of rows:

[![table1.png](https://s12.postimg.org/ehsjoupdp/table1.png)](https://postimg.org/image/71ta321o9/)

after calling:

```javascript
ut.init("table-id");
```

The result would be this:

[![table2.png](https://s10.postimg.org/8n3lky8fd/table2.png)](https://postimg.org/image/5g921bnz9/)

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

[![table3.png](https://s21.postimg.org/opmfp1dpz/table3.png)](https://postimg.org/image/s98deugfn/)
