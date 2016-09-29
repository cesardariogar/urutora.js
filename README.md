# Urutora.js

[![License](http://img.shields.io/:license-MIT-blue.svg)](http://doge.mit-license.org)

Urutora.js has two simple functions: pagination and search, no styling for the table associated, that's up to you.

Just import these:

```html
<link rel="stylesheet" type="text/css" href="urutora/css/urutora.css">
<script type="text/javascript" src="urutora/js/urutora.js"></script>
```

Now let's say we have a table like this one, with a lot of rows:

[![table1.png](https://s12.postimg.org/58gq9ujzh/table1.png)](https://postimg.org/image/466jrb161/)

after calling:

```javascript
ut.init("table-id");
```

we'll have this:

[![table2.png](https://s13.postimg.org/d09zwg947/table2.png)](https://postimg.org/image/avpmvd7hf/)

Alternatively, some options can be sent, most of these options are for language settings, here's a "Spanish" setup with case sensitive search:

```javascript
ut.init("table-id", {
    disableSearch: false,// Default value
    caseSensitive: true,// For searching
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

the result would be something like this:

[![table3.png](https://s12.postimg.org/mjots45kt/table3.png)](https://postimg.org/image/5vxbpmat5/)