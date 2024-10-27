import { v2 as cloudinary } from 'cloudinary';

const connectCloud = async () => {
    try{
        cloudinary.config({ 
            cloud_name: process.env.cloud_name, 
            api_key: process.env.api_key, 
            api_secret: process.env.api_secret 
        });
        console.log('cloudinary connected')
    }catch(error){
        console.log('Fail to connect cloudinary: ', error)
    }
}


export default connectCloud