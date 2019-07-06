import sqlite3

############### Settings ####################
#DB Name
DB_NAME = "SensorPollo.db"

#SQL File with Table Schema and Initialization Data
SQL_File_Name = "/home/pi/proyectos/RaspberryPi-DHT11/sql/Table_Schema.sql"
SQL_File_Name2= "/home/pi/proyectos/RaspberryPi-DHT11/sql/TEMPH.sql"
##############################################

#Read Table Schema into a Variable and remove all New Line Chars
TableSchema=""
with open(SQL_File_Name, 'r') as SchemaFile:
 TableSchema=SchemaFile.read().replace('\n', '')

#Connect or Create DB File
conn = sqlite3.connect(DB_NAME)
curs = conn.cursor()

#Create Tables
sqlite3.complete_statement(TableSchema)
curs.executescript(TableSchema)

#Read Table Schema into a Variable and remove all New Line Chars
TableSchema=""
with open(SQL_File_Name2, 'r') as SchemaFile:
 TableSchema=SchemaFile.read().replace('\n', '')

#Connect or Create DB File
conn = sqlite3.connect(DB_NAME)
curs = conn.cursor()

#Create Tables
sqlite3.complete_statement(TableSchema)
curs.executescript(TableSchema)

#Close DB
curs.close()
conn.close()