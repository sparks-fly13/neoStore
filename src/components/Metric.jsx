import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const metricDropdownBrands = ["adidas", "nike", "vans", "puma"];

const Metric = ({ bayNum, onUpdateBayNo }) => {
  const [selectedBrand, setSelectedBrand] = useState("Select");
  const [bayNo, setBayNo] = useState(bayNum);

  const handleBrandClick = (e) => {
    setSelectedBrand(e.target.innerText);
  };

  const handleBayNoChange = (e) => {
    const newBayNo = e.target.value;
    setBayNo(newBayNo);
    onUpdateBayNo(newBayNo);
  };

  return (
    <div className="flex flex-row gap-4">
      <input
        className="w-20 p-2 border border-gray-300 rounded-md"
        placeholder="Bay No."
        value={bayNo}
        onChange={handleBayNoChange}
      />

      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="primary">
          {selectedBrand}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {metricDropdownBrands.map((brand, index) => (
            <Dropdown.Item onClick={(e) => handleBrandClick(e)} key={index}>
              {brand}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Metric;
