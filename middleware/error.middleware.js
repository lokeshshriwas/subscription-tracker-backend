const errorMiddleware = (err, req, res, next)=>{
    try {
        let error = {...err}

        error.message = err.message
        
        if(error.name == 'CastError'){
            const message = 'Resource not found'
            error = new Error(message);
            error.statusCode = 404;
        }

        if(error.code == 11000){
            const message = `Duplicate ${Object.keys(error.keyValue)}: ${Object.values(error.keyValue)}`
            error = new Error(message);
            error.statusCode = 400;
        }

        if(error.name == 'ValidationError'){
            const message = Object.values(error.errors).map((item)=>item.message).join(', ')
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Internal Server Error'})
    } catch (error) {
        next(error)
    }
}

export default errorMiddleware;