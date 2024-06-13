import requests
import pandas as pd
from pymongo import MongoClient

MONGO_URI="mongodb+srv://Departamentovidal:Departamentovidal@cluster0.qaqrpd7.mongodb.net/?retryWrites=true&w=majority"
client=MongoClient(MONGO_URI)

r = requests.get(
    "https://www.vivino.com/api/explore/explore",
    params={
        "country": "AR",
        "min_rating": 0,
        "page": 1
    },
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"
    },
)

results = [
    (
        t["vintage"]["wine"]["winery"]["name"], 
        t["vintage"]["wine"]["name"],
        t["vintage"]["year"],
        t["vintage"]["statistics"]["ratings_average"],
        t["vintage"]["wine"]["style"]["varietal_name"],
        t["vintage"]["wine"]["region"]["name"],
        t["vintage"]['image']['location'],
        t["vintage"]['wine']['style']['baseline_structure']
    )
    for t in r.json()["explore_vintage"]["matches"]
]

dataframe = pd.DataFrame(results,columns=['Winery','Wine','Year','Rating','Variety','Region','Image','Notes'])

dataframe.to_csv('wines.csv', mode='w',index=False,columns=['Winery','Wine','Year','Rating','Variety','Region','Image','Notes'])
