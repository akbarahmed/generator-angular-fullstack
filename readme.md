# Exponential Mean Generator
A Yeoman (yeoman.io) generator for Mongo + Express + Angular + Node (MEAN). 

The Exponential Mean Generator is an opinionated generated that is created 
with the following goals: 

- To achieve maximum development velocity
- To deliver a pure environment with no magic

## No Magic

Exponential deliver a pure environment with no magic. Each library 
(ex. Express) is used as is with no changes. The reason is to ensure that the 
original documentation can be used as is, to prevent new bugs created by 
abstractions, and to ensure that you do not run into problems with poorly 
implemented abstrations.

# ORIGINAL README FOLLOWS

A generator for AngularJS, integrated with an Express `server.js` for full stack development. 

Featuring: 

 * Express server integrated with grunt tasks
 * Livereload of client and server files
 * Easy deployment workflow.
 * **NEW** Optional mongoDB integration

Based on [generator-angular](https://github.com/yeoman/generator-angular)


## Usage

Install `generator-exponential-mean`:
```
npm install -g generator-exponential-mean
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo exponential-mean`, optionally passing an app name:
```
yo exponential-mean [app-name]
```

### Express

Launch your express server in development mode.
```
grunt server
``` 

Launch your express server in production mode, uses the minified/optimized production app folder.
```
grunt server:dist
``` 

### Livereload

`grunt server` will watch client files in `app/`, and server files inside `lib/`, restarting the Express server when a change is detected. This requires the [Livereload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) or equivalant to refresh your browser. Be sure that the plugin is enabled on the page you're testing.

### Deployment

While deployment should be easy enough with the `grunt dist` build, we provide an extremely simplifed deployment process for heroku.

`yo exponential-mean:deploy heroku` for generating a deployment ready folder for [heroku.com](http://heroku.com/) from your project files. 

**Create and Deploy an app in 4 steps**

1. `mkdir foo && cd foo`

2. `yo exponential-mean`

3. `yo exponential-mean:deploy heroku`

4. `cd heroku && git push heroku master`

That's it! Your app should be live and shareable. Type `heroku open` to view it.  

## Generators

Available generators:

* [exponential-mean](#app) (aka [exponential-mean:app](#app))
* [exponential-mean:controller](#controller)
* [exponential-mean:directive](#directive)
* [exponential-mean:filter](#filter)
* [exponential-mean:route](#route)
* [exponential-mean:service](#service)
* [exponential-mean:provider](#service)
* [exponential-mean:factory](#service)
* [exponential-mean:value](#service)
* [exponential-mean:constant](#service)
* [exponential-mean:decorator](#decorator)
* [exponential-mean:view](#view)
* [exponential-mean:deploy](#deploy)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Twitter Bootstrap and additional AngularJS modules, such as angular-resource.

Example:
```bash
yo exponential-mean
```

### Deploy
Initalizes a heroku app and generates a `heroku` folder which is ready to push to heroku.

Example:
```bash
yo exponential-mean:deploy heroku
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo exponential-mean:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

### Controller
Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo exponential-mean:controller user
```

Produces `app/scripts/controllers/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo exponential-mean:directive myDirective
```

Produces `app/scripts/directives/myDirective.js`:
```javascript
angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo exponential-mean:filter myFilter
```

Produces `app/scripts/filters/myFilter.js`:
```javascript
angular.module('myMod').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo exponential-mean:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an AngularJS service.

Example:
```bash
yo angular:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myMod').service('myService', function () {
  // ...
});
```

You can also do `yo exponential-mean:factory`, `yo exponential-mean:provider`, `yo exponential-mean:value`, and `yo exponential-mean:constant` for other types of services.

### Decorator
Generates an AngularJS service decorator.

Example:
```bash
yo exponential-mean:decorator serviceName
```

Produces `app/scripts/decorators/serviceNameDecorator.js`:
```javascript
angular.module('myMod').config(function ($provide) {
    $provide.decorator('serviceName', function ($delegate) {
      // ...
      return $delegate;
    });
  });
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### CoffeeScript
For generators that output scripts, the `--coffee` option will output CoffeeScript instead of JavaScript.

For example:
```bash
yo exponential-mean:controller user --coffee
```

Produces `app/scripts/controller/user.coffee`:
```coffeescript
angular.module('myMod')
  .controller 'UserCtrl', ($scope) ->
```

A project can mix CoffeScript and JavaScript files.

To output JavaScript files, even if CoffeeScript files exist (the default is to output CoffeeScript files if 
the generator finds any in the project), use `--coffee=false`.

### Minification Safe
By default, generators produce unannotated code. Without annotations, AngularJS's DI system will break when minified. Typically, these annotations that make minification safe are added automatically at build-time, after application files are concatenated, but before they are minified. By providing the `--minsafe` option, the code generated will out-of-the-box be ready for minification. The trade-off is between amount of boilerplate, and build process complexity.

#### Example
```bash
yo exponential-mean:controller user --minsafe
```

Produces `app/controller/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', ['$scope', function ($scope) {
  // ...
}]);
```

#### Background
Unannotated:
```javascript
angular.module('myMod').controller('MyCtrl', function ($scope, $http, myService) {
  // ...
});
```

Annotated:
```javascript
angular.module('myMod').controller('MyCtrl',
  ['$scope', '$http', 'myService', function ($scope, $http, myService) {

    // ...
  }]);
```

The annotations are important because minified code will rename variables, making it impossible for AngularJS to infer module names based solely on function parameters.

The recommended build process uses `ngmin`, a tool that automatically adds these annotations. However, if you'd rather not use `ngmin`, you have to add these annotations manually yourself.

### Add to Index
By default, new scripts are added to the index.html file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo exponential-mean:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-loader
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

### Output
You can change the `app` directory by adding a `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

## Testing

For tests to work properly, karma needs the `angular-mocks` bower package.
This script is included in the bower.json in the `devDependencies` section, which will
be available very soon, probably with the next minor release of bower.

While bower `devDependencies` are not yet implemented, you can fix it by running:
```bash
bower install angular-mocks
```

By running `grunt test` you should now be able to run your unit tests with karma.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
