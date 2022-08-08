import { countAllCars, getCarsAPI, getCarAPI, createCarAPI, deleteCarAPI, updateCarAPI } from '../api/api_garage';
import { createCarBlock } from '../mainStructure/mainStructure';
import { getRandomName, getRandomColor, DescriptionCar } from '../carGen/carGeneration';
import { getAllWinnersAPI, deleteWinnerAPI } from '../api/api_winners';
import { updateWinnersUI } from '../winnerPage/winnerPage';
import { resetRace } from './garagePage_drive';

const btnPrevCars = <HTMLButtonElement>document.querySelector('.btn_prev');
const btnNextCars = <HTMLButtonElement>document.querySelector('.btn_next');
const numPage = <HTMLSpanElement>document.querySelector('.count-page');
const btnGenerateNewCar = <HTMLElement>document.querySelector('.generate-cars');
const btnGenerateRandomCars = <HTMLElement>document.querySelector('.btn_generate_cars');
const trackCarBlock = <HTMLElement>document.querySelector('.track-block_cars');
const countGarage = <HTMLElement>document.querySelector('.count-garage');
const inputTextCreate = <HTMLInputElement>document.querySelector('.text-create');
const inputColorCreate = <HTMLInputElement>document.querySelector('.color-create');

const inputTextUpdate = <HTMLInputElement>document.querySelector('.text-update');
const inputColorUpdate = <HTMLInputElement>document.querySelector('.color-update');
const btnUpdate = <HTMLInputElement>document.querySelector('.btn_update');

let idUpdateCar: number;
export let numberPage = 1;

export const updateCarsUI = () => {
  getCarsAPI(numberPage).then((arr: DescriptionCar[]) => {
    trackCarBlock.innerHTML = '';


    arr.forEach((car) => {
      const oneCar = `${createCarBlock(car.id, car.name, car.color)}`;
      trackCarBlock.innerHTML += oneCar;
    });
    countGarage.textContent = `(${countAllCars})`;
  });
};
updateCarsUI();

btnPrevCars.addEventListener('click', () => {
  if (numberPage === 1) {
    btnPrevCars.setAttribute('disabled', 'disabled');
  } else {
    btnNextCars.removeAttribute('disabled');
      numberPage -= 1;
      numPage.textContent = `${numberPage}`;
  }
  updateCarsUI();
  resetRace();
});

btnNextCars.addEventListener('click', () => {
  if (numberPage * 7 >= countAllCars) {
    btnNextCars.setAttribute('disabled', 'disabled');
  } else {
    btnPrevCars.removeAttribute('disabled');
    numberPage += 1;
    numPage.textContent = `${numberPage}`;
  }
  updateCarsUI();
  resetRace();
});

document.addEventListener('click', async (e) => {
  const btn = e.target as HTMLElement;

  if (btn.classList.contains('car-options_select')) {
    idUpdateCar = Number(btn.dataset.select);
    inputTextUpdate.disabled = false;
    inputColorUpdate.disabled = false;
    btnUpdate.disabled = false;

    getCarAPI(idUpdateCar).then((item) => {
      inputTextUpdate.value = item.name;
      inputColorUpdate.value = item.color;
    });
  }

  if (btn.classList.contains('car-options_remove')) {
    const idButton = Number(btn.dataset.remove);
    deleteCarAPI(idButton).then(() => updateCarsUI());

    getAllWinnersAPI().then((arrAllWin) => {
      arrAllWin.forEach((item: DescriptionCar) => {
        if (Number(item.id) === idButton) deleteWinnerAPI(idButton);
      });
    }).then(() => updateWinnersUI());
  }
});

btnGenerateNewCar.addEventListener('click', (e) => {
  const elem = e.target as HTMLElement;

  if (elem.classList.contains('btn_create')) {
    const nameNewCar =  inputTextCreate.value;
    const colorNewCar =  inputColorCreate.value;

    if (nameNewCar == '') {
      alert('Enter car name');
    } else {
      (createCarAPI({ 'name': nameNewCar, 'color': colorNewCar })).then(() => updateCarsUI());
    }

    if (countAllCars % 7 === 0) btnNextCars.removeAttribute('disabled');
    inputTextCreate.value = '';
  }

  if (elem.classList.contains('btn_update')) {
    const nameUpdateCar =  inputTextUpdate.value;
    const colorUpdateCar =  inputColorUpdate.value;
    
    (updateCarAPI( { 'name': nameUpdateCar, 'color': colorUpdateCar }, idUpdateCar)).then(() => updateCarsUI() );
    
    inputTextUpdate.value = '';
    inputTextUpdate.disabled = true;
    inputColorUpdate.disabled = true;
    btnUpdate.disabled = true;
  }
});

btnGenerateRandomCars.addEventListener('click', async () => {
  for (let i = 0; i < 100; i++){
    const name = getRandomName();
    const color = getRandomColor();
  
    createCarAPI({ 'name': `${name}`, 'color': `${color}` });
  }
  updateCarsUI();
  btnNextCars.removeAttribute('disabled');
});