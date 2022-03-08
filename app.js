const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const container = document.querySelector('.container');

const divSlidesArray = mainSlide.querySelectorAll('div');  //! тут именно дивы из '.main-slide'
const slidesNumber = divSlidesArray.length;  //! количество дивов-слайдов - длина массива

sidebar.style.top = `-${(slidesNumber - 1) * 100}vh`;  //! минус один, т.к. нужно поднять ДО последней картинки, а не отмотать все

//! вводим индекс активного слайда и при нажатии на стрелки левые слайды крутим в одну сторону, правые - в другую (они расположены зеркально, чтобы совпадать)
let indexActiveSlide = 0;

function slideChange(direction) {

	if (direction === 'up') {

		if (indexActiveSlide < slidesNumber - 1) {
			indexActiveSlide += 1;  //! движемся сверху вниз по элементам html
		} else {
			indexActiveSlide = 0;  //! теперь активным будет индекс самого верхнего слайда, т.к. докрутили до самого низа, дальше некуда
		};

	} else if (direction === 'down') {

		if (indexActiveSlide > 0) {
			indexActiveSlide -= 1;  //! движемся снизу вверх по элементам html
		} else {
			indexActiveSlide = slidesNumber - 1; //! теперь активным будет индекс самого нижнего слайда, т.к. докрутили до самого верха, дальше некуда
		};
	};

	let heightClient = container.clientHeight;  //! высота экрана
	//! перемещаем правые слайды в соответствии с индексом активного слайда:
	//! нулевой индекс - ноль премещения, первый индекс - перемещение на одну высоту экрана, второй индекс - на две высоты экрана и т.д.
	mainSlide.style.transform = `translateY(-${indexActiveSlide * heightClient}px)`;
	//! левые слайды со знаком +, а не -, т.к. они подняты с самого начала, их нужно теперь опускать, а это положительное движение по оси У
	//! левые и правые слайды перемещаются на одно и то же расстояние, только в разные стороны,
	//! т.к. элементы слева и справа расположены в противоположном порядке, то при движении в разные стороны элементы сходятся
	sidebar.style.transform = `translateY(${indexActiveSlide * heightClient}px)`;
};

upButton.addEventListener('click', function () {
	slideChange('up');
});
downButton.addEventListener('click', function () {
	slideChange('down');
});

document.addEventListener('keydown', function (event) {
	if (event.key == 'ArrowUp') {
		slideChange('up');
	} else if (event.key == 'ArrowDown') {
		slideChange('down');
	};
});
