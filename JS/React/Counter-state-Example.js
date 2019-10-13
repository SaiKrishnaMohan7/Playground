class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = props.count;
        this.countUp = this.countUp.bind(this);
        this.countDown = this.countDown.bind(this);
        this.counterReset = this.counterReset.bind(this);
    }

    componentDidMount() {
		// To work around illegal data
		try {
            const countStr = localStorage.getItem('count');
            const count = parseInt(countStr, 10);
	
			if(!isNaN(count))
				this.setState(() => ({count}));
		} catch (error) {
			
		}
    }

    componentDidUpdate(prevProps, prevState) {
		// Save to local storage only if diff exists
		if(prevState.count !== this.state.count){
			// Persistence
			localStorage.setItem('count', this.state.count);
		}
	}

    countUp(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
        // Changes obj but no re-render
        // Hence setState, takes previous state
        // this.state.count ++;
    }

    countDown(){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }

    counterReset(){
        this.setState(() => {
            // We don't care about prevState
            return {
                count: 0
            };
        });
    }
    render(){
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.countUp}>+1</button>
                <button onClick={this.countDown}>-1</button>
                <button onClick={this.counterReset}>reset</button>
            </div>
        );
    }
}

// default props for class components, same for fucntional components
Counter.defaultProps = {
    count: 0
};

ReactDOM.render(<Counter />, document.getElementById('root'));