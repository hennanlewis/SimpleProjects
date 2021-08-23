const form = document.querySelector('#form')
form.addEventListener('submit', (event) => {
	event.preventDefault()
	let channelName = document.querySelector('#input').value
	console.log('Conectanto a canal...')
	connectToTwitchChat(channelName)
})

const connectToTwitchChat = (channelName) => {
	const client = new tmi.Client({ channels: [channelName] })
	client.connect()
	.then(() => console.log(`Conectado a ${channelName}`))
	.catch(error => console.log('Não foi possível conectar'))

	var synth = window.speechSynthesis
	var messageBox = document.querySelector('#messageBox')
	var html = ''

	client.on('message', (channel, tags, message, self) => {
		if (self) return

		html += `<div><span class="user" style="color: ${tags.color}">${tags.username}</span>:
		<span class="message">${message}</span></div>`
		messageBox.innerHTML = html

		if(messageBox.scrollHeight - messageBox.scrollTop < 400)
			messageBox.scrollTop = messageBox.scrollHeight

		speakMessage(tags.username, message)
	})
}

const speakMessage = (username, message) => {
	let mode = document.querySelector('select[name="speaker"]').value
	let speed = Array.from(document.querySelectorAll('input[name="speed"]'))
		.filter(item => item.checked)[0].value

	let synth = window.speechSynthesis
	let utterThis = new SpeechSynthesisUtterance('Mensagem de voz')
	if(mode === 'nothing') return
	if(mode === 'username') {
		utterThis = new SpeechSynthesisUtterance(`${username} mandou uma mensagem.`)
		utterThis.lang = 'pt'
		utterThis.rate = parseInt(speed)
		synth.speak(utterThis)
		return
	}
	if(mode === 'message') {
		utterThis = new SpeechSynthesisUtterance(`${message}.`)
		utterThis.lang = 'pt'
		utterThis.rate = parseInt(speed)
		synth.speak(utterThis)
		return
	}
	if(mode === 'all') {
		utterThis = new SpeechSynthesisUtterance(`${username} disse ${message}.`)
		utterThis.lang = 'pt'
		utterThis.rate = parseInt(speed)
		synth.speak(utterThis)
		return
	}
}
