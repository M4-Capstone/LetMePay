import AppDataSource from "../../data-source"
import Users from "../../entities/users.entity"
import { AppError } from "../../errors/AppError"

export const deleteUserService = async (id:string) =>{

    const userRepository = AppDataSource.getRepository(Users)

    const findUser = await userRepository.findOneBy({documentId: id})

    if(!findUser){
        throw new AppError("User not found", 404)
    }

    if(!findUser.isActive){

        throw new AppError("User not active", 400)
    }
    
    findUser.isActive = false

    await userRepository.update({documentId: id}, findUser)

    return 

}