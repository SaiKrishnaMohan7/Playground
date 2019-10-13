import {createStore} from 'redux';
// CHECK Notes


// Action generators fucntions that return action object
const actionGen = (type, payload = {}) => {
  switch (Object.keys(payload)) {
    case 'incrementBy':
      return {type, incrementBy: payload.incrementBy || 1};

    case 'decrementBy':
      return {type, decrementBy: payload.decrementBy || 1};

    case 'count':
      return {type, count: payload.count};

      default:
      return {type};
  }  
};

// Will be called once at the begining and then everytime there's a state change (whenever an action is dispatched)
const store = createStore((state={count: 0}, action) => {

  console.log('createStore Called!!');
  switch(action.type){
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy ? action.incrementBy : 1
      };

    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy ? action.decrementBy : 1
      };
    
    case 'RESET':
      return {
        count: 0
      };

    case 'SET':
      return {
        count: action.count
      };
    
    default:
      return state;
  }
});

// For watching state change use .subscribe
// Every time state chnages, this will be called
store.subscribe(() => {
  console.log(store.getState());
});

// Actions are objects that could be sent to the store to trigger state mutations
// via store.dipatch(action)
// type is is required in an action obj but one can slap on more properties

const actionIncrement = actionGen('INCREMENT', {incrementBy: 5});
const actionDecrement = actionGen('DECREMENT');
const reset = actionGen('RESET');

store.dispatch(actionIncrement);
// console.log('Increase count', store.getState());
// console.log('Decrease count', store.getState());

store.dispatch(actionGen('SET', {count: 78}));
// store.subscribe returns a fucntion which can be assigned and when called, unsubcribes
// from changes to store
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

unsubscribe();

store.dispatch(actionDecrement);
store.dispatch(reset);
// console.log('Reset count', store.getState());