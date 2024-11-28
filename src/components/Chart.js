import React, { useState, useEffect } from "react";
import "./Chart.css";

const Chart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const url = "https://rcslabs.ru/ttrp1.json";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      // console.log(result) // Отладка
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <div className="chart-container">Загрузка...</div>;
  }

  const calculateSum = (instance) => 
    instance.front + instance.back + instance.db;

  // Суммы значений
  const devSum = calculateSum(data.dev);
  const testSum = calculateSum(data.test);
  const prodSum = calculateSum(data.prod);

  // Просчитываем разницу между инстансами
  const differenceDevToTest = testSum - devSum;
  const differenceTestToProd = prodSum - testSum;

  // Максимальная высота столбика в пикселях
  const maxHeight = 300;
  const maxValue = Math.max(devSum, testSum, prodSum, data.norm);
  const calculateHeight = (value) => (value / maxValue) * maxHeight;

  return (
    <div className="chart-container">
      <p>Количество пройденных тестов "{data.title}"</p>
      <div className="chart">

        {/* Столбик Dev */}
        <div className="column">
          <div className="stack">
            <div
              className="segment front"
              style={{ height: `${calculateHeight(data.dev.front)}px` }}
            >
              {data.dev.front}
            </div>
            <div
              className="segment back"
              style={{ height: `${calculateHeight(data.dev.back)}px` }}
            >
              {data.dev.back}
            </div>
            <div
              className="segment db"
              style={{ height: `${calculateHeight(data.dev.db)}px` }}
            >
              {data.dev.db}
            </div>
          </div>
          <div className="label">dev</div>
        </div>

          {/* Разница между dev и test */}
        <div>
          <p><i className="arrow right"></i></p>
          <div className="difference-container">
            <div className={`difference ${differenceDevToTest === 0 ? "zero" : differenceDevToTest > 0 ? "up" : "down"}`}>
              {differenceDevToTest === 0 ? "" : differenceDevToTest > 0 ? "+" : ""}
              {differenceDevToTest}
            </div>
          </div>
        </div>
        
        {/* Столбик Test */}
        <div className="column">
          <div className="stack">
            <div
              className="segment front"
              style={{ height: `${calculateHeight(data.test.front)}px` }}
            >
              {data.test.front}
            </div>
            <div
              className="segment back"
              style={{ height: `${calculateHeight(data.test.back)}px` }}
            >
              {data.test.back}
            </div>
            <div
              className="segment db"
              style={{ height: `${calculateHeight(data.test.db)}px` }}
            >
              {data.test.db}
            </div>
          </div>
          <div className="label">test</div>
        </div>

        {/* Разница между test и prod */}
        <div>
          <p><i className="arrow right"></i></p>
          <div className="difference-container">
          <div className={`difference ${differenceTestToProd === 0 ? "zero" : differenceTestToProd > 0 ? "up" : "down"}`}>
              {differenceTestToProd === 0 ? "" : differenceTestToProd > 0 ? "+" : ""}
              {differenceTestToProd}
            </div>
          </div>
        </div>

        {/* Столбик Prod */}
        <div className="column">
          <div className="stack">
            <div
              className="segment front"
              style={{ height: `${calculateHeight(data.prod.front)}px` }}
            >
              {data.prod.front}
            </div>
            <div
              className="segment back"
              style={{ height: `${calculateHeight(data.prod.back)}px` }}
            >
              {data.prod.back}
            </div>
            <div
              className="segment db"
              style={{ height: `${calculateHeight(data.prod.db)}px` }}
            >
              {data.prod.db}
            </div>
          </div>
          <div className="label">prod</div>
        </div>

        {/* Столбик Norm */}
        <div className="column">
          <div
            className="stack norm"
            style={{ height: `${calculateHeight(data.norm)}px` }}
          >
            <div className="norm-value">{data.norm}</div>
          </div>
          <div className="label">норматив</div>
        </div>
      </div>

      {/* Легенды */}
      <div className="legend">
        <div>
          <span className="legend-box front"></span> Клиентская часть
        </div>
        <div>
          <span className="legend-box back"></span> Серверная часть
        </div>
        <div>
          <span className="legend-box db"></span> База данных
        </div>
      </div>
    </div>
  );
};

export default Chart;
