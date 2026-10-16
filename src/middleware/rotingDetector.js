export const rotingDetector =(req,res,next)=>{
    console.log({
        method:req.method,
        url:req.url
    })
    next()
}