import { FunctionComponent } from "react";
import { Doughnut } from 'react-chartjs-2';
import Theme from '../../../../styles/Theme';

const data = {
	labels: [
		'Online',
		'Away',
		'Offline'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
            Theme.palette.background.light,
            Theme.palette.background.dark,
            Theme.palette.grey[600]
        ],
        hoverBackgroundColor: [
            Theme.palette.background.light,
            Theme.palette.background.dark,
            Theme.palette.grey[600]
        ]
	}]
};

const AuthenticationDoughnutChart: FunctionComponent = () => {
    return (
        <Doughnut 
            data={data}
        />
    )
}

export default AuthenticationDoughnutChart;