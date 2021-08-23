class Education extends React.Component{
    constructor(props){
        super(props);       
    }
    
    listItemStyle = {
        overflow: "auto",
        height: "460px"
    }

    render(){
        return(React.createElement("section", {id: "education", className: "container-fluid section" },
            React.createElement("h1", {className: "header"},"Education",
            React.createElement("div", {className: "underline"})),
            React.createElement("div", {className: "list-group", style:this.listItemStyle}, this.props.data.map((education) => education.educations.map((edu, index) => (React.createElement("li", {key:index, className: "list-group-item border-1 p-3"},
            React.createElement("span", {className: "label label-default", style:{float: "right", backgroundColor: "navy", color: "beige"}}, edu.location),
            React.createElement("h4", {className:"list-group-item-heading", style: {color: "navy"}},edu.institution),
            React.createElement("p", {className: "list-group-item-text", style: {float: "right", color: "darkred"}}, edu.startDate + "-"+ edu.endDate),
            React.createElement("p", {className: "list-group-item-text", style:{color: "darkred"}, width:"5px"}, edu.course == "" ? edu.program : edu.course),
            React.createElement("ul",{className: "list-group-item edu-desc"}, React.createElement("i", {className: "fa fa-angle-double-right", style: {color: "darkgrey"}}," " + edu.description))))))))
        );
    }
}