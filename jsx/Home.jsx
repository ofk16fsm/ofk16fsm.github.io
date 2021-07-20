class Home extends React.Component{
  constructor(props){
      super(props);
      
  }
    
  render(){
    return (React.createElement("div", null, React.createElement("section", {id: "home", className: "header container-fluid section text-center"},
    React.createElement("img", {alt: "", className: "img-circle", src: "images/me.jpg"}),
    React.createElement("br"),
    React.createElement("p", {className: "summary"}, "I am a system developer and GIS student from IT systems development in geographical information systems specialising in GIS, Android, Web development. Well skilled in web development using various languages and tools like HTML5, CSS, JavaScript, Bootstrap and ReactJS. Also skilled for Android application development using Java and Kotlin. My portfolio will show a bit what I can do.")),
    // Contact
    React.createElement("footer", {id: "contact", className: "section text-center"},
    React.createElement("h1", {className: "header"}, "Get in touch",
    React.createElement("div", {className: "underline"})),
    React.createElement("div", {className: "container-fluid"},    
    React.createElement("div",{className: "row text-center contact-detail"},
    React.createElement("div",{className: "col column"},
    React.createElement("i", {style: {fontSize: "24px"}, className: "fa fa-phone"}), 
    React.createElement("a", {className: "phone", href: "callto:+46725482084", target: "_blank"}, "+46-(0)72-548-2084"),
    React.createElement("div",{className: "col column"},
    React.createElement("i", {style: {fontSize: "24px"}, className: "fa fa-envelope"}),
    React.createElement("a", {className: "mail", href: "mailto:ferhat.sevim86@gmail.com", target:"_blank"},"ferhat.sevim86@gmail.com"))))),
    React.createElement("div", {className: "profile"}, this.props.data.map((source) => source.profiles.map((item, index) => (React.createElement("a", { key: index, href: item.url, target:"_blank"}, 
    React.createElement("img", {alt: item.title, src: item.img})))))))));
  }        
}