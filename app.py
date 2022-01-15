# import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func

# from flask import Flask, jsonify


# #################################################
# # setup the database to store information from the api
# #################################################
# engine = create_engine("sqlite:///snow.sqlite")

# # put existing database into a new model
# Base = automap_base()
# # reflect tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# # Passenger = Base.classes.passenger

# #################################################
# # setup flask
# #################################################
# app = Flask(__name__)


# #################################################
# # Flask Routes
# #################################################

# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/names<br/>"
#         f"/api/v1.0/passengers"
#     )


# @app.route("/api/v1.0/names")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Passenger.name).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))

#     return jsonify(all_names)


# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


# if __name__ == '__main__':
#     app.run(debug=True)



# import csv
# from sqlalchemy import create_engine, Table, Column, Integer, MetaData

# engine = create_engine('sqlite:///sqlalchemy.db', echo=True)

# metadata = MetaData()
# # Define the table with sqlalchemy:
# my_table = Table('MyTable', metadata,
#     Column('STATION', Integer),
#     Column('NAME', Integer),
#     Column('DATE', String),
#     Column('PRCP', Double),
#     Column('SNWD', Double)
# )
# metadata.create_all(engine)
# insert_query = my_table.insert()

# # Or read the definition from the DB:
# # metadata.reflect(engine, only=['MyTable'])
# # my_table = Table('MyTable', metadata, autoload=True, autoload_with=engine)
# # insert_query = my_table.insert()

# # Or hardcode the SQL query:
# # insert_query = "INSERT INTO MyTable (foo, bar) VALUES (:foo, :bar)"

# with open('../Resources/snowbird.csv', 'r', encoding="utf-8") as csvfile:
#     csv_reader = csv.reader(csvfile, delimiter=',')
#     engine.execute(
#         insert_query,
#         [{"STATION": row[0], "NAME": row[1], "DATE": row[2], "PRCP": row[3], "SNWD": row[4]} 
#             for row in csv_reader]
#     )


from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('home.html')
if __name__ == '__main__':
   app.run()