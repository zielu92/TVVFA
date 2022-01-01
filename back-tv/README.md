```bash
docker build -t ta-api .
docker run -it -p 8888:8888 ta-api
```

## Check it

http://localhost:8888/?symbol=BNBBUSD&screener=CRYPTO&exchange=BINANCE&interval=1m
