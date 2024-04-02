const { UserAdmin } = require("../../db");

const createUserAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const newUserAdmin = await UserAdmin.create({ email, password, role });
    res.status(201).json(newUserAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error creating user admin" });
  }
};

const validateUserAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userAdmin = await UserAdmin.findOne({ where: { email } });
  
      if (userAdmin && userAdmin.password === password) {
        res.status(200).json({ message: "User admin found" });
      } else {
        res.status(404).json({ message: "User admin not found or password incorrect" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error validating user admin" });
    }
  };
  
module.exports = {
  createUserAdmin,
  validateUserAdmin,
};
