# TVVFA
## Description
This is a dashboard for few tools like Tradingview, which is supported by [python-tradingview-ta](https://github.com/brian-the-dev/python-tradingview-ta).
I want to extend this dashboard by adding few features:
- [x] Docckerise project
- [x] Create settings to set pairs
- [ ] Store setting using redis or mongoDB
- [ ] Forecasts based on SVM or LSTM price prediction
- [ ] Add alerts/notification 

## How it works
The dashboard will sort pairs depend on the score. Scores are calculated by checking difference between buys and sells, then the highest scored pair should be displayed as first.

## How to run project using docker
````bash
docker-compose up --build -d
````
then go to [http://localhost:8080](http://localhost:8080)
