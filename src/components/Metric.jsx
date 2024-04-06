/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const metricDropdownBrands = ["adidas", "nike", "vans", "puma"];

const Metric = ({
  onUpdateBayNo,
  onUpdateBrand,
  onDeleteMetric,
  brand,
  bayNo,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(brand);
  const [bayNum, setBayNum] = useState(bayNo);

  const handleBrandClick = (e) => {
    const newBrand = e.target.innerText;
    setSelectedBrand(newBrand);
    onUpdateBrand(newBrand);
  };

  const handleBayNoChange = (e) => {
    const newBayNo = e.target.value;
    setBayNum(newBayNo);
    onUpdateBayNo(newBayNo);
  };

  const handleMetricDelete = () => {
    onDeleteMetric();
  };

  return (
    <div className="flex flex-row gap-4 my-3">
      <input
        className="w-20 p-2 border border-gray-300 rounded-md"
        placeholder="Bay No."
        value={bayNum}
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

      {/*handling the delete button*/}
      <button
        type="button"
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={handleMetricDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Metric;
