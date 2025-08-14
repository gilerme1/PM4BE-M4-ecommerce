/* eslint-disable prettier/prettier */
// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const fechaHora = new Date().toLocaleString(); // Formato local de fecha y hora
    const metodo = req.method;
    const ruta = req.url;

    console.log(`Logeado el: [${fechaHora}], metodo: ${metodo} => ruta: ${ruta}`);
    next(); 
}






