// This file is the JSX version of the Decsion Issues app
// The same can be accomplished via React Components

const appObj = {
    title: 'Decision Issues',
    subTitle: 'Millenials! Let Computers make your decisions',
    options: []
};

// This fucntion handles form submit, it is referenced in JSX, not called. If called it will end up using the returned value
const onFormSubmit = (e) => {
    e.preventDefault();

    let option = e.target.elements.option.value;

    if(option){
        appObj.options.push(option);
        e.target.elements.option.value = '';
        renderFunction();
    }
};

const removeAll = () => {
    appObj.options = [];
    renderFunction();
};

const makeDecision = () => {
    const randomNum = Math.floor(Math.random() * appObj.options.length);
    const option = appObj.options[randomNum];
    alert(option);
};

const renderFunction = () => {

    const template = ( 
        <div>
            <h1>{appObj.title}</h1>
            {appObj.subTitle && <p>{appObj.subTitle}</p>}
            <p>{appObj.options.length > 0 ? 'Your options' : 'No options'}</p>
            <button onClick={makeDecision} disabled={appObj.options.length === 0}>What's to be done</button>
            <button onClick={removeAll}>Remove All</button>
            <ol>
                {appObj.options.map((option) => <li key={option}>{option}</li>)}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input id="optionText" type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );

    const appRoot = document.getElementById('root');
    ReactDOM.render(template, appRoot);
}

renderFunction();