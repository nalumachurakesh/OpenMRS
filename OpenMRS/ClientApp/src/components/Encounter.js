import React, { Component } from 'react';
import {
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

    static renderAreaChart(encounterSummary) {
        return (
            <AreaChart width={1100} height={400} data={encounterSummary}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="description" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type='monotone' dataKey='male' stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='female' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            </AreaChart>
        );
    }

    render() {

        let areaChartContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Encounter.renderAreaChart(this.state.encounterSummary);

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
