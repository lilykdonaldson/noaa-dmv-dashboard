import pandas as pd
import json
import numpy as np
from datetime import datetime
import requests


import matplotlib.pyplot as plt
import plotly.express as px
import plotly.io as pio


#access token noaa
Token = 'JsDVdrTYMcumWUloSrfsYLQFneUVwnie'

#initialize lists to store data
dates_temp = []
dates_prcp = []
temps = []
prcp = []

#for each year from 2015-2019 ...
for year in range(2015, 2020):
    year = str(year)
    r = requests.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TAVG&limit=1000&stationid=GHCND:USW00013743&startdate='+year+'-01-01&enddate='+year+'-12-31', headers={'token':Token})
    d = json.loads(r.text)
    avg_temps = [item for item in d['results'] if item['datatype']=='TAVG']
    dates_temp += [item['date'] for item in avg_temps]
    temps += [item['value'] for item in avg_temps]

df_temp = pd.DataFrame()

df_temp['date'] = [datetime.strptime(d, "%Y-%m-%dT%H:%M:%S") for d in dates_temp]
df_temp['avgTemp'] = [float(v)/10.0*1.8 + 32 for v in temps]
# df_temp.plot(x ='date', y='avgTemp', kind = 'line')
# plt.show()

fig = px.line(df_temp, x='date', y='avgTemp')
pio.write_html(fig, file='indexw.html', auto_open=True)



