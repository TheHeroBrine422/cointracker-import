axios = require('axios')
fs = require('fs')

address = JSON.parse(fs.readFileSync("secrets.json")).chia
output = 'Date,Received Quantity,Received Currency,Sent Quantity,Sent Currency,Fee Amount,Fee Currency,Tag\n'

function forceLen(str, len) {
  if (typeof str == 'number') {str = str.toString()}
  out = str
  for (var i = 0; i < len-str.length; i++) {
    out = "0"+out
  }
  return out
}

async function run() {
  res = await axios.get('https://www.chia.tt/api/chia/blockchain/address/'+address+'/transaction?page=0&count=20');
  data = res.data.data

  for (var i = 0; i < data.length; i++) {
    // 08/30/2017 12:01:30,3,ETH,,,,,mined
    if (data[i].type == 'Pay') {
      date = new Date(data[i].time*1000)
      day = forceLen(date.getDate(), 2)
      month = forceLen(date.getMonth()+1, 2)
      year = date.getFullYear()
      hour = forceLen(date.getHours(), 2)
      min = forceLen(date.getMinutes(), 2)
      sec = forceLen(date.getSeconds(), 2)
      output += month+"/"+day+"/"+year+" "+hour+":"+min+":"+sec+","+data[i].amount+",XCH,,,,,mined\n"
    }
  }
  fs.writeFileSync('out.csv', output)
}

run()
