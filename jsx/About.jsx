class About extends React.Component{
  constructor(props){
      super(props);
      
      }  
  
  render(){
    return (React.createElement("section", {id: "about", className: "container-fluid section text-center" },
    React.createElement("h1", {className: "header"}, "About me",
    React.createElement("div", {className: "underline"})),
    React.createElement("p", {className: "info text-center"}, "Hey! I'm ",
    React.createElement("strong", null, "Ferhat"), ". I was born and raised in Turkey. I moved to Uppsala, Sweden in 2003. I am father of two kids. I have studied IT Systems Development in Geographical Information Systems and keep writing my thesis."),
    React.createElement("p", {className: "info"}, "I love to learn about coding, new programming languages, tools and technologies. I am apprehensive and enjoy working together and planning. I also have a well-developed sense of language and would like to learn more languages. I am ready for new challenges there I can be able to use my experiences and skills to grow and continue with a company for moving forward.")));
  }        
}