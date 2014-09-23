# E-keelenõu ressursside server ja API

*NB! Kood on arendusel!*

Server on mõeldud keskseks ressursside hoidlaks, mida saaksid erinevad kliendid 
pärida, kliendid on esialgu EKI e-keelenõu leht ja jsEKIToolkit teek.
Keskne server võimaldab väiksemat ja lihtsamat klienti, mida oleks lihtsam 
mujal integreerida.

Server jookseb ```Node.js```-is ja kahepoolne kommunikatsioon kliendiga käib
WebSocket-i kaudu (```Socket.io```).

Server jookseb praegu ainult [arenduspilves](https://ekeelenou-node-c9-kristiank.c9.io/), 
kus asub ka koodi genereeritud [dokumentatsioon](https://ekeelenou-node-c9-kristiank.c9.io/dokumentatsioon/).
