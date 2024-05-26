import { month } from "../anyList/month";
//cравнение дат для timestemp
const comparisonDate = (date1, date2) => {
  return new Date(date1 * 1000).toLocaleDateString() === date2;
};

//данные за период
const dataFromPeriod = (data, period) => {
  let dataList = [];
  if (period["year"]) {
    dataList = data.filter(
      (el) => new Date(el.date.seconds * 1000).getFullYear() === period["year"]
    );
  }
  if (period["month"] || period["month"] === 0) {
    dataList = data.filter(
      (el) => new Date(el.date.seconds * 1000).getMonth() === period["month"]
    );
  }
  if (period["lastDays"]) {
    const endDate = new Date();
    const startDate = new Date(
      endDate.getTime() - period["lastDays"] * 24 * 60 * 60 * 1000
    );
    dataList = data.filter(
      (el) =>
        new Date(el.date.seconds * 1000) >= startDate &&
        new Date(el.date.seconds * 1000) <= endDate
    );
  }
  return dataList;
};

//данные для вертикального графика
export const dataToVerticalBarChar = (data, period) => {
  if (data.length === 0) return [];
  let dataObj = {};
  const listData = dataFromPeriod(data, period);
  if (period["year"]) {
    month.forEach((label, index) => {
      dataObj[label] = listData.filter(
        (el) => new Date(el.date.seconds * 1000).getMonth() === index
      ).length;
    });
  }
  if (period["month"] || period["month"] === 0) {
    const currentDate = new Date();
    const currentDay =
      currentDate.getMonth() === period["month"]
        ? currentDate.getDate()
        : new Date(currentDate.getFullYear(), period["month"] + 1, 0).getDate();

    const matchDate = new Date(currentDate.getFullYear(), period["month"], 1);

    for (let index = 1; index <= currentDay; index++) {
      matchDate.setDate(index);
      dataObj[matchDate.toLocaleDateString()] = data.filter((el) =>
        comparisonDate(el.date.seconds, matchDate.toLocaleDateString())
      ).length;
    }
  }
  if (period["lastDays"]) {
    const currentDate = new Date();
    for (let index = period["lastDays"] - 1; index >= 0; index--) {
      const beforeDate = new Date(
        currentDate.getTime() - index * 24 * 60 * 60 * 1000
      ).toLocaleDateString();
      dataObj[beforeDate] = data.filter((el) =>
        comparisonDate(el.date.seconds, beforeDate)
      ).length;
    }
  }
  return [dataObj, listData.length];
};

//количество отзывов за период
export const absReviws = (data, period) => {
  if (data.length === 0) return;
  return dataFromPeriod(data, period).length;
};

//средняя оценка за период
export const absGrade = (data, period, findData = []) => {
  if (data.length && findData.length) return;
  const listData = findData.length ? findData : dataFromPeriod(data, period);
  return (
    listData.reduce((acc, el) => acc + el.grade, 0) / listData.length
  ).toFixed(1);
};

//данные для pie графика
export const dataToPieBarChar = (data, period) => {
  if (data.length === 0) return [];
  const listData = dataFromPeriod(data, period);

  let dataObj = {};
  for (let index = 1; index <= 5; index++) {
    dataObj[`Оценка ${index}`] = listData.filter(
      (el) => el.grade === index
    ).length;
  }
  return [dataObj, absGrade([], {}, listData)];
};
