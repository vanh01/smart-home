import React from "react";

const Modify = ({ setShowApartment, setShowModify }) => {
	return (
		<>
			<div className="modifyPage">
				<button className="manage-apartment__exit" onClick={() => setShowModify(false)}>x</button>
				<form action="#" className="addForm">
					<div className="add__form1">
						<label>Số điện thoại:</label> <br />
						<input type="number" /> <br />
						<label>Họ tên:</label> <br />
						<input type="text" /> <br />
						<label>Mật khẩu:</label> <br />
						<input type="password" /> <br />
						<label>Nhập lại mật khẩu:</label> <br />
						<input type="password" /> <br />
					</div>
					<div className="add__form1">
						<label>Quyền truy cập:</label> <br />
						<select name="role">
							<option value="user">Người dùng</option>
							<option value="admin">Admin</option>
						</select> <br />
						<label>Email:</label> <br />
						<input type="email" />
					</div>
				</form>
				<div className="add__button">
					<button type="button" class='button-manage' onClick={() => { setShowModify(false); setShowApartment(true) }}>Quản lý căn hộ</button>
					<button type="button" class='button-cancel' onClick={() => setShowModify(false)}>Hủy</button>
					<button type="submit" class='button-add'>Thêm</button>
				</div>
			</div>
		</>
	);
};

export default Modify;
