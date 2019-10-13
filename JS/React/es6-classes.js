class Person{
    constructor(name='Anon', age=0) {
        this.name = name;
        this.age = age;
    }

    getGreeting(){
        return `hi, ${this.name}`; 
    }

    getDescription(){
        return `${this.name} is ${this.age} years(s) old.`; 
    }
}

class Student extends Person(){
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

    hasMajor(){
        // We do !! so that the resulting value is boolean not truthy or falsy
        return !!this.major;
    }
}

const me = new Person();