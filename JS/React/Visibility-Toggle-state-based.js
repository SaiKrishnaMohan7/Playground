class VisibilityToggle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility(){
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            };
        });
    }

    render(){
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.toggleVisibility}>
                    {this.state.visible ? 'Hide Details' : 'Show Details'}
                </button>
                {
                    this.state.visible && (
                    <div>
                        <p>This can be toggled</p>
                    </div>
                )
                }
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('root'));