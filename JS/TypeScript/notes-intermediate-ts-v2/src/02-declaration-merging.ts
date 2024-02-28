//* Declaration merging

//? Type
interface Fruit {
  //      ^?
  name: string;
  mass: number;
  color: string;
}

const banana: Fruit = {
  //    ^?
  name: "banana",
  color: "yellow",
  mass: 183,
};

//? Value
function Fruit(kind: string) {
  switch (kind) {
    case "banana":
      return banana;
    default:
      throw new Error(`fruit type ${kind} not supported`);
  }
}

//? Namespace
namespace Fruit {
  //         ^?
  function createBanana(): Fruit {
    //                          ^?
    return Fruit("banana");
    //           ^?
  }
}

//* How to tell what's on an indentifier

const is_a_value = 4;
type is_a_type = {};
namespace is_a_namespace {
  const foo = 17;
}

// how to test for a (value | namespace): A value can be assigned to a variable, since a namespace can be assinged, it is a value.
const x = is_a_value; // the value position (RHS of =).
// //           ^?

// how to test for a type
const z: is_a_type = {}; // the type position (LHS of =).
//         ^?
// how to test for a namespace (hover over is_a_namespace symbol)
is_a_namespace;

const x_2 = is_a_type; //! Wrong position for type; a type can't be assined as to a var, indicating that it is a type
const x_3 = is_a_namespace; //✔️ Namespace can be used as a value
// how to test for a type
const y: is_a_value = {}; //! Wrong position for value
const yy: is_a_namespace = {}; // ✔️ Namespace can't be used as a type

//* What's the point of `namespace`?

// a `fetch` kind of function
// @ts-ignore
$.ajax({
  url: "/api/getWeather",
  data: {
    zipcode: 97201,
  },
  success: function (result) {
    // @ts-ignore
    $("#weather-temp")[0].innerHTML = "<strong>" + result + "</strong> degrees";
  },
});
// a `document.querySelectorAll` kind of function
// @ts-ignore
$("h1.title").forEach((node) => {
  node.tagName; // "h1"
  //    ^?
});

// A namespace can be used to group related code under the same name
// Good for large codebases
function $(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector);
}
namespace $ {
  export function ajax(arg: {
    url: string;
    data: any;
    success: (response: any) => void;
    error: (error: Error) => void;
  }): Promise<any> {
    return Promise.resolve();
  }
}

//* A look back on classes

// how to test for a value
const valueTest = Fruit; // Fruit is a value!
valueTest.createBanana;

// how to test for a type
let typeTest: Fruit = {} as any; // Fruit is a type!
typeTest.color;

/**/
export { banana, Fruit }; //! declaration merging! Fruit is an interface, a function and a namespace!
