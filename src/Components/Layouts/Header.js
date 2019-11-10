import React, { Component } from "react";

import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";

export default class extends Component {
    render() {
        return (
            <AppBar position={"static"}>
                <Toolbar variant={"dense"}>
                    <Tabs
                        value={this.props.value}
                        onChange={this.props.onChange}
                    >
                        <Tab label="Active" value='A' />
                        <Tab label="Finished" value='F' />
                    </Tabs>
                </Toolbar>
            </AppBar>
        );
    }
}
