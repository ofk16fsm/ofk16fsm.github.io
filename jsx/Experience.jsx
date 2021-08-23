class Experience extends React.Component{
    constructor(props){
        super(props);
    }

    listItemStyle = {
        overflow: "auto",
        height: "400px"
    }
    
    render(){
        return (React.createElement("section", {id: "experience", className: "container-fluid section" },
        React.createElement("h1", {className: "header"},"Experience",
        React.createElement("div", {className: "underline"})),
        React.createElement("div", {className: "list-group"}, this.props.data.map((work) => work.works.map((w, index) => (React.createElement("li", {key:index, className: "list-group-item border-1 p-3"},
        React.createElement("span", {className: "label label-default"}, w.location),
        React.createElement("h4", {className:"list-group-item-heading", style: {color: "navy"}},w.company),
        React.createElement("p", {className: "list-group-item-text", style: {float: "right", color: "darkred"}}, w.startDate + "-"+ w.endDate),
        React.createElement("p", {className: "list-group-item-text"}, w.position))))))));
    }
}