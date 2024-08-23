fn main() {
    //! Type of elements in the array is i8 so on pop() Option<i8> is returned and hence Some(number)

    let mut numbers = vec![1, 2, 3, 4, 5];

    while let Some(number) = numbers.pop() {
        println!("Got: {}", number);
    }

}

#[cfg(test)]
mod tests {
    #[test]
    fn simple_option() {
        let target = "rustlings";
        let optional_target = Some(target);

        // !NOTE: Use this instead of a match statement if interested only in one value
        // ! and you do not want to handle all the cases in a match statement
        if let Some(word) = optional_target {
            assert_eq!(word, target);
        }
    }

    #[test]
    fn layered_option() {
        let range = 10;
        let mut optional_integers: Vec<Option<i8>> = vec![None];

        for i in 1..=range {
            optional_integers.push(Some(i));
        }

        let mut cursor = range;

        // !Vec::pop() adds another layer of Option.
        // !optional_integers is a Vec<Option<i8>> SO pop() returns Option<Option<i8>> and hence the e Some(Some(integer))
        while let Some(Some(integer)) = optional_integers.pop() {
            assert_eq!(integer, cursor);
            cursor -= 1;
        }

        assert_eq!(cursor, 0);
    }
}
