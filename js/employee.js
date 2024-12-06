class Employee {
  // Khai bao cac thuoc tinh nhan tu nguoi dung
  constructor(
    _account,
    _name,
    _email,
    _password,
    _daysOfWork,
    _baseSalary,
    _title,
    _workingHours
  ) {
    // Khai bao cac thuoc tinh, bao gom cac thuoc tinh can tinh toan
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.daysOfWork = _daysOfWork;
    this.baseSalary = _baseSalary;
    this.title = _title;
    this.workingHours = _workingHours;
    this.totalSalary = 0;
    this.rank = "";
  }

  // Tinh tong luong
  calcTotalSalary() {
    let multiplier = 1;
    if (this.title === "Sếp") {
      multiplier = 3;
    } else if (this.title === "Trưởng phòng") {
      multiplier = 2;
    } else if (this.title === "Nhân viên") {
      multiplier = 1;
    }

    this.totalSalary = this.baseSalary * multiplier;
  }

  // Tinh xep loai nhan vien
  calcRank() {
    if (this.workingHours >= 192) {
      this.rank = "Xuất sắc";
    } else if (this.workingHours >= 176) {
      this.rank = "Giỏi";
    } else if (this.workingHours >= 160) {
      this.rank = "Khá";
    } else {
      this.rank = "Trung bình";
    }
  }
}

export default Employee;
