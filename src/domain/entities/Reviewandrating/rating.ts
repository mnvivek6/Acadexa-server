import { Course } from "../tutor/course"
import { Tutor } from "../tutor/tutorValidation"
import { User } from "../user/userValidation"


export type Rating ={
     
    user:User
    tutor:Tutor
    count:number
    course:Course
}