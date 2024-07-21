import { useEffect, useState } from "react";
import TableEmployee from "../../components/TabelEmployee";
import useApi from "../../utils/useApi";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";

const columns = [
  { key: "nip", header: "NIP" },
  { key: "name", header: "Nama" },
  { key: "status", header: "Status" },
  { key: "position", header: "Position" },
];

const initialAddEmployee = {
  nip: "",
  name: "",
  status: "",
  position: "",
};

const Employee = () => {
  const [localEmployee, setLocalEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState(initialAddEmployee);

  const { data: employees, loading } = useApi(
    "http://localhost:8080/api/employees"
  );

  useEffect(() => {
    if (employees) {
      setLocalEmployee(employees);
    }
  }, [employees]);

  const handleInputChange = (e, id, field) => {
    const newEmployees = localEmployee.map((emp) => {
      if (emp.id === id) {
        return { ...emp, [field]: e.target.value };
      }
      return emp;
    });
    setLocalEmployee(newEmployees);
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddEmployee = async () => {
    if (
      !newEmployee.nip ||
      !newEmployee.name ||
      !newEmployee.status ||
      !newEmployee.position
    ) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employees",
        newEmployee
      );
      setLocalEmployee([...localEmployee, response?.data]);
      setNewEmployee(initialAddEmployee);
      alert("New employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/employees/bulk",
        localEmployee
      );
      alert("Data successfully saved");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  return (
    <div className="grid gap-2">
      <h3 className="text-lg text-center font-semibold">Add New Employee</h3>
      <div className="grid gap-4 grid-cols-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nip" value="Your nip" />
          </div>
          <TextInput
            name="nip"
            placeholder="NIP"
            value={newEmployee?.nip}
            onChange={handleNewEmployeeChange}
            className="mb-2"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            name="name"
            placeholder="Name"
            value={newEmployee?.name}
            onChange={handleNewEmployeeChange}
            className="mb-2"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="status" value="Your status" />
          </div>
          <TextInput
            name="status"
            placeholder="Status"
            value={newEmployee?.status}
            onChange={handleNewEmployeeChange}
            className="mb-2"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="position" value="Your position" />
          </div>
          <TextInput
            name="position"
            placeholder="Position"
            value={newEmployee?.position}
            onChange={handleNewEmployeeChange}
            className="mb-2"
            required
          />
        </div>
      </div>
      <Button onClick={handleSaveAddEmployee} fullSized>
        Add Employee
      </Button>
      <h3 className="text-lg text-center font-semibold">Table Employee</h3>

      {loading ? (
        <p>loading</p>
      ) : (
        <TableEmployee
          columns={columns}
          data={localEmployee}
          handleInputChange={handleInputChange}
        />
      )}
      <Button fullSized onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Employee;
