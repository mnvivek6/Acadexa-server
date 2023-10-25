import { Course } from "../tutor/course"
import { User } from "../user/userValidation"

export type Review ={
    user:User
    course:Course
    content:string
    
}