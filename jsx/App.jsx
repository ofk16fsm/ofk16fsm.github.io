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
          
        const response = await fetch("data/cv.json");
        const newData = await response.json();
         
        this.setState({
          data: newData
        });
      }
      
      
      render(){
         return(React.createElement("div", {},
         React.createElement(Navbar),
         
         React.createElement(Home,{data:this.state.data}),
         React.createElement("hr", {style: {height: "2px", color: "navy", backgroundColor: "navy"}}),
         React.createElement(About),
         React.createElement("hr", {style: {height: "2px", color: "navy", backgroundColor: "navy"}}),
         React.createElement(Education,{data:this.state.data}),
         React.createElement("hr", {style: {height: "2px", color: "navy", backgroundColor: "navy"}}),
         React.createElement(Experience, {data:this.state.data}),
         React.createElement("hr", {style: {height: "2px", color: "navy", backgroundColor: "navy"}}),
         React.createElement(Skill,{data:this.state.data}),
         React.createElement("hr", {style: {height: "2px", color: "navy", backgroundColor: "navy"}}),
         React.createElement(Portfolio,{data:this.state.data}),
         React.createElement("hr", {style: {height: "2px", color: "navy", backgroundColor: "navy"}}),
         React.createElement(CvApplication)
         ));    
      }
}