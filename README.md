
[![Build status][travis-icon]][travis]
[![Code Climate][climate-icon]][climate]
[![Test coverage][cover-icon]][cover]


# queryselector-ext

Extend the selector syntax for the [`element.querySelector(..)`][qs] DOM/ Javascript function,
by adding a minimalist function-like syntax. For example:

```js
  querySelectorExt(' #id123:closest( tr ):find( th ) ');
```

Supported functions:

* [`:closest(..)`][closest]
* [`:find(..)`][find]


Use case: primary use-cases are the [accessibility fixes in Accessify Wiki][use].


---
License: [MIT][] | By: [@nfreear].


[qs]: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
    "element.querySelector() on Mozilla MDN"
[closest]: https://api.jquery.com/closest/ "Based on jQuery's .closest()"
[find]:    https://api.jquery.com/find/ "Based on jQuery's .find()"
[use]: http://accessifywiki.github.io/fix/ou-news.html#fixes "Accessibility fixes — Accessify Wiki"
[@nfreear]: https://twitter.com/@nfreear "made by Nick Freear with ♥"
[MIT]: http://nfreear.mit-license.org/ "MIT License. © 2016 Nick Freear."

[travis]: https://travis-ci.org/nfreear/queryselector-ext "Build status — Travis-CI"
[travis-icon]: https://travis-ci.org/nfreear/queryselector-ext.svg?branch=master
[climate]: https://codeclimate.com/github/nfreear/queryselector-ext "GPA score — Code Climate"
[climate-icon]: https://codeclimate.com/github/nfreear/queryselector-ext/badges/gpa.svg
[cover]: https://codeclimate.com/github/nfreear/queryselector-ext/coverage "Test coverage — Code Climate"
[cover-icon]: https://codeclimate.com/github/nfreear/queryselector-ext/badges/coverage.svg
