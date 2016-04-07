
# queryselector-ext

Extend the selector syntax for the Javascript/ DOM function [`element.querySelector(..)`][qs].
Add a minimalist function-like syntax. For example:

```js
  querySelectorExt(' #id123:closest( tr ):find( th ) ');
```

Supported _functions_:

* [`closest(..)`][]
* [`find(..)`][]

Use case: ...


---
License: [MIT][]


[qs]: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
    "element.querySelector() on Mozilla MDN"
[`closest()`]: https://api.jquery.com/closest/ ".closest() in jQuery"
[`find()`]: https://api.jquery.com/find/ ".find() in jQuery"
[MIT]: http://nfreear.mit-license.org/ "MIT License"
