class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
          data: []
        }
      }
      
      componentDidMount(){
           this.fetchData();
      }
        
      fetchData = async () => {
          
        const response = await fetch("data/data.json");
        const newData = await response.json();
         
        this.setState({
          data: newData
        });
      }
      
      
      render(){
         return(React.createElement("div", null,
         React.createElement(Navbar),
         React.createElement(Home,{data:this.state.data}),
         React.createElement(About),
         React.createElement(Education,{data:this.state.data}),
         React.createElement(Experience, {data:this.state.data}),
         React.createElement(Skill,{data:this.state.data}),
         React.createElement(Portfolio,{data:this.state.data}),
         React.createElement(CvApplication)
         ));    
      }
}