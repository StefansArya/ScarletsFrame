<a href="https://www.patreon.com/stefansarya"><img src="http://anisics.stream/assets/img/support-badge.png" height="20"></a>

[![Written by](https://img.shields.io/badge/Written%20by-ScarletsFiction-%231e87ff.svg)](LICENSE)
[![Software License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=ScarletsFrame%20is%20frontend%20library%20that%20can%20help%20simplify%20your%20code.&url=https://github.com/ScarletsFiction/ScarletsFrame&via=github&hashtags=scarletsframe,browser,framework,library,mvw)

# ScarletsFrame
A frontend library for Scarlets Framework that support lazy page load and element binding that can help simplify your code.

## Install
You can download minified js from this repository or use this CDN link
`<script type="text/javascript" src='https://cdn.jsdelivr.net/gh/ScarletsFiction/ScarletsFrame@latest/dist/scarletsframe.min.js'>`

Make sure you put it on html header after jQuery.

## How to use
After this library was initialized, you could access `sf` from global scope.

When you're passing a function to `sf`, it will be executed after all DOM content / Asset Loader was finished loading.

```js
sf(function(){
    console.log("All set!");
});
```

### Asset Loader

If you run this on the html body, you will see style changes when loading. So it would be better if you hide the html content then display it after everything completed.
```js
sf.loader.css([
   'css/animate.min.css'
]);

```

When you load your script, make sure you loaded the controller first then the router or model.
```js
sf.loader.js([
   'app/controller.js', // Load controller first
   'app/router.js',
], 'body');

```

This function can help you track the total and loaded content. But sometime the content are cached by the browser and it couldn't be monitored as loaded content.
```js
sf.loader.onProgress(function(loadedContent, totalContent){
   console.log(loadedContent+ ' of ' +totalContent+ ' was loaded');
});

```

After the loading complete, this function will be triggered before all `sf(function(){})` will be called.
```js
sf.loader.onFinish(function(){
   console.log("All content was loaded from internet or cache");
});

```

### Router
This currently unfinished yet, but you can still use it.

Let's define event listener before element with controller `todo.page` was loaded to current DOM.
```js
sf.router.before('todo.page', function(){
    // Data Re-initialization
});
```

Let's define event listener when `todo.page` is going to be removed from DOM.
```js
sf.router.after('todo.page', function(){
    // Data cleanup
});
```

Here you can listen if any page was loaded, loading, or load error
```js
sf.router.on('error', function(error){ ... });
sf.router.on('loading', function(path){ ... });
sf.router.on('loaded', function(currentRouterURL, path, data){ ... });
```

Find href link redirect from DOM and listen to it if it can be accepted for lazy router
```js
sf.router.lazy();
```

### Controller
On the controller, you can define any static function for the model. The controller will be loaded once when the first page was loaded.  

Get controller name for the selected element
```js
sf.controller.fromElement(element, function(name){ ... })
```

Run once on initialization
```js
sf.controller.for(name, func)
```

Can be run more than once when the controller for current DOM is currently active.
```js
sf.controller.run(name, func)
```

### Model & Template feature
When you're using template on html, function call will be removed for security reason.

Get data from current controller's model scope
`{{ model.variable }}`

Conditional template
`{{@if model.view === true : do stuff}}`

Replacement for `<script>` tag. You can also output html by wrap it inside '{[ ... ]}'
`{{@exec javascript stuff}}`
For security reason, bracket `()` will be removed. But if you want to use for, if, or while you should use `# ... :` as the bracket replacement.

Any element with `sf-repeat-this` will be binded with the array condition on the model. If you push or splice the array data, then the element will also being modified.

Open the model scope for the selected controller for modification.
```js
sf.model.for('music.feedback', function(self){
    self.reviews = [{
      name:"Aliz Feriana",
      date:"January 17",
      rate:4,
      ...
    }];
    // After reviews was binded
    // '.refreshBind()' can be used for refresh
    // binded elements

    // Register event when 'reviews' was modified
    self.on$reviews = {
       remove:function(elem, remove){
          $(elem).animateCSS('bounceOutLeft', function(){
             remove(); // Remove the element
          });
       },
       update:function(elem){},
       create:function(elem){}
    };
});
```
```html
<body sf-controller="music.feedback">
  <!-- Model scope for music.feedback -->

  <div sf-repeat-this="x in reviews" class='review' id='review{{x.id}}'>
    <img style='height: 65px;' data-src='{{x.profilePicture}}' alt='picture'>
    <h5>{{x.name}} - {{x.date}}
    {{@if x.owner:
      <a sf-click='delete("review")' style='cursor:pointer;color:#6b6b6b;'>Delete</a>
    }}
    </h5>
    <ul class='stars'>{{@exec
      for# var i = 1; i <= 5; i++: {
        if# i <= x.rate: {
          {[<li class='active'><i class='icon-star'></i></li>]}
        }
        else{
          {[<li><i class='icon-star-empty'></i></li>]}
        }
      }
    }}</ul>
    <p class='review-comment'>{{x.content}}</p>
  </div>
</body>
```

Get model object scope for the selected element.
```js
sf.model.fromElement(element, func = false)
```

Bind the element for html, attr, or all
```js
sf.model.bindElement(elementNode, which = false)
```

You could also automatically bind element by using `sf-bind` attribute
```html
<!-- Bind Attributes only (model.id)-->
<div sf-bind="attr" class='review' id='review{{id}}'></div>

<!-- Bind Inner HTML only (model.content) -->
<div sf-bind="html">{{ content }}</div>

<!-- Bind Attribute and Inner HTML -->
<div sf-bind="" id='review{{id}}'>{{ content }}</div>
```

Find processable template from DOM and mark them for preprocess queue. Followed by calling `parsePreprocess` to process the queued DOM.
```js
sf.model.queuePreprocess(targetNode = false)
```

Process the template queue and bind the element if it's bindable.
```js
sf.model.parsePreprocess(targetNode = false)
```

## Contribution
If you want to help in ScarletsFrame please fork this project and edit on your repository, then make a pull request to here. Otherwise, you can help with donation via [patreon](https://www.patreon.com/stefansarya).

Keep the code simple and clear.

## License
ScarletsFrame is under the MIT license.

But don't forget to put the a link to this repository.