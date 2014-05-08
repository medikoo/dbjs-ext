# dbjs-ext
## Common type extensions for [dbjs](https://github.com/medikoo/dbjs) engine

### Installation

	$ npm install dbjs-ext

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

### Provided types

_List of extensions is not closed and is still being completed._

* DateTime
    * **Date** - Date, where time is not applicable. Date is saved against UTC time-zone, and it's guaranteed to produce same dates in any time-zone application is run
* Number
    * **Currency** - Abstract currency type, should be used only to create specific currency types
        * **ArgentinePeso** - Argentine Peso
        * **CfaFranc** - CFA Franc
        * **GuatemalanQuetzal** - Guatemalan Quetzal
        * **UsDollar** - US Dollar
    * **HorsePower** - [Horsepower unit](http://en.wikipedia.org/wiki/Horse_power)
    * **Integer** - Integer
        * **UInteger** - Unsigned integer (technically just positive integer)
           * **Time** - Time (milliseconds between 0:00:00.000 and 23:59:59.000)
    * **Percentage** - Percentage
    * **SquareMeters** - Square meters
* Object
    * **DateTimeRange** - Time Range
    * **File** - Computer file
        * **ImageFile** - Image file
            * **JpegFile** - JPG file
            * **PngFile** - PNG file
        * **MsWordFile** - MS Word file
            * **MsWordDocFile** - MS Word .doc file
            * **MsWordDocxFile** - MS Word .docx file
        * **PdfFile** - PDF file
    * **OneDayTimeRange** - Time Range within one day
* String
    * **StringLine** - String line (string with no new-line characters)
        * **Country** - Country
        * **Email** - Email
        * **Filename** - Computer filename
        * **Gender** - Gender (male/female)
        * **MimeTypeGroup** - Mime type group
           * **MimeType** - Mime type
        * **Password** - Password
        * **Sha256Hash** - Sha256Hash
        * **Url** - Url

## Usage

```javascript
var Database = require('dbjs');
var db = new Database();
require('dbjs-ext/string/string-line/email')(db)
require('dbjs-ext/string/string-line/password')(db);

Db.Object.create('User', {
  email: { type: db.Email, required: true },
  password: { db.Password, required: true }
});
```

## Tests

	$ npm test
