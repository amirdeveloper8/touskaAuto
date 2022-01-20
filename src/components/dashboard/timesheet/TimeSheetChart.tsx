// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";

import { typeCharts } from "./TimeSheetForm";

const TimeSheetChart: React.FC<{ chartValue: typeCharts[] }> = (props) => {
  let data = [
    {
      id: "",
      label: "",
      value: 0,
      color: "",
    },
  ];
  const { chartValue } = props;

  //   let value = [];
  // data = chartValue.map((item, index) => {
  //     id: item.title,
  //     label: item.category;
  //     data[index].value = +item.spend_time;
  //     data[index].color = "#883676";
  //   });

  console.log("chartValue", chartValue);
  //   const data = props.chartValue.map((item) => {
  //     id: item.title,
  //     label: item.category,
  //     value: item.spend_time,
  //     color: `hsl(${Math.random}, 70%, 50%)`,
  //   });

  for (let i = 0; i < chartValue.length; i++) {
    data[i] = {
      id: `${chartValue[i].title}${i + 1}`,
      label: `${chartValue[i].category}${i + 1}`,
      value: +chartValue[i].spend_time,
      color: `hsl(${(Math.random() * 1000).toFixed(0)}, 70%, 50%)`,
    };
  }

  console.log("data", data);
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TimeSheetChart;
