
fn call_me(num: usize) { // fn args should  always be annotated; usize means let the complier decide if running on a 32 bit machine or 64 bit machine
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}

fn main() {
    call_me(3);
}
