import React from "react";
import { updateAccount, deleteAccount } from "../../ServerApi"

const Modify = ({ setShowApartment, setShowModify, curIndex, accounts, setAccount, render, setRender }) => {
	let temp = accounts
	let account = {
		"phonenumber": accounts[curIndex].phonenumber,
		"password": accounts[curIndex].password,
		"rules": accounts[curIndex].rules,
		"privatekey": accounts[curIndex].privatekey
	}
	let information = {
		"email": accounts[curIndex].email,
		"name": accounts[curIndex].name
	}
	let change = false
	let curPassword = ""
	let confirmPassword = "."
	// console.log(temp[curIndex])
	return (
		<>
			<div className="modifyPage">
				<button className="manage-apartment__exit" onClick={() => setShowModify(false)}>x</button>
				<form action="#" className="addForm">
					<div className="add__form1">
						<label>Số điện thoại:</label> <br />
						<input type="number" defaultValue={temp[curIndex].phonenumber} onChange={(e) => {
							account["phonenumber"] = e.target.value
							change = true
						}} /> <br />
						<label>Họ tên:</label> <br />
						<input type="text" defaultValue={temp[curIndex].name} onChange={(e) => {
							information["name"] = e.target.value
							change = true
						}} /> <br />
						<label>Mật khẩu:</label> <br />
						<input type="password" defaultValue={temp[curIndex].password} onChange={(e) => curPassword = e.target.value} /> <br />
						<label>Nhập lại mật khẩu:</label> <br />
						<input type="password" required onChange={(e) => {
							confirmPassword = e.target.value
							if (curPassword === confirmPassword) {
								account['password'] = confirmPassword
								change = true
							}
						}} /> <br />
					</div>
					<div className="add__form1">
						<label>Quyền truy cập:</label> <br />
						<select name="role" defaultValue={temp[curIndex].access === "Người dùng" ? "user" : "admin"} onChange={(e) => {
							let curRole = e.target.value === "admin" ? 1 : 2
							if (account["rules"] !== curRole) {
								account["rules"] = curRole
								change = true
							}
							return e.target.value === "admin" ? temp[curIndex].access = "Quản trị viên" : "Người dùng"
						}}>
							<option value="user">Người dùng</option>
							<option value="admin">Quản trị viên</option>
						</select> <br />
						<label>Email:</label> <br />
						<input type="email" defaultValue={temp[curIndex].email} onChange={(e) => {
							information["email"] = e.target.value
							change = true
						}} />
					</div>
				</form>
				<div className="add__button">
					<button type="button" class='button-manage' onClick={() => { setShowModify(false); setShowApartment(true) }}>Quản lý căn hộ</button>
					<button type="button" class='button-cancel' onClick={() => {
						deleteAccount(account["privatekey"], "asaxkioiowe123as")
						setShowModify(false)
					}}>Xóa</button>
					<button type="submit" class='button-add' onClick={(e) => {
						if (change) {
							console.log("update")
							updateAccount(account["privatekey"], account, information)
						}
						// console.log(temp)
						// setAccount(temp)
						setShowModify(false)
						// setRender(!render)
					}}>Lưu</button>
				</div>
			</div>
		</>
	);
};

export default Modify;
