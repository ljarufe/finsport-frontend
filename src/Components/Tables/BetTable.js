import React, { Component, Fragment } from "react";
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Avatar,
} from "@material-ui/core";
import { deepOrange } from '@material-ui/core/colors';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import { withStyles } from '@material-ui/styles';

const styles = ({
    card: {
        marginTop: '10px',
        marginBottom: '10px',
        overflowX: 'auto',
    },
    avatar: {
        fontSize: '12px',
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
});

class HigherOrderComponent extends Component {
    FormatNumbers(number) {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2 });
    }

    GetMatch(row) {
        return (
            <Fragment>
                { row.match.local_team.name } - { row.match.visitor_team.name }
            </Fragment>
        );
    }

    GetLeague(row) {
        return (
            <Fragment>
                { row.match.local_team.league.country.name } - { row.match.local_team.league.name }
            </Fragment>
        );
    }

    GetIcon(state) {
        const iconMap = {
            lost: <TrendingDownIcon />,
            won: <TrendingUpIcon />,
            current: <PlayArrowIcon />,
            new: <HourglassFullIcon />,
        };

        return iconMap[state];
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {this.props.table.id}
                        </Avatar>
                    }
                    title={
                        <Typography color='textSecondary' variant='h6'>
                            {this.props.table.name}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            color={this.props.table.total_profit >= 0 ? 'primary' : 'secondary'}
                            variant='subtitle2'
                        >
                            Profit: S/. { this.FormatNumbers(this.props.table.total_profit) }
                        </Typography>
                    }
                />
                <CardContent>
                    <Table size="small">
                        <colgroup>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '40%'}}/>
                            <col style={{width: '30%'}}/>
                            <col style={{width: '30%'}}/>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '5%'}}/>
                            <col style={{width: '5%'}}/>
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell>Iter</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>League</TableCell>
                                <TableCell>Bet</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Factor</TableCell>
                                <TableCell>Profit</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.table.bet_rows.map((row) => {
                                return (
                                    <TableRow
                                        key={ row.id }
                                        hover={true}
                                        selected={ row.state === 'current' }
                                    >
                                        <TableCell>{ row.iteration + 1 }</TableCell>
                                        <TableCell>{ this.GetMatch(row) }</TableCell>
                                        <TableCell>
                                            <Moment format={"D MMM YYYY, h:mm a"}>
                                                { row.match.start_datetime }
                                            </Moment>
                                        </TableCell>
                                        <TableCell>{ this.GetLeague(row) }</TableCell>
                                        <TableCell align='right'>{ this.FormatNumbers(row.bet_amount) }</TableCell>
                                        <TableCell align='right'>{ this.FormatNumbers(row.inversion_amount) }</TableCell>
                                        <TableCell align='right'>{ this.FormatNumbers(row.match.draw_factor) }</TableCell>
                                        <TableCell align='right'>{ this.FormatNumbers(row.profit) }</TableCell>
                                        <TableCell>{ this.GetIcon(row.state) }</TableCell>
                                        <TableCell>{ row.match.local_score } - { row.match.visitor_score }</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    };
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
