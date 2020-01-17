import React, { Component } from 'react';
import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    AreaChart, Area
} from 'recharts';

export class Encounter extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, encounterSummary: [] };
    }

    static displayName = Encounter.name;

    componentDidMount() {
        this.getEncounterSummary();
    }

    static renderBarChart(encounterSummary) {
        return (
            <BarChart width={1000} height={500} data={encounterSummary}
                margin={{ top: 5, right: 0, left: 20, bottom: 5 }} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="description" />
                <YAxis />
                <Tooltip contentStyle={{ textTransform: 'capitalize' }} />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <Bar dataKey="male" stackId="a" fill="#8884d8" />
                <Bar dataKey="female" stackId="a" fill="#82ca9d" />
            </BarChart>
        );
    }

    render() {

        let areaChartContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Encounter.renderBarChart(this.state.encounterSummary);

        return (
            <div>
                <h1 id="tabelLabel" >Patient Encounter Summary</h1>
                <p>This component demonstrates patient Encounter summary by count of male and female patients.</p>
                <div>
                    {areaChartContents}
                </div>
            </div>
        );
    }

    async getEncounterSummary() {
        const response = await fetch('encounterSummary');
        const data = await response.json();
        this.setState({ encounterSummary: data, loading: false });
    }
}
