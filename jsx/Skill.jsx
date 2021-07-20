class Skill extends React.Component{
    constructor(props){
        super(props);
    }

    capitalize(inputString){
        if(inputString == null){
            return "There is no text";
        }
        else{
            return inputString.charAt(0).toUpperCase() + inputString.slice(1);
        }
    }

    listItemStyle = {
        overflow: "auto",
        height: "442px"
    }

    keywordBtnStyle =  {
        backgroundColor: "mintcream",
        color: "navy",
        marginInline: "2px",
        marginBottom: "2px"
    };

    render(){
        return (React.createElement("section", {id: "skill", className: "container-fluid section" },
        React.createElement("h1", {className: "header"},"Skill",
        React.createElement("div", {className: "underline", style:{width: "2rem"}})),
        React.createElement("ul",{className:"list-group", style:this.listItemStyle},
        this.props.data.map((skill) => skill.skills.map((skillList, index) => (React.createElement("li",{key: index, className:"list-group-item border-0 p-2"},
        React.createElement("span", {style:{color: "navy"}}, this.capitalize(skillList.category)),
        React.createElement("br"),
        skillList.keywords.map((keys, index) => (React.createElement("a", {key: index, className:"btn btn-info disabled", role: "button", style: this.keywordBtnStyle}, keys))))))))));
    }
}