# Notes

- *JS _class declarations_ are _not hoisted_, _function declarations_ are*
  - Class expression is another way of declaring classes. The name of a class can be accessed on the class's _name_ property
  and not the instances'.

      ```javascript
        //unnamed

          let Rectangle = class {
            constructor(height, width) {
              this.height = height;
              this.width = width;
            }
          };
          console.log(Rectangle.name);
          //output: "Rectangle"

          //named

          let Rectangle = class Rectangle2 {
            constructor(height, width) {
              this.height = height;
              this.width = width;
            }
          };
          console.log(Rectangle.name);
          //output: "Rectangle2"
      ```

  - [More on Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

  - _Static Methods_ - *static* keyword, can be called without instantiating classes and can't accessed through instance
    - best used for util functions of a class like [so](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Static_methods)

- A CSS reset makes sure all browsers start form the same place, style wise. every browser has its own default styles.

- JS *object destructuring* cna be used to assign the property to a varible

  ```javascript
  const person = {name: 'Rocky', age: 43, location: {city: 'Philly', sht: 'ADRIAN!!'}};
  const {city, sht: shout} = person.location;
  ```

  - default values can also be assigned. Below if name is not there in the obj for some reason 'Anonymous' will be used, just like with functions.

    ```javascript
    const {name='Anonymous', age} = person;
    ```

  - This can be done too

    ```javascript
    const {name: firstName = 'Anonymous', age} = person;
    ```

- With *array desstucturing* the array of variables can be pointed to items in the array by position

  ```javascript
  const address = ['1299 S Juniper Street', 'Ottawa', 'ON', 'K1R5Y9'];
  const [street, city, province, zip] = address; //valid
  const [, , province] = address. //valid
  const [, , , zip = 'XXXXX'] = address; //valid
  ```

- Controlled input menas the value is controlled by JS.

## Babel,React

- src/app.js

  - This file will contain JSX and stuff that babel will use to generate a browser compatible version(JavaScript XML)
  - The generated file will be in `public/scripts/app.js` since that is where we want the client side to have the changes we need
  - What Babel will do:

  ```javascript
  let template = <p>This is something</p>;
  let appRoot = document.getElementById("app");
  ```

  ```javascript
  //The above doesn't work, so we need to use Babel to use JSX. When using babel, template gets translated to:
  var template = React.createElement("p", null, "This is something");
  ```

  ```javascript
  let template = <p id="shalala">This is something</p>;
  let template = React.createElement(
    "p",
    { id: "shalala" },
    "This is something"
  );
  ```

- Babel CLI `babel src/app.js --out-file=public/scripts/app.js --presets=react,env --watch`

- `undefined, null, boolean` are ingnored by JSX, nothing will be rendered

- Conditions can be used to render elements as well `{age > 18 ? <p>lalalal<p>}`

- _class_ is _className_ in JSX, class is reserved

- JSX doesn't have built-in data binding, React Componnets help with that

- To see the REACT rerendering just the changed component, check dev tools, the changed component will flash and get re-rendered

- JS _&&_ operator, if the first val is truthy, that won't be used and second val used, if first value is falsy, that value will be used!

  - This concept is used by JSX for conditional rendering

- The _state_ of a React Component is an object, when changed, re-renders a Component

- Calls to _setState_ are async!

- React is a declatrative UI framework written in JS.

- `React.Component` subclass

  - Tells react what needs to be rendered.
    ex:

    ```javascript
    class ToDo extends React.Component{
      render(
        <div className="todo-list">
          <h1>Todo List for {this.props.name}</h1>
          <ul>
            <li>Tel</li>
            <li>Danda</li>
            <li>Kaante</li>
          </ul>
      </div>
      );
    }
    ```

  - Above, _ToDo_ is _React component type_ or _React component class_. It takes _props_ as parameters and returns _views_ in a particular hierarchy via _render_ method.

  - _render_ method returns _React Elements_ which React then takes and throws it on the screen to display. React Elements are written in JSX, which calls `React.createElement(<elementType>, <listOfProps>, <dataToBeRendered>)` ex: `React.createElement('h1', ,'Todo List For', props.name)`

  - Any JS expression can be used within `{}` in JSX. Each React Element is JS object, they can be assigned to a variable or passed around.

  - There are two types of data in React, props and states. _States_ are _private_, can be controlled by components while _props_ are _external_ and can't be controlled by components.

  - Each component has its own state and can change it accordingly while props are hierarchical, they are passed up or down or between components and can't be changed by components directly.

  - Props can be used to pass state around amongst child components and from parents to child components.

  - When trying to manage states amogst children, such that, multiple component children tlak to each other, its better to _Lift State Upwards into the parent_. This makes sure that the children and parent are always in sync.

  - When a child component gets its state change directives from its parent, its called a controlled component.

  - Instead of extending the React.Component class, if a component has just the render method, it can be replaced with a function the returns that component. This is called _functional component_

  - React uses the concept of DOM Virtaulization. Instead of redering the whole DOM, only the part of the DOM that has changed is rendered. The judgement is call is made by a diff algo.

  - React components mount to an element.

  - Render method is a _spec_, the only required onw for creating a component.

  - Lifecycle Methods:

    - _componentWillMount_ - invoked once, before rendering, on both client and server
    - _componentDidMount_ - invoked once, after rendering, only client
    - _shouldComponentUpdate_ - official doc, bad on performance
    - _componentWillUnmount_ - invoked before unmounting component

  - Specs:
    - _getInitialState_ - returns init state
    - _getDefaultProps_ - default props if no props supplied
    - _mixins_ - used to extend component fucntionality

- Data (Props) flow in React is unidirectional, from Parent to Child
  - Child components will get pros from the parent but they will have their own state
  - State management should be done by parent, children should only trigger (report) state change via _setState_
    - Basically any mutation to global state object should be handled by the parent

## Webpack

- Single `<script>` tag instead of multiple. Will contain app code and dependecy code.
- Solves the issue of clouding global object
- Helps with splitting front-end code into modules
- Webpack restart everytime change to config
- For letting webpack know that it has to use babel it has to be told that via the module object in the rules array as an object. See webpack.config.js for idea.
- Same is for styles. The `use` array can be used to specify multiple loaders

### Webpack [name].bundle.js how

- [Read up](https://webpack.js.org/configuration/output/#outputfilename)

### Source Maps

- Source maps help with debugging. Point to the exact file where the issue is instead of the minified file.

### Webpack dev-server

- The bundle that gets served up isn't the bundle.js file. The dev-server doesn't write the physical bundle.js file (slower), it does it all in memory so dev is responsive.

#### Class Properties

- _transform-class-properties_, [source and examples](http://babeljs.io/docs/en/babel-plugin-transform-class-properties/), is a babel plugin that allows us to add properties on the class. in short, arrow functions as opposed to class methods, with `this` bound to the class!!!

- Why we loose `this` binding:
  - So, after some digging around, I found that with ES6, the functions defined will, by default, have `this` as undefined. This is to prevent folks, like me, from mutating globals (JavaScript is forgiving, plus I have done that before). The `class` keyword is syntactic sugar, enforces the use of `new` while spawning children (subclasses) because it used to be possible to mutate the global object in previous versions. However, in ES6, when the class gets initialized `this` will be bound to that instance via the constructor. One thing to notice is the file that babel outputs to, it runs in strict mode that prevents `this` referring to the global (window) object, thereby, confirming my suspicion. [strict mode, `this` undefined, stackoverflow](https://stackoverflow.com/questions/9822561/why-is-this-in-an-anonymous-function-undefined-when-using-strict).

  Now, in context of React, `handleRemoveAll` is  a function that is that is the part of the sub class and not of the parent, hence, `this` is undefined. The `render` function is part of the parent class, hence, it knows whom `this` refers to because our subclass will be instantiated via the parents' constructor. On overloading the constructor we ensure that `this` is bound to the subclass that we have created.

  Also, classes or the code inside class syntactic boundary is executed in strict mode always and in strict mode functions will have `this` undefined

## React Router

- Used for multipage web apps, could be used for SPA's too using a different component.

- Components offered:
  - BrowserRouter - For client apps with flexible back-end APIs
  
  - HashRouter - For rigid backend APIs, server exactly knows what to do for reseource req
  
  - Link - for linking as with `<a>` tags but doesn't re-render the whole page, just updates URL and page chnages with ONLy those components that need to be rendered
  
  - NavLink - its a link with style options
  
  - Route - Component that renders other components if `path` matches enough. Can also haev exact path match. This is inclusive! Even though a path shall match still all children will be there
  
  - MemoryRouter - in memory route store, no URL mutation, good for headless browser states

  - Redirect - just like backend redirects

  - StaticRouter - used in SSR, render routes server-side while user isn't clicking around, url is not changing (static)

  - Switch - Unlike `<Route>` this is exclusive, at any time only that Route child will be present, that has been matched. DOM is not clouded!!

## Redux

- Solves global state managment problem when there is more than one component tree which are not related to each other but are a part of the app not rendered under the same parent component. Its a state conatiner just like class based components.

- The only time _props_ shouldn't be used is if the props are being passed down multiple children just so the last child can use it. Best practice is to use props so that all children can use it.

- Redux helps to create truly decoupled (truly reusable) components. Instead of talking to each orher or parent, the dialog is with the Redux Store.
  - Redux store is also an object just like Class Components. This may or may not contain state managment methods etc.

- Reducers define how an action will bring about change in state. Reducers determines WHAT to do when an action is dispatched.
  - Reducers are pure fucntions! No side effects, will have explicit `return`. Shouldn't interact with things out of its scope.
  - state or actions should never be mutated in a reducer, only read from.
- Splitting reducer into multiple reducers to handle the different attributes (root states) of `state` for easier management is a sane thing to do.

- Redux's `createStore` is called with the *currentState* of the app everytime and `action` is the second arg that dictates what kind of mutation a the state will go through.

## React-Redux

- Redux, with React provides a way to access the state store in a very unique way.
  - The `.connect()` method internally wraps a component that wants some of its children to have access to modifying the store in a Higher Order Component.
  - This helps in a way such that the store need not be pushed down all the components to reach the component that actually wants to modify the state, basically have access to dispatchers in the form of props.
  - When combining reducers using `combineReducers`, the reducers are available on an object when matching dispatches to props
    - For accessing the state property when doing `mapDispatchToProps`, the pieces of state handled by that reducer are can be accessed via `state.reducerName.stateProperty`

## General Notes

- If what style is being used is/overriden needs to be checked, use the small mouse icon in debugger, this will show the exact element in the dev tools.
  - As for what style is being applied the stuff on the right will give the details with and they are in the order of precedence
  - When a CSS property shows as struck-through, it means that the crossed-out style was applied, but then overridden by a more specific selector, a more local rule, or by a later property within the same rule.

- When trying to update state via the event object `e` either use assign the value to a variable or use `e.persist()` since `e.target.value` won't be available in the cb

  - ```javascript

    onNoteChange = (e) => {
    // const note = e.target.value;

    this.setState(() => ({ note: 'e.target.value' })); // would have to use e.persist()
  };```

- Calls to `this.setState` are queued. They are asynchronous and the change to state doesn't happen immediately. If changes need to verified or used instantly, supply a `callback` to `this.setState` where the change in state can be observed. This prevents weird race conditions. Plus this maybe why `componentWillMount` should be used carefully to prevent circular referernce (Not too sure about this).

- Component state shouldn't be too nested. React works well for states that are 1 level deep, i.e., state containing a few attributes that are objects but not object of objects. `this.setState` does a shallow merge of state to keep things fast and fluid. This causes problems if `state` is nested

- All calls to _setState_ are batched when inside an _event handler_, this is an optimization done by react

- Create React App, CRA, extracts all configuration away. This includes all .babelrc, .eslintrc etc. If access is needed to these config files, running `npm eject or yarn eject` will give access

- PureComponent vs Component
  - Differs how `shouldComponentUpdate` lifecycle method is expressed
  - Does a shallow compare of `props` and `state`, i.e., shall only check refernces if same or not, no containment, no member value check
  - If diff, will rerender or won't
  - Hence, if same props come in and the result is same when the same prop supplied, is a good use case for PureComponents
  - Nested states are a bad idea for these guys. There's a way to `forceUpdate` the component but that feels like fighting the framework

- Experiment --> Run Scenario of deep objects in redux
  - Redux is not great for nested objects, using MobX is a better idea

## React Hooks

  New API released with v16.8

### useState hook

- Allows use state within a functional component
- A call to useState, returns piece of state and a function to set the state value
- Can it be looked as it returning a getter and setter? The getter being invoked but useSatet, internally, and the setter to be called by you. [Discuss with Tony, Ali]

### useState vs setState

- Replaces the object, if called with an object while setState merges the object

### useEffect

- Like a replacement for lifecycle methods
- Do something when props change
  - If an non empty array is passed, useState will run the function provided only if that prop changes, `componentDidUpdate`
  - If an empty array is provided, then useState will fire only when the component renders, `componentDidMount`
  - If an empty array provided and a function is returned from the callback function passed to useState, it does some clean up action when the component unmounts, `componentDidUnmount`
  - If no arguments passed to useState, it will run every time state/props change

### useReducer

- useState uses useReducer internally
- useReducer takes a reducer and default state as args and returns state and a dispatcher

### Context API

- Functions like a Redux store

## Progressive Webapps

### manifest.json

### serviceWorkers

## Testing

- Jest can be run in `watch` mode like webpack. `--watch` is the switch.
  - If this is a script command in package.json, this can be run like this. `yarn run <testFile> -- --watch` (`run` can be ignored, its aliased by jest) the preceding `--` means everything before this is a part of `yarn` (for older versions, newer versions just forward it to scripts directly)
  - `expect.any()` good for testing the type of value but not the exact value. Eg: `id` chnages everytime a test runs

- Redux uses default action object, `{ type: '@@INIT' }`, snooping aroound redux dev tools helps. Reading the [source](https://github.com/reduxjs/redux/blob/55f1d08000b1b064eaa933bbbd132230e53bcccb/src/createStore.js#L242) confirms that redux uses reserved action types to initialize the state tree

- Snapshot Testing
  - `react-test-renderer` is a package that is used to write unit tests for components
  - Compares the component test against a snapshot. It will *always* pass the first time since its the first time the snapshot is created
    - if the snapshot changes and test fails, the snapshot can be updated with Jest on the command line
    - This lib is not as expressive so we opt for Enzyme. 3.x version requires to setup an adapter for the React version the project is using
  - When using `Enzyme` the snapshot generated constains a lot of information that is more realted to Enzyme itself thant the component we are testing with it. Hence, we setup a `serializer` to get around this problem. The lib used is `enzyme-to-json`
