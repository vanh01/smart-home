import React from "react";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
    CategoryScale,
    Chart,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Title);
Chart.register(Tooltip);
Chart.register(Legend);

const ActivityLog = ({ account }) => {
    let [device, setDevice] = useState(0);
    let allData = [];

    let [xValue1, setxValue1] = useState([]);
    let [xValue2, setxValue2] = useState([]);
    let [yValue1, setYValue1] = useState([]);
    let [yValue2, setYValue2] = useState([]);

    let [startDate, setStartDate] = useState(new Date("2022-04-01"));
    let [endDate, setEndDate] = useState(new Date("2022-04-20"));
    // let endDate = new Date("2022-03-14")

    const getData = async (typeDevice) => {
        await fetch(
            `https://localhost:5001/api/log/${account.privatekey}/getAllLogs?name=1`
        )
            .then((res) => res.json())
            .then((json) => {
                allData = json;
                allData.sort((a, b) =>
                    new Date(formatDate(a.time)) > new Date(formatDate(b.time))
                        ? 1
                        : -1
                );
                takeData(typeDevice);
                fillData(
                    device,
                    startDate,
                    endDate,
                    label1,
                    label2,
                    data1,
                    data2,
                    setxValue1,
                    setxValue2,
                    setYValue1,
                    setYValue2
                );
            });
        console.log(allData);
    };

    let label1 = [];
    let label2 = [];
    let data1 = [];
    let data2 = [];
    const takeData = (typeDevice) => {
        let tempLog = [];
        let tempLog2 = [];
        console.log("type:", typeDevice);
        switch (typeDevice) {
            case 0:
                tempLog = allData.filter(data => data.id === '1')
                data1 = tempLog.map(data => {
                    if (data.value === 'led-on')
                        return 1
                    else return 0
                })
                data2 = tempLog.map(data => {
                    switch (data.agent) {
                        case "light":
                            return "Cảm biến ánh sáng"
                        case "sound":
                            return "Cảm biến âm thanh"
                        case "switch":
                            return "Công tắc"
                        case "web":
                            return "Trang web"
                        default:
                    }
                    return ""
                })
                break
            case 1:
                tempLog = allData.filter((data) => data.id === "3");
                data1 = tempLog.map((data) => {
                    if (data.value === "speaker-on") return 1;
                    else return 0;
                });
                break;
            case 2:
                tempLog = allData.filter(data => data.id === '2')
                data1 = tempLog.map(data => {
                    if (data.value === 'air-on')
                        return 1
                    else return 0
                })
                data2 = tempLog.map(data => {
                    switch (data.agent) {
                        case "temp":
                            return "Cảm biến nhiệt độ"
                        case "switch":
                            return "Công tắc"
                        case "web":
                            return "Trang web"
                        default:
                    }
                    return ""
                })
                break
            case 3:
                tempLog = allData.filter((data) => data.id === "5");
                data1 = tempLog.map((data) => data.value);
                break;
            case 4:
                tempLog = allData.filter((data) => data.id === "4");
                data1 = tempLog.map((data) => data.value);
                break;
            case 5:
                tempLog = allData.filter((data) => data.id === "8");
                data1 = tempLog.map((data) => data.value);
                break;

            default:
                tempLog = allData.filter((data) => data.id === "6");
                data1 = tempLog.map((data) => data.value);
                tempLog2 = allData.filter((data) => data.id === "7");
                data2 = tempLog2.map((data) => data.value);
                break;
        }
        label1 = tempLog.map((data) => {
            return formatDate(data.time);
        });
        label2 = tempLog2.map((data) => {
            return formatDate(data.time);
        });
    };

    useEffect(() => {
        getData(device);
    }, [startDate, endDate, device]);

    function showDevice(e) {
        let select = document.querySelectorAll(".device__option");
        select.forEach((element) => {
            element.classList.toggle("device__option--show");
        });
    }
    function selectDevice(e) {
        let show = document.querySelector(".device__select");
        let select = e.target.innerText;
        show.innerText = select;
        if (select.indexOf("Đèn") !== -1) {
            setDevice(0);
        } else if (select.indexOf("Loa") !== -1) {
            setDevice(1);
        } else if (select.indexOf("Điều hòa") !== -1) {
            setDevice(2);
        } else if (select.indexOf("sáng") !== -1) {
            setDevice(3);
        } else if (select.indexOf("âm") !== -1) {
            setDevice(4);
        } else if (select.indexOf("gas") !== -1) {
            setDevice(5);
        } else if (select.indexOf("DHT11") !== -1) {
            setDevice(6);
        }
        showDevice();
    }

    return (
        <div className="activity-log">
            <div className="activity__button">
                <h5> Thiết bị: </h5>
                <ul className="device__select-box">
                    <li className="device__select" onClick={showDevice}>
                        {" "}
                        Đèn
                    </li>
                    <div className="device__option-list">
                        <li className="device__option" onClick={selectDevice}>
                            Đèn
                        </li>
                        <li className="device__option" onClick={selectDevice}>
                            Loa
                        </li>
                        <li className="device__option" onClick={selectDevice}>
                            Điều hòa
                        </li>
                        <li className="device__option" onClick={selectDevice}>
                            Cảm biến ánh sáng
                        </li>
                        <li className="device__option" onClick={selectDevice}>
                            Cảm biến âm thanh
                        </li>
                        <li className="device__option" onClick={selectDevice}>
                            Cảm biến khí gas
                        </li>
                        <li className="device__option" onClick={selectDevice}>
                            Cảm biến DHT11
                        </li>
                    </div>
                </ul>
                <div className="activity__date">
                    <input
                        type="date"
                        className="date__select-box date__select"
                        defaultValue={dateToString(startDate)}
                        onChange={(e) => {
                            setStartDate(new Date(e.target.value));
                        }}
                    ></input>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="date__icon"
                    />

                    <input
                        type="date"
                        className="date__select-box date__select"
                        defaultValue={dateToString(endDate)}
                        onChange={(e) => {
                            let date = new Date(e.target.value);
                            date.setDate(date.getDate() + 1);
                            setEndDate(date);
                        }}
                    ></input>
                </div>
            </div>

            <ShowChart
                device={device}
                xValue1={xValue1}
                xValue2={xValue2}
                yValue1={yValue1}
                yValue2={yValue2}
            />

            <ShowTable
                device={device}
                xValue1={xValue1}
                xValue2={xValue2}
                yValue1={yValue1}
                yValue2={yValue2}
            />
        </div>
    );
};

