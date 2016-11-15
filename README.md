# urutora.js

[![License](http://img.shields.io/:license-MIT-blue.svg)](http://doge.mit-license.org)
[![Version](http://img.shields.io/:version-0.0.5-green.svg)](https://github.com/tavuntu/urutora.js/blob/master/README.md)

urutora.js is a small JavaScript Library (6.8 kB minified) to energize html tables, it features:

* Pagination
* Search
* Styling

These are the files needed:

```html
<link rel="stylesheet" type="text/css" href="urutora/urutora.css">
<script type="text/javascript" src="urutora/urutora.js"></script>
```

As an example, let's create a mess of a table like this one:

[![table1.png](https://s18.postimg.org/ei39d4621/table1.png)](https://postimg.org/image/ycpaz8l9h/)

After calling:

```javascript
ut.init("table-id");
```

This is the result:

[![table2.png](https://s14.postimg.org/vk954959d/table2.png)](https://postimg.org/image/hdte90ue5/)

Also, some options can be sent, here's a table with a Spanish setup, case sensitive search, a bigger page size and a manually created search field:

```javascript
ut.init("t2", {
    disableSearch: false,// Default value
    caseSensitive: true,// For searching
    tableStyling: true,// Default value
    pageSize: 9,// Default = 5
    searchInput: "my-input-id",//My personal input
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

[![table3.png](https://s12.postimg.org/jrciznu3x/table3.png)](https://postimg.org/image/g7ql9ure1/)

Notes:

* Call ut.init(tableId) right after the table is loaded, for instance:

```javascript
    $.ajax({
        url: "/getData"
    }).done(function(data) {
        for(var i = 0; data && i < data.length; i++) {
            $("#my-table tbody").append(
                getRow(data[i]);
            );
        }
        ut.init("my-table");
    });
```

* Call ut.refresh(tableId) if the table content changes