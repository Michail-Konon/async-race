import { getWinnersAPI, countAllWinners } from '../api/api_winners';
import { getCarAPI } from '../api/api_garage';
import { createWinnerTab } from '../mainStructure/mainStructure';
import { DescriptionCar } from '../carGen/carGeneration';
export let numberPageWinners = 1;

const containerWinners = <HTMLElement>document.querySelector('.container-win');
const countWinners = <HTMLElement>document.querySelector('.count-winners');
const btnPrevWinners = <HTMLButtonElement>document.querySelector('.btn_prev-win');
const btnNextWinners = <HTMLButtonElement>document.querySelector('.btn_next-win');
const numPageWinners = <HTMLElement>document.querySelector('.count-page_winners');


//ОБНОВИТЬ ПОБЕДИТЕЛЕЙ
export const updateWinnersUI = () => {
  let num = numberPageWinners * 10 - 10;

  getWinnersAPI(numberPageWinners).then((arr: DescriptionCar[]) => {
    containerWinners.innerHTML = '';

    arr.forEach((car) => {
      let name = '';
      let color = '';
      getCarAPI(car.id).then((oneCar) => {
        name = oneCar.name;
        color = oneCar.color;
        num += 1;

        const oneWinner = `${createWinnerTab(num, color, name, car.wins, car.time)}`;
        containerWinners.innerHTML += oneWinner;
      });
    });
    countWinners.textContent = `(${countAllWinners})`;
  });
};
updateWinnersUI();


//ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ С ПОБЕДИТЕЛЯМИ
btnPrevWinners.addEventListener('click', () => {
  if (numberPageWinners === 1) {
    btnPrevWinners.setAttribute('disabled', 'disabled');
  } else {
    btnNextWinners.removeAttribute('disabled');
    numberPageWinners -= 1;
    numPageWinners.textContent = `${numberPageWinners}`;
  }
  updateWinnersUI();
});

btnNextWinners.addEventListener('click', () => {
  if (numberPageWinners * 10 >= countAllWinners) {
    btnNextWinners.setAttribute('disabled', 'disabled');
  } else {
    btnPrevWinners.removeAttribute('disabled');
    numberPageWinners += 1;
    numPageWinners.textContent = `${numberPageWinners}`;
  }
  updateWinnersUI();
});
