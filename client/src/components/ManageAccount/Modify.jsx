import React from "react";
import { updateAccount, deleteAccount } from "../../ServerApi"

const Modify = ({ setShowApartment, setShowModify, curIndex, accounts, setAccount, accountKey}) => {
	let temp = accounts
	console.log(temp[curIndex].rules)
	let account = {
		"phonenumber": accounts[curIndex].phonenumber,
		"password": accounts[curIndex].password,
		"rules": accounts[curIndex].rules,
		"privatekey": accounts[curIndex].privatekey
	}
	let information = {
		"email": accounts[curIndex].email,
		"name": accounts[curIndex].name,
		"dateupdated": "" + (new Date().getYear() + 1900) + ((new Date().getMonth() + 1 < 10) ? '-0' : '-') + (new Date().getMonth() + 1) + ((new Date().getDate() < 10) ? '-0' : '-') + new Date().getDate()
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
						<select name="role" defaultValue={temp[curIndex].rules === 1 ? "admin" : "user"} onChange={(e) => {
							console.log(e.target.value)
							let curRole = e.target.value === "admin" ? 1 : 2
							if (account["rules"] !== curRole) {
								account["rules"] = curRole
								change = true
							}
						}}>
							<option value="user"  >Người dùng</option>
							<option value="admin" >Quản trị viên</option>
						</select>
						<br />
						<label>Email:</label> <br />
						<input type="email" defaultValue={temp[curIndex].email} onChange={(e) => {
							information["email"] = e.target.value
							change = true
						}} />
					</div>
				</form>
				<div className="add__button">
					<button type="button" className='button-manage' onClick={() => { setShowModify(false); setShowApartment(true) }}>Quản lý căn hộ</button>
					<button type="button" className='button-cancel' onClick={() => {
						deleteAccount(account["privatekey"], accountKey)
						if (temp.find(ele => ele.privatekey === accountKey).rules === 1) {
							temp.splice(curIndex, 1)
							console.log(temp)
							setAccount(temp)
						}

						setShowModify(false)
					}}>Xóa</button>
					<button type="submit" className='button-add' onClick={(e) => {
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
