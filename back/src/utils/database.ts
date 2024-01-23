
import mongoose from "mongoose"

const connectDataBase = async () => {
    try {
        const MONGODB_URL: string = process.env.MONGODB_URL || ""
        await mongoose.connect(MONGODB_URL);
        console.log('succes')
    } catch (error: unknown) {
        console.log(error)
        throw new Error('unsucces')
    }

}
export { connectDataBase }