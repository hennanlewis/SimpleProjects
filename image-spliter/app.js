const fileInput = document.querySelector('#input-file')
const inputLabel = document.querySelector('#input-label')
const saveAll = document.querySelector('#save-all')
const preview = document.querySelector('#preview-content')
const teste = document.querySelector('#preview')

let imageNames = []
let image
let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d')

window.addEventListener('DOMContentLoaded', () => {
	fileInput.addEventListener('change', () => {
		let files = fileInput.files

		if (files)
			[].forEach.call(files, readAndPreview)
	})

})

const readAndPreview = file => {
	let reader = new FileReader()
	reader.readAsDataURL(file)

	if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
		saveAll.style.display = 'block'

		imageNames.push(file.name.replace(/\.(jpe?g|png|gif)$/i, ''))
		reader.onload = function() {
			image = new Image()
			image.title = file.name
			image.src = reader.result
			createCanvas()
		}
	}
}

const createCanvas = () => {
	let { width, height } = image

	canvas.width = width
	canvas.height = height

	ctx.clearRect(0, 0, width, height)
	ctx.drawImage(image, 0, 0)

	teste.src = canvas.toDataURL()
}

const saveAllButton = document.querySelector('#save-all')
saveAllButton.onclick = () => {
	const a = document.createElement('a')
	a.download = `${imageNames[0].replace(/(.jpg|.png|webp)$/,'')}_0`
	a.href = canvas.toDataURL()
	a.click()
	a.download = `${imageNames[0].replace(/(.jpg|.png|webp)$/,'')}_1`
	a.click()
}

// Selection tool
// const selection = document.getElementById('selection-tool')

// let startX, startY, relativeStartX, relativeStartY,
// endX, endY, relativeEndX, relativeEndY;
// let startSelection = false;

// const events = {
//     mouseover(){
//        this.style.cursor = 'crosshair'
//     },
//     mousedown(){
//         const {clientX, clientY, offsetX, offsetY} = event
//         // console.table({
//         //     'client': [clientX, clientY],
//         //     'offset': [offsetX, offsetY]
//         // })

//         startX = clientX
//         startY = clientY
//         relativeStartX = offsetX
//         relativeStartY = offsetY

//         startSelection = true

//     },
//     mousemove(){
//         endX = event.clientX
//         endY = event.clientY

//         if(startSelection) {
//             selection.style.display = 'initial';
//             selection.style.top = startY + 'px';
//             selection.style.left = startX + 'px';

//             selection.style.width = (endX - startX) + 'px';
//             selection.style.height = (endY - startY) + 'px';
//         }

//     },
//     mouseup(){
//         startSelection = false;

//         relativeEndX = event.layerX;
//         relativeEndY = event.layerY;

//         // mostrar o botão de corte
//         cropButton.style.display = 'initial'
//     }
// }

// Object.keys(events)
// .forEach(eventName => {
//     // addEventListener('mouseover', events.mouseover)
//     photoPreview.addEventListener(eventName, events[eventName])
// })


// // Cortar imagem
// const cropButton = document.getElementById('crop-image')
// cropButton.onclick = () => {
//     const { width: imgW, height: imgH } = image
//     const { width: previewW, height: previewH } = photoPreview

//     const [ widthFactor, heightFactor ] = [ 
//         +(imgW / previewW), 
//         +(imgH / previewH)
//     ]

//     const [ selectionWidth, selectionHeight ] = [
//         +selection.style.width.replace('px', ''),
//         +selection.style.height.replace('px', '')
//     ]

//     const [ croppedWidth, croppedHeight ] = [
//         +(selectionWidth * widthFactor),
//         +(selectionHeight * heightFactor)
//     ]

//     const [actualX, actualY] = [
//         +( relativeStartX * widthFactor ),
//         +( relativeStartY * heightFactor )
//     ]

//     // pegar do ctx a imagem cortada
//     const croppedImage = ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)

//     // limpar o ctx
//     ctx.clearRect(0,0,ctx.width,ctx.height)

//     // ajuste de proporções
//     image.width = canvas.width = croppedWidth;
//     image.height = canvas.height = croppedHeight;

//     // adicionar a imagem cortada ao ctx
//     ctx.putImageData(croppedImage, 0, 0)

//     // esconder a ferramenta de seleção
//     selection.style.display = 'none'

//     // atualizar o preview da imagem
//     photoPreview.src = canvas.toDataURL()

//     // mostrar o botão de download
//     downloadButton.style.display = 'initial'
// }
