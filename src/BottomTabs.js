import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Subway from '@material-ui/icons/Subway';
import Car from '@material-ui/icons/TimeToLeave';
import Walk from '@material-ui/icons/DirectionsWalk';
import Bike from '@material-ui/icons/DirectionsBike';
import { connect } from 'react-redux';


const styles = {
  root: {
    flexGrow: 1,
    // maxWidth: 200,
  },
};

class BottomTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <footer id = 'bottom-tabs'>
        <Paper square className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<Car />} />
            <Tab icon={<Subway />} />
            <Tab icon={<Walk />} />
            <Tab icon={<Bike />} />
          </Tabs>
        </Paper>
      </footer>
    );
  }
}

BottomTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomTabs);
