import React, { Component, Fragment } from "react";

import { Container, CssBaseline } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from 'axios';

import { Header } from "./Layouts";
import { BetTable } from "./Tables";
import { Paginator } from "./Paginators";

const theme = createMuiTheme();

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            tables_state: 'A',
            count: 0,
            limit: 10,
            offset: 0,
        }
    }

    async GetTables() {
        const url = process.env.REACT_APP_API_URL + '/bettables/';
        console.log(url);

        axios.get(url, {
            params: {
                state: this.state.tables_state,
                offset: this.state.offset,
            }
        })
            .then((res) => {
                this.setState({
                    tables: res.data.results,
                    count: res.data.count,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (event, value) =>{
        if(this.state.tables_state !== value) {
            this.setState({
                offset: 0,
                tables_state: value,
            }, () => {
                this.GetTables();
            });
        }
    };

    handleClick = (event, offset) =>{
        this.setState({
            offset: offset,
        }, () => {
            this.GetTables();
        });
    };

    componentDidMount() {
        this.GetTables();
    }

    render() {
        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header
                        value={this.state.tables_state}
                        onChange={this.handleChange}
                    />
                    <Container>
                        {this.state.tables.map((table) => {
                            return <BetTable key={table.id} table={table}/>
                        })}
                        <Paginator
                            limit={this.state.limit}
                            offset={this.state.offset}
                            count={this.state.count}
                            handleClick={this.handleClick}
                        />
                    </Container>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}
