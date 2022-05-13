import React, { useMemo } from "react";

const _prepareData = (skills) => {

  // korak 1
  let obj = {};
  let maxNumber = 0;
  skills.forEach((item, index) => {

    let number = 0;
    if (obj[item.year]) {
      number = obj[item.year] + 1;
    } else {
      number = 1;
    }
    obj[item.year] = number;

    if (number > maxNumber) {
      maxNumber = number;
    }
  });


  // korak 2
  let arr = [];
  let years = Object.keys(obj);
  console.log(years)
  years.forEach((year) => {
    let number = obj[year];
    let percent = number / maxNumber;
    console.log("percent", number, maxNumber)
    arr.push({
      year: year,
      number: number,
      percent: percent,
    });
  });

  return arr;
};

const SkillsChart = (props) => {
  const data = _prepareData(props.skills);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Number of skills acquired</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.year}</td>
                  <td className="num-of-skill">
                    <div
                      className="chart-rectangle"
                      style={{
                        display: "inline-block",
                        height: "25px",
                        width: item.percent * 500 + "px",
                      }}
                    ></div>
                    <span>{item.number}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        { }
      </div>
    </>
  );
};

export default SkillsChart;
