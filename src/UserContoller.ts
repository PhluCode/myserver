import { Request, Response } from "express";
import { UserModel } from "./User";
import { utils } from "./Utils";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, age } = req.body;
        if (!utils.isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (!utils.isValidAge(age)) {
            return res.status(400).json({ message: "Age must be a non-negative integer" });
        }
        if (!utils.isValidPassword(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and contain both letters and numbers" });
        }

        const newUser = new UserModel({ username, email, password, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);   
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }   
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, age } = req.body;
        if (email !== undefined && !utils.isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (age !== undefined && !utils.isValidAge(age)) {
            return res.status(400).json({ message: "Age must be a non-negative integer" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { username, email, password, age },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
