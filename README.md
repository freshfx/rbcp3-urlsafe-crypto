# urlsafe-crypto
The [FreshFx](https://www.freshfx.at/) urlsafe-crypto lib.

## Components
* babel (with preset-env, plugin-add-jsdoc-properties, plugin-transform-object-reset-spread)
* eslint (with eslint-plugin-import)
* mocha, sinon & should
* conventional-changelog (use the angular cz style!)
* npm-run-all, onchange, release-it

## Setup

1. clone this repository
2. delete the `.git` folder
3. change those parts:
    * `index.js` -> adopt the module name
    * `package.json` -> edit the corresponding values
4. remove the .npmrc file if you don't want to use FreshFx private modules
5. change the settings in `.release-it.json` if you want to publish to npm
6. change the `template.hbs` file to fit your needs

**Attention:** to take advantage of the private npm modules, set the NPM_TOKEN as env variable

## Usage
see [package.json's](package.json#L6) "scripts" for all available commands

### commit
`npm run commit`

### start developing
`npm start`

### release
`npm run release`

## API Reference
encrypts, encodes and deflates a given object/string

Encryption Process:
 1. stringify data (optional)
 2. deflate
 3. encrypt
 4. deflate
 5. urlsafe base64 encode

Decryption Process:
 1. urlsafe base64 decode
 2. inflate
 3. decrypt
 4. inflate
 5. parse data (optional)

## Installation
`npm install --save @freshfx/urlsafe-crypto`

**Attention:** in order to install this package, either be a permitted user for this package, or create
a `.npmrc` in your projects root with following content (and set the NPM_TOKEN environment variable):
```txt
 //registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

## Why should I use this?
and not f.e. (iron)[https://www.npmjs.com/package/iron]?
1. we don't need integrity (yet)
2. the generated string is shorter (30-50%) - good for URLs since the GET url length can be limited


* [@freshfx/urlsafe-crypto](#module_@freshfx/urlsafe-crypto)
    * [module.exports(encKey, isString)](#exp_module_@freshfx/urlsafe-crypto--module.exports) ⇒ <code>urlsafe-crypto</code> ⏏
        * _static_
            * [.encrypt](#module_@freshfx/urlsafe-crypto--module.exports.encrypt) ⇒ <code>Promise</code>
            * [.encryptSync](#module_@freshfx/urlsafe-crypto--module.exports.encryptSync) ⇒ <code>String</code>
            * [.decrypt](#module_@freshfx/urlsafe-crypto--module.exports.decrypt) ⇒ <code>String</code> \| <code>Object</code>
            * [.decryptSync](#module_@freshfx/urlsafe-crypto--module.exports.decryptSync) ⇒ <code>String</code> \| <code>Object</code>
        * _inner_
            * [~urlsafe-crypto](#module_@freshfx/urlsafe-crypto--module.exports..urlsafe-crypto) : <code>Object</code>

<a name="exp_module_@freshfx/urlsafe-crypto--module.exports"></a>

### module.exports(encKey, isString) ⇒ <code>urlsafe-crypto</code> ⏏
exports a init function which returns the specific methods
without the need of the encryption key

**Kind**: Exported function  
**Returns**: <code>urlsafe-crypto</code> - urlsafe-crypto functions  

| Param | Type | Description |
| --- | --- | --- |
| encKey | <code>String</code> | encryption key |
| isString | <code>Boolean</code> | set the default value for isString (f.e. if you only encrypt/decrypt strings) |

**Example**  
```js
import urlsafeCrypto from 'rbcp3-urlsafe-crypto'
const ENC_KEY = 'b6bad4846614652e7ead69df7337a7f4'
const crypto = urlsafeCrypto(ENC_KEY)

// prints the object
crypto.encrypt({an: 'object'}).then(crypto.decrypt).then(console.log)
// prints 'test', important: add the isString option to the decrypt function
crypto.encrypt('test').then(encryptedString => crypto.decrypt(encryptedString, true)).then(console.log)

const cryptoString = urlsafeCrypto(ENC_KEY, true)
// prints 'test'
cryptoString.encrypt('test').then(crypto.decrypt).then(console.log)
// prints the object, important: add the isString option to decrypt function
cryptoString.encrypt({an: 'object'}).then(encryptedObject => cryptoString.decrypt(encryptedObject, false)).then(console.log)
```
<a name="module_@freshfx/urlsafe-crypto--module.exports.encrypt"></a>

#### module.exports.encrypt ⇒ <code>Promise</code>
encrypts and encodes a given object or string

**Kind**: static constant of [<code>module.exports</code>](#exp_module_@freshfx/urlsafe-crypto--module.exports)  
**Returns**: <code>Promise</code> - Promise which resolves with the resulting String  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>String</code> | the data to encrypt |
| encKey | <code>String</code> | Encryption Key, length must be 32 (256 Bit) |

**Example**  
```js
const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
// should print something like 'eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ'
encrypt({key: 'value'}, ENC_KEY).then(result => console.log(result))
```
<a name="module_@freshfx/urlsafe-crypto--module.exports.encryptSync"></a>

#### module.exports.encryptSync ⇒ <code>String</code>
encrypts and encodes a given object or string - synchronously

**Kind**: static constant of [<code>module.exports</code>](#exp_module_@freshfx/urlsafe-crypto--module.exports)  
**Returns**: <code>String</code> - the resulting string  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>String</code> | the data to encrypt |
| encKey | <code>String</code> | Encryption Key, length must be 32 (256 Bit) |

**Example**  
```js
const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
// should print something like 'eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ'
console.log(encrypt({key: 'value'}, ENC_KEY))
```
<a name="module_@freshfx/urlsafe-crypto--module.exports.decrypt"></a>

#### module.exports.decrypt ⇒ <code>String</code> \| <code>Object</code>
decodes and decrypts a given string

**Kind**: static constant of [<code>module.exports</code>](#exp_module_@freshfx/urlsafe-crypto--module.exports)  
**Returns**: <code>String</code> \| <code>Object</code> - the resulting string/object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| string | <code>String</code> |  | the data to decode/decrypt |
| encKey | <code>String</code> |  | Encryption Key, length must be 32 (256 Bit) |
| toString | <code>Boolean</code> | <code>false</code> | indicates if the result should be converted into a string or object |

**Example**  
```js
const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
// prints the object'{"key": "value"}'
decrypt('eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ', ENC_KEY)
  .then(console.log)

// prints 'tests'
encrypt('test', ENC_KEY).then(result => decrypt(result, ENC_KEY, true)).then(console.log)
```
<a name="module_@freshfx/urlsafe-crypto--module.exports.decryptSync"></a>

#### module.exports.decryptSync ⇒ <code>String</code> \| <code>Object</code>
decodes and decrypts a given string - synchronously

**Kind**: static constant of [<code>module.exports</code>](#exp_module_@freshfx/urlsafe-crypto--module.exports)  
**Returns**: <code>String</code> \| <code>Object</code> - the resulting string/object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| string | <code>String</code> |  | the data to decode/decrypt |
| encKey | <code>String</code> |  | Encryption Key, length must be 32 (256 Bit) |
| toString | <code>Boolean</code> | <code>false</code> | indicates if the result should be converted into a string or object |

**Example**  
```js
const ENC_KEY = '6b7beea8ef24f7ee89e153387db8f04f'
// prints the object'{"key": "value"}'
console.log(decrypt('eJwNzAcBA0EIADBLbI66YfqX8I2ACCUcg2dSRseFKzIYpAtXM_yWN9_sDVwk9lxORTkS6op3FHdJdOmqnTI1rbrJP-FnD-wDMqcaoQ', ENC_KEY))

// prints 'tests'
console.log(decrypt(encrypt('test', ENC_KEY), ENC_KEY, true))
```
<a name="module_@freshfx/urlsafe-crypto--module.exports..urlsafe-crypto"></a>

#### module.exports~urlsafe-crypto : <code>Object</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_@freshfx/urlsafe-crypto--module.exports)  
**Properties**

| Name | Type |
| --- | --- |
| encrypt | <code>function</code> | 
| encryptSync | <code>function</code> | 
| decrypt | <code>function</code> | 
| decryptSync | <code>function</code> | 


* * *

&copy; 2021 FreshFx <npm@freshfx.at>.
