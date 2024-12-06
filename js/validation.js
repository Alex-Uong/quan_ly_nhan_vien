import { geteid } from "./main.js";
class Validation {
  // Kiem tra xem co du lieu khong
  checkEmpty(value, divId, message) {
    if (value === "") {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Kiem tra account hop le (tu 4 - 6 ky tu so)
  checkAcc(value, divId, message) {
    const regex = /^[0-9]{4,6}$/;
    if (!regex.test(value)) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Kiem tra phai la chu, khong duoc la so
  checkName(value, divId, message) {
    const regex =
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    if (!regex.test(value)) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Kiem tra email hop le
  checkEmail(value, divId, message) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(value)) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Mat khau tu 6 - 10 ky tu, chua it nha 1 ky tu so, 1 ky tu in hoa, 1 ky tu dac biet
  checkPass(value, divId, message) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,10}$/;
    if (!regex.test(value)) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Kiem tra dinh dang ngay
  checkDate(value, divId, message) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(value)) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Luong co ban tu 1000000 den 20000000
  checkSalary(value, divId, message) {
    if (value < 1000000 || value > 20000000) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Phai chon chuc vu hop le
  checkTitle(idSelect, divId, message) {
    if (geteid(idSelect).selectedIndex == 0) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Kiem tra co phai la so, khong duoc la chu
  checkNumber(value, divId, message) {
    const regex = /^[0-9]+$/;
    if (!regex.test(value)) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Gio lam trong thang phai tu 80 den 200 gio
  checkWorkingHours(value, divId, message) {
    if (value < 80 || value > 200) {
      geteid(divId).innerHTML = message;
      geteid(divId).style.display = "block";
      return false;
    }
    geteid(divId).style.display = "none";
    return true;
  }

  // Kiem tra account co ton tai chua
  checkExistAccount(value, divId, message, employeeList) {
    for (let i = 0; i < employeeList.length; i++) {
      if (employeeList[i].account == value) {
        geteid(divId).innerHTML = message;
        geteid(divId).style.display = "block";
        return false;
      }
    }
    geteid(divId).style.display = "none";
    return true;
  }
}

export default Validation;
