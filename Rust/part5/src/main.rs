fn main() {
    let numbers = vec![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

    let (sum_of_nums, numbers2) = sum(numbers); // We could name the return values as numbers, that'll work and it will shadow the previous numbers whihch is now not accessible; makes the code unreadbale
    let (product_of_nums, numbers3) = product(numbers2); // numbers.clone() as naive workaround, not good for performance as a new clone needs to be made in memory
    let average_of_nums = average(numbers3); // numbers.clone() as naive workaround, not good for performance as a new clone needs to be made in memory

    println!("Sum of these numbers: {}", sum_of_nums);
    println!("Product of these numbers: {}", product_of_nums);
    println!("Average of these numbers: {}", average_of_nums);
}

fn sum(numbers: Vec<i64>) -> (i64, Vec<i64>) {
    let mut total = 0;

    for num in numbers.iter() {
        total += num;
    }

    return (total, numbers);
}

fn product(numbers: Vec<i64>) -> (i64, Vec<i64>) {
    let mut total = 1;

    for num in numbers.iter() {
        total *= num;
    }

    return (total, numbers);
}

fn average(numbers: Vec<i64>) -> i64 {
    let length = numbers.len() as i64;

    sum(numbers).0 / length
}
