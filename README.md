# cointracker-import
Import scripts written in node.js to import transactions into cointracker.io

https://www.cointracker.io/add_wallet?t=csv

Uses a secrets.json file that contains the addresses. An example of this file is secretsEx.json

The past transactions are stored in the out.csv file after the scripts are ran. It is likely that you will need to remove transactions that you have already imported.

This does not input the cost basis for each mining transaction. It does not appear that adding cost basis through a csv is possible. cointracker does not have a public API, and dealing with their API that they use for their own frontend does not appear to be possible. I got 403 error codes on every request I made. The only possible automated solution I have for this is puppeteer but I do not feel like writing this tonight. For when I do want to write this, coingecko has a very nice API for getting historical pricing date without a API key. EX: https://api.coingecko.com/api/v3/coins/chia/history?date=13-11-2021 or https://api.coingecko.com/api/v3/coins/raptoreum/history?date=13-11-2021
