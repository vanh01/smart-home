import React from "react";

const Modify = ({ setShowApartment, setShowModify, curIndex, accounts, setAccount }) => {
	let temp = accounts
	// console.log(temp[curIndex])
	return (
		<>
			<div className="modifyPage">
				<button className="manage-apartment__exit" onClick={() => setShowModify(false)}>x</button>
				<form action="#" className="addForm">
					<div className="add__form1">
						<label>Số điện thoại:</label> <br />
						<input type="number" defaultValue={temp[curIndex].phonenumber} onChange={(e) => temp[curIndex].phone = e.target.value} /> <br />
						<label>Họ tên:</label> <br />
						<input type="text" defaultValue={temp[curIndex].name} onChange={(e) => temp[curIndex].name = e.target.value} /> <br />
						<label>Mật khẩu:</label> <br />
						<input type="password" defaultValue={temp[curIndex].password} onChange={(e) => temp[curIndex].password = e.target.value} /> <br />
						<label>Nhập lại mật khẩu:</label> <br />
						<input type="password" required /> <br />
					</div>
					<div className="add__form1">
						<label>Quyền truy cập:</label> <br />
						<select name="role" defaultValue={temp[curIndex].access === "Người dùng" ? "user" : "admin"} onChange={(e) => e.target.value === "admin" ? temp[curIndex].access = "Quản trị viên" : "Người dùng"}>
							<option value="user">Người dùng</option>
							<option value="admin">Admin</option>
						</select> <br />
						<label>Email:</label> <br />
						<input type="email" defaultValue={temp[curIndex].email} onChange={(e) => temp[curIndex].email = e.target.value} />
					</div>
				</form>
				<div className="add__button">
					<button type="button" class='button-manage' onClick={() => { setShowModify(false); setShowApartment(true) }}>Quản lý căn hộ</button>
					<button type="button" class='button-cancel' onClick={() => setShowModify(false)}>Hủy</button>
					<button type="submit" class='button-add' onClick={(e) => {
						console.log(temp)
						setAccount(temp)
						setShowModify(false)
					}}>Lưu</button>
				</div>
			</div>
		</>
	);
};

export default Modify;
