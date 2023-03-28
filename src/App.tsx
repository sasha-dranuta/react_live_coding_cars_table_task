import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

interface Color {
  id: number,
  name: string,
}

interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
}

function getColorId(colorId: number): Color | undefined {
  const foundColor = colorsFromServer.find(({ id }) => colorId === id);

  return foundColor;
}

const cars: Car[] = carsFromServer.map(car => {
  return {
    ...car,
    color: getColorId(car.colorId),
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');

  function getBrandQuery(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={getBrandQuery}
      />

      <select>
        <option>Chose a color</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {cars
            .filter((car) => {
              return car.brand.toLowerCase().includes(query.toLowerCase())
                ? car
                : '';
            })
            .map((car) => {
              return (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td style={{ color: car.color.name }}>{car.color.name}</td>
                  <td>{car.rentPrice}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
