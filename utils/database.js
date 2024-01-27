import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
	mongoose.set('strictQuery', true)
	if (isConnected) {
		console.log('MongoDB connection is already established!');
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share_prompt',
		})

		isConnected = true

		console.log('MongoDB connection is established!');
	} catch (error) {
		console.log(error);
	}
}