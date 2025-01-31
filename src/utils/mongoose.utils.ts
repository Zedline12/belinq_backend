import mongoose from "mongoose";

export function parseDoucment(doc) {
   if(doc) return JSON.parse(JSON.stringify(doc));
  }
  