import React from "react";
import Chart from "react-apexcharts";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import RestAPI from "services/api";

import { handleServerErrors } from "utils/errorHandler";

class PieChart extends React.Component {
  state = {
    data: [],
    series: [],

    options: {
      colors: [
        "#282c37",
        "#9baec8",
        "#d9e1e8",
        "#2b90d9",
        "#5ae2f2",
        "#4c4bb4",
        "#b49b0a",
        "#FF5733",
        "#FFE633",
        "#D4FF33",
        "#33FFA8",
        "#0CF3E1",
        "#0C56F3",
      ],
      chart: {
        width: 380,
        type: "pie",
      },
      fill: {
        colors: [
          "#282c37",
          "#9baec8",
          "#d9e1e8",
          "#2b90d9",
          "#5ae2f2",
          "#4c4bb4",
          "#b49b0a",
          "#FF5733",
          "#FFE633",
          "#D4FF33",
          "#33FFA8",
          "#0CF3E1",
          "#0C56F3",
        ],
      },

      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 50,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.pieChart()
        .then((response) => {
          let mydata = response.data.map((val) => val.keyword);
          let values = response.data.map((val) => val.weight);

          this.setState({
            isLoding: false,
            data: response.data,
            series: values,
            options: {
              ...this.state.options,
              labels: mydata,
            },
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }

  render() {
    return (
      <div id="chart">
        {this.state.isLoding ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : this.state.data.length ? (
          <>
            <div style={{ maxWidth: "560px", margin: "35px auto" }}>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="pie"
                width="400"
              />
            </div>
          </>
        ) : (
          <div className="text-center">
            <strong>No data available</strong>
          </div>
        )}
      </div>
    );
  }
}

export default PieChart;
