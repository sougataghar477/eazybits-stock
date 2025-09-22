export default function OrderSuccess({state}){
    if(state?.success){
        return <div className="mt-4 font-bold text-green-500">Success submitting an order ✅</div>
    }
    else if(state?.success===false){
        return <div className="mt-4 font-bold text-red-500">Error submitting an order </div>

    }
}