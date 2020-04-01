const fs = require('file-system');
const radiosJson = require('./data/radios_chilenas.json'); // cambiar el file para otros paises

let radiosList = { radios_chile: [] };

for (const radio of radiosJson['radios']) {
    let radioItem = {};
    radioItem.title = radio['result']['station']['name'];
    radioItem.id = getRadioId(radio);
    radioItem.artUri = 'undefined';
    radiosList.radios_chile.push(radioItem);
}

stringJson = JSON.stringify(radiosList);
fs.writeFile('./exports/export.json', stringJson);

console.log(radiosList);

function getRadioId(radio) {
    let radioId = 'undefined';
    for (const stream of radio['result']['streams']) {
        if (stream['mime'] == 'audio/mpeg' || stream['mime'] == 'audio/aac') {
            radioId = stream['url'];
            return radioId;
        }
    }
    return radioId;
}