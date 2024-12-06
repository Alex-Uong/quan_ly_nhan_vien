// Nhap lop doi tuong tu file khac
import Employee from "./employee.js";
import EmployeeList from "./employee-list.js";
import Validation from "./validation.js";

// Tao doi tuong validation
const validation = new Validation();

// Tao doi tuong moi tu lop employeeList
const employeeList = new EmployeeList();

export const geteid = (id) => document.getElementById(id);

// Tao ra mot ham lay thong tin cac nhan vien
const getInfoEmployee = () => {
  // Lay gia tri cua cac the input
  const acc = geteid("tknv").value;
  const name = geteid("name").value;
  const email = geteid("email").value;
  const pass = geteid("password").value;
  const daysOfWork = geteid("datepicker").value;
  const baseSalary = geteid("luongCB").value;
  const title = geteid("chucvu").value;
  const workingHours = geteid("gioLam").value;

  // Check validation
  let isValid = true;

  // Tai khoan toi da 4 - 6 ky so, khong bo trong
  isValid =
    validation.checkEmpty(acc, "tbTKNV", "Tài khoản không được bỏ trống") &&
    validation.checkAcc(acc, "tbTKNV", "Tài khoản phải từ 4 - 6 ký số") &&
    validation.checkExistAccount(
      acc,
      "tbTKNV",
      "Tài khoản đã tồn tại",
      employeeList.array
    );

  // Ho va ten la chu, khong de trong
  isValid &=
    validation.checkEmpty(name, "tbTen", "Họ và tên không được bỏ trống") &&
    validation.checkName(name, "tbTen", "Họ và tên phải là chữ");

  // Email hop le
  isValid &=
    validation.checkEmpty(email, "tbEmail", "Email không được bỏ trống") &&
    validation.checkEmail(email, "tbEmail", "Email không hợp lệ");

  // Mat khau hop le
  isValid &=
    validation.checkEmpty(pass, "tbMatKhau", "Mật khẩu không được bỏ trống") &&
    validation.checkPass(
      pass,
      "tbMatKhau",
      "Mật khẩu phải từ 6 - 10 ký tự, chứa ít nhất 1 số, 1 chữ in hoa và 1 ký tự đặc biệt"
    );

  // Dinh dang ngay hop le
  isValid &=
    validation.checkEmpty(daysOfWork, "tbNgay", "Ngày không được bỏ trống") &&
    validation.checkDate(daysOfWork, "tbNgay", "định dạng: mm/dd/yyyy");

  // Luong co ban hop le
  isValid &=
    validation.checkEmpty(
      baseSalary,
      "tbLuongCB",
      "Luong cơ bản không được bỏ trống"
    ) &&
    validation.checkNumber(
      baseSalary,
      "tbLuongCB",
      "Luong cơ bản phải là số"
    ) &&
    validation.checkSalary(
      baseSalary,
      "tbLuongCB",
      "Luong cơ bản phải từ 1.000.000 - 20.000.000"
    );

  // Chuc vu hop le
  isValid &= validation.checkTitle(
    "chucvu",
    "tbChucVu",
    "Chức vụ phải được chọn"
  );

  // Gio lam hop le
  isValid &=
    validation.checkEmpty(
      workingHours,
      "tbGiolam",
      "Giờ làm không được bỏ trống"
    ) &&
    validation.checkNumber(workingHours, "tbGiolam", "Giờ làm phải là số") &&
    validation.checkWorkingHours(
      workingHours,
      "tbGiolam",
      "Giờ làm phải trong khoâng 80 - 200"
    );

  if (!isValid) return null;

  // Tao ra doi tuong employee tu lop doi tuong employee
  const employee = new Employee(
    acc,
    name,
    email,
    pass,
    daysOfWork,
    baseSalary,
    title,
    workingHours
  );

  // Tinh toan cac gia tri con thieu
  employee.calcTotalSalary();
  employee.calcRank();

  return employee;
};

// Xu ly nut them nhan vien moi
geteid("btnThem").onclick = function () {
  // Doi header
  geteid("header-title").innerHTML = "Add Employee";

  // Doi nut them nhan vien
  geteid("btnThemNV").innerHTML = "Add";
  geteid("btnThemNV").style.display = "block";

  // An nut cap nhat
  geteid("btnCapNhat").style.display = "none";

  // Reset form
  geteid("formNhanVien").reset();

  // enable lai account
  geteid("tknv").disabled = false;

  // Tat tat ca thong bao
  geteid("tbTKNV").style.display = "none";
  geteid("tbTen").style.display = "none";
  geteid("tbEmail").style.display = "none";
  geteid("tbMatKhau").style.display = "none";
  geteid("tbNgay").style.display = "none";
  geteid("tbLuongCB").style.display = "none";
  geteid("tbChucVu").style.display = "none";
  geteid("tbGiolam").style.display = "none";
};

