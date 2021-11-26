axios = require('axios')
fs = require('fs')

address = JSON.parse(fs.readFileSync("secrets.json")).rtm
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
  res = await axios.get('https://explorer.raptoreum.com/api/getaddressutxos?address='+address);
  data = res.data[address]
  for (var i = 0; i < data.length; i++) {
    // 08/30/2017 12:01:30,3,ETH,,,,,mined
    blockinfo = await axios.get('https://explorer.raptoreum.com/api/getblock?height='+data[i].height);
    date = new Date(blockinfo.data.time*1000)
    day = forceLen(date.getDate(), 2)
    month = forceLen(date.getMonth()+1, 2)
    year = date.getFullYear()
    hour = forceLen(date.getHours(), 2)
    min = forceLen(date.getMinutes(), 2)
    sec = forceLen(date.getSeconds(), 2)
    output += month+"/"+day+"/"+year+" "+hour+":"+min+":"+sec+","+(data[i].satoshis/100000000)+",RTM,,,,,mined\n"
  }
  fs.writeFileSync('out.csv', output)
}

run()
