fn main() {
    let mut city_names = vec!["Pythonia", "Javasburg", "C by the Sea", "Rustville"];

    // We are doing this here to clear any ambiguity for the compiler, as the .pop() returns an Option enum
    // with Some and None so we make sure we have strings all the way
    // since Rust doesnt have a concept of null, nil or undefined it returns the Option enum as the Vec may be empty
    // Sure, we are populating the Vec and all the information for the compiler is already there for this instance but
    // generally in the real world this is more common

    // GENERAL RULE OF THUMB: Clear any ambiguity and be specific, when an Option enum is returned, use match to make type same for further operation
    let last_city = match city_names.pop() {
        Some(string_value) => { string_value }
        None => {  "" }
    };

    if last_city.starts_with("R") {
        println!("“{}” starts with an R!", last_city);
    } else {
        println!("“{}” doesn't start with R", last_city);
    }

    city_names.push(last_city);

    println!("Here is the full list of cities:");

    for city in city_names.iter() {
        println!("\t{}", city);
    }
}