export default ActivityLog;

function ShowChart(data) {
    if (data.device === 6) {
        return (
            <div className="activity__chart">
                <Line
                    data={{
                        labels: data.xValue1,
                        datasets: [
                            {
                                data: data.yValue1,
                                fill: false,
                                backgroundColor: "#e1e1e1",
                                borderColor: "#efff00",
                                label: "Nhiệt độ",
                            },
                        ],
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "Nhiệt độ",
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            title: "status",
                        },
                    }}
                />
                <Line
                    data={{
                        labels: data.xValue2,
                        datasets: [
                            {
                                data: data.yValue2,
                                fill: false,
                                backgroundColor: "#e1e1e1",
                                borderColor: "#00e5ff",
                                label: "Độ ẩm",
                            },
                        ],
                    }}
                    options={{
                        title: {
                            display: true,
                            text: "Độ ẩm",
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            title: "status",
                        },
                    }}
                />
            </div>
        );
    } else {
        let name = "Trạng thái";
        switch (data.device) {
            case 0:
                name = "Trạng thái đèn";
                break;
            case 1:
                name = "Trạng thái loa";
                break;
            case 2:
                name = "Trạng thái điều hòa";
                break;
            case 3:
                name = "Cường độ ánh sáng";
                break;
            case 4:
                name = "Cường độ âm thanh";
                break;
            case 5:
                name = "Nồng độ khí gas";
                break;
            default:
        }
        return (
            <div className="activity__chart">
                <Line
                    data={{
                        labels: data.xValue1,
                        datasets: [
                            {
                                data: data.yValue1,
                                fill: false,
                                backgroundColor: "#e1e1e1",
                                borderColor: "#0fff9c",
                                label: name,
                            },
                        ],
                    }}
                    options={{
                        title: {
                            display: true,
                            text: name,
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            title: "status",
                        },
                    }}
                />
            </div>
        );
    }
}

