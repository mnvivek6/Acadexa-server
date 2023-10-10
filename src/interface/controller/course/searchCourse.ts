import { Request, Response } from "express";
import { Searchcoursefiltersort } from "../../../app/useCase/user/searchCourse";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { userModel } from "../../../infra/database/model/userModel";
import { searchcourse } from "../../../app/useCase/admin/course";

const userRepository = userRepositoryImp(userModel);

export const SearchCourseFilterSort = async (req: Request, res: Response) => {
  try {
    let sortCriteria: Object = {};

    if (req.query.sort && req.query.sort === 'coursefee-1') sortCriteria = { coursefee: -1 }
    else if (req.query.sort && req.query.sort === 'coursefee1') sortCriteria = { coursefee: 1 }
    else if (req.query.sort && req.query.sort === 'duration-1') sortCriteria = { duration: -1 }
    else if (req.query.sort && req.query.sort === 'duration1') sortCriteria = { duration: 1 }
    else {}

    let filterData;

    if (req.query.input) filterData =  { $regex: req.query.input, $options: 'i' } ;
    
    console.log(req.query.input);
    console.log(filterData);

    const response = await Searchcoursefiltersort(userRepository)(filterData as object, sortCriteria);

    console.log(response, 'response from backend');

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

