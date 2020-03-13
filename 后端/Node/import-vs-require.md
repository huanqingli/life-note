### import
ES6 官方规范
```js
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

### require
CommonJS 规范
```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
```
### 重大差异
-CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
-CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。