#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let optional_point = Some(Point { x: 100, y: 200 });

    /*
        There is an argument made for using ref here
        match optional_point {
            Some(ref p) => // Something
        }

        This does not makes sense to me and the reasoning behind it seems less intuitive
        `match` takes ownership of the vlue you are matching on so just use reference and borrow it!
        Instead of using ref and "partially borrowing" it... Makes no sense, either you borrow or you own...
     */
    match &optional_point {
        Some(p) => println!("Co-ordinates are {},{}", p.x, p.y),
        _ => panic!("No match!"),
    }

    println!("{optional_point:?}"); // Don't change this line.
}
