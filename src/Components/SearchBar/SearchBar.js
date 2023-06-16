import React from "react";
import "./SearchBar.css";



class SearchBar extends React.Component {
    constructor(props) {
        super(props) ;
        this.state = {userSearchTerm: ' '};
            this.search = this.search.bind(this);
            this.handleTermChange = this.handleTermChange.bind(this);
        
    }

    search() {
        this.props.onSearch(this.state.userSearchTerm); {/*On prend le nom de la méthode dans le SearchBar, et non pas le nom de la valeur. */} 
    }
    handleTermChange(event) {
        this.setState({userSearchTerm: event.target.value});
    }

    render() {
        return(
            <div className="SearchBar">
     <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
     <button className="SearchButton" onClick={this.search}>SEARCH</button>
</div>
        );
    }
}

export default SearchBar;