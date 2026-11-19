export type Sentiment = 'positive'|'negative'|'neutral'|'mixed';
export type Review = {id:string;product_id:string;customer_name:string|null;title:string|null;content:string;rating:number;source:string;sentiment:Sentiment|null;sentiment_score:number|null;created_at:string;};
export type Product = {id:string;name:string;category:string;description:string|null;price:number|null;created_at:string;};
export type Analysis = {sentiment:Sentiment;confidence:number;summary:string;keywords:string[];aspects:{aspect:string;sentiment:Sentiment;reason:string}[];};