class Navbar extends React.Component{
  constructor(props){
      super(props);
      
      }
  
  render(){
    return (React.createElement("div", {className: "container"},
    React.createElement("nav", {className: "navbar  navbar-expand-md bg-dark navbar-dark fixed-top"},
    React.createElement("a", {className: "navbar-brand", style:{color: "khaki"}, href: "#"}, "Ferhat Sevim"),       
    React.createElement("button", {type: "button", className: "navbar-toggler", "data-bs-toggle": "collapse", "data-bs-target": "#myNavbar"},
    React.createElement("span", {className: "navbar-toggler-icon btn-close"})),
    
    React.createElement("div", {className: "collapse navbar-collapse", id: "myNavbar"}, 
    React.createElement("ul", {className: "navbar-nav"}, 
    React.createElement("li",{className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#home"}, "Home")), 
    React.createElement("li", {className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#about"}, "About me")),
    React.createElement("li", {className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#education"}, "Education")),
    React.createElement("li", {className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#experience"}, "Experience")),
    React.createElement("li", {className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#skill"}, "Skill")),   
    React.createElement("li", {className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#portfolio"}, "Portfolio")),
    React.createElement("li", {className: "nav-item"}, React.createElement("a", {className: "nav-link", href: "#cv"}, "CV")))))));
  }        
}