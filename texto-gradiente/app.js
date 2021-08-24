let fullscreenIcon = document.querySelector('#fullscreen')
let input = document.querySelector('#input')
let formats = document.querySelectorAll('input[name="format"]')
let color1 = document.querySelector('#color1')
let color2 = document.querySelector('#color2')
let svgTexto = document.querySelector("#svgTexto")
let svgTexto2 = document.querySelector("#svgTexto2")
let texto = 'Resultado'

const handleOutput = () => {
	input.value ? svgTexto.textContent = input.value : svgTexto.textContent = texto
	input.value ? svgTexto2.textContent = input.value : svgTexto2.textContent = texto
	handleFormats()
}

fullscreenIcon.addEventListener('click', () => {
	let options = document.querySelector('#options')
	options.classList.toggle("fullscreen")
	setTimeout(() => {
		options.className === "fullscreen" ?
			options.style.display = "none" :
			options.style.display = "flex"
		options.className === "fullscreen" ?
			document.querySelector('html').requestFullscreen() :
			document.exitFullscreen()
	}, options.className === "fullscreen" ? 500 : 0)

})

const handleFormats = () => {
	let formatValue = Array.from(formats).filter(item => item.checked)[0].value
	if(formatValue == 'normal') {
		input.value ? svgTexto.textContent = input.value : svgTexto.textContent = texto
		input.value ? svgTexto2.textContent = input.value : svgTexto2.textContent = texto
		return
	}
	if(formatValue == 'uppercase') {
		input.value ? svgTexto.textContent = input.value.toUpperCase() : svgTexto.textContent = texto.toUpperCase()
		input.value ? svgTexto2.textContent = input.value.toUpperCase() : svgTexto2.textContent = texto.toUpperCase()
		return
	}
	if(formatValue == 'lowercase') {
		input.value ? svgTexto.textContent = input.value.toLowerCase() : svgTexto.textContent = texto.toLowerCase()
		input.value ? svgTexto2.textContent = input.value.toLowerCase() : svgTexto2.textContent = texto.toLowerCase()
		return
	}
	if(formatValue == 'capitalize') {
		const lower = input.value.toLowerCase()
		input.value ?
		svgTexto.textContent = input.value.charAt(0).toUpperCase() + lower.slice(1) :
		svgTexto.textContent = texto.charAt(0).toUpperCase() + texto.slice(1)
		input.value ?
			svgTexto2.textContent = input.value.charAt(0).toUpperCase() + lower.slice(1) :
			svgTexto2.textContent = texto.charAt(0).toUpperCase() + texto.slice(1)
		return
	}
}

const handleColors = () => {
	let gradientColor1 = document.querySelectorAll("linearGradient stop")[0]
	let gradienteColor2 = document.querySelectorAll("linearGradient stop")[1]
	let gradienteColor3 = document.querySelectorAll("linearGradient stop")[2]
	let colorBG1 = document.querySelector("#colorBG1")
	let colorBG2 = document.querySelector("#colorBG2")

	gradientColor1.setAttribute("stop-color", color1.value)
	gradienteColor2.setAttribute("stop-color", color2.value)
	gradienteColor3.setAttribute("stop-color", color3.value)
	document.querySelector('body').style.background = `-moz-linear-gradient(${colorBG1.value}, ${colorBG2.value})`
}

