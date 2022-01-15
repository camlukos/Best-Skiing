import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import csv
import pandas as pd

app = Flask(__name__)


snowbird = pd.read_csv('Resources/snowbird.csv')
tahoe = pd.read_csv('Resources/tahoe.csv')
abasin = pd.read_csv('Resources/a basin.csv')
mammoth = pd.read_csv('Resources/mammoth.csv')
bachelor = pd.read_csv('Resources/mt bachelor.csv')


engine = create_engine("sqlite:///snowfall.sqlite", echo=False)
snowbird.to_sql(name='snowbird', con=engine, if_exists='replace', index=False)
tahoe.to_sql(name='tahoe', con=engine, if_exists='replace', index=False)
abasin.to_sql(name='abasin', con=engine, if_exists='replace', index=False)
mammoth.to_sql(name='mammoth', con=engine, if_exists='replace', index=False)
bachelor.to_sql(name='bachelor', con=engine, if_exists='replace', index=False)






@app.route('/')
def home():
   return render_template('home.html')

if __name__ == '__main__':
   app.run()