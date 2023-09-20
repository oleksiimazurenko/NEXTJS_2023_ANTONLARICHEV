import { IReviewForm, IReviewSentResponse } from '@/components/ReviewForm/ReviewForm.interface'
import { API } from './API'



export async function submitCommentsAPI({ formData, productId }: { formData: IReviewForm; productId: string }): Promise<IReviewSentResponse | { error: string }>{

	try {
		const data = await fetch(API.review.createDemo, {
			method: 'POST',
			body: JSON.stringify({...formData, productId }),
			headers: new Headers({'content-type': 'application/json'})
		});

		if (!data.ok) {
      throw new Error('Failed to submit comments'); // Обработка ошибки, если ответ не "ок"
    }

		return data.json();
		
	}catch(e){
		if (e instanceof Error) {
      return { error: e.message }; // Возвращение объекта с ошибкой {statusCode: 404, message: 'Cannot POST /api/review/crate-demo', error: 'Not Found'}
    }
    return { error: 'An error occurred' }; // Обработка других типов ошибок {statusCode: 404, message: 'Cannot POST /api/review/crate-demo', error: 'Not Found'}
	}
	
}