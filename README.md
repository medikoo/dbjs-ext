# DBJS-EXT
## Common extensions (types) for [DBJS](https://github.com/medikoo/dbjs) database engine

## Installation
### NPM

In your project path:

	$ npm install medikoo/dbjs-ext

#### Browser

You can easily bundle NPM packages for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Available extensions (Type hierarchy)

_List of extensions is not closed and is still being completed._

* DateTime
    * **Date** - Date, where time is not applicable. Date is saved against UTC time-zone, and it's guaranteed to produce same dates in any time-zone application is run
* Number
    * **Currency** - Abstract currency type, should be used only to create specific currency types
        * **ArgentinePeso** - Argentine Peso
        * **UsDollar** - US Dollar
    * **HorsePower** - [Horsepower unit](http://en.wikipedia.org/wiki/Horse_power)
    * **Integer** - Integer
        * **UInteger** - Unsigned integer
    * **Percentage** - Percentage
    * **SquareMeters** - Square meters
* Object
    * **File** - Computer file
        * **ImageFile** - Image file
            * **JpegFile** - JPG file
            * **PngFile** - PNG file
        * **MsWordFile** - MS Word file
            * **MsWordDocFile** - MS Word .doc file
            * **MsWordDocxFile** - MS Word .docx file
        * **PdfFile** - PDF file
* String
    * **StringLine** - String line (string which doesn't contain any new line characters)
        * **Email** - Email
        * **Enum** - Enum, string restricted to one of the predefined set of strings
            * **Country** - Country
            * **Gender** - Gender (male/female)
        * **Filename** - Computer filename
        * **MimeType** - Mime type
        * **Password** - Password
        * **Sha256Hash** - Sha256Hash
        * **Url** - Url

## Usage

Simply import needed types and use it, e.g.:

```javascript
require('dbjs-ext/string/string-line/email');
require('dbjs-ext/string/string-line/password');

Db.Object.create('User', {
  email: Db.Email.rel({ required: true }),
  password: Db.Password.rel({ required: true })
});
```

## Tests

	$ npm test
