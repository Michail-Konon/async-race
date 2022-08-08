import { createImageCar } from './mainStructure_img';

export const createWinnerTab = ( num: number, color: string, name: string, wins: number, bestTime: number) =>
  `<tr">
    <td>${num}</td>
    <td>${createImageCar(color)}</td>
    <td>${name}</td>
    <td>${wins}</td>
    <td>${bestTime}</td>
  </tr>
`;

export const createCarBlock = (id: number, name: string, color: string) =>
  `<div class="car">
    <div class="car-options">
      <button class="buttons car-options_select" data-select=${id}>Select</button>
      <button class="buttons car-options_remove" data-remove=${id}>Remove</button>
      <h4 class="car-options_title">${name}</h4>
    </div>
    <div class="car-control">
      <button class="car-control_start" id="start-${id}" data-start=${id} >Start</button>
      <button class="car-control_stop" id="stop-${id}" data-stop=${id} disabled="true">Stop</button>
      <div class="car-img" id="car-${id}" data-car=${id}>${createImageCar(color)}</div>
      <div class="flag"></div>
    </div>
  </div>
`;

const mainStructure = async () => {
    const htmlBody = `
    <header class="header">
        <div class="main-controls">
            <button class="buttons btn_garage-view">Garage</button>
            <button class="buttons btn_winners-view">Winners</button>
        </div>
    </header>

    <div class="page garage-page">
      <div class="generate-cars">
        <div class="field-create">
          <input class="generate-input_text text-create" type="text" autocomplete placeholder="Enter name сar...">
          <input class="generate-input_color color-create" type="color">
          <button class="buttons btn_create">create</button>
        </div>
        <div class="field-update">
          <input class="generate-input_text text-update" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
          <input class="generate-input_color color-update" type="color" disabled="true">
          <button class="buttons btn_update" disabled="true">Update</button>
        </div>
        <div class="field-control">
          <button class="buttons btn_race-start">Race</button>
          <button class="buttons btn_race-stop" disabled>Reset</button>
          <button class="buttons btn_generate_cars">Generate cars</button>
        </div>
      </div>

        <div class="garage-track-block">
            <h1 class="title">Garage <span class="count-garage"></span></h1>
            <h3 class="title">Page #<span class="count-page">1</span></h3>
        
            <div class="track-block_cars"></div>
        </div>
    
        <div class="track-block_pagination">
            <button class="buttons btn_prev">Prev</button>
            <button class="buttons btn_next">Next</button>
        </div>
    
        <div class="winner-notice"></div>

    </div>
    
    <div class="page winners-page hide">
        <h1 class="title title-winners">Winners <span class="count-winners"></span></h1>
        <h3 class="title title-winners">Page #<span class="count-page_winners">1</span></h3>
  
        <div class="container-winners">
          <table class="table-winners">
            <thead>
              <tr>
                <th>Number</th>
                <th>Car</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Best time (seconds)</th>
              </tr>
            </thead>
            <tbody class="container-win">
            </tbody>
          </table>
        </div>
  
        <div class="pagination main-block_pagination">
          <button class="buttons btn_prev-win">Prev</button>
          <button class="buttons btn_next-win">Next</button>
        </div>
  
    </div>
    `;
    const root = document.createElement('div');
    root.innerHTML = htmlBody;
    document.body.appendChild(root);
};
mainStructure();