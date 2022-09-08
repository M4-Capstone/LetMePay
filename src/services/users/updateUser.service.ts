import AppDataSource from "../../data-source"
import Users from "../../entities/users.entity"
import { AppError } from "../../errors/AppError"
import { IUserUpdate } from "../../interfaces/users"
import * as bcrypt from "bcrypt"

export const updateUserService = async (id:string, {name, email, password}:IUserUpdate): Promise<Users> => {

    const userRepository = AppDataSource.getRepository(Users)

    const findUser = await userRepository.findOneBy({documentId: id})

    if(!findUser){
        throw new AppError("User not found", 404)
    }
    
    if(!bcrypt.compare(findUser.password, password!)){
        throw new AppError("Please enter a different password")
    }

    const hashedPassword = await bcrypt.hash(password!, 10)

    await userRepository.update({documentId: id}, {
        name: name ? name : findUser.name,
        password: password ? hashedPassword : findUser.password,
        email: email ? email : findUser.email
    })

    const findUserUpdated = await userRepository.findOneBy({documentId: id})

    return findUserUpdated!

}