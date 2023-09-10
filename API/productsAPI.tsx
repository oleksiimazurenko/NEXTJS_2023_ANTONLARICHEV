import { API } from './API'
import { ProductModel } from '@/interfaces/product.interface'



export async function productsAPI(category: string | undefined): Promise<ProductModel[]>{

	if(typeof category === 'undefined'){
		return []
	}

	const res = await fetch(API.product.find, {
		method: 'POST',
		body: JSON.stringify({
			category: category,
			limit: 10
		}),
		headers: new Headers({'content-type': 'application/json'})
	});
	
	return res.json();
	
}