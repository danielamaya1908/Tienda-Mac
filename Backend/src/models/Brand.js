const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Brand = sequelize.define(
        "Brand",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Asegura que el nombre de la marca sea único
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        { timestamps: true }
    );

    // Hook para crear la marca si no existe al agregar un producto
    Brand.beforeCreate(async (brand, options) => {
        const existingBrand = await Brand.findOne({ where: { name: brand.name } });
        if (!existingBrand) {
            // La marca no existe, crearla
            const newBrand = await Brand.create({ name: brand.name });
        }
    });

    return Brand;
};
