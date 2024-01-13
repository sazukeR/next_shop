import prisma from '../lib/prisma';
import { initialData } from "./seed";
import { countries } from './seed-countries';



async function main() {
// borrar registros previos
  /*   await Promise.all([ */

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
   /*  ]); */

    const {categories, products, users} = initialData;

    await prisma.user.createMany({
        data: users
    });

    await prisma.country.createMany({
        data: countries
    });

// categorias
   
    const categoriesData = categories.map( category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany()
    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[category.name.toLocaleLowerCase()] = category.id
        return map;
    }, {} as Record<string, string> ); // <string=shirt, string=categoryID>

    // productos

    products.forEach( async(product) => {

        const {type, images, ...rest} = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

    // images

        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }) )

        await prisma.productImage.createMany({
            data: imagesData
        })

    } );
    console.log('seed ejecutado correctamente');
}


(() => {
// el seed es un proceso por el cual alimentamos nuetra base de datos ya creada con data de desarrollo, debemos recordar que el seed es proceso que poldria borrar todo lo que hay en produccion y solo se utiliza en el modo de desarrollo
if (process.env.NODE_ENV === 'production') return 
main()
})()