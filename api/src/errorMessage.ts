
class ErrorMessage extends Error
{
    public status: number | undefined;
    constructor(){
        super();
    }
}

export const errorMessage=(status:number, message:string,err?: any)=>{
    const error = new ErrorMessage();
    const orignalErr = message || "條件錯誤";
    //怕到時候不一定要傳error變數
    error.status = status;
    // error.message = message+` 錯誤詳細描述: `+orignalErr;
    error.message = orignalErr;
    return error;
}
