const {redisClient} =  require("../config/redis");

const storeOTP = async (email,otp)=>{
    const key = `otp:${email}`;

    await redisClient.set(key,otp,{
        Ex: 300
    });
}


const getOTP = async (email)=>{
    const key = `otp:${email}`;
    const otp = await redisClient.get(key);
    return otp;
}


const deleteOTP = async (email) => {
    const key = `otp:${email}`;

    await redisClient.del(key);
};


module.exports = {
    storeOTP,
    getOTP,
    deleteOTP
}