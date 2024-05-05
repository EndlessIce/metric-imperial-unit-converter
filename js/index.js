// ESSENTIAL ELEMENTS
const textInput = document.getElementById('input-text')
const convertBtn = document.getElementById('convert-btn')
const metricInput = document.getElementById('input-metric')
const imperialInput = document.getElementById('input-imperial')
const errorMsg = document.getElementById('error-msg')
const themeInput = document.getElementById('theme')
const themeLabel = document.getElementById('theme-label')

// INITIAL STATE OF UNIT CONVERTER
let multiplierArr = []
let metricUnitArr = []
let imperialUnitArr = []
metricInput.checked = true
themeLabel.innerHTML = iconDark

// PARAMETERS FOR QUALITIES
const quantity = {
	length: [false, 3.281, 'meters', 'feets'],
	volume: [false, 0.264, 'liters', 'gallons'],
	mass: [false, 2.204, 'kilos', 'pounds'],
}

// SET QUANTITIES TO BE CONVERTED
function setQuantities() {
	multiplierArr.length = 0
	metricUnitArr.length = 0
	imperialUnitArr.length = 0

	for (checkbox of document.querySelectorAll(`.set-quantity`)) {
		const { qty } = checkbox.dataset
		quantity[qty][0] = checkbox.checked
		const outputField = document.querySelector(`.output[data-qty=${qty}]`)

		if (quantity[qty][0]) {
			multiplierArr.push(quantity[qty][1])
			metricUnitArr.push(quantity[qty][2])
			imperialUnitArr.push(quantity[qty][3])
			convertUnits(qty)
		} else {
			outputField.style.display = 'none'
		}
	}

	if (multiplierArr.length === 0 && metricUnitArr.length === 0 && imperialUnitArr.length === 0) {
		errorMsg.textContent = 'Please select any quantity.'
		errorMsg.classList.remove('fade')
		void errorMsg.offsetWidth
		errorMsg.classList.add('fade')
	}
}

//CONVERT UNITS
function convertUnits(qty) {
	const outputField = document.querySelector(`.output[data-qty=${qty}]`)
	const output = document.querySelector(`#output-${qty}`)

	if (Number(textInput.value) > 0) {
		let result = 0

		if (metricInput.checked) {
			result = Number(textInput.value) * quantity[qty][1]
			output.textContent = `${textInput.value} ${quantity[qty][2]} = ${result.toFixed(3)} ${quantity[qty][3]}`
		} else if (imperialInput.checked) {
			result = Number(textInput.value) * (1 / quantity[qty][1])
			output.textContent = `${textInput.value} ${quantity[qty][3]} = ${result.toFixed(3)} ${quantity[qty][2]}`
		}
		outputField.style.display = 'block'
		errorMsg.classList.remove('fade')
	} else {
		outputField.style.display = 'none'
		errorMsg.classList.remove('fade')
		errorMsg.textContent = 'Please enter any number greater than 0.'
		void errorMsg.offsetWidth
		errorMsg.classList.add('fade')
	}
}

// CHANGE COLOR THEME
function changeTheme() {
	if (themeInput.checked) {
		for (element of document.querySelectorAll('.change-theme')) {
			element.classList.add('dark-theme')
			themeLabel.innerHTML = iconLight
		}
	} else {
		for (element of document.querySelectorAll('.change-theme')) {
			element.classList.remove('dark-theme')
			themeLabel.innerHTML = iconDark
		}
	}
}

// EVENT LISTENERS
convertBtn.addEventListener('click', setQuantities)
themeInput.addEventListener('click', changeTheme)
metricInput.addEventListener('change', () => {
	imperialInput.checked = false
})
imperialInput.addEventListener('change', () => {
	metricInput.checked = false
})
