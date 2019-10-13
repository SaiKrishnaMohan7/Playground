import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ADD_EXPENSE
const addExpense = (
	{
	description = '',
	note = '',
	amount = 0,
	createdAt = 0
} = {}
) => {
	return {
		type: 'ADD_EXPENSE',
		expense: {
			id: uuid(),
			description,
			note,
			amount,
			createdAt
		}
	}
};

// REMOVE_EXPENSE
const removeExpense = (id) => {
	if(!id || typeof(id) !== 'string'){
		throw new Error('id should be defined and should be a string');
	}

	return {
		type: 'REMOVE_EXPENSE',
		id
	}
};

// EDIT_EXPENSE
const editExpense = (id, updates) => {
	return {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
};

// SET_TEXT_FILTER
const setTextFilter = (text = '') => {
		return {type: 'SET_TEXT_FILTER', text};
	};

// SORT_BY_AMOUNT
const sortByAmount = () => {
	return {
		type: 'SORT_BY_AMOUNT'
	};
};

// SORT_BY_DATE
const sortByDate = () => {
	return {
		type: 'SORT_BY_DATE'
	};
};

// SET_START_DATE
const setStartDate = (startDate = undefined) => {
	return {
		type: 'SET_START_DATE',
		startDate
	};
};

// SET_END_DATE
const setEndDate = (endDate = undefined) => {
	return {
		type: 'SET_START_DATE',
		endDate
	};
};

// Expenses Reducer
const expensesReducerDefault = [];
const expensesReducer = (state = expensesReducerDefault, action) => {
    switch (action.type) {
				case 'ADD_EXPENSE':
				// ... spread operator works like .concat()
					return [...state, action.expense];

				case 'REMOVE_EXPENSE':
					return state.filter((expenseObj) => {
						return expenseObj.id !== action.id;
					});

				case 'EDIT_EXPENSE':
					return state.map((expense) => {
						if(expense.id === action.id){
							// update expense obj with a new obj that has attrs updated with attrs from updates obj
							return { ...expense, ...action.updates};
						}else {
							return expense;
						}
					});

        default: return state;
    }
};

// Filters Reducer
const filtersReducerDefault = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefault, action) => {
    switch (action.type) {
				case 'SET_TEXT_FILTER':
					return {
						...state,
						text: action.text
					};

				case 'SORT_BY_AMOUNT':
					return {...state, sortBy: 'amount' };

				case 'SORT_BY_DATE':
					return {...state, sortBy: 'date'};

				case 'SET_START_DATE':
					return {...state, startDate: action.startDate};

				case 'SET_END_DATE':
					return {...state, endDate: action.setEndDate};

        default: return state;
    }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof(startDate) !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof(endDate) !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((expenseOne, expenseTwo) => {
		switch (sortBy) {
			case 'date':
				return expenseOne.createdAt < expenseTwo.createdAt ? 1 : -1;
			
			case 'amount':
				return expenseOne.amount < expenseTwo.amount ? 1 : -1;
			
			default:
				break;
		}
	});
};

// Store Creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

// .dispatch() returns action obj so it can be assigned
const expOne = store.dispatch(addExpense({description: 'Rent', amount: 10000, createdAt: 1000}));
const expTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense(expOne.expense.id));
// store.dispatch(editExpense(expTwo.expense.id, {amount: 400}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(175));

const demoState = {
    expenses: [{
        id: 'test',
        description: 'January Rent',
        note: 'Final Payment',
        amount: 58700,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};