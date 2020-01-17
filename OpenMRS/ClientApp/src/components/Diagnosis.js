import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export class Diagnosis extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, diagnosisSummary: [] };
    }

    static displayName = Diagnosis.name;

    componentDidMount() {
        this.getDiagnosisSummary();
    }

    static renderBarChart(diagnosisSummary) {
        return (
            <BarChart width={1000} height={500} data={diagnosisSummary} barGap={2}
                margin={{ top: 5, right: 0, left: 20, bottom: 5 }} layout="vertical" barCategoryGap="10%">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis width={400} dataKey="diagnosis" type="category"/>
                <Tooltip contentStyle={{ textTransform: 'capitalize' }} />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <Bar dataKey="male" fill="#8884d8" />
                <Bar dataKey="female" fill="#82ca9d" />
                <Bar dataKey="total" fill="#ffc658" />
            </BarChart>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Diagnosis.renderBarChart(this.state.diagnosisSummary);

        return (
            <div>
                <h1 id="tabelLabel" >Patient Diagnosis Summary</h1>
                <p>This component demonstrates patient diagnosis summary by count of male and female patients.</p>
                {contents}
            </div>
        );
    }

    async getDiagnosisSummary() {
        const response = await fetch('diagnosissummary');
        const data = await response.json();
        this.setState({ diagnosisSummary: data, loading: false });
    }
}
