const fileInput = document.querySelector('#input-file')
const inputLabel = document.querySelector('#input-label')
const inputLinesLabel = document.querySelector('#input-lines-label')
const inputLines = document.querySelector('#input-lines')
const line = document.querySelector('#line-selection')
const saveAll = document.querySelector('#save-all')
const preview = document.querySelector('#preview')

const canvasImage = document.createElement('canvas')
const ctxCanvasImage = canvasImage.getContext('2d')
const canvasLines = document.createElement('canvas')
const ctxCanvasLines = canvasLines.getContext('2d')

let imageNames = []
let image

window.addEventListener('DOMContentLoaded', () => {
	fileInput.addEventListener('change', () => {
		let file = fileInput.files.item(0)
		readAndPreview(file)
	})

})

const events = {
	mousemove(event) {
		line.style.display = 'block'
		line.style.width = preview.width + 'px'
		line.style.marginTop = event.offsetY + 'px'
	},
	mouseup(event) {
		console.log('Criou linha')
		ctxCanvasImage.beginPath()
		ctxCanvasImage.moveTo(0, event.offsetY)
		ctxCanvasImage.lineTo(image.width, event.offsetY)
		ctxCanvasImage.stroke()
		ctxCanvasImage.lineWidth = 10
		preview.src = canvasImage.toDataURL()
	},
}

Object.keys(events)
.forEach(eventName => {
    preview.addEventListener(eventName, events[eventName])
})

const createCanvasLine = (event) => {
	console.log('Criou linha')
	ctxCanvasImage.beginPath()
	ctxCanvasImage.moveTo(0, event.offsetY)
	ctxCanvasImage.lineTo(image.width, event.offsetY)
	ctxCanvasImage.stroke()
	ctxCanvasImage.lineWidth = 10
	preview.src = canvasImage.toDataURL()
}

const selectLinePosition = (event) => {
}

const readAndPreview = (file) => {
	let reader = new FileReader()
	reader.readAsDataURL(file)

	if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
		saveAll.style.display = 'block'
		inputLinesLabel.style.display = 'block'

		imageNames.push(file.name.replace(/\.(jpe?g|png|gif)$/i, ''))
		reader.onload = () => {
			
			image = new Image()
			image.title = file.name
			image.src = reader.result
			createCanvasArray()
		}
	}
}

const createCanvasArray = () => {
	let { width, height } = image

	canvasImage.width = width
	canvasImage.height = height

	ctxCanvasImage.clearRect(0, 0, width, height)
	ctxCanvasImage.drawImage(image, 0, 0)

	preview.src = canvasImage.toDataURL()
}

const saveAllButton = document.querySelector('#save-all')
saveAllButton.addEventListener('click', () => {
	const a = document.createElement('a')
	a.download = `${imageNames[0].replace(/(.jpg|.png|webp)$/,'')}_0`
	a.href = canvas1.toDataURL()
	a.click()
})

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
