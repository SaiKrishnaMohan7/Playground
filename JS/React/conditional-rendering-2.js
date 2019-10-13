// All these files will require a html to go with
const appObj = {
    hOne: 'Visibility Toggle',
    p: 'Somethings hidden'
};
var visible = false;

const onButtonClick = () => {
    visible = !visible;
    render();
};

const render = () => {
    const template = (
        <div>
            <h1>{appObj.hOne}</h1>
            <button onClick={onButtonClick}>{visible ? 'Hide Details' : 'Show Details'}</button>
            {visible && (
                <p>{appObj.p }</p>
            )}
        </div>
    );

    const appRoot = document.getElementById('root');
    ReactDOM.render(template, appRoot);
};

render();