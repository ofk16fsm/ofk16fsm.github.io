class CvApplication extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        // Tab 7 Resume 
        return(React.createElement("section", {id: "cv", className: "portfolio-center container-fluid section text-center"},
            React.createElement("h1", {className: "header"}, "CV",
            React.createElement("div", {className: "underline"})),
            React.createElement("div", {className: "cv"},
            React.createElement("iframe", {src:"data/cv.pdf", type:"application/pdf",frameBorder: "0", scrolling:"auto", height: "600px", width: "800px"}))));
    }
}