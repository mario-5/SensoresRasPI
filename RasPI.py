#!/usr/bin/python

# Internet de las Cosas - http://iotarch.com.ar
#
# Descripcion  : Programa que permite obtener la lectura de un sensor DHT11 y poblar una base SQLite
# Lenguaje     : Python
# Autor        : Mario Coan <mario@iotarch.com.ar>
# Dependencias : Libreria de Adafruit https://github.com/adafruit/Adafruit_Python_DHT
# Web          : http://iotarch.com.ar

# Importa las librerias necesarias 
import time
import datetime
import Adafruit_DHT
import sqlite3

# ############### Settings ####################

path_name ="/home/pi/iot/"
DB_NAME = "SensorPollo.db"
sensorT = "s0" #DHT11
typeT = "T" #temperatura
typeH = "H" #humedad

#Connect DB File
conn = sqlite3.connect(path_name + DB_NAME)
curs = conn.cursor()

# Configuracion del tipo de sensor DHT
sensor = Adafruit_DHT.DHT11

# Configuracion del puerto GPIO al cual esta conectado (GPIO 23)
pin = 23

# Puebla una base de datos SensorPollo.db con la informacion obtenida del sensor
def write_db(text):
    print(text) #  debug
#insert data
    sqlite3.complete_statement(text)
    curs.executescript(text)
    

# Intenta ejecutar las siguientes instrucciones, si falla va a la instruccion except
try:
    # Ciclo principal infinito
    while True:
        # Obtiene la humedad y la temperatura desde el sensor 
        humedad, temperatura = Adafruit_DHT.read_retry(sensor, pin)

        # Armado del statement de SQL para el insert
        SQLs1 ="INSERT INTO SensorData (SensorCode,Day,Time,Place,Value,Type) "
        SQLs2 ="VALUES ("
        SQLs3 = datetime.datetime.now().strftime("%Y-%m-%d")
        SQLs4 = datetime.datetime.now().strftime("%H-%M-%S")
        
        # Si obtiene una lectura del sensor la registra en el DB
        if humedad is not None and temperatura is not None:
            SQLs0 = SQLs1 + SQLs2 +'"'+ sensorT +'",' +'"'+ SQLs3+'"' + "," +"'"+ SQLs4+"'" + ","+'"H",'
            SQLs00 =str(temperatura) + "," '"'+ typeT +'"'+ ");"
            write_db(SQLs0 + SQLs00)
            SQLs00 =str(humedad) + "," +'"'+ typeH+'"' + ");"
            write_db(SQLs0 + SQLs00)
            
        else:
            print("error a obtener la lectura del sensor")
            break
           

       
        # Duerme 360 segundos 6 minutos
        time.sleep(360)


#Close DB
    curs.close()
    conn.close()

# Se ejecuta en caso de que falle alguna instruccion dentro del try
except Exception, e:
    # imprime en consola el error
    print ("se termino",str(e))
