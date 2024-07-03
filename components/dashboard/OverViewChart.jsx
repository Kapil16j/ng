"use client";

// components/OverViewChart.js
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const OverViewChart = () => {
  const chartSeries = [
    {
      name: "Earnings",
      data: [
        5500, 1500, 3500, 3800, 5000, 2000, 1700, 5000, 4800, 5100, 5500, 5700,
      ],
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 1920,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 28,
            },
          },
        },
      },
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 25,
            },
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 28,
            },
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 20,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
          yaxis: {
            tickAmount: 3,
            labels: {
              formatter: function (value) {
                return "$" + value;
              },
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 15,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
          yaxis: {
            tickAmount: 3,
            labels: {
              formatter: function (value) {
                return "$" + value;
              },
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 10,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
          yaxis: {
            tickAmount: 3,
            labels: {
              formatter: function (value) {
                return "$" + value;
              },
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              columnWidth: 7,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
          yaxis: {
            tickAmount: 3,
            labels: {
              formatter: function (value) {
                return "$" + value;
              },
              style: {
                fontFamily: "Inter,sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "#888",
              },
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontFamily: "Inter,sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          colors: "#888",
        },
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      colors: ["#ADFA1D"],
      opacity: 1,
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
        style: {
          fontFamily: "Inter,sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          colors: "#888",
        },
      },
    },
  };

  return (
    <div
      id="chart"
      className="w-full flex items-center justify-center lg:max-w-[654px] md:mx-auto"
    >
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width={654}
        height={352}
      />
    </div>
  );
};

export default OverViewChart;
