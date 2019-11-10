import React, { Component } from "react";
import PropTypes from "prop-types";

import { Paper } from "@material-ui/core";
import Pagination from "material-ui-flat-pagination";
import { withStyles } from "@material-ui/styles";

const styles = ({
    paper: {
        marginTop: '10px',
        marginBottom: '10px',
        padding: '10px',
        paddingRight: '15px',
        textAlign: 'right',
    },
});

class HigherOrderComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Pagination
                    limit={this.props.limit}
                    offset={this.props.offset}
                    total={this.props.count}
                    onClick={this.props.handleClick}
                />
            </Paper>
        );
    }
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
