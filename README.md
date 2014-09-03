# Leafly API Wrapper

### Getting Started
* Create and App in the [Leafly Developer API](http://developer.leafly.com) Page

```bash
$ npm install --save leafly
```

### Getting Strain Details
```javascript
var Leafly = require('leafly')
var leafly = new Leafly({key: 'YOUR APP KEY', appId:'YOUR APP ID'})
var blueDream = leafly.strain("Blue Dream")
```

### Contributing
* Please make sure to add tests for your code and make sure that all pass.
* Code without jasmine tests will not be included
```bash
$ npm test
```
