fn main() {
    let mut numbers = vec![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
    let numbers_mutable_reference = &mut numbers;

    let sum_of_nums = sum(numbers_mutable_reference);
    let product_of_nums = product(numbers_mutable_reference);
    let average_of_nums = average(numbers_mutable_reference);

    // 💡 TIP: You'll get a compile error. Here are two ways you can fix it:
    //
    // Option 1: Accept &Vec<i64> instead of Vec<i64>
    //
    // Option 2: Accept a slice - that is, &[i64] - instead of a Vec
    //
    // Give both options a try!

    println!("Sum of these numbers: {}", sum_of_nums);
    println!("Product of these numbers: {}", product_of_nums);
    println!("Average of these numbers: {}", average_of_nums);
}

fn sum(numbers: &mut Vec<i64>) -> i64 {
    let mut total = 0;

    for num in numbers.iter() {
        total += num;
    }

    total
}

fn product(numbers: &mut Vec<i64>) -> i64 {
    let mut total = 1;

    for num in numbers.iter() {
        total *= num;
    }

    total
}

fn average(numbers: &mut Vec<i64>) -> i64 {
    let length = numbers.len() as i64;

    sum(numbers) / length
}
