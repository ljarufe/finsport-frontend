import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import {Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const styles = ({
    card: {
        marginTop: '10px',
    },
});

class HigherOrderComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>Tables</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>S/. {this.props.total}</TableCell>
                                <TableCell>{this.props.count}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
