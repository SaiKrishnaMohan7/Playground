# Rust

- Systems language like Go, C. Development of drivers, compilers
- No GC, no manual memory managament
- `cargo` package manager

<!-- ### Web Assembly, WASM -->

## Errors when running programs

- Hello World program
  - What is a macro?
    - The ability to create your own DSL, some sort of convinience snippet for code (syntactic sugar), like how some ES6 synax covers up the trickiness of JS (`class` keyword for instance)

```rust
error[E0423]: expected function, found macro `println`
 --> hello.rs:2:3
  |
2 |   println("Hello World");
  |   ^^^^^^^
  |
help: use `!` to invoke the macro
  |
2 |   println!("Hello World");
  |          ^

error: aborting due to previous error
 ```

