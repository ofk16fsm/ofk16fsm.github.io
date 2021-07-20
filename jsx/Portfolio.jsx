class Portfolio extends React.Component{
    constructor(props){
        super(props);
    }
    

    testFunc = function (){
      $('#demo').click(function(e){
          var nextTab = $('#myNavBar li').length;
          console.log(nextTab);
      })
    }
     
    
    render(){
        return (React.createElement("section", {id: "portfolio", className: "portfolio-center container-fluid section"},
        React.createElement("h1", {className: "header"}, "Portfolio",
        React.createElement("div", {className: "underline"})),
        React.createElement("div", {id:"accordion", className: "card-group"},
        this.props.data.map((items) => {
        const {projects} = items;
        return (
          projects.map((pr, index)=>{
          const {title, description, tech_stack, tool, path, url} = pr;
          return(React.createElement("div", {key:index, className: "card"},
            React.createElement("div", {className: "card-header"}, title),
            React.createElement("div", {id: "portfolio-body", className: "card-body"},
            React.createElement("div",{className: "portfolio-desc"}, description, React.createElement("br"), "Used tool", tool.split(',').length === 1 ? " is " + tool : "s are " + tool),
            React.createElement("div", {id:"btn-portfolio", className:"portfolio-btn"},
            tech_stack.split(',').map((t, index) => (
              React.createElement("a", {key:index,className:"btn btn-light disabled"}, t.toUpperCase())
              )))),
            React.createElement("div", {className:"card-footer"},
            path != null ? path.split(",").map((p, index) => (React.createElement("a", {key: index, id: "demo", onClick:this.testFunc, href: p, target: "_blank"}, React.createElement("i", {className: "fa fa-link"})))) : null,
            React.createElement("a", {href: url, target: "_blank"},
            React.createElement("i", {className: "fa fa-github-square"}))))
          )}))}))));
    }
}