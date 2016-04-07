
[![Build status][travis-icon]][travis]

# queryselector-ext

Extend the selector syntax for the [`element.querySelector(..)`][qs] DOM/ Javascript function,
by adding a minimalist function-like syntax. For example:

```js
  querySelectorExt(' #id123:closest( tr ):find( th ) ');
```

Supported functions:

* [`:closest(..)`][closest]
* [`:find(..)`][find]

Use case: ...


---
License: [MIT][]


[qs]: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
    "element.querySelector() on Mozilla MDN"
[closest]: https://api.jquery.com/closest/ "Based on jQuery's .closest()"
[find]:    https://api.jquery.com/find/ "Based on jQuery's .find()"
[MIT]: http://nfreear.mit-license.org/ "MIT License. © 2016 Nick Freear"
[travis]: https://travis-ci.org/nfreear/queryselector-ext "Build status — Travis-CI"
[travis-icon]: https://travis-ci.org/nfreear/queryselector-ext.svg?branch=master
