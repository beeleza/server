const { User } = require("../database/models");

class UserController {
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Ocorreu um erro ao criar usuario:", error });
        }
    }

    async list(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            return res.status(404).json({ message: "Ocorreu um erro ao listar usuarios:", error })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id } });
            if (user === null) {
                console.log('Usuario não encontrado')
            }
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({ message: "Erro ao buscar usuario:", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await user.update(data);

            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({
                message: "Erro ao atualizar usuário",
                error: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if(!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await User.destroy({ where: { id } });
            return res.status(200).json({ message: 'Usuário deletado' })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar usuário" })
        }
    }
}

module.exports = UserController;
