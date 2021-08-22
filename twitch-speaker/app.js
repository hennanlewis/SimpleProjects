let channelName = ''

const form = document.querySelector('#form')
form.addEventListener('submit', (event) => {
	event.preventDefault()


	channelName = document.querySelector('#input').value

	const client = new tmi.Client({
		channels: [channelName]
	})

	client.connect()

	var synth = window.speechSynthesis
	var messageBox = document.querySelector('#messageBox')
	var html = ''

	client.on('message', (channel, tags, message, self) => {
		// "Alca: Hello, World!"
		if (self) return
		if (tags.username !== 'nightbot') {
			var utterThis = new SpeechSynthesisUtterance(`${tags.username} falou.`)
			utterThis.lang = 'pt'
			synth.speak(utterThis)
			html += `<div ><span class="user">${tags.username}:</span>
			<span class="message">${message}</span></div>`
			messageBox.innerHTML = html
			messageBox.scrollTop = messageBox.scrollHeight
		}
	})

})