// Render danh sach nhan vien
const renderEmployeeList = (data) => {
  // Tao bien content de luu noi dung html
  let content = "";

  // Duyet  qua mang data
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];

    // Tich luy tr vao bien content
    content += `
      <tr>
        <td>${employee.account}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.daysOfWork}</td>
        <td>${employee.title}</td>
        <td>${employee.totalSalary}</td>
        <td>${employee.rank}</td>
        <td><button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit('${employee.account}')" >Edit</button>
        <button class="btn btn-danger" onclick="deleteEmployee('${employee.account}')">Delete</button>
        </td>
      </tr>`;
  }
  // Gan noi dung html vao the tbody
  geteid("tableDanhSach").innerHTML = content;
};

// Luu thong tin nhan vien vao local storage
const setLocalStorage = () => {
  // Du lieu can luu
  const dataJSON = employeeList.array;

  // Convert data sang dang chuoi (string) de tiet kiem dung luong
  const dataString = JSON.stringify(dataJSON);

  // Luu du lieu vao local storage
  localStorage.setItem("employeeList", dataString);
};

// Lay thong tin nhan vien tu local storage
const getLocalStorage = () => {
  // Lay du lieu tu local storage
  const dataString = localStorage.getItem("employeeList");

  // Kiem tra xem co du lieu khong
  if (dataString == null) return;

  // Convert du lieu tu dang chuoi sang dang doi tuong
  const dataJSON = JSON.parse(dataString);

  // Gan du lieu vao mang
  employeeList.array = dataJSON;

  // Render danh sach nhan vien
  renderEmployeeList(employeeList.array);
};

// Xu ly nut xoa nhan vien
const deleteEmployee = (account) => {
  employeeList.deleteEmployee(account);
  renderEmployeeList(employeeList.array);
  setLocalStorage();
};

window.deleteEmployee = deleteEmployee;

// Xu ly nut edit
const handleEdit = (account) => {
  // Sua title cua model
  geteid("header-title").innerHTML = "Edit Employee";

  // Hien nut cap nhat
  geteid("btnCapNhat").style.display = "block";

  // An nut them nhan vien
  geteid("btnThemNV").style.display = "none";

  // Tat tat ca thong bao
  geteid("tbTKNV").style.display = "none";
  geteid("tbTen").style.display = "none";
  geteid("tbEmail").style.display = "none";
  geteid("tbMatKhau").style.display = "none";
  geteid("tbNgay").style.display = "none";
  geteid("tbLuongCB").style.display = "none";
  geteid("tbChucVu").style.display = "none";
  geteid("tbGiolam").style.display = "none";

  // Lay thong tin nhan vien theo account
  const employee = employeeList.editEmployee(account);

  // Hien thi thong tin tro lai form
  if (employee) {
    geteid("tknv").value = employee.account;
    geteid("tknv").disabled = true;
    geteid("name").value = employee.name;
    geteid("email").value = employee.email;
    geteid("password").value = employee.password;
    geteid("datepicker").value = employee.daysOfWork;
    geteid("luongCB").value = employee.baseSalary;
    geteid("chucvu").value = employee.title;
    geteid("gioLam").value = employee.workingHours;
  }
};

window.handleEdit = handleEdit;

// Xu ly nut cap nhat
geteid("btnCapNhat").onclick = function () {
  const employee = getInfoEmployee();

  // Cap nhat thong tin nhan vien
  employeeList.updateEmployee(employee);

  // Render lai danh sach nhan vien
  renderEmployeeList(employeeList.array);

  // Luu thong tin vao LocalStorage
  setLocalStorage();

  // Dong modal
  geteid("btnDong").click();
};

// Goi ham khi load trang
getLocalStorage();

// Xu ly nut Add (them nhan vien sau khi nguoi dung da nhap thong tin)
geteid("btnThemNV").onclick = function () {
  // Nhan lai doi tuong employee tu nguoi dung
  const employee = getInfoEmployee();

  if (employee == null) return;

  // Them nhan vien vao mang
  employeeList.addEmployee(employee);

  // Render lai danh sach nhan vien
  renderEmployeeList(employeeList.array);

  // Luu thong tin vao LocalStorage
  setLocalStorage();

  // Dong modal
  geteid("btnDong").click();
};

// Xu ly khi nguoi dung search loai nhan vien
geteid("searchName").oninput = function () {
  const keyword = geteid("searchName").value;
  const employeeSearch = employeeList.searchEmployee(keyword);
  renderEmployeeList(employeeSearch);
};
