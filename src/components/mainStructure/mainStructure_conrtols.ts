export const btnGarageView = <HTMLElement>document.querySelector('.btn_garage-view');
export const btnWinnersView = <HTMLElement>document.querySelector('.btn_winners-view');

export const toGarage = <HTMLElement>document.querySelector('.garage-page');
export const toWinners = <HTMLElement>document.querySelector('.winners-page');

btnGarageView.addEventListener('click', () => {
    toWinners.classList.add('hide');
    toGarage.classList.remove('hide');
});

btnWinnersView.addEventListener('click', () => {
    toGarage.classList.add('hide');
    toWinners.classList.remove('hide');
});