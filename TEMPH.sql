drop table if exists SensorData;

create table SensorData (
 ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
 SensorCode text,
 Day	    NUMERIC NOT NULL,
 Time  	    NUMERIC NOT NULL,
 Place      text,
 Value      integer NOT NULL,
 Type       text
);


