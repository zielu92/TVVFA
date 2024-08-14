# TVVFA
## Description
This is a dashboard for few tools like Tradingview, which is supported by [python-tradingview-ta](https://github.com/brian-the-dev/python-tradingview-ta).
I want to extend this dashboard by adding few features:
- [x] Docckerise project
- [x] Create settings to set pairs
- [x] Store setting using redis or mongoDB
- [ ] Forecasts based on SVM or LSTM or ARIMA/SARIMA price prediction
- [x] Add alerts
- [ ] Add notification 

## How it works
The dashboard will sort pairs depend on the score. Scores are calculated by checking difference between buys and sells, then the highest scored pair should be displayed as first.

##configuration
````bash
cd front
cp .env.example .env
````
configure .env file

## How to run project using docker
````bash
docker-compose up --build -d
````
then go to [http://localhost:8080](http://localhost:8080)
