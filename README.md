<a name="module_urlsafe-crypto"></a>

## urlsafe-crypto
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
`npm install --save git+https:github.com/freshfx/rbcp3-urlsafe-crypto.git#v1.0.1`


* [urlsafe-crypto](#module_urlsafe-crypto)
    * [module.exports(encKey, isString)](#exp_module_urlsafe-crypto--module.exports) ⇒ <code>urlsafe-crypto</code> ⏏
        * _static_
            * [.encrypt](#module_urlsafe-crypto--module.exports.encrypt) ⇒ <code>Promise</code>
            * [.encryptSync](#module_urlsafe-crypto--module.exports.encryptSync) ⇒ <code>String</code>
            * [.decrypt](#module_urlsafe-crypto--module.exports.decrypt) ⇒ <code>String</code> \| <code>Object</code>
            * [.decryptSync](#module_urlsafe-crypto--module.exports.decryptSync) ⇒ <code>String</code> \| <code>Object</code>
        * _inner_
            * [~urlsafe-crypto](#module_urlsafe-crypto--module.exports..urlsafe-crypto) : <code>Object</code>

<a name="exp_module_urlsafe-crypto--module.exports"></a>

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
<a name="module_urlsafe-crypto--module.exports.encrypt"></a>

#### module.exports.encrypt ⇒ <code>Promise</code>
encrypts and encodes a given object or string

**Kind**: static constant of [<code>module.exports</code>](#exp_module_urlsafe-crypto--module.exports)  
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
<a name="module_urlsafe-crypto--module.exports.encryptSync"></a>

#### module.exports.encryptSync ⇒ <code>String</code>
encrypts and encodes a given object or string - synchronously

**Kind**: static constant of [<code>module.exports</code>](#exp_module_urlsafe-crypto--module.exports)  
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
<a name="module_urlsafe-crypto--module.exports.decrypt"></a>

#### module.exports.decrypt ⇒ <code>String</code> \| <code>Object</code>
decodes and decrypts a given string

**Kind**: static constant of [<code>module.exports</code>](#exp_module_urlsafe-crypto--module.exports)  
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
<a name="module_urlsafe-crypto--module.exports.decryptSync"></a>

#### module.exports.decryptSync ⇒ <code>String</code> \| <code>Object</code>
decodes and decrypts a given string - synchronously

**Kind**: static constant of [<code>module.exports</code>](#exp_module_urlsafe-crypto--module.exports)  
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
<a name="module_urlsafe-crypto--module.exports..urlsafe-crypto"></a>

#### module.exports~urlsafe-crypto : <code>Object</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_urlsafe-crypto--module.exports)  
**Properties**

| Name | Type |
| --- | --- |
| encrypt | <code>function</code> | 
| encryptSync | <code>function</code> | 
| decrypt | <code>function</code> | 
| decryptSync | <code>function</code> | 

