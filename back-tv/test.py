from tradingview_ta import TA_Handler, Interval, Exchange
from time import sleep

symbol = "GBPUSD"
first_interval= Interval.INTERVAL_1_MINUTE
second_interval= Interval.INTERVAL_5_MINUTES

first_symbol = TA_Handler(
    symbol=symbol,
    screener="forex",
    exchange="FX_IDC",
    interval=first_interval
)

second_symbol = TA_Handler(
    symbol=symbol,
    screener="forex",
    exchange="FX_IDC",
    interval=second_interval
)



for i in range (1,10):
    ss = second_symbol.get_analysis()
    fs = first_symbol.get_analysis()
    f_o = fs.indicators['open']
    f_c = fs.indicators['close']
    f_sma20 = fs.indicators['SMA20']
    f_ema20 = fs.indicators['EMA20']
    #print(fs.indicators['Stoch.K[1]']
    #print(fs.indicators['Stoch.D[1]']

    s_sma20 = ss.indicators['SMA20']
    s_ema20 = ss.indicators['EMA20']

    #check
    if((f_ema20 > f_sma20) < f_c):
        print("Buy " + first_interval)
        if((s_ema20 > s_sma20) < f_c):
            print("Buy " + second_interval)
    if((f_ema20 < f_sma20) > f_c):
        print("Sell " + first_interval)
        if((s_ema20 < s_sma20) > f_c):
            print("Sell " + second_interval)
    for remaining in range(0,60):
        secs = remaining
        print('{:02d}'.format(secs), end="", flush=True)
        sleep(1)
        print('\r', end='')
