var Box = React.createClass({displayName: "Box",
  getInitialState:function() {
    return {windowWidth: window.innerWidth};
  },

  handleResize:function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  componentDidMount:function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount:function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render:function() {
    return React.createElement("div", null, "Current window width: ", this.state.windowWidth);
  }
});

ReactDOM.render(React.createElement(Box, null), mountNode);


var Greeting = React.createClass({displayName: "Greeting",
  render:function() {
    return (
      React.createElement("p", null, "Hello, Universe")
    )
  }
});

ReactDOM.render(React.createElement(Greeting, null), document.getElementById('greeting-div'));

console.log("react");
let List = function($__0  ) {var items=$__0.items;
    return (
        React.createElement("ul", null, 
            items.map(function(item)  
                {return React.createElement("li", {key: item.id}, item.name);}
            )
        )
    );
}