function ShowTable(data) {
    let stt = 1;
    let stt2 = 1;
    if (data.device === 0 || data.device === 2) {
        return (
            <table className="activity__table">
                <tbody>
                    <tr className="table__row">
                        <th className="table_header">Stt</th>
                        <th className="table_header">Trạng thái</th>
                        <th className="table_header">Tác nhân</th>
                        <th className="table_header">Thời điểm</th>
                        <th className="table_header">Ngày</th>
                    </tr>
                    {data.xValue1.map((x, index) => {
                        return (
                            <tr key={x} className="table__row">
                                <td className="table_col">{stt++}</td>
                                <td className="table_col">
                                    {data.yValue1[index]}
                                </td>
                                <td className="table_col">
                                    {data.yValue2[index]}
                                </td>
                                <td className="table_col">
                                    {getTimeFromString(x)}
                                </td>
                                <td className="table_col">
                                    {getDateFromString(x)}{" "}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    } else if (data.device === 6) {
        return (
            <div style={{ display: "flex", alignItems: "baseline" }}>
                <table className="activity__table" style={{ marginLeft: "2%" }}>
                    <tbody>
                        <tr className="table__row">
                            <th className="table_header">Stt</th>
                            <th className="table_header">Nhiệt độ</th>
                            <th className="table_header">Thời điểm</th>
                            <th className="table_header">Ngày</th>
                        </tr>
                        {data.xValue1.map((x, index) => {
                            return (
                                <tr key={x} className="table__row">
                                    <td className="table_col">{stt++}</td>
                                    <td className="table_col">
                                        {data.yValue1[index]}
                                    </td>
                                    <td className="table_col">
                                        {getTimeFromString(x)}
                                    </td>
                                    <td className="table_col">
                                        {getDateFromString(x)}{" "}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <table className="activity__table" style={{ marginLeft: "2%" }}>
                    <tbody>
                        <tr className="table__row">
                            <th className="table_header">Stt</th>
                            <th className="table_header">Độ ẩm</th>
                            <th className="table_header">Thời điểm</th>
                            <th className="table_header">Ngày</th>
                        </tr>
                        {data.xValue2.map((x, index) => {
                            return (
                                <tr key={x} className="table__row">
                                    <td className="table_col">{stt2++}</td>
                                    <td className="table_col">
                                        {data.yValue2[index]}
                                    </td>
                                    <td className="table_col">
                                        {getTimeFromString(x)}
                                    </td>
                                    <td className="table_col">
                                        {getDateFromString(x)}{" "}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    } else {
        let name = "";
        switch (data.device) {
            case 1:
                name = "Trạng thái";
                break;
            case 3:
                name = "Cường độ ánh sáng";
                break;
            case 4:
                name = "Cường độ âm thanh";
                break;
            case 5:
                name = "Nồng độ khí gas";
                break;
            default:
                break;
        }
        return (
            <table className="activity__table">
                <tbody>
                    <tr className="table__row">
                        <th className="table_header">Stt</th>
                        <th className="table_header">{name}</th>
                        <th className="table_header">Thời điểm</th>
                        <th className="table_header">Ngày</th>
                    </tr>
                    {data.xValue1.map((x, index) => {
                        return (
                            <tr key={x} className="table__row">
                                <td className="table_col">{stt++}</td>
                                <td className="table_col">
                                    {data.yValue1[index]}
                                </td>
                                <td className="table_col">
                                    {getTimeFromString(x)}
                                </td>
                                <td className="table_col">
                                    {getDateFromString(x)}{" "}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

function fillData(
    device,
    startDate,
    endDate,
    allLabel1,
    allLabel2,
    allData1,
    allData2,
    setxValue1,
    setxValue2,
    setYValue1,
    setYValue2
) {
    let indexList = [];
    let indexList2 = [];
    let x = [];
    let x2 = [];
    let y1 = [];
    let y2 = [];

    for (let i = 0; i < allLabel1.length; i++) {
        if (
            startDate <= new Date(allLabel1[i]) &&
            endDate >= new Date(allLabel1[i])
        ) {
            indexList = [...indexList, i];
            x = [...x, allLabel1[i]];
        }
    }
    for (let i = 0; i < allLabel2.length; i++) {
        if (
            startDate <= new Date(allLabel2[i]) &&
            endDate >= new Date(allLabel2[i])
        ) {
            indexList2 = [...indexList2, i];
            x2 = [...x2, allLabel2[i]];
        }
    }

    if (device === 0 || device === 2) {
        // đèn
        y1 = allData1.filter((data, index) => indexList.includes(index));
        y2 = allData2.filter((data, index) => indexList.includes(index));
    }
    if (device === 1 || device === 3 || device === 4 || device === 5) {
        // loa
        y1 = allData1.filter((data, index) => indexList.includes(index));
    }
    if (device === 6) {
        // DHT
        y1 = allData1.filter((data, index) => indexList.includes(index));
        y2 = allData2.filter((data, index) => indexList2.includes(index));
    }

    setYValue1(y1);
    setYValue2(y2);
    setxValue1(x);
    setxValue2(x2);
}

function dateToString(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}

function formatDate(date) {
    let fulldate = date.split(" ");
    let day = fulldate[0].split("-")[0];
    let month = fulldate[0].split("-")[1];
    let year = fulldate[0].split("-")[2];
    return year + "-" + month + "-" + day + " " + fulldate[1];
}

function getDateFromString(date) {
    return date.split(" ")[0];
}

function getTimeFromString(date) {
    return date.split(" ")[1];
}
