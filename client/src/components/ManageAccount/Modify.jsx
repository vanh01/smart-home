import React from "react";
import { updateAccount, deleteAccount } from "../../ServerApi"

const Modify = ({ setShowApartment, setShowModify, curIndex, accounts, setAccount, render, setRender }) => {
	let temp = accounts
	console.log(temp[curIndex])
	let account = {
		"phonenumber": accounts[curIndex].phonenumber,
		"password": accounts[curIndex].password,
		"rules": accounts[curIndex].rules,
		"privatekey": accounts[curIndex].privatekey
	}
	let information = {
		"email": accounts[curIndex].email,
		"name": accounts[curIndex].name,
		"dateupdated": "" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
	}
	let change = false
	let curPassword = ""
	let confirmPassword = ""
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
						<input type="password" defaultValue={temp[curIndex].password} required onChange={(e) => {
							confirmPassword = e.target.value
							if (curPassword === confirmPassword) {
								account['password'] = confirmPassword
								change = true
							}
						}} /> <br />
					</div>
					<div className="add__form1">
						<label>Quyền truy cập:</label> <br />
						<select name="role" defaultValue={temp[curIndex].rules == 1 ? "Quản trị viên" : "Khách hàng"} onChange={(e) => {
							let curRole = e.target.value === "admin" ? 1 : 2
							if (account["rules"] !== curRole) {
								account["rules"] = curRole
								change = true
							}
							// return e.target.value === "admin" ? temp[curIndex].access = "Quản trị viên" : "Khách hàng"
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
						let adminKey = "asaxkioiowe123as"
						deleteAccount(account["privatekey"], adminKey)
						if (temp.find(ele => ele.privatekey === adminKey).rules === 1) {
							temp.splice(curIndex, 1)
							console.log(temp)
							setAccount(temp)
						}

						setShowModify(false)
					}}>Xóa</button>
					<button type="submit" class='button-add' onClick={(e) => {
						if (curPassword === confirmPassword) {
							if (change) {
								console.log("update")
								updateAccount(account["privatekey"], account, information)
							}
							setShowModify(false)
						}
						else
							alert("Xác thực lại mật khẩu")

						// console.log(temp)
						temp[curIndex].phonenumber = account["phonenumber"]
						temp[curIndex].password = account["password"]
						temp[curIndex].rules = account["rules"]
						temp[curIndex].name = information["name"]
						temp[curIndex].email = information["email"]
						temp[curIndex].dateupdated = information["dateupdated"]
						console.log(information["dateupdated"])
						setAccount(temp)

						// setRender(!render)
					}}>Lưu</button>
				</div>
			</div>
		</>
	);
};

export default Modify;
