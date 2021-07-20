class Index extends React.Component{
  constructor(props){
    super(props);
 
  }

  render(){
     return(React.createElement(App));    
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Index), domContainer);