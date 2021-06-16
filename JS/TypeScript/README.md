# TypeScript

Typed, syntactic superset of JS; *Compiles* to readable JS; Comes with Language, LanguageServer and Compiler; Moves errors from runtime to compile time

- A typing system for a dynamically typed language

## Commands run

- `tsc src/index.ts` -- Died for me but generally compiles to es3 index.js
- `tsc src/index.ts --target ES2015` -- compiles to ES6 index.js; same can be done `--target ES2017` will compile to ES8 asysnc/await index.js
- `tsc src/index.ts --target ES2017 --module commonjs` -- compiles to ES8 index.js and adds commonjs `module.exports` (as node uses commonjs, require and module.exports, for importing and exporting modules; EcmaScript Modules, ESM, *is supported* in node v13 and above but is in the experimental phase; [StackOverflow](https://stackoverflow.com/questions/37132031/node-js-plans-to-support-import-export-es6-ecmascript-2015-modules))
- `tsc src/index.ts --target ES2017 --module commonjs --watch` -- like webpack watch
- All this can be and should be controlled by a `tsconfig.json` file
