import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

class Search extends Component { 

  searchTextChanged = (e) => {
    var value = e.target.value
    this.props.handleChange(value)
  }

  render() {
    return(
        <TextField
          label="Search IMDB"
          fullWidth={true}
          onChange={this.searchTextChanged}
          InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                  <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
          }}
        />
    )
  }
}
export default Search;