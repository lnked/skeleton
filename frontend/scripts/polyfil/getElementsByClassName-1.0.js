/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/

var getElementsByClassName = function(className, tag, elm) {
  if (document.getElementsByClassName) {
    getElementsByClassName = function(className, tag, elm) {
      tag = tag || '*';
      elm = elm || document;
      let elements = elm.getElementsByClassName(className),
        nodeName = new RegExp(
          `\\b${tag !== '*' ? tag : '[a-z]+'}\\b`,
          'i'
        ),
        returnElements = [],
        current;
      for (let i = 0, il = elements.length; i < il; i += 1) {
        current = elements[i];
        if (nodeName.test(current.nodeName)) {
          returnElements.push(current);
        }
      }
      return returnElements;
    };
  } else if (document.evaluate) {
    getElementsByClassName = function(className, tag, elm) {
      tag = tag || '*';
      elm = elm || document;
      let classes = className.split(' '),
        classesToCheck = '',
        xhtmlNamespace = 'http://www.w3.org/1999/xhtml',
        namespaceResolver =
                    document.documentElement.namespaceURI === xhtmlNamespace
                      ? xhtmlNamespace
                      : null,
        returnElements = [],
        elements,
        node;
      for (let j = 0, jl = classes.length; j < jl; j += 1) {
        classesToCheck +=
                    `[contains(concat(' ', @class, ' '), ' ${
                      classes[j]
                    } ')]`;
      }
      try {
        elements = document.evaluate(
          `.//${tag}${classesToCheck}`,
          elm,
          namespaceResolver,
          0,
          null
        );
      } catch (e) {
        elements = document.evaluate(
          `.//${tag}${classesToCheck}`,
          elm,
          null,
          0,
          null
        );
      }
      while ((node = elements.iterateNext())) {
        returnElements.push(node);
      }
      return returnElements;
    };
  } else {
    getElementsByClassName = function(className, tag, elm) {
      tag = tag || '*';
      elm = elm || document;
      let classes = className.split(' '),
        classesToCheck = [],
        elements =
                    tag === '*' && elm.all
                      ? elm.all
                      : elm.getElementsByTagName(tag),
        current,
        returnElements = [],
        match;
      for (let k = 0, kl = classes.length; k < kl; k += 1) {
        classesToCheck.push(new RegExp(`(^|\\s)${classes[k]}(\\s|$)`));
      }
      for (let l = 0, ll = elements.length; l < ll; l += 1) {
        current = elements[l];
        match = false;
        for (let m = 0, ml = classesToCheck.length; m < ml; m += 1) {
          match = classesToCheck[m].test(current.className);
          if (!match) {
            break;
          }
        }
        if (match) {
          returnElements.push(current);
        }
      }
      return returnElements;
    };
  }
  return getElementsByClassName(className, tag, elm);
};
