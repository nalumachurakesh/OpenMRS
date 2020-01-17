import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Encounter } from './components/Encounter';
import { Diagnosis } from './components/Diagnosis';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Encounter} />
                <Route path='/Diagnosis' component={Diagnosis} />
            </Layout>
        );
    }
}
