'use strict';

var Box = React.createClass({ displayName: "Box",
  getInitialState: function getInitialState() {
    return { windowWidth: window.innerWidth };
  },

  handleResize: function handleResize(e) {
    this.setState({ windowWidth: window.innerWidth });
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function render() {
    return React.createElement("div", null, "Current window width: ", this.state.windowWidth);
  }
});

ReactDOM.render(React.createElement(Box, null), mountNode);

var Greeting = React.createClass({ displayName: "Greeting",
  render: function render() {
    return React.createElement("p", null, "Hello, Universe");
  }
});

ReactDOM.render(React.createElement(Greeting, null), document.getElementById('greeting-div'));
"use strict";

console.log("react");
"use strict";

var List = function List($__0) {
    var items = $__0.items;
    return React.createElement("ul", null, items.map(function (item) {
        return React.createElement("li", { key: item.id }, item.name);
    }));
};