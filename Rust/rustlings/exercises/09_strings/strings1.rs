// This was a returning an &str instead of a String (heap allocated)
fn current_favorite_color() -> String {
    String::from("blue")
}

fn main() {
    let answer = current_favorite_color();
    println!("My current favorite color is {answer}");
}
