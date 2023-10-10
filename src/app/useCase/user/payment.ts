import { Payment } from "../../../domain/entities/tutor/payment";
import { userRepository } from "../../../infra/repositories/user/userRepository";

export const PaymentUpdate = (userRepository:userRepository)=>{

    return async(purchaseDetails:Payment):Promise<Payment>=>{

        const PurchaseData = await userRepository.CoursePurchase(purchaseDetails)
        return PurchaseData
    }
}
export const PurchasedCourse =(userRepository:userRepository)=>{

    return async(id:string):Promise<Object|undefined>=>{
        const response = await userRepository.PurchaseCourse(id)

        if (response) {
            return response
        }
    }
}
export const Checkingpurchasedornot = (userRepository:userRepository)=>{
    return async(courseid:string,userid:string):Promise<Payment|null>=>{
             const response = await userRepository.findCourseByuserandcourse(courseid,userid)
             console.log(response,'find course by use and cosurse');
             
             return response
    }
}