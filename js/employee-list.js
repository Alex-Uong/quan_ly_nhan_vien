class EmployeeList {
  constructor() {
    this.array = [];
  }
  addEmployee(employee) {
    this.array.push(employee);
  }

  // Ham tim id cua employee
  findIndex(acc) {
    let index = -1;
    for (let i = 0; i < this.array.length; i++) {
      const employee = this.array[i];
      if (String(employee.account) === String(acc)) {
        index = i;
        break;
      }
    }
    return index;
  }

  editEmployee(acc) {
    // Tim vi tri employee can sua
    const index = this.findIndex(acc);

    // Lay employee tu vi tri trong mang
    if (index !== -1) {
      return this.array[index];
    }
    return null;
  }

  updateEmployee(employee) {
    // Tim vi tri employee can sua
    const index = this.findIndex(employee.account);

    // Replacce employee
    if (index !== -1) {
      this.array[index] = employee;
    }
  }

  deleteEmployee(acc) {
    // Lay index cua employee can xoa
    const index = this.findIndex(acc);

    // Xoa employee
    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  searchEmployee(keyword) {
    let result = [];
    for (let i = 0; i < this.array.length; i++) {
      const employee = this.array[i];
      if (employee.rank.toLowerCase().includes(keyword.toLowerCase())) {
        result.push(employee);
      }
    }
    return result;
  }
}

export default EmployeeList;
