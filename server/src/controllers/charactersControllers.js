// Packages
import prisma from "../../lib/prisma.js";

export const getCharacters = async (req, res) => {
    try {
        const characters = await prisma.character.findMany();

        const modifiedCharacters = characters.map((char) => {
            return { }
        })

        return res.status(200).json(characters);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Could not get characters." })
    }
}