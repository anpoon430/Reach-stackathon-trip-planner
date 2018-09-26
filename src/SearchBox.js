import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import { addMarker } from './Redux/markers';


const styles = theme => ({
  inputRoot: {
    color: 'white',
    width: '100%',
  },
  inputInput: {
    color: 'white',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
})

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state ={
      search: '',
    }

  }
  handleChange = search => {
    this.setState({
      search
    })
  }
  handleSelect = async search => {
    try {
      let res = await geocodeByAddress(search);
      console.log('RESULTS', res);
      let selected = await getLatLng(res[0]);
      this.props.addSelectedAsMarker(selected);
      console.log(selected);
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { classes, googlemap } = this.props;
    let options;
    // console.log('GOOGLE MAAPPP', googlemap);
    // if ( googlemap && googlemap.Map ){
    //   let viewPortInstance = new googlemap.Map(google.map);
    //   let viewPort = viewPortInstance.getBounds();
    //   options = {
    //     bounds: viewPort
    //   }
    // }
    return (
      <PlacesAutocomplete
        value = {this.state.search}
        onChange = {this.handleChange}
        onSelect = {this.handleSelect}
        classNames = {{autocompleteContainer: 'ac-container'}}
        // searchOptions = {options}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Input
                inputProps = {getInputProps({
                  placeholder: 'Search...',
                  className: 'location-search-input',
                })}
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';

                  const style = suggestion.active
                    ? { backgroundColor:  '#00897b', cursor: 'pointer', width: '255px'}
                    : { backgroundColor: '#33ab9f', cursor: 'pointer', color: 'white', width: '255px' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = ({map}) => ({
  googlemap: map.maps,
})

const mapDispatch = dispatch => ({
  addSelectedAsMarker(selected){
    dispatch(addMarker(selected));
  }
})

export default withStyles(styles)(connect(mapState, mapDispatch)(SearchBox));
