drop table if exists SensorData;

create table SensorData (
 ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
 SensorCode text,
 Day	    text NOT NULL,
 Time  	    text NOT NULL,
 Place      text,
 Value      integer NOT NULL,
 Type       text
);


