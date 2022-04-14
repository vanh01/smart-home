
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ManageApartment from "./ManageApartment";
import Add from "./Add";
import Modify from "./Modify";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Manager = ({ account }) => {
    let listAccount = [];
    let [allAccount, setAllAccount] = useState(listAccount);
    let [accounts, setAccount] = useState(allAccount);
    let [curIndex, setCurIndex] = useState(0);
    let [showApartment, setShowApartment] = useState(false);
    let [showAdd, setShowAdd] = useState(false);
    let [showModify, setShowModify] = useState(false);
    let [render, setRender] = useState(false);

    const getDataAccount = async () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        await fetch(
            `https://localhost:5001/api/account/${account.privatekey}`,
            requestOptions
        )
            // .then(response => response.text())
            .then((response) => response.json())
            .then((result) => {
                console.log("first result", result);
                listAccount = result;
                SetListAccount(
                    listAccount,
                    accounts,
                    setAccount,
                    setAllAccount
                );
            })
            .catch((error) => console.log("error", error));
    };
    // getDataAccount();
    useEffect(() => {
        getDataAccount();
    }, [render]);
    // },[listAccount]);

    console.log(curIndex);
    return (
        <>
            <div className="manager-container">
                <div className="space-60"></div>
                <div className="head-manager prefix">
                    <button
                        onClick={() => {
                            setShowAdd(!showAdd);
                        }}
                        title="Thêm tài khoản"
                        type="button"
                        className="add-account"
                    >
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>

                    <div className="search-account float-end">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="search-account-input"
                            onChange={(e) => {
                                setAccount(
                                    FindAccounts(allAccount, e.target.value)
                                );
                            }}
                        ></input>
                        {/* <i className="fa-regular fa-arrow-right"></i> */}
                        {/* <i className="fa fa-arrow-right" aria-hidden="true"></i> */}
                        <button
                            onClick={() => {
                                setAccount(
                                    FindAccounts(
                                        allAccount,
                                        document.querySelector(
                                            ".search-account-input"
                                        ).value
                                    )
                                );
                            }}
                            className="search-account-btn"
                            type="button"
                        ><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                    <div className="float-none"></div>
                </div>
                <div className="manager-card">
                    <div className="manager-card-body">
                        <ShowTable
                            showApartment={showApartment}
                            setShowApartment={setShowApartment}
                            showModify={showModify}
                            setShowModify={setShowModify}
                            accounts={accounts}
                            setCurIndex={setCurIndex}
                        />
                        {/* <ShowTable showApartment={showApartment} setShowApartment={setShowApartment} showModify={showModify} setShowModify={setShowModify} accounts={listAccount} setCurIndex={setCurIndex} /> */}
                    </div>
                </div>
            </div>
            {showAdd ? (
                <div
                    className="manager-bg"
                    onClick={(e) => {
                        if (e.target === document.querySelector(".manager-bg"))
                            setShowAdd(false);
                    }}
                >
                    <Add
                        setShowAdd={setShowAdd}
                        accounts={accounts}
                        setAccount={setAccount}
                    />
                    {/* <Add setShowAdd={setShowAdd} accounts={listAccount} setAccount={setAccount} /> */}
                </div>
            ) : (
                ""
            )}
            {showModify ? (
                <div
                    className="manager-bg"
                    onClick={(e) => {
                        if (
                            e.target === document.querySelector(".manager-bg")
                        ) {
                            setShowModify(false);
                        }
                    }}
                >
                    <Modify
                        setShowModify={setShowModify}
                        setShowApartment={setShowApartment}
                        curIndex={curIndex}
                        accounts={accounts}
                        setAccount={setAccount}
                        render={render}
                        setRender={setRender}
                    />
                    {/* <Modify setShowModify={setShowModify} setShowApartment={setShowApartment} curIndex={curIndex} accounts={listAccount} setAccount={setAccount} /> */}
                </div>
            ) : (
                ""
            )}
            {showApartment ? (
                <div
                    className="manager-bg"
                    onClick={(e) => {
                        if (e.target === document.querySelector(".manager-bg"))
                            setShowApartment(false);
                    }}
                >
                    <ManageApartment setShowApartment={setShowApartment} />
                </div>
            ) : (
                ""
            )}
        </>
    );
};
export default Manager;

function SetListAccount(listAccount, accounts, setAccount, setAllAccount) {
    console.log("set account", listAccount);
    setAllAccount(listAccount);
    setAccount(listAccount);
    console.log("account accounts", accounts);
    // return listAccount;
}

function FindAccounts(accounts, name) {
    let result = [];
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
            result.push(accounts[i]);
        }
    }
    return result;
}

function ShowTable({
    showApartment,
    setShowApartment,
    showModify,
    setShowModify,
    accounts,
    setCurIndex,
}) {
    console.log("accounts show", accounts);
    return (
        <table id="example1" className="manager-table">
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Mật khẩu</th>
                    <th>Email</th>
                    <th>Quyền</th>
                    <th>Ngày tạo TK</th>
                    <th>Ngày cập nhật</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {
                    accounts.map((account) => (
                        <tr key={account.phonenumber}>
                            <td>{account.name}</td>
                            <td>{account.phonenumber}</td>
                            <td>{account.password}</td>
                            <td>{account.email}</td>
                            {/* <td>{if account.rules == 1}</td> */}
                            <td>{account.rules === 1 ? "Quản trị viên" : "Khách hàng"}</td>
                            <td>{account.datecreated}</td>
                            <td>{account.dateupdated}</td>
                            <td className="manager-icon">
                                <i onClick={(e) => {
                                    let curPhone = e.target.parentNode.parentNode.querySelectorAll('td')[1].innerText
                                    setCurIndex(accounts.findIndex((account) => { return account.phonenumber.indexOf(curPhone) !== -1 }))
                                    setShowModify(!showModify)

                                }}
                                className="fa fa-pencil-square"
                                aria-hidden="true"
                            ></i>
                            <i
                                onClick={() => setShowApartment(!showApartment)}
                                className="fa fa-home"
                                aria-hidden="true"
                            ></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
