// var Box = React.createClass({
//   getInitialState() {
//     return {windowWidth: window.innerWidth};
//   },

//   handleResize(e) {
//     this.setState({windowWidth: window.innerWidth});
//   },

//   componentDidMount() {
//     window.addEventListener('resize', this.handleResize);
//   },

//   componentWillUnmount() {
//     window.removeEventListener('resize', this.handleResize);
//   },

//   render() {
//     return <div>Current window width: {this.state.windowWidth}</div>;
//   }
// });

// ReactDOM.render(<Box />, mountNode);

// var Greeting = React.createClass({
//   render() {
//     return (
//       <p>Hello, Universe</p>
//     )
//   }
// });

// ReactDOM.render(<Greeting/>, document.getElementById('greeting-div'